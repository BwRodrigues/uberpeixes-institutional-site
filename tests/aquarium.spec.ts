import { expect, test } from "@playwright/test";

test("decorative aquarium loads locally, stays behind content and allows pausing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const layer = page.locator("[data-aquarium]");
  await expect(layer).toHaveAttribute("aria-hidden", "true");
  await expect(layer).toHaveAttribute("inert", "");
  await expect(layer).toHaveAttribute("data-motion", "running");
  expect(
    await layer.evaluate((element) => getComputedStyle(element).pointerEvents),
  ).toBe("none");
  expect(
    await layer.evaluate((element) => getComputedStyle(element).position),
  ).toBe("fixed");
  const visibleFish = page.locator(".aquarium-fish:visible");
  const expectedCount = page.viewportSize()!.width < 700 ? 4 : 10;
  await expect(visibleFish).toHaveCount(expectedCount);
  const scene = layer.locator(".aquarium-scene");
  await expect
    .poll(() =>
      scene.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  const actualScene = await scene.evaluate(
    (image: HTMLImageElement) => image.currentSrc,
  );
  expect(
    actualScene.endsWith(
      expectedCount === 4
        ? "planted-freshwater-scene-mobile.webp"
        : "planted-freshwater-scene.webp",
    ),
  ).toBe(true);
  const first = visibleFish.first();
  const start = await first.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await expect
    .poll(() =>
      first.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(start);

  // No external image service or generated stand-in URL is needed at runtime.
  const sources = await layer
    .locator("img")
    .evaluateAll((images) => [
      ...new Set(images.map((image) => image.getAttribute("src")!)),
    ]);
  for (const source of sources) {
    expect(source.startsWith("/aquarium/")).toBe(true);
    const response = await page.request.get(source);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
  }
  const topBefore = await layer.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  const toggle = page.locator("[data-aquarium-toggle]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(layer).toHaveAttribute("data-motion", "paused");
  expect(
    await layer.evaluate((element) => element.getBoundingClientRect().top),
  ).toBe(topBefore);
  expect(
    await layer.evaluate((element) =>
      element
        .getAnimations({ subtree: true })
        .every((animation) => animation.playState === "paused"),
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Retomar movimento do aquário" })
    .click();
  await expect(layer).toHaveAttribute("data-motion", "running");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("reduced motion leaves the aquarium static and preserves page interaction", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const layer = page.locator("[data-aquarium]");
  await expect(layer).toHaveAttribute("data-motion", "paused");
  expect(
    await layer.evaluate(
      (element) => element.getAnimations({ subtree: true }).length,
    ),
  ).toBe(0);
  await expect(page.locator("[data-aquarium-toggle]")).toBeHidden();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Visite" })
    .click();
  await expect(page).toHaveURL(/#visite$/);
  await expect(
    page.getByRole("link", { name: "Como chegar", exact: true }),
  ).toHaveAttribute("href", "https://maps.app.goo.gl/zRgtCTnjvL8xZGiH7");
});

test("without JavaScript the page remains usable with a static background", async ({
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
    await page.goto(baseURL!);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Seu mundo mais colorido começa aqui!",
    );
    await expect(page.locator("[data-aquarium]")).toHaveAttribute(
      "data-motion",
      "paused",
    );
    await expect(page.locator("[data-aquarium-toggle]")).toBeHidden();
    await expect(
      page.getByRole("link", { name: "Fale com nossa equipe" }),
    ).toHaveAttribute("href", "https://wa.me/5534998910880");
  } finally {
    await context.close();
  }
});
