import type { APIRoute } from "astro";
import { canonicalUrl } from "../config/site";
import { species, isPublishable } from "../data/species";
export const GET: APIRoute = () => {
  // Do not submit unreviewed/noindex scientific profiles to search engines.
  const reviewed = species.filter(isPublishable);
  const paths = [
    "/",
    ...(reviewed.length
      ? ["/especies/", ...reviewed.map((animal) => `/especies/${animal.slug}/`)]
      : []),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${canonicalUrl(path)}</loc></url>`).join("")}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
