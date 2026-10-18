import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { catalogRecords } from "./helpers/catalog";
import { createCatalogRepository } from "../src/data/catalog-repository";
import type { CompatibilityAssessment } from "../src/data/species-schema";

test("recommendations need sourced geography or reviewed pair evidence", () => {
  const repository = createCatalogRepository(catalogRecords);
  for (const animal of catalogRecords) {
    const suggestions = repository.recommendations(animal.slug);
    expect(suggestions).toHaveLength(3);
    expect(new Set(suggestions.map((item) => item.animal.slug)).size).toBe(3);
    expect(
      suggestions.every(
        (item) =>
          item.animal.slug !== animal.slug &&
          item.kind === "same-region" &&
          Boolean(item.region?.referenceIds.length) &&
          item.evidence.length > 0,
      ),
    ).toBe(true);
  }
  const duplicateSpecies = structuredClone(catalogRecords);
  duplicateSpecies[1].scientificName = duplicateSpecies[0].scientificName;
  expect(() => createCatalogRepository(duplicateSpecies)).toThrow(
    /Duplicate scientific species/,
  );
  const reusedPhoto = structuredClone(catalogRecords);
  reusedPhoto[1].photo = structuredClone(reusedPhoto[0].photo);
  expect(() => createCatalogRepository(reusedPhoto)).toThrow(
    /Photograph reused across species/,
  );
  const databaseRows = catalogRecords.map(
    ({ source: _source, ...animal }, sortOrder) => ({ ...animal, sortOrder }),
  );
  const alternateProvider = createCatalogRepository(databaseRows);
  expect(alternateProvider.list()).toHaveLength(catalogRecords.length);
  expect(alternateProvider.findBySlug(catalogRecords[0].slug)?.name).toBe(
    catalogRecords[0].name,
  );
  const records = structuredClone(catalogRecords);
  records[0].regions = [];
  expect(
    createCatalogRepository(records).recommendations(records[0].slug),
  ).toEqual([]);
  records[0].regions = [
    {
      id: "invalid",
      label: "Unverified",
      scale: "continent",
      referenceIds: ["missing"],
    },
  ];
  expect(() => createCatalogRepository(records)).toThrow(/sourced region/);

  // Synthetic evidence exercises the workflow; this is never published as biology.
  const pair: CompatibilityAssessment = {
    species: [
      catalogRecords[0].slug,
      catalogRecords[catalogRecords.length - 1].slug,
    ],
    status: "draft",
    waterParameters: "Synthetic water assessment",
    behavior: "Synthetic behavior assessment",
    adultSizeAndSpace: "Synthetic size and space assessment",
    conditions: "Synthetic conditions",
    references: [
      {
        id: "fixture",
        title: "Synthetic test evidence",
        author: "Test fixture",
        url: "https://example.org/test-evidence",
        accessedAt: "2000-01-01",
      },
    ],
  };
  expect(
    createCatalogRepository(catalogRecords, [pair])
      .recommendations(pair.species[0])
      .every((item) => item.kind !== "compatible"),
  ).toBe(true);
  pair.status = "reviewed";
  const approved = createCatalogRepository(catalogRecords, [
    pair,
  ]).recommendations(pair.species[0])[0];
  expect(approved.kind).toBe("compatible");
  expect(approved.animal.slug).toBe(pair.species[1]);
  expect(approved.conditions).toBe(pair.conditions);
  expect(() =>
    createCatalogRepository(catalogRecords, [
      { ...pair, adultSizeAndSpace: "" },
    ]),
  ).toThrow(/size\/space/);
  expect(() =>
    createCatalogRepository(catalogRecords, [{ ...pair, references: [] }]),
  ).toThrow(/sources/);
});

test("versioned knowledge feed retains citations without spreadsheet or commercial data", async ({
  request,
}) => {
  const response = await request.get("/dados/catalogo-especies.json");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  if (["localhost", "127.0.0.1"].includes(new URL(response.url()).hostname)) {
    // Astro's static preview does not apply Cloudflare Pages header rules.
    expect(
      readFileSync(new URL("../dist/_headers", import.meta.url), "utf8"),
    ).toMatch(/\/dados\/catalogo-especies\.json\s+X-Robots-Tag: noindex/);
  } else {
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
  const payload = await response.json();
  expect(payload.schemaVersion).toBe(1);
  expect(payload.items).toHaveLength(catalogRecords.length);
  for (const item of payload.items) {
    expect(item.reviewStatus).toBe("draft");
    expect(item.photos).toHaveLength(3);
    expect(item.sections).toHaveLength(11);
    expect(item.references.length).toBeGreaterThanOrEqual(4);
    expect(item.recommendations).toHaveLength(3);
    expect(item.url).toBe(
      `https://uberpeixes-institutional-site.pages.dev/especies/${item.id}/`,
    );
    expect(item).not.toHaveProperty("source");
    expect(item).not.toHaveProperty("commercialName");
  }
});
