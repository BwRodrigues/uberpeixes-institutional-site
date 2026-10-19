"""Regression tests: incomplete research must never publish an unfinished profile."""
import copy
import importlib.util
import json
import unittest
from pathlib import Path
spec = importlib.util.spec_from_file_location('prepare_batch', Path(__file__).with_name('prepare_batch.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class EditorialBatchTests(unittest.TestCase):
    def setUp(self):
        root = Path(__file__).resolve().parents[2]
        animal = json.loads((root/'src/data/species/011-pethia-gelius.json').read_text())
        self.research = {'editorial': {k: animal[k] for k in ['description','sections','essentials']}}

    def test_missing_editorial_is_skipped_without_stopping_other_records(self):
        queue = [{}, self.research]
        eligible = [record for record in queue if module.reviewed_editorial(record)]
        self.assertEqual(len(eligible), 1)
        self.assertIs(eligible[0], self.research)

    def test_missing_care_fact_and_reordered_sections_are_rejected(self):
        missing = copy.deepcopy(self.research)
        missing['editorial']['essentials'].pop()
        self.assertIsNone(module.reviewed_editorial(missing))
        wrong_order = copy.deepcopy(self.research)
        wrong_order['editorial']['sections'].reverse()
        self.assertIsNone(module.reviewed_editorial(wrong_order))
        contradiction = copy.deepcopy(self.research)
        contradiction['editorial']['essentials'][0]['value'] = '99 °C'
        self.assertIsNone(module.reviewed_editorial(contradiction))

    def test_unverifiable_source_does_not_become_a_public_field(self):
        invalid = copy.deepcopy(self.research)
        invalid['editorial']['sections'][0]['fields'][0]['referenceIds'] = ['made-up-reference']
        self.assertIsNone(module.reviewed_editorial(invalid))

if __name__ == '__main__':unittest.main()
