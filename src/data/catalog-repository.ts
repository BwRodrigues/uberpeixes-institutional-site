import type {
  Species,
  Reference,
  CompatibilityAssessment,
  GeographicRegion,
} from "./species-schema";
import { validateSpeciesCatalog } from "./species-validation";

export interface Recommendation {
  animal: Species;
  kind: "compatible" | "same-region";
  label: "Convivência compatível" | "Mesma região";
  region?: GeographicRegion;
  conditions?: string;
  evidence: Reference[];
}
/** Data-provider boundary: JSON today; validated database records can use the same contract. */
export interface CatalogRepository {
  list(): Species[];
  findBySlug(slug: string): Species | undefined;
  recommendations(slug: string, limit?: number): Recommendation[];
}
const specificity = { continent: 0, subregion: 1, country: 2, basin: 3 };
const key = (pair: string[]) => [...pair].sort().join("|");
export function createCatalogRepository(
  records: Species[],
  assessments: CompatibilityAssessment[] = [],
): CatalogRepository {
  validateSpeciesCatalog(records);
  const animals = [...records].sort(
    (a, b) =>
      (a.sortOrder ?? a.source?.row ?? Number.MAX_SAFE_INTEGER) -
        (b.sortOrder ?? b.source?.row ?? Number.MAX_SAFE_INTEGER) ||
      a.slug.localeCompare(b.slug),
  );
  const orderIndex = new Map(
    animals.map((animal, index) => [animal.slug, index]),
  );
  const bySlug = new Map(animals.map((animal) => [animal.slug, animal]));
  const regions = new Map<string, GeographicRegion>();
  for (const animal of animals) {
    if (!Array.isArray(animal.regions))
      throw new Error(`Missing sourced regions: ${animal.slug}`);
    const refs = new Set(animal.references.map((ref) => ref.id));
    const seen = new Set<string>();
    for (const region of animal.regions) {
      if (
        !region.id ||
        !region.label ||
        !Object.hasOwn(specificity, region.scale) ||
        seen.has(region.id) ||
        !region.referenceIds.length ||
        region.referenceIds.some((id) => !refs.has(id))
      )
        throw new Error(`Invalid sourced region: ${animal.slug}`);
      const previous = regions.get(region.id);
      if (
        previous &&
        (previous.label !== region.label || previous.scale !== region.scale)
      )
        throw new Error(`Inconsistent region identity: ${region.id}`);
      seen.add(region.id);
      regions.set(region.id, region);
    }
  }
  const pairs = new Map<string, CompatibilityAssessment>();
  for (const assessment of assessments) {
    if (
      assessment.species.length !== 2 ||
      assessment.species[0] === assessment.species[1] ||
      assessment.species.some((slug) => !bySlug.has(slug)) ||
      pairs.has(key(assessment.species)) ||
      !["draft", "reviewed"].includes(assessment.status)
    )
      throw new Error("Invalid compatibility pair");
    if (assessment.status === "reviewed") {
      if (
        ![
          assessment.waterParameters,
          assessment.behavior,
          assessment.adultSizeAndSpace,
          assessment.conditions,
        ].every((value) => value.trim()) ||
        !assessment.references.length
      )
        throw new Error(
          "Reviewed compatibility needs water, behavior, size/space, conditions and sources",
        );
      for (const ref of assessment.references)
        if (
          new URL(ref.url).protocol !== "https:" ||
          !ref.title ||
          !ref.author ||
          !/^\d{4}-\d{2}-\d{2}$/.test(ref.accessedAt)
        )
          throw new Error("Invalid compatibility evidence");
    }
    pairs.set(key(assessment.species), assessment);
  }
  return {
    list: () => [...animals],
    findBySlug: (slug) => bySlug.get(slug),
    recommendations(slug, limit = 3) {
      const current = bySlug.get(slug);
      if (!current) return [];
      const candidates: Recommendation[] = [];
      for (const other of animals) {
        if (other.slug === slug || !other.photo || !other.scientificName)
          continue;
        const assessment = pairs.get(key([slug, other.slug]));
        if (assessment?.status === "reviewed") {
          candidates.push({
            animal: other,
            kind: "compatible",
            label: "Convivência compatível",
            conditions: assessment.conditions,
            evidence: assessment.references,
          });
          continue;
        }
        const shared = current.regions
          .filter((region) =>
            other.regions.some((item) => item.id === region.id),
          )
          .sort(
            (a, b) =>
              specificity[b.scale] - specificity[a.scale] ||
              a.id.localeCompare(b.id),
          )[0];
        if (!shared) continue;
        const otherRegion = other.regions.find(
          (item) => item.id === shared.id,
        )!;
        const evidence = [
          ...current.references.filter((ref) =>
            shared.referenceIds.includes(ref.id),
          ),
          ...other.references.filter((ref) =>
            otherRegion.referenceIds.includes(ref.id),
          ),
        ];
        candidates.push({
          animal: other,
          kind: "same-region",
          label: "Mesma região",
          region: shared,
          evidence: [
            ...new Map(evidence.map((ref) => [ref.url, ref])).values(),
          ],
        });
      }
      const originIndex = orderIndex.get(slug)!;
      const distance = (animal: Species) =>
        (orderIndex.get(animal.slug)! - originIndex + animals.length) %
        animals.length;
      return candidates
        .sort(
          (a, b) =>
            Number(b.kind === "compatible") - Number(a.kind === "compatible") ||
            (b.region ? specificity[b.region.scale] : 0) -
              (a.region ? specificity[a.region.scale] : 0) ||
            distance(a.animal) - distance(b.animal) ||
            a.animal.slug.localeCompare(b.animal.slug),
        )
        .slice(0, Math.max(0, limit));
    },
  };
}
