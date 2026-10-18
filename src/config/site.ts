export const SITE_URL = "https://uberpeixes-institutional-site.pages.dev";
// Existing official contact, retained from the institutional homepage.
export const WHATSAPP_NUMBER = "5534998910880";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const canonicalUrl = (path: string) => new URL(path, SITE_URL).href;
export function speciesInquiry(name: string, scientificName: string | null) {
  const url = new URL(WHATSAPP_URL);
  url.searchParams.set(
    "text",
    `Olá! Estava conhecendo a espécie ${name} (${scientificName ?? "identificação científica pendente"}) no site da Uberpeixes e gostaria de consultar o valor e a disponibilidade.`,
  );
  return url.href;
}
