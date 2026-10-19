import type { APIRoute } from "astro";
import { productionIndexingEnabled } from "../config/indexing";
import { species, isPublishable } from "../data/species";
export const GET: APIRoute = () => {
  const blocks = [
    // Also protects versioned/branch aliases of a production build.
    "https://:preview.uberpeixes-institutional-site.pages.dev/*\n  X-Robots-Tag: noindex, nofollow",
    "/dados/catalogo-especies.json\n  X-Robots-Tag: noindex",
    ...["/tests/*", "/testes/*", "/preview/*", "/404.html"].map(
      (path) => `${path}\n  X-Robots-Tag: noindex, nofollow`,
    ),
  ];
  if (!productionIndexingEnabled)
    blocks.push("/*\n  X-Robots-Tag: noindex, nofollow");
  else
    for (const animal of species.filter((animal) => !isPublishable(animal)))
      for (const suffix of ["", "/"])
        blocks.push(
          `/especies/${animal.slug}${suffix}\n  X-Robots-Tag: noindex, follow`,
        );
  return new Response(blocks.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
