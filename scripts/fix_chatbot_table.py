"""One-off fix: replace the malformed pseudo-table in the chatbot article with a proper markdown table."""
import re

PATH = "/home/z/my-project/blog_src/7-best-ai-chatbots-for-capturing-website-leads--2026-.md"
with open(PATH, "r", encoding="utf-8") as f:
    text = f.read()

***REMOVED*** Build the replacement
new_table = """***REMOVED******REMOVED******REMOVED*** Comparison overview

| Platform  | Best for              | Starting price      | Conditional branching | Native CRM write-back | Booking   | EU/UK data hosting     |
|-----------|-----------------------|---------------------|-----------------------|-----------------------|-----------|------------------------|
| Tidio     | SMB / e-commerce      | From $29/mo         | Paid tiers only       | Via middleware        | Limited   | EU hosting available   |
| Freshchat | Budget B2B            | From $19/mo         | Basic                 | CRM sync              | No        | Verify with vendor     |
| Chatbase  | Knowledge-heavy sites | From $32/mo         | Limited               | Via middleware        | No        | Verify with vendor     |
| HubSpot   | HubSpot CRM users     | Free (HubSpot plan) | Yes                   | Native                | Yes       | EU hosting available   |
| Landbot   | B2B flow design       | From $40/mo         | Yes (strong)          | Native HubSpot        | Calendly  | Verify with vendor     |
| Intercom  | Structured inbound    | From $39/seat/mo    | Yes                   | Native                | Yes       | EU hosting available   |
| Drift     | Enterprise pipeline   | ~$2,500/mo          | Yes (advanced)        | Salesforce / Marketo  | Yes       | Verify with vendor     |

*Prices are indicative and subject to change. Verify current pricing and features directly with each vendor before purchasing.*
"""

***REMOVED*** Replace from "***REMOVED******REMOVED******REMOVED*** Comparison overview" through the "*Prices are indicative*" line
pattern = re.compile(
    r"***REMOVED******REMOVED******REMOVED*** Comparison overview\n.*?\n\*Prices are indicative and subject to change\.[^\n]*\n",
    re.DOTALL,
)
new_text, n = pattern.subn(new_table, text)
if n != 1:
    raise SystemExit(f"Expected 1 replacement, made {n}")

with open(PATH, "w", encoding="utf-8") as f:
    f.write(new_text)
print(f"Replaced malformed table in {PATH} ({n} substitution)")
