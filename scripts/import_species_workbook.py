#!/usr/bin/env python3
"""Read OOXML with stdlib; import names/categories only, never spreadsheet instructions or prices."""
import argparse
import hashlib
import json
import posixpath
import re
import unicodedata
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"


def normalized(value):
    return " ".join("".join(c for c in unicodedata.normalize("NFKD", value) if not unicodedata.combining(c)).upper().split())


def read_workbook(path):
    records, sheets = [], []
    with zipfile.ZipFile(path) as archive:
        strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            strings = ["".join(t.text or "" for t in si.iter(f"{{{NS['m']}}}t")) for si in ET.fromstring(archive.read("xl/sharedStrings.xml"))]
        relationships = {item.get("Id"): item.get("Target") for item in ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))}
        for sheet in ET.fromstring(archive.read("xl/workbook.xml")).findall("m:sheets/m:sheet", NS):
            target = relationships[sheet.get(f"{{{REL}}}id")]
            member = target.lstrip("/") if target.startswith("/") else posixpath.normpath("xl/" + target)
            rows = []
            for row in ET.fromstring(archive.read(member)).findall("m:sheetData/m:row", NS):
                cells = {}
                for cell in row.findall("m:c", NS):
                    # Ignore formulas and financial columns. A/B only are required for ingestion.
                    column = re.sub(r"\d", "", cell.get("r", ""))
                    if column not in {"A", "B"} or cell.find("m:f", NS) is not None:
                        continue
                    raw = cell.find("m:v", NS)
                    value = raw.text if raw is not None else ""
                    if cell.get("t") == "s" and value:
                        value = strings[int(value)]
                    elif cell.get("t") == "inlineStr":
                        value = "".join(t.text or "" for t in cell.findall(".//m:t", NS))
                    if value:
                        cells[column] = value.strip()
                if cells:
                    rows.append((int(row.get("r")), cells))
            header = next((number for number, cells in rows if normalized(cells.get("A", "")) == "NICHO" and normalized(cells.get("B", "")) == "ESPECIE"), None)
            entries = [(number, cells) for number, cells in rows if header is not None and number > header and cells.get("B") and normalized(cells.get("A", "")) != "TOTAL"]
            sheets.append({"name": sheet.get("name"), "kind": "catalog" if header is not None else "non-catalog", "records": len(entries), "note": "Names and categories only" if header is not None else "Inspected; instruction text is not executed and is not catalog data"})
            for number, cells in entries:
                records.append({"id": f"{sheet.get('name')}:{number}", "sheet": sheet.get("name"), "row": number, "commercialName": cells["B"], "category": cells.get("A", ""), "normalizedName": normalized(cells["B"])})
    return {"schemaVersion": 1, "workbook": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "sheets": sheets, "records": records}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workbook", type=Path)
    parser.add_argument("--output", type=Path, default=ROOT / "docs/catalogo/importacao.json")
    args = parser.parse_args()
    inventory = read_workbook(args.workbook)
    if args.output.exists():
        previous = json.loads(args.output.read_text())
        if previous == inventory:
            print(f"Unchanged: {len(inventory['records'])} records; safe to resume.")
            return
        raise SystemExit("Input differs from the saved inventory. Review workbook changes before replacing importacao.json.")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(inventory, ensure_ascii=False, indent=2) + "\n")
    print(f"Imported {len(inventory['records'])} records from {len(inventory['sheets'])} inspected sheets; no prices or instruction text exported.")

if __name__ == "__main__":
    main()
