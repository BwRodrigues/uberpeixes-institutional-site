import type { APIRoute } from "astro";
import { catalog } from "../../data/species";
import { buildCatalogKnowledge } from "../../data/catalog-knowledge";
export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildCatalogKnowledge(catalog)), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
