import { expect, test } from "@playwright/test";

test("renders the institutional content without overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(
    "Uberpeixes Ornamentais | Um universo para descobrir",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      name: /Mais que uma loja, uma paixão pelo aquarismo/,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Desenvolvido por Brendow Rodrigues", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Seu mundo mais colorido começa aqui!",
  );
  await expect(page.locator(".gallery-card")).toHaveCount(4);
  for (const image of await page.locator(".gallery-card img").all())
    await expect(image).toHaveAttribute("loading", "lazy");
  await expect(page.locator(".hero-visual img")).toHaveAttribute(
    "src",
    /logo-oficial/,
  );
  const logos = page.getByRole("img", {
    name: "Uberpeixes — peixes ornamentais",
    exact: true,
  });
  await expect(logos).toHaveCount(2);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator('img[src*="produto-areia-duna"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("provides the supplied contact channels and official Google Maps profile", async ({
  page,
}) => {
  await page.goto("/");
  const whatsapp = page.getByRole("link", { name: "Fale com nossa equipe" });
  await expect(whatsapp).toHaveAttribute("href", "https://wa.me/5534998910880");
  await expect(
    page.getByRole("link", { name: /ACOMPANHE Nosso Instagram/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/uberpeixesornamentais/");
  await expect(
    page.getByRole("link", { name: "Como chegar", exact: true }),
  ).toHaveAttribute("href", "https://maps.app.goo.gl/zRgtCTnjvL8xZGiH7");
  for (const label of [
    /LOCALIZAÇÃO Encontre a Uberpeixes/,
    /AVALIAÇÕES REAIS O que dizem no Google/,
  ]) {
    await expect(page.getByRole("link", { name: label })).toHaveAttribute(
      "href",
      "https://maps.app.goo.gl/zRgtCTnjvL8xZGiH7",
    );
  }
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Visite" })
    .click();
  await expect(page).toHaveURL(/#visite$/);
  await expect(
    page.getByRole("heading", { name: /Venha conhecer esse mundo de perto/ }),
  ).toBeInViewport();
});

test("supports keyboard access to main content and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#conteudo$/);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("serves official PNG icons and manifest without the previous SVG", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute(
    "href",
    "/icons/official-v2/icon-32.png",
  );
  await expect(page.locator('link[href="/favicon.svg"]')).toHaveCount(0);
  for (const size of [32, 180, 192, 512]) {
    const response = await page.request.get(
      `/icons/official-v2/icon-${size}.png`,
    );
    expect(response.status()).toBe(200);
    const bytes = await response.body();
    expect(bytes.readUInt32BE(16)).toBe(size);
    expect(bytes.readUInt32BE(20)).toBe(size);
  }
  const response = await page.request.get("/site.webmanifest");
  expect(response.status()).toBe(200);
  const manifest = await response.json();
  expect(manifest.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual([
    "192x192",
    "512x512",
  ]);
});
