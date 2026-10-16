import { expect, test } from "@playwright/test";

test("renders the institutional content without overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(
    "Uberpeixes Ornamentais | Um universo para descobrir",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: /somos a Uberpeixes/ }),
  ).toBeVisible();
  await expect(
    page.getByText("Desenvolvido por Brendow Rodrigues", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Espaço reservado para fotografia", { exact: true }),
  ).toHaveCount(3);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const entrance = page.getByRole("img", {
    name: /Entrada da Uberpeixes Ornamentais/,
  });
  await expect(entrance).toBeVisible();
  await expect(entrance).toHaveAttribute("srcset", /375w/);
  const logos = page.getByRole("img", {
    name: "Uberpeixes — peixes ornamentais",
    exact: true,
  });
  await expect(logos).toHaveCount(2);
  for (const image of [entrance, ...(await logos.all())]) {
    await expect(image).toBeVisible();
    expect(
      await image.evaluate(
        (element: HTMLImageElement) =>
          element.complete && element.naturalWidth > 0,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("provides the supplied contact channels and official Google Maps profile", async ({
  page,
}) => {
  await page.goto("/");
  const whatsapp = page.getByRole("link", { name: "Fale com a gente" });
  await expect(whatsapp).toHaveAttribute("href", "https://wa.me/5534998910880");
  await expect(
    page.getByRole("link", { name: /ACOMPANHE Nosso Instagram/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/uberpeixesornamentais/");
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
    page.getByRole("heading", { name: /A próxima descoberta/ }),
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
