import { expect, test } from "@playwright/test";

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
  await expect(page.locator("[data-species-card]")).toHaveCount(5);
  await expect(
    page.getByText("Protótipo em validação", { exact: true }),
  ).toHaveCount(process.env.CATALOG_PREVIEW === "true" ? 1 : 0);
  for (const entry of pilot)
    await expect(page.locator("[data-species-card]")).toContainText([
      entry.name,
    ]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
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
    titles.add(await page.title());
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
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
