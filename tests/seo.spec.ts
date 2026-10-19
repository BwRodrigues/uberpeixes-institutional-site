import { test, expect } from "@playwright/test";
import { isProductionDeployment } from "../src/config/indexing";
import { isPublishable } from "../src/data/species-validation";
import { catalogRecords } from "./helpers/catalog";

test("indexing fails closed for unknown environments and incomplete profiles", () => {
  expect(isProductionDeployment({})).toBe(false);
  expect(isProductionDeployment({ SITE_DEPLOYMENT: "production" })).toBe(true);
  expect(
    isProductionDeployment({
      CF_PAGES: "1",
      CF_PAGES_BRANCH: "main",
      SITE_DEPLOYMENT: "preview",
    }),
  ).toBe(true);
  expect(
    isProductionDeployment({
      CF_PAGES: "1",
      CF_PAGES_BRANCH: "feat/preview",
      SITE_DEPLOYMENT: "production",
    }),
  ).toBe(false);
  expect(
    isProductionDeployment({ CF_PAGES: "1", SITE_DEPLOYMENT: "production" }),
  ).toBe(false);
  const ready = structuredClone(
    catalogRecords.find((animal) => animal.status === "reviewed")!,
  );
  expect(isPublishable(ready)).toBe(true);
  ready.description = " ";
  expect(isPublishable(ready)).toBe(false);
  ready.description = "A reviewed description";
  ready.essentials = [];
  expect(isPublishable(ready)).toBe(false);
});
