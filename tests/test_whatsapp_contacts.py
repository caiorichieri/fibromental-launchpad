import re
import unittest
from pathlib import Path


class WhatsAppContactsTest(unittest.TestCase):
    def test_site_whatsapp_contacts_use_requested_number(self):
        root = Path(__file__).resolve().parents[1]
        numbers = []
        for path in (root / "src").rglob("*.tsx"):
            source = path.read_text()
            numbers.extend(re.findall(r"wa\.me/(\d+)", source))
            numbers.extend(re.findall(r'WHATSAPP_NUMBER\s*=\s*"(\d+)"', source))
        self.assertGreater(len(numbers), 0)
        self.assertEqual(set(numbers), {"393313904736"})


if __name__ == "__main__":
    unittest.main()