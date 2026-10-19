import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config/site.ts";
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  integrations: [
    {
      name: "indexing-headers",
      hooks: {
        "astro:config:setup": ({ injectRoute }) => {
          injectRoute({
            pattern: "/_headers",
            entrypoint: "./src/endpoints/headers.ts",
          });
        },
      },
    },
  ],
});
