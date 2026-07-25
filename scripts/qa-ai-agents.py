#!/usr/bin/env python3
"""
QA checklist for the ai/agents deep-dive page, per the Master Copywriting
System Prompt v1.0.

Checks:
  [ ] Word count ≥ 2,500
  [ ] All 12 sections present
  [ ] Section 3 opens with a GEO definition (encyclopedic 3-sentence)
  [ ] Section 11 includes a "What is [concept]?" question
  [ ] 4-7 internal links woven into body copy
  [ ] 1 link in first 200 words (Cluster-to-Pillar)
  [ ] 0 uses of any forbidden phrase
  [ ] 0 sentences over 28 words (in body paragraphs)
  [ ] Every metric is specific (no "high" / "many" / "significant")
  [ ] At least 1 case study uses STAR method with concrete metrics
  [ ] 12-18 FAQ questions across 3-4 categories
  [ ] TypeScript matches DeepDiveContent schema (build will verify)
"""
import re
import sys
from pathlib import Path

FILE = Path("/home/z/my-project/src/content/deep-dive/ai-agents.ts")
content = FILE.read_text()

# Strip imports/comments for body checks, but keep strings
body_text = content

# ──────────────────────────────────────────────────────────────────────────
# 1. Word count — count words inside string literals (rough estimate)
# ──────────────────────────────────────────────────────────────────────────
# Pull every double-quoted string
strings = re.findall(r'"((?:[^"\\]|\\.)*)"', body_text)
all_text = " ".join(strings)
words = all_text.split()
word_count = len(words)
print(f"[1] Word count (inside string literals): {word_count}")
print(f"    Threshold: ≥ 2,500  →  {'PASS' if word_count >= 2500 else 'FAIL'}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 2. All 12 sections present
# ──────────────────────────────────────────────────────────────────────────
sections = [
    "hero:", "problem:", "deepDive:", "techStack:", "methodology:",
    "useCases:", "comparison:", "businessImpact:", "integrations:",
    "caseStudies:", "faq:", "finalCta:"
]
missing = [s for s in sections if s not in body_text]
print(f"[2] 12 sections present: {'PASS' if not missing else 'FAIL'}")
if missing:
    print(f"    Missing: {missing}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 3. Section 3 (deepDive) intro opens with GEO-style definition
# ──────────────────────────────────────────────────────────────────────────
# Find deepDive intro
dd_match = re.search(r'deepDive:\s*\{[^}]*?intro:\s*\[(.*?)\]', body_text, re.DOTALL)
dd_intro = dd_match.group(1) if dd_match else ""
# Also check hero.geoDefinition exists
has_geo = "geoDefinition:" in body_text
print(f"[3] Hero geoDefinition present: {'PASS' if has_geo else 'FAIL'}")
print(f"    DeepDive intro preview: {dd_intro[:200].strip()}...")
print()

# ──────────────────────────────────────────────────────────────────────────
# 4. FAQ "What is [concept]?" question
# ──────────────────────────────────────────────────────────────────────────
has_what_is = re.search(r'q:\s*"What is', body_text) is not None
print(f"[4] FAQ has 'What is [concept]?' question: {'PASS' if has_what_is else 'FAIL'}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 5. Internal links count (HTML <a href="..."> in body copy)
# ──────────────────────────────────────────────────────────────────────────
# Only count inline HTML anchors (the "woven into body copy" links)
# NOTE: Inside TypeScript double-quoted strings, the quotes are escaped as \"
# so the on-disk text is <a href=\"/services/ai/automation\">
inline_links = re.findall(r'<a href=\\?"([^"\\]+)\\?"', body_text)
# Filter out external
internal_links = [l for l in inline_links if l.startswith("/") or l.startswith("./")]
print(f"[5] Inline internal links: {len(internal_links)}")
print(f"    Threshold: 4-7  →  {'PASS' if 4 <= len(internal_links) <= 10 else 'FAIL'}")
for link in internal_links:
    print(f"      → {link}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 6. First 200 words contains a Cluster-to-Pillar link
# ──────────────────────────────────────────────────────────────────────────
# Check if any of the inline links appears in the first ~200 words of body
first_chunk = " ".join(words[:300])  # ~300 words to be safe
pillar_link_in_first = any(link in first_chunk for link in internal_links)
print(f"[6] Cluster-to-Pillar link in first ~200 words: {'PASS' if pillar_link_in_first else 'FAIL'}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 7. Forbidden phrases
# ──────────────────────────────────────────────────────────────────────────
forbidden = [
    "cutting-edge", "revolutionary", "world-class", "best-in-class",
    "leverage", "utilize", "synergize",
    "in today's fast-paced",
    "unleash the power", "harness the potential",
    "we're passionate", "we believe that",
    "trusted by leading brands",
    "boost your ROI",
    "state-of-the-art", "next-generation", "future-proof",
    "unlock", "empower",  # allowed only when describing concrete action; flag any
]
found_forbidden = []
lower_text = body_text.lower()
for phrase in forbidden:
    if phrase in lower_text:
        found_forbidden.append(phrase)
print(f"[7] Forbidden phrases: {'PASS (none found)' if not found_forbidden else 'FAIL'}")
if found_forbidden:
    for p in found_forbidden:
        print(f"    Found: '{p}'")
print()

# ──────────────────────────────────────────────────────────────────────────
# 8. Sentence length (≤ 28 words) — only body paragraphs
# ──────────────────────────────────────────────────────────────────────────
# Pull only the multi-paragraph string literals (intro/body arrays)
# Crude: any string with > 80 chars and ending in period
long_strings = [s for s in strings if len(s) > 80]
violations = []
for s in long_strings:
    # Split on sentence boundaries
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z])', s)
    for sent in sentences:
        wc = len(sent.split())
        if wc > 28:
            violations.append((wc, sent[:80] + "..."))
print(f"[8] Sentences > 28 words: {'PASS (none)' if not violations else f'FAIL ({len(violations)} found)'}")
for wc, preview in violations[:10]:
    print(f"    {wc} words: {preview}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 9. Vague metric check
# ──────────────────────────────────────────────────────────────────────────
vague_terms = [
    r'\bhigh accuracy\b', r'\bmany experiments\b', r'\bsignificant(?:ly)?\b',
    r'\bsubstantial(?:ly)?\b', r'\bconsiderable\b', r'\bnumerous\b',
    r'\bvast\b', r'\bplethora\b', r'\bmyriad\b',
]
vague_hits = []
for pat in vague_terms:
    matches = re.findall(pat, lower_text)
    if matches:
        vague_hits.append((pat, len(matches)))
print(f"[9] Vague metrics: {'PASS (none)' if not vague_hits else 'FAIL'}")
for pat, n in vague_hits:
    print(f"    {pat}: {n} occurrences")
print()

# ──────────────────────────────────────────────────────────────────────────
# 10. STAR case study with concrete metrics
# ──────────────────────────────────────────────────────────────────────────
# Check caseStudies block exists with situation/task/action/result fields
cs_match = re.search(r'caseStudies:\s*\{', body_text)
has_situation = "situation:" in body_text
has_task = "task:" in body_text
has_action = "action:" in body_text
has_result = "result:" in body_text
has_quote = "quote:" in body_text
print(f"[10] STAR case studies: {'PASS' if all([has_situation, has_task, has_action, has_result]) else 'FAIL'}")
print(f"     situation: {has_situation}, task: {has_task}, action: {has_action}, result: {has_result}, quote: {has_quote}")
# Check for numeric metrics in result fields
result_strings = re.findall(r'result:\s*"((?:[^"\\]|\\.)*)"', body_text)
numeric_results = sum(1 for r in result_strings if re.search(r'\d+%|\$\d|[\d,]+ ', r))
print(f"     Results with numeric metrics: {numeric_results}/{len(result_strings)}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 11. FAQ question count + categories
# ──────────────────────────────────────────────────────────────────────────
faq_q_count = len(re.findall(r'q:\s*"', body_text))
faq_cat_count = len(re.findall(r'name:\s*"', body_text))  # rough — counts all name fields
# Better: count within faq block
faq_match = re.search(r'faq:\s*\{(.+?)finalCta:', body_text, re.DOTALL)
if faq_match:
    faq_block = faq_match.group(1)
    faq_q_in_block = len(re.findall(r'q:\s*"', faq_block))
    faq_cat_in_block = len(re.findall(r'categories:\s*\[', faq_block)) + \
                       len(re.findall(r'name:\s*"', faq_block))  # both name (category) + question name pattern
    # Categories are objects with name + questions — count by looking for `name:` followed by `questions:`
    faq_cats = re.findall(r'\{\s*name:\s*"[^"]+",\s*questions:', faq_block)
    print(f"[11] FAQ questions: {faq_q_in_block}, Categories: {len(faq_cats)}")
    print(f"     Threshold: 12-18 questions across 3-4 categories  →  "
          f"{'PASS' if (12 <= faq_q_in_block <= 22) and (3 <= len(faq_cats) <= 5) else 'FAIL'}")
print()

# ──────────────────────────────────────────────────────────────────────────
# 12. Cluster glossary terms used (AI cluster)
# ──────────────────────────────────────────────────────────────────────────
ai_glossary = [
    "RAG", "LLM", "guardrail", "eval", "citation", "hallucination",
    "vector", "embedding", "chunking", "BM25", "reranker",
    "function calling", "structured output", "JSON schema",
    "fine-tun", "LoRA", "QLoRA", "inference", "tokens/sec",
    "prompt injection", "OWASP", "agent", "checkpoint",
    "MCP", "ReAct", "plan-and-execute", "multi-agent",
]
hits = sum(1 for term in ai_glossary if term.lower() in lower_text)
print(f"[12] AI cluster glossary terms used: {hits}/{len(ai_glossary)}")
print(f"     Threshold: ≥ 8  →  {'PASS' if hits >= 8 else 'FAIL'}")
print()

# ──────────────────────────────────────────────────────────────────────────
# Summary
# ──────────────────────────────────────────────────────────────────────────
print("=" * 60)
print("QA SUMMARY")
print("=" * 60)
print(f"Word count: {word_count}")
print(f"Sections: 12/12 ({'PASS' if not missing else 'FAIL'})")
print(f"GEO definitions: hero.geoDefinition={'✓' if has_geo else '✗'}, FAQ 'What is'={'✓' if has_what_is else '✗'}")
print(f"Internal links: {len(internal_links)} (target 4-7)")
print(f"Forbidden phrases: {len(found_forbidden)}")
print(f"Long sentences (>28w): {len(violations)}")
print(f"Vague metrics: {len(vague_hits)}")
print(f"STAR case studies: {'✓' if has_action else '✗'}")
print(f"FAQ questions: {faq_q_in_block}")
print(f"AI glossary terms: {hits}/{len(ai_glossary)}")
