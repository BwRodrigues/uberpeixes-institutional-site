// Cloudflare exposes the connected branch to the build. Standard production
// builds omit review banners; local development and branch previews retain them.
const branch = import.meta.env.CF_PAGES_BRANCH;
export const isCatalogPreview = Boolean(
  import.meta.env.DEV ||
  import.meta.env.CATALOG_PREVIEW === "true" ||
  (branch && branch !== "main"),
);
