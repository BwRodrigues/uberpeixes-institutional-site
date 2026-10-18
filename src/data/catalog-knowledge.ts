import type { CatalogRepository } from "./catalog-repository";
import { canonicalUrl } from "../config/site";
/** Public, versioned knowledge contract; excludes spreadsheet and commercial fields. */
export function buildCatalogKnowledge(repository: CatalogRepository) {
  return {
    schemaVersion: 1,
    dataSource: "curated-catalog",
    items: repository.list().map((animal) => ({
      id: animal.slug,
      name: animal.name,
      scientificName: animal.scientificName,
      category: animal.category,
      description: animal.description,
      identificationNote: animal.identificationNote,
      reviewStatus: animal.status,
      url: canonicalUrl(`/especies/${animal.slug}/`),
      photos: [animal.photo, ...animal.additionalPhotos].filter(Boolean),
      regions: animal.regions,
      sections: animal.sections,
      references: animal.references,
      recommendations: repository.recommendations(animal.slug).map((item) => ({
        id: item.animal.slug,
        url: canonicalUrl(`/especies/${item.animal.slug}/`),
        kind: item.kind,
        label: item.label,
        region: item.region,
        conditions: item.conditions,
        evidence: item.evidence,
      })),
    })),
  };
}
