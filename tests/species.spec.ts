import { expect, test } from "@playwright/test";
import { catalogRecords as profileData } from "./helpers/catalog";

const pilot = [
  {
    slug: "neon-chines",
    name: "Neon-chinês",
    scientific: "Tanichthys albonubes",
    commercial: "NEON CHINES (TANICTIS)",
  },
  {
    slug: "peixe-agulhinha",
    name: "Agulhinha Prata",
    scientific: "Dermogenys pusilla",
    commercial: "PEIXE AGULHINHA",
  },
  {
    slug: "barbus-cereja",
    name: "Barbus cereja",
    scientific: "Rohanella titteya",
    commercial: "BARBUS CEREJA",
  },
  {
    slug: "barbus-cereja-veu",
    name: "Barbo Conchônio Cereja Véu",
    scientific: "Pethia conchonius",
    commercial: "BARBUS CEREJA VEU",
  },
  {
    slug: "barbus-denizoni",
    name: "Barbus Denizoni",
    scientific: "Dawkinsia denisonii",
    commercial: "BARBUS DENIZONI",
  },
];

test("homepage menu opens exactly five pilot records without overflow", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Espécies", exact: true })
    .click();
  await expect(page).toHaveURL(/\/especies\/$/);
  // A clicked navigation may commit before its styles have finished loading.
  await page.waitForLoadState("load");
  await expect(page.locator("[data-species-card]")).toHaveCount(5);
  await expect(
    page.getByText("Protótipo em validação", { exact: true }),
  ).toHaveCount(0);
  for (const entry of pilot)
    await expect(page.locator("[data-species-card]")).toContainText([
      entry.name,
    ]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator("[data-species-card] .species-photo > a").first().click();
  await expect(page).toHaveURL(/\/especies\/neon-chines\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Neon-chinês",
  );
});

test("search is accent-insensitive and combines with category filters and reset", async ({
  page,
}) => {
  await page.goto("/especies/");
  const search = page.getByRole("searchbox", { name: "Pesquisar por nome" });
  const category = page.getByRole("combobox", {
    name: "Categoria dos animais",
  });
  await search.fill("  VÉU  ");
  await expect(page.locator("[data-species-card]:visible")).toHaveCount(1);
  await expect(page.locator("[data-species-card]:visible")).toContainText(
    "Barbo Conchônio Cereja Véu",
  );
  await category.selectOption("Asiáticos");
  await expect(page.locator("[data-species-card]:visible")).toHaveCount(0);
  await expect(page.getByText(/Nenhum animal encontrado/)).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator("[data-species-card]:visible")).toHaveCount(5);
  await search.fill("Dermogenys pusilla");
  await expect(page.locator("[data-species-card]:visible")).toHaveCount(1);
  await expect(page.locator("[data-species-card]:visible")).toContainText(
    "Agulhinha Prata",
  );
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await category.selectOption("Barbos e Danios");
  await expect(page.locator("[data-species-card]:visible")).toHaveCount(3);
});

test("each generated profile has the correct identity, inquiry, metadata, references and licensed photographs", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const titles = new Set<string>();
  for (const entry of pilot) {
    const response = await page.goto(`/especies/${entry.slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      entry.name,
    );
    await expect(page.locator(".species-hero .scientific-name i")).toHaveText(
      entry.scientific,
    );
    await expect(page.locator(".commercial-name")).toContainText(
      entry.commercial,
    );
    await expect(page.locator("header .brand-logo")).toBeVisible();
    await expect(page.locator(".profile-section")).toHaveCount(11);
    expect(
      await page.locator('#referencias a[href^="https://"]').count(),
    ).toBeGreaterThanOrEqual(4);
    await expect(
      page.locator(".species-hero .species-photo img"),
    ).toBeVisible();
    await expect(
      page.locator(".species-hero .species-photo figcaption"),
    ).toContainText("CC BY");
    expect(
      await page
        .locator(".species-hero img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    ).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://uberpeixes-institutional-site.pages.dev/especies/${entry.slug}/`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    const data = JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .first()
        .textContent())!,
    );
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement[2].name).toBe(entry.name);
    for (const link of await page
      .getByRole("link", { name: "Consultar no WhatsApp", exact: true })
      .all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect(url.origin + url.pathname).toBe("https://wa.me/5534998910880");
      expect(url.searchParams.get("text")).toBe(
        `Olá! Estava conhecendo a espécie ${entry.name} (${entry.scientific}) no site da Uberpeixes e gostaria de consultar o valor e a disponibilidade.`,
      );
    }
    await expect(
      page.locator(
        ".species-hero .species-photo img, .species-gallery .species-photo img",
      ),
    ).toHaveCount(3);
    await expect(page.locator(".species-gallery .species-photo")).toHaveCount(
      2,
    );
    const photoPaths: string[] = [];
    for (const photo of await page
      .locator(".species-hero .species-photo, .species-gallery .species-photo")
      .all()) {
      const img = photo.locator("img");
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      const path = (await img.getAttribute("src"))!;
      photoPaths.push(path);
      await expect(photo.locator("a").first()).toHaveAttribute("href", path);
      await expect(photo.locator("figcaption")).toContainText("Foto:");
      expect(
        await photo.locator("figcaption a[href^='https://']").count(),
      ).toBe(2);
      if (
        await photo.evaluate((element) =>
          Boolean(element.closest(".species-gallery")),
        )
      )
        await expect(img).toHaveAttribute("loading", "lazy");
    }
    expect(new Set(photoPaths).size).toBe(3);
    await page.locator(".species-hero").scrollIntoViewIfNeeded();
    await expect(page.locator(".species-inquiry a")).toBeInViewport();
    if (entry.slug === "barbus-cereja-veu") {
      await expect(page.locator("#agua")).toContainText("16–24 °C");
      await expect(page.locator("#criacao")).toContainText("8–10");
      await expect(page.locator("#classificacao")).toContainText(
        "Pethia conchonius",
      );
      await expect(
        page.locator(".species-hero .species-photo img"),
      ).toHaveAttribute(
        "src",
        "/images/species/barbo-conchonio-cereja-veu.webp",
      );
    }
    const suggestions = page.locator("[data-recommendation]");
    await expect(suggestions).toHaveCount(3);
    await expect(
      page.getByRole("heading", {
        name: "Conheça outras espécies",
        exact: true,
      }),
    ).toHaveCount(1);
    const destinations = new Set<string>();
    for (const card of await suggestions.all()) {
      await expect(card.locator(".recommendation-label")).toHaveText(
        "Mesma região",
      );
      await expect(card.locator(".recommendation-context")).toHaveText(
        "Ásia · continente",
      );
      const link = card.locator("h3 a");
      const destination = (await link.getAttribute("href"))!;
      expect(destination).not.toBe(`/especies/${entry.slug}/`);
      expect(
        pilot.some((item) => destination === `/especies/${item.slug}/`),
      ).toBe(true);
      destinations.add(destination);
      const img = card.locator("img");
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(
        await card.locator(".recommendation-sources a").count(),
      ).toBeGreaterThan(0);
    }
    expect(destinations.size).toBe(3);
    titles.add(await page.title());
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const nextProfile = suggestions.first().locator("h3 a");
    const nextName = await nextProfile.textContent();
    await nextProfile.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(nextName!);
    await page
      .getByRole("link", { name: "Voltar ao catálogo", exact: true })
      .click();
    await expect(page).toHaveURL(/\/especies\/$/);
  }
  expect(titles.size).toBe(5);
  expect(errors).toEqual([]);
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/especies/");
});

test("catalog remains navigable without JavaScript", async ({
  browser,
  baseURL,
  viewport,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport,
  });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/especies/`);
    await expect(page.locator("[data-species-card]")).toHaveCount(5);
    await expect(page.locator("[data-catalog-filters]")).toBeHidden();
    await page
      .getByRole("link", { name: "Ver ficha completa", exact: true })
      .first()
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Neon-chinês",
    );
  } finally {
    await context.close();
  }
});

test("all scientific fields are server rendered and native accordions work without JavaScript", async ({
  browser,
  baseURL,
  viewport,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport,
  });
  try {
    const page = await context.newPage();
    for (const entry of pilot) {
      const response = await page.goto(`${baseURL}/especies/${entry.slug}/`);
      const initialHTML = (await response?.text())!;
      const source = profileData.find((animal) => animal.slug === entry.slug)!;
      const initial = await page.evaluate((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return {
          open: [...doc.querySelectorAll("details[open]")].map(
            (element) => element.id,
          ),
          fields: [...doc.querySelectorAll(".profile-field-value")].map(
            (element) => element.textContent!.trim(),
          ),
          h1: doc.querySelectorAll("h1").length,
          sectionHeadings: doc.querySelectorAll(
            ".profile-section > summary > h2",
          ).length,
          subheadings: doc.querySelectorAll(".profile-field > h3").length,
        };
      }, initialHTML);
      expect(initial.open).toEqual(["apresentacao", "classificacao", "agua"]);
      expect(initial.h1).toBe(1);
      expect(initial.sectionHeadings).toBe(11);
      const fields = source.sections.flatMap((section) => section.fields);
      expect(initial.subheadings).toBe(fields.length);
      expect(initial.fields.length).toBe(fields.length);
      for (const field of fields)
        expect(
          initial.fields.some((value) => value.startsWith(field.value)),
        ).toBe(true);
      await expect(page.locator("#referencias")).toBeVisible();
      expect(
        await page
          .locator("#referencias")
          .evaluate(
            (element) => element.closest("details:not([open])") === null,
          ),
      ).toBe(true);
      const closed = page.locator("#criacao");
      await expect(closed).not.toHaveAttribute("open");
      const summary = closed.locator("summary");
      await summary.focus();
      await expect(summary).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(closed).toHaveAttribute("open", "");
      await expect(closed.locator("h3").first()).toBeVisible();
      await page.keyboard.press("Space");
      await expect(closed).not.toHaveAttribute("open");
      await page.locator(".species-hero").scrollIntoViewIfNeeded();
      await expect(page.locator(".species-inquiry a")).toBeInViewport();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  } finally {
    await context.close();
  }
});

test("section navigation reveals and focuses closed scientific sections", async ({
  page,
}) => {
  await page.goto("/especies/peixe-agulhinha/");
  const section = page.locator("#reproducao");
  await expect(section).not.toHaveAttribute("open");
  await page
    .getByRole("navigation", { name: "Seções da ficha" })
    .getByRole("link", { name: "Reprodução", exact: true })
    .click();
  await expect(section).toHaveAttribute("open", "");
  await expect(section.locator("summary")).toBeFocused();
  await expect(section.locator("h3").first()).toBeVisible();
  await page.goto("/especies/barbus-cereja/#alimentacao");
  await expect(page.locator("#alimentacao")).toHaveAttribute("open", "");
});
