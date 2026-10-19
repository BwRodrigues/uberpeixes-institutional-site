/** Build-time policy. Cloudflare's branch wins over shared environment overrides. */
export function isProductionDeployment(
  environment: Record<string, string | undefined> = process.env,
): boolean {
  if (environment.CF_PAGES === "1")
    return environment.CF_PAGES_BRANCH === "main";
  return environment.SITE_DEPLOYMENT === "production";
}
export const productionIndexingEnabled = isProductionDeployment();
export function robotsDirective(draft = true): string {
  if (!productionIndexingEnabled) return "noindex, nofollow";
  return draft ? "noindex, follow" : "index, follow";
}
