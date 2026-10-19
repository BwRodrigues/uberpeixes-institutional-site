export interface Reference {
  id: string;
  title: string;
  url: string;
  author?: string;
  year?: string;
  accessedAt: string;
}
export interface LicensedPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  changes: string;
  note?: string;
}
export const profileSections = [
  { id: "apresentacao", title: "Apresentação" },
  { id: "agua", title: "Habitat e parâmetros da água" },
  { id: "caracteristicas", title: "Descrição e características" },
  { id: "criacao", title: "Criação em aquário" },
  { id: "comportamento", title: "Comportamento e compatibilidade" },
  { id: "alimentacao", title: "Alimentação" },
  { id: "reproducao", title: "Reprodução" },
  { id: "saude", title: "Saúde e cuidados" },
  { id: "origem", title: "Origem e distribuição" },
  { id: "classificacao", title: "Classificação científica" },
  { id: "curiosidades", title: "Curiosidades" },
] as const;
export type SectionId = (typeof profileSections)[number]["id"];
export interface ProfileField {
  label: string;
  value: string;
  referenceIds: string[];
}
export interface ProfileSection {
  id: SectionId;
  fields: ProfileField[];
  pending?: string;
}
export const essentialKeys = [
  "temperature",
  "ph",
  "gh",
  "size",
  "volume",
  "behavior",
  "sociability",
  "diet",
  "difficulty",
] as const;
export interface EssentialFact {
  key: (typeof essentialKeys)[number];
  value: string;
  referenceIds: string[];
}
export interface Species {
  essentials: EssentialFact[];
  slug: string;
  name: string;
  commercialName: string;
  category: string;
  source?: { workbook: string; sheet: string; row: number; niche: string };
  sortOrder?: number;
  scientificName: string | null;
  identificationNote: string;
  description: string;
  photo: LicensedPhoto | null;
  additionalPhotos: LicensedPhoto[];
  sections: ProfileSection[];
  references: Reference[];
  regions: GeographicRegion[];
  status: "draft" | "reviewed";
}

export interface GeographicRegion {
  id: string;
  label: string;
  scale: "continent" | "subregion" | "country" | "basin";
  referenceIds: string[];
}
export interface CompatibilityAssessment {
  species: [string, string];
  status: "draft" | "reviewed";
  waterParameters: string;
  behavior: string;
  adultSizeAndSpace: string;
  conditions: string;
  references: Reference[];
}
