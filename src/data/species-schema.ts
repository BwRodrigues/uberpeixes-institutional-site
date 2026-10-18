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
  {
    id: "apresentacao",
    title: "Apresentação",
    fields: [
      "Outros nomes populares",
      "Identificação científica",
      "Introdução",
    ],
  },
  {
    id: "classificacao",
    title: "Classificação científica",
    fields: [
      "Reino",
      "Filo",
      "Classe",
      "Ordem",
      "Família",
      "Gênero",
      "Espécie",
      "Autoridade taxonômica",
      "Sinônimos científicos",
    ],
  },
  {
    id: "origem",
    title: "Origem e distribuição",
    fields: [
      "Continente e países",
      "Distribuição geográfica",
      "Bacia hidrográfica",
      "Ambiente natural",
      "Nativa, exótica ou linhagem ornamental",
    ],
  },
  {
    id: "caracteristicas",
    title: "Descrição e características",
    fields: [
      "Características físicas",
      "Coloração",
      "Tamanho adulto",
      "Expectativa de vida",
      "Diferenças entre machos e fêmeas",
    ],
  },
  {
    id: "agua",
    title: "Habitat e parâmetros da água",
    fields: [
      "Temperatura em aquário",
      "pH em aquário",
      "GH",
      "KH",
      "Registros na natureza",
      "Tipo de ambiente",
      "Substrato e decoração",
      "Vegetação e esconderijos",
      "Circulação e oxigenação",
    ],
  },
  {
    id: "criacao",
    title: "Criação em aquário",
    fields: [
      "Volume mínimo e contexto",
      "Dimensões do aquário",
      "Dificuldade",
      "Área de natação",
      "Territorialidade",
      "Quantidade de indivíduos",
      "Manutenção específica",
      "Orientações para iniciantes",
    ],
  },
  {
    id: "alimentacao",
    title: "Alimentação",
    fields: [
      "Classificação alimentar",
      "Alimentos adequados",
      "Frequência justificada",
      "Variedade alimentar",
      "Cuidados com excesso de alimento",
    ],
  },
  {
    id: "comportamento",
    title: "Comportamento e compatibilidade",
    fields: [
      "Temperamento",
      "Comportamento social",
      "Compatibilidade",
      "Conflitos",
      "Peixes menores, invertebrados e plantas",
    ],
  },
  {
    id: "reproducao",
    title: "Reprodução",
    fields: [
      "Tipo de reprodução",
      "Dimorfismo sexual",
      "Comportamento reprodutivo",
      "Ovos e filhotes",
      "Dificuldade em cativeiro",
    ],
  },
  {
    id: "saude",
    title: "Saúde e cuidados",
    fields: [
      "Sensibilidade a alterações",
      "Problemas de manutenção",
      "Prevenção",
      "Sinais de estresse",
    ],
  },
  {
    id: "curiosidades",
    title: "Curiosidades",
    fields: ["Curiosidades verificadas da espécie"],
  },
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
export interface Species {
  slug: string;
  name: string;
  commercialName: string;
  category: string;
  source: { workbook: string; sheet: string; row: number; niche: string };
  scientificName: string | null;
  identificationNote: string;
  description: string;
  photo: LicensedPhoto | null;
  additionalPhotos: LicensedPhoto[];
  sections: ProfileSection[];
  references: Reference[];
  relatedSlugs: string[];
  status: "draft" | "reviewed";
}
