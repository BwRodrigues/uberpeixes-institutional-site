import { readdirSync, readFileSync } from "node:fs";
import type { Species } from "../../src/data/species-schema";
const directory = new URL("../../src/data/species/", import.meta.url);
export const catalogRecords: Species[] = readdirSync(directory)
  .filter((name) => name.endsWith(".json"))
  .map((name) => JSON.parse(readFileSync(new URL(name, directory), "utf8")));
