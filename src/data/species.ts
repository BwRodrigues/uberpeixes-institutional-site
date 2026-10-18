import { profileSections, type Species } from "./species-schema";
const entries = import.meta.glob<{ default: Species }>("./species/*.json", {
  eager: true,
});
export const species: Species[] = Object.values(entries)
  .map((entry) => entry.default)
  .sort((a, b) => a.source.row - b.source.row);
export const categories = [
  ...new Set(species.map((animal) => animal.category)),
];
export const scientificLabel = (animal: Species) =>
  animal.scientificName ?? "Identificação científica pendente";
export const isPublishable = (animal: Species) =>
  animal.status === "reviewed" &&
  Boolean(
    animal.scientificName &&
    animal.photo &&
    animal.references.length &&
    profileSections.every((definition) => {
      const section = animal.sections.find((item) => item.id === definition.id);
      return Boolean(section && section.fields.length && !section.pending);
    }),
  );
export function validateSpeciesCatalog(records: Species[]): void {
  const slugs = new Set<string>();
  for (const animal of records) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(animal.slug) ||
      slugs.has(animal.slug)
    )
      throw new Error(`Invalid or duplicate species slug: ${animal.slug}`);
    slugs.add(animal.slug);
    const refs = new Set(animal.references.map((ref) => ref.id));
    for (const section of animal.sections)
      for (const field of section.fields) {
        if (
          !field.referenceIds.length ||
          field.referenceIds.some((id) => !refs.has(id))
        )
          throw new Error(
            `Missing scientific source: ${animal.slug}/${field.label}`,
          );
      }
    for (const ref of animal.references) {
      let valid = false;
      try {
        valid = new URL(ref.url).protocol === "https:";
      } catch {
        /* rejected below */
      }
      if (!valid || !/^\d{4}-\d{2}-\d{2}$/.test(ref.accessedAt))
        throw new Error(`Invalid reference: ${animal.slug}`);
    }
    if (animal.status === "reviewed" && !isPublishable(animal))
      throw new Error(`Reviewed species has unresolved data: ${animal.slug}`);
    const photos = animal.photo
      ? [animal.photo, ...animal.additionalPhotos]
      : animal.additionalPhotos;
    if (
      new Set(photos.map((photo) => photo.src)).size !== photos.length ||
      new Set(photos.map((photo) => photo.sourceUrl)).size !== photos.length
    )
      throw new Error(`Duplicate species photograph: ${animal.slug}`);
    for (const photo of photos) {
      if (
        !photo.author ||
        !photo.license ||
        !photo.licenseUrl ||
        !photo.sourceUrl ||
        !photo.alt ||
        !photo.changes ||
        photo.width <= 0 ||
        photo.height <= 0
      )
        throw new Error(`Missing photo metadata: ${animal.slug}`);
      for (const url of [photo.sourceUrl, photo.licenseUrl])
        if (new URL(url).protocol !== "https:")
          throw new Error(`Invalid photograph credit URL: ${animal.slug}`);
    }
  }
  for (const animal of records)
    for (const related of animal.relatedSlugs)
      if (related === animal.slug || !slugs.has(related))
        throw new Error(`Invalid related species: ${animal.slug}`);
}
validateSpeciesCatalog(species);
