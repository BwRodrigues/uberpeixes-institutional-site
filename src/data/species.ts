import type { Species, CompatibilityAssessment } from "./species-schema";
import { createCatalogRepository } from "./catalog-repository";
import assessments from "./compatibility.json";
const entries = import.meta.glob<{ default: Species }>("./species/*.json", {
  eager: true,
});
export const catalog = createCatalogRepository(
  Object.values(entries).map((entry) => entry.default),
  assessments as CompatibilityAssessment[],
);
export const species = catalog.list();
export const categories = [
  ...new Set(species.map((animal) => animal.category)),
];
export {
  scientificLabel,
  isPublishable,
  validateSpeciesCatalog,
} from "./species-validation";
