import { profileSections, essentialKeys, type Species } from "./species-schema";
export const scientificLabel = (animal: Species) =>
  animal.scientificName ?? "Identificação científica pendente";
export const isPublishable = (animal: Species) =>
  animal.status === "reviewed" &&
  Boolean(
    animal.scientificName &&
    animal.name.trim() &&
    animal.description.trim() &&
    animal.photo &&
    animal.additionalPhotos.length === 2 &&
    animal.essentials.length === essentialKeys.length &&
    animal.references.length >= 2 &&
    profileSections.every((definition) => {
      const section = animal.sections.find((item) => item.id === definition.id);
      return Boolean(
        section &&
        section.fields.length &&
        !section.pending &&
        section.fields.every(
          (field) => field.value.trim() && field.referenceIds.length,
        ),
      );
    }),
  );
export function validateSpeciesCatalog(records: Species[]): void {
  const slugs = new Set<string>();
  const scientificNames = new Set<string>();
  const photoSources = new Set<string>();
  for (const animal of records) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(animal.slug) ||
      slugs.has(animal.slug)
    )
      throw new Error(`Invalid or duplicate species slug: ${animal.slug}`);
    slugs.add(animal.slug);
    if (animal.scientificName) {
      const identity = animal.scientificName
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
      if (scientificNames.has(identity))
        throw new Error(
          `Duplicate scientific species: ${animal.scientificName}`,
        );
      scientificNames.add(identity);
    }
    const refs = new Set(animal.references.map((ref) => ref.id));
    if (
      animal.sections.map((section) => section.id).join(",") !==
      profileSections.map((section) => section.id).join(",")
    )
      throw new Error(`Invalid profile section order: ${animal.slug}`);
    if (
      !animal.essentials ||
      animal.essentials.map((fact) => fact.key).join(",") !==
        essentialKeys.join(",")
    )
      throw new Error(`Invalid essential care summary: ${animal.slug}`);
    const summaryFields = {
      temperature: ["agua", "Temperatura em aquário"],
      ph: ["agua", "pH em aquário"],
      gh: ["agua", "GH"],
      size: ["caracteristicas", "Tamanho adulto"],
      volume: ["criacao", "Volume mínimo e contexto"],
      behavior: ["comportamento", "Temperamento"],
      sociability: ["comportamento", "Sociabilidade"],
      diet: ["alimentacao", "Dieta em aquário"],
      difficulty: ["criacao", "Dificuldade"],
    } as const;
    for (const fact of animal.essentials) {
      const [sectionId, label] = summaryFields[fact.key];
      const field = animal.sections
        .find((section) => section.id === sectionId)
        ?.fields.find((item) => item.label === label);
      if (
        !fact.value.trim() ||
        !fact.referenceIds.length ||
        fact.referenceIds.some((id) => !refs.has(id)) ||
        !field ||
        fact.referenceIds.some((id) => !field.referenceIds.includes(id))
      )
        throw new Error(
          `Missing source or profile field for care summary: ${animal.slug}/${fact.key}`,
        );
      if (
        fact.key === "volume"
          ? !field.value.startsWith(fact.value)
          : fact.key !== "diet" && field.value !== fact.value
      )
        throw new Error(
          `Care summary conflicts with profile: ${animal.slug}/${fact.key}`,
        );
    }

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
      if (photoSources.has(photo.sourceUrl))
        throw new Error(`Photograph reused across species: ${photo.sourceUrl}`);
      photoSources.add(photo.sourceUrl);
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
}
