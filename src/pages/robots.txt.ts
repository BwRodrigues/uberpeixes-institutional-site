import type { APIRoute } from "astro";
import { productionIndexingEnabled } from "../config/indexing";
import { canonicalUrl } from "../config/site";
export const GET: APIRoute = () =>
  new Response(
    productionIndexingEnabled
      ? `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl("/sitemap.xml")}\n`
      : "# Preview/test: allow crawlers to read the noindex directives.\nUser-agent: *\nAllow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
