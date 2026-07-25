#!/usr/bin/env python3
"""
Enterprise UI/UX & Content Strategy Design Brief — PDF generator.

Generates a comprehensive ~30-page strategy brief covering:
  1. Visual & Motion Design Requirements (3D assets, layout integrity, micro-animations)
  2. Technical SEO & Silo Architecture (Hub & Spoke linking)
  3. Content Strategy & Brand Voice (vocabulary upgrade, AI copywriting prompt)
  4. Admin UI Redesign Specifications
  5. Implementation Roadmap
  6. Success Metrics & KPIs

Uses ReportLab with the ClickTake brand palette + DejaVu fonts.
Output: /home/z/my-project/download/clicktake-enterprise-design-brief.pdf
"""

import os
import sys
import hashlib
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Image, HRFlowable, ListFlowable, ListItem,
    BaseDocTemplate, PageTemplate, Frame, NextPageTemplate
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

# ─── Font Registration ──────────────────────────────────────────────────────
# DejaVu Sans (body) + DejaVu Sans Bold (headings) + DejaVu Sans Mono (code)
FONT_DIR_DEJAVU = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("BodyFont", f"{FONT_DIR_DEJAVU}/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("BodyFont-Bold", f"{FONT_DIR_DEJAVU}/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("BodyFont-Italic", f"{FONT_DIR_DEJAVU}/DejaVuSans.ttf"))  # fallback
pdfmetrics.registerFont(TTFont("MonoFont", f"{FONT_DIR_DEJAVU}/DejaVuSansMono.ttf"))
pdfmetrics.registerFont(TTFont("MonoFont-Bold", f"{FONT_DIR_DEJAVU}/DejaVuSansMono-Bold.ttf"))
pdfmetrics.registerFont(TTFont("SerifFont", f"{FONT_DIR_DEJAVU}/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("SerifFont-Bold", f"{FONT_DIR_DEJAVU}/DejaVuSerif-Bold.ttf"))

# Font family registration for italic/bold-italic resolution
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily(
    "BodyFont",
    normal="BodyFont",
    bold="BodyFont-Bold",
    italic="BodyFont",
    boldItalic="BodyFont-Bold",
)

# ─── ClickTake Brand Palette ────────────────────────────────────────────────
# Aligned with the site's --nx-* tokens for visual consistency.
PAGE_BG       = colors.HexColor("#FFFFFF")
SECTION_BG    = colors.HexColor("#F8F6FC")  # very faint lavender
CARD_BG       = colors.HexColor("#F1EDF8")
TABLE_STRIPE  = colors.HexColor("#F8F6FC")

# Brand accents (ClickTake tri-stop)
BRAND_PINK    = colors.HexColor("#FF53A9")
BRAND_PINK_DEEP = colors.HexColor("#E0197A")
BRAND_BLUE    = colors.HexColor("#136DFF")
BRAND_PURPLE  = colors.HexColor("#9B3DFF")

# Structural
HEADER_FILL   = colors.HexColor("#100820")  # dark navy for table headers
COVER_BLOCK   = colors.HexColor("#0A0612")  # deepest navy for cover
BORDER        = colors.HexColor("#E5E0EE")
BORDER_STRONG = colors.HexColor("#CBD0E1")

# Typography
TEXT_PRIMARY  = colors.HexColor("#0A0612")
TEXT_SOFT     = colors.HexColor("#4A3B5C")
TEXT_MUTED    = colors.HexColor("#6E5F80")
TEXT_INVERT   = colors.HexColor("#F4F0FF")

# Semantic
SEM_SUCCESS   = colors.HexColor("#10B981")
SEM_WARNING   = colors.HexColor("#F59E0B")
SEM_ERROR     = colors.HexColor("#EF4444")

# ─── Page Geometry ──────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4  # 595 × 842 pt
MARGIN_L = 22 * mm
MARGIN_R = 22 * mm
MARGIN_T = 24 * mm
MARGIN_B = 22 * mm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R  # ~ 451 pt

# ─── Paragraph Styles ───────────────────────────────────────────────────────
STYLES = {
    "CoverEyebrow": ParagraphStyle(
        "CoverEyebrow", fontName="MonoFont-Bold", fontSize=10,
        textColor=BRAND_PINK, alignment=TA_LEFT, leading=14,
        spaceAfter=12, letterSpacing=2,
    ),
    "CoverTitle": ParagraphStyle(
        "CoverTitle", fontName="BodyFont-Bold", fontSize=36,
        textColor=TEXT_INVERT, alignment=TA_LEFT, leading=42,
        spaceAfter=16,
    ),
    "CoverSubtitle": ParagraphStyle(
        "CoverSubtitle", fontName="BodyFont", fontSize=14,
        textColor=colors.HexColor("#B5A8C8"), alignment=TA_LEFT, leading=20,
        spaceAfter=24,
    ),
    "CoverFooter": ParagraphStyle(
        "CoverFooter", fontName="BodyFont", fontSize=9,
        textColor=colors.HexColor("#7A6B95"), alignment=TA_LEFT, leading=13,
    ),
    "CoverFooterRight": ParagraphStyle(
        "CoverFooterRight", fontName="MonoFont", fontSize=9,
        textColor=colors.HexColor("#7A6B95"), alignment=TA_RIGHT, leading=13,
    ),
    "H1": ParagraphStyle(
        "H1", fontName="BodyFont-Bold", fontSize=22,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=28,
        spaceBefore=18, spaceAfter=10,
    ),
    "H2": ParagraphStyle(
        "H2", fontName="BodyFont-Bold", fontSize=15,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=20,
        spaceBefore=14, spaceAfter=6,
    ),
    "H3": ParagraphStyle(
        "H3", fontName="BodyFont-Bold", fontSize=12,
        textColor=BRAND_PINK_DEEP, alignment=TA_LEFT, leading=16,
        spaceBefore=10, spaceAfter=4,
    ),
    "Eyebrow": ParagraphStyle(
        "Eyebrow", fontName="MonoFont-Bold", fontSize=8,
        textColor=BRAND_PINK, alignment=TA_LEFT, leading=12,
        spaceAfter=6, letterSpacing=1.5,
    ),
    "Body": ParagraphStyle(
        "Body", fontName="BodyFont", fontSize=10.5,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=16,
        spaceAfter=8,
    ),
    "BodyJustified": ParagraphStyle(
        "BodyJustified", fontName="BodyFont", fontSize=10.5,
        textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, leading=16,
        spaceAfter=8,
    ),
    "BodySoft": ParagraphStyle(
        "BodySoft", fontName="BodyFont", fontSize=10,
        textColor=TEXT_SOFT, alignment=TA_LEFT, leading=15,
        spaceAfter=6,
    ),
    "Bullet": ParagraphStyle(
        "Bullet", fontName="BodyFont", fontSize=10.5,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=16,
        leftIndent=18, bulletIndent=4, spaceAfter=4,
    ),
    "PullQuote": ParagraphStyle(
        "PullQuote", fontName="SerifFont", fontSize=13,
        textColor=TEXT_SOFT, alignment=TA_LEFT, leading=20,
        leftIndent=20, rightIndent=20, spaceBefore=12, spaceAfter=12,
        borderColor=BRAND_PINK, borderWidth=0, borderPadding=0,
    ),
    "Code": ParagraphStyle(
        "Code", fontName="MonoFont", fontSize=8.5,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=12,
        leftIndent=12, rightIndent=12, spaceBefore=6, spaceAfter=6,
        backColor=CARD_BG, borderColor=BORDER, borderWidth=0.5, borderPadding=8,
    ),
    "Callout": ParagraphStyle(
        "Callout", fontName="BodyFont", fontSize=10,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=15,
        leftIndent=12, rightIndent=12, spaceBefore=8, spaceAfter=8,
        backColor=colors.HexColor("#FFF0F7"),  # faint pink wash
        borderColor=BRAND_PINK, borderWidth=0, borderPadding=10,
    ),
    "TableHeader": ParagraphStyle(
        "TableHeader", fontName="BodyFont-Bold", fontSize=9,
        textColor=TEXT_INVERT, alignment=TA_LEFT, leading=12,
    ),
    "TableCell": ParagraphStyle(
        "TableCell", fontName="BodyFont", fontSize=9,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=12,
    ),
    "TableCellMuted": ParagraphStyle(
        "TableCellMuted", fontName="BodyFont", fontSize=9,
        textColor=TEXT_SOFT, alignment=TA_LEFT, leading=12,
    ),
    "TableCellMono": ParagraphStyle(
        "TableCellMono", fontName="MonoFont", fontSize=8.5,
        textColor=BRAND_PINK_DEEP, alignment=TA_LEFT, leading=12,
    ),
    "TOCTitle": ParagraphStyle(
        "TOCTitle", fontName="BodyFont-Bold", fontSize=22,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=28,
        spaceAfter=18,
    ),
    "TOCLevel0": ParagraphStyle(
        "TOCLevel0", fontName="BodyFont-Bold", fontSize=11,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=18,
        leftIndent=0, spaceBefore=8, spaceAfter=2,
    ),
    "TOCLevel1": ParagraphStyle(
        "TOCLevel1", fontName="BodyFont", fontSize=10,
        textColor=TEXT_SOFT, alignment=TA_LEFT, leading=15,
        leftIndent=18, spaceAfter=1,
    ),
    "Footer": ParagraphStyle(
        "Footer", fontName="MonoFont", fontSize=8,
        textColor=TEXT_MUTED, alignment=TA_LEFT, leading=10,
    ),
    "FooterRight": ParagraphStyle(
        "FooterRight", fontName="MonoFont", fontSize=8,
        textColor=TEXT_MUTED, alignment=TA_RIGHT, leading=10,
    ),
}


# ─── Helper: heading with bookmark for TOC ──────────────────────────────────
def add_heading(text, style_name="H1", level=0):
    """Create a heading paragraph with bookmark attributes for TOC."""
    key = f"h_{hashlib.md5(text.encode()).hexdigest()[:8]}"
    style = STYLES[style_name]
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


def p(text, style="Body"):
    """Shorthand for Paragraph."""
    return Paragraph(text, STYLES[style])


def bullet(text):
    """Bullet list item."""
    return Paragraph(f"• {text}", STYLES["Bullet"])


def callout(text, label="Key Insight"):
    """Brand-tinted callout box."""
    inner = Paragraph(
        f'<font name="MonoFont-Bold" color="#FF53A9" size="8">{label.upper()}</font><br/><br/>'
        f'<font name="BodyFont" size="10" color="#0A0612">{text}</font>',
        STYLES["Callout"],
    )
    return inner


def pull_quote(text, attribution=None):
    """Italic blockquote with left accent border."""
    inner = f'<font name="SerifFont" size="13" color="#4A3B5C">"{text}"</font>'
    if attribution:
        inner += f'<br/><br/><font name="MonoFont" size="8" color="#6E5F80">— {attribution}</font>'
    # Wrap in a table to get the left border
    para = Paragraph(inner, STYLES["PullQuote"])
    t = Table([[para]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("LINEBEFORE", (0, 0), (0, 0), 3, BRAND_PINK),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def code_block(text):
    """Monospace code/prompt block with subtle background."""
    # Escape HTML special chars
    escaped = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # Preserve line breaks
    escaped = escaped.replace("\n", "<br/>")
    return Paragraph(escaped, STYLES["Code"])


def styled_table(data, col_widths=None, header=True, stripe=True):
    """Build a brand-styled table. data[0] is header row if header=True."""
    if col_widths is None:
        n = len(data[0])
        col_widths = [CONTENT_W / n] * n
    # Convert all cells to Paragraphs
    wrapped = []
    for r_idx, row in enumerate(data):
        wrapped_row = []
        for c_idx, cell in enumerate(row):
            if isinstance(cell, str):
                if r_idx == 0 and header:
                    style = "TableHeader"
                elif c_idx == 0:
                    style = "TableCellMono"  # first column = brand-pink mono
                else:
                    style = "TableCell"
                wrapped_row.append(Paragraph(cell, STYLES[style]))
            else:
                wrapped_row.append(cell)
        wrapped.append(wrapped_row)
    t = Table(wrapped, colWidths=col_widths, repeatRows=1 if header else 0)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, 0), 0.5, BORDER_STRONG),
    ]
    if header:
        style.extend([
            ("BACKGROUND", (0, 0), (-1, 0), HEADER_FILL),
            ("LINEABOVE", (0, 1), (-1, -1), 0.25, BORDER),
            ("LINEBELOW", (0, 1), (-1, -1), 0.25, BORDER),
        ])
    if stripe:
        for i in range(1, len(data)):
            if i % 2 == 0:
                style.append(("BACKGROUND", (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style))
    return t


def spacer(h=10):
    return Spacer(1, h)


def hr(color=BORDER, thickness=0.5, space_before=4, space_after=4):
    return HRFlowable(
        width="100%", thickness=thickness, color=color,
        spaceBefore=space_before, spaceAfter=space_after,
    )


# ─── Page Templates ─────────────────────────────────────────────────────────
def cover_page(canv, doc):
    """Dark navy cover page with brand gradient."""
    canv.saveState()
    # Full-bleed dark navy background
    canv.setFillColor(COVER_BLOCK)
    canv.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Top gradient strip (pink → purple → blue) — drawn as 3 vertical bands
    band_h = 6
    canv.setFillColor(BRAND_PINK)
    canv.rect(0, PAGE_H - band_h, PAGE_W / 3, band_h, fill=1, stroke=0)
    canv.setFillColor(BRAND_PURPLE)
    canv.rect(PAGE_W / 3, PAGE_H - band_h, PAGE_W / 3, band_h, fill=1, stroke=0)
    canv.setFillColor(BRAND_BLUE)
    canv.rect(2 * PAGE_W / 3, PAGE_H - band_h, PAGE_W / 3, band_h, fill=1, stroke=0)
    # Bottom accent line (thin pink)
    canv.setFillColor(BRAND_PINK)
    canv.rect(0, 0, PAGE_W, 3, fill=1, stroke=0)
    canv.restoreState()


def body_page(canv, doc):
    """Header + footer for content pages."""
    canv.saveState()
    # Top hairline border
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.5)
    canv.line(MARGIN_L, PAGE_H - MARGIN_T + 14, PAGE_W - MARGIN_R, PAGE_H - MARGIN_T + 14)
    # Brand mark top-left
    canv.setFillColor(BRAND_PINK)
    canv.rect(MARGIN_L, PAGE_H - MARGIN_T + 18, 3, 10, fill=1, stroke=0)
    canv.setFont("BodyFont-Bold", 8)
    canv.setFillColor(TEXT_PRIMARY)
    canv.drawString(MARGIN_L + 7, PAGE_H - MARGIN_T + 20, "CLICKTAKE TECHNOLOGIES")
    # Document title top-right
    canv.setFont("MonoFont", 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawRightString(PAGE_W - MARGIN_R, PAGE_H - MARGIN_T + 20, "ENTERPRISE DESIGN BRIEF")
    # Footer: page number + version
    canv.setFont("MonoFont", 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawString(MARGIN_L, MARGIN_B - 12, "Strategy Brief v1.0  ·  Confidential")
    canv.drawRightString(PAGE_W - MARGIN_R, MARGIN_B - 12, f"Page {doc.page}")
    # Footer hairline
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.25)
    canv.line(MARGIN_L, MARGIN_B - 4, PAGE_W - MARGIN_R, MARGIN_B - 4)
    canv.restoreState()


# ─── DocTemplate with TOC support ───────────────────────────────────────────
class TocDocTemplate(BaseDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, "bookmark_name"):
            level = getattr(flowable, "bookmark_level", 0)
            text = getattr(flowable, "bookmark_text", "")
            key = getattr(flowable, "bookmark_key", "")
            self.notify("TOCEntry", (level, text, self.page, key))


def build_pdf(output_path):
    doc = TocDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="ClickTake Technologies — Enterprise UI/UX & Content Strategy Brief",
        author="ClickTake Technologies",
        subject="Strategy brief for transitioning from freelancer aesthetic to $50K+ enterprise agency standard",
        creator="ClickTake Technologies",
    )

    # Cover frame: full bleed, no margins
    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0,
                        topPadding=0, bottomPadding=0, id="cover")
    cover_template = PageTemplate(id="Cover", frames=[cover_frame],
                                  onPage=cover_page)

    # Body frame: standard margins
    body_frame = Frame(MARGIN_L, MARGIN_B, CONTENT_W,
                       PAGE_H - MARGIN_T - MARGIN_B, id="body")
    body_template = PageTemplate(id="Body", frames=[body_frame],
                                 onPage=body_page)

    doc.addPageTemplates([cover_template, body_template])

    story = []

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 1: COVER PAGE
    # ═══════════════════════════════════════════════════════════════════════
    # Use spacers to position content within the cover frame
    story.append(Spacer(1, 120))
    story.append(Paragraph("STRATEGY BRIEF · v1.0", STYLES["CoverEyebrow"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Enterprise UI/UX &amp;<br/>Content Strategy Brief", STYLES["CoverTitle"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Transitioning ClickTake Technologies from a freelancer aesthetic<br/>"
        "to a $50,000+ enterprise agency standard through cohesive 3D visual<br/>"
        "language, strict SEO silo architecture, and outcome-based content.",
        STYLES["CoverSubtitle"]
    ))
    story.append(Spacer(1, 60))
    # Cover footer table (2 columns)
    footer_data = [[
        Paragraph(
            '<font name="MonoFont-Bold" color="#FF8AC4" size="8">PREPARED BY</font><br/>'
            '<font color="#F4F0FF" size="10">ClickTake Technologies</font><br/>'
            '<font color="#7A6B95" size="9">Birmingham · Multan · Austin · Dubai</font>',
            STYLES["CoverFooter"]
        ),
        Paragraph(
            '<font name="MonoFont-Bold" color="#FF8AC4" size="8">DATE · VERSION</font><br/>'
            '<font color="#F4F0FF" size="10">July 2026 · v1.0</font><br/>'
            '<font color="#7A6B95" size="9">12-week implementation roadmap</font>',
            STYLES["CoverFooterRight"]
        ),
    ]]
    footer_t = Table(footer_data, colWidths=[PAGE_W / 2 - 40, PAGE_W / 2 - 40])
    footer_t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 40),
        ("RIGHTPADDING", (0, 0), (-1, -1), 40),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(footer_t)

    # Switch to body template for the rest of the document
    story.append(NextPageTemplate("Body"))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 2: TABLE OF CONTENTS
    # ═══════════════════════════════════════════════════════════════════════
    story.append(Paragraph("Table of Contents", STYLES["TOCTitle"]))
    story.append(hr(BRAND_PINK, 1.5, 2, 14))
    toc = TableOfContents()
    toc.levelStyles = [STYLES["TOCLevel0"], STYLES["TOCLevel1"]]
    story.append(toc)
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 3: EXECUTIVE SUMMARY
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Executive Summary", "H1", 0))
    story.append(p(
        'This brief establishes the design, technical, and content strategy for transitioning '
        'ClickTake Technologies from a perceived freelancer aesthetic to a verifiable $50,000+ '
        'enterprise agency standard. The repositioning is engineered across three interlocking '
        'pillars — visual and motion design, technical SEO silo architecture, and content '
        'strategy with brand voice — supported by a parallel admin interface redesign. The '
        'thesis is straightforward: premium positioning is engineered through measurable '
        'structural decisions, not declared through marketing language.',
        "BodyJustified"
    ))
    story.append(p(
        'The current site ships 32 long-form service, solution, and corporate pages averaging '
        '2,800 words each, all rendered through a unified DeepDiveLayout component with sticky '
        'table-of-contents, reading progress bar, 3D character dividers, FAQ JSON-LD schema, '
        'and WCAG AA-verified contrast tokens. The foundation is solid; what remains is the '
        'visual depth, link equity, and vocabulary discipline that separate a $5K proposal '
        'from a $50K proposal. Each pillar in this brief addresses one of those three gaps '
        'with concrete, implementable specifications rather than aspirational language.',
        "BodyJustified"
    ))
    story.append(spacer(8))
    story.append(callout(
        'Premium perception is engineered through cohesive 3D visual language, strict SEO '
        'architecture, and outcome-based content — not through price tags. A $50K agency '
        'looks like a $50K agency before the prospect reads the proposal.',
        "Core Thesis"
    ))
    story.append(spacer(8))
    story.append(p(
        'The three pillars map to three buyer-side signals that enterprise procurement teams '
        'evaluate, often unconsciously. Visual depth signals production budget — a site with '
        'bespoke 3D assets per service page communicates that the agency invests in its own '
        'brand, and by extension will invest in the client’s brand. SEO architecture signals '
        'technical competence — orphan pages, broken contextual links, and shallow hub pages '
        'are the digital equivalent of an unkempt storefront. Content vocabulary signals '
        'seniority — "we make websites" reads as a junior shop, while "we engineer scalable '
        'digital ecosystems" reads as a partner who has shipped production systems at scale.',
        "BodyJustified"
    ))
    story.append(p(
        'The admin UI redesign documented in section 7 addresses an operational signal that '
        'is often overlooked: when a prospect, partner, or auditor encounters the admin login '
        'page, the visual quality of that single screen shapes their perception of the entire '
        'engineering organization. An invisible login button — the exact bug fixed in this '
        'cycle — communicates carelessness in a way that no amount of marketing copy can '
        'offset. The fix is documented here as a case study in the broader principle that '
        'enterprise standards apply equally to user-facing and internal surfaces.',
        "BodyJustified"
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 4: PILLAR 1 — VISUAL & MOTION DESIGN
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Pillar 1: Visual & Motion Design Requirements", "H1", 0))
    story.append(p(
        'The visual layer is the first signal a prospect encounters. Within 50 milliseconds of '
        'page load, the visitor has already classified the site as "freelancer", "boutique '
        'agency", or "enterprise agency" — and that classification is driven almost entirely '
        'by visual depth, motion quality, and asset originality. Stock photography and '
        'templated illustrations classify a site as freelancer; bespoke 3D assets with '
        'consistent material language classify a site as enterprise. This pillar specifies '
        'the 3D visual language, layout integrity rules, and motion principles required to '
        'cross that classification threshold.',
        "BodyJustified"
    ))

    # 1.1 — 3D Asset Integration
    story.append(add_heading("1.1 — 3D Asset Integration: A Cohesive Visual Language", "H2", 1))
    story.append(p(
        'Every service page must feature a unique, high-quality 3D character or abstract '
        'object that visually represents the specific technical work delivered by that '
        'service. The current site uses a single Nx3DCharacter component with variant props '
        '("ai", "web", "marketing", "creative") that swaps between four pre-built characters. '
        'For enterprise positioning, this is insufficient — a $50K buyer scrolling through '
        '/services/ai/llm and /services/ai/chatbots expects to see two distinct visual '
        'representations, not the same character with a different label.',
        "BodyJustified"
    ))
    story.append(p(
        'The 3D visual language must follow a consistent material and lighting system across '
        'all 24 service pages while varying the form factor to reflect the service. The '
        'system below specifies the shared material palette, lighting rig, and per-service '
        'form factor. All assets are rendered via Three.js (already integrated via the '
        'NxThreeScene component) using GLTF models loaded dynamically per route.',
        "BodyJustified"
    ))

    story.append(spacer(6))
    story.append(p("Service-to-3D-Asset Mapping", "H3"))
    service_3d_table = [
        ["Category", "Service", "3D Asset Specification", "Material"],
        ["AI", "Custom LLM Solutions", "Data-driven neural mesh — pulsing node graph with weighted edges", "Translucent glass + emissive cyan"],
        ["AI", "AI Chatbots", "Conversational orb — sphere with mouth-like sine-wave deformations", "Soft silicone + warm amber glow"],
        ["AI", "Prompt Engineering", "Tokenized helix — DNA-like spiral of geometric primitives", "Brushed metal + magenta accents"],
        ["AI", "Computer Vision & NLP", "Ocular lens assembly — multi-element optical stack", "Polished chrome + cyan refraction"],
        ["AI", "AI Automation", "Gear-train mechanism — interlocking cog system in motion", "Dark steel + blue bearing lights"],
        ["Web", "Full-Stack Development", "Structural geometric entity — stacked isometric building blocks", "Concrete grey + rebar pink"],
        ["Web", "SaaS Development", "Layered platform stack — translucent tiered discs", "Frosted glass + per-tier accent"],
        ["Web", "Authentication Systems", "Padlock mechanism — animated tumbler pins", "Brass + steel + green status LED"],
        ["Web", "Python Backend", "Coiled serpent pipeline — flowing particle stream", "Bronze + emerald data pulses"],
        ["Web", "WordPress Development", "Modular block wall — interlocking CMS blocks", "Warm wood + white paint"],
        ["Web", "E-commerce", "Shopping cart assembly — wheeled cart with floating products", "Brushed aluminum + product colors"],
        ["Web", "Custom Software", "Blueprint wireframe — wireframe structure assembling", "Cyan wireframe + navy fill"],
        ["Web", "Maintenance & Support", "Wrench + gear hybrid — rotating maintenance tool", "Chrome + grease-stained steel"],
        ["Web", "Website Redesign", "Morphing shape — old form dissolving into new form", "Dissolving particles + emerging solid"],
        ["Web", "Domain & Hosting", "Server rack — stacked 1U units with blinking LEDs", "Black steel + green/amber LEDs"],
        ["Marketing", "Paid Advertising", "Rocket trajectory — arcing flight path with thrust", "White body + flame gradient"],
        ["Marketing", "Content Strategy", "Layered manuscript — stacked pages with flowing text", "Aged paper + ink black"],
        ["Marketing", "Conversion Rate Optimization", "Funnel with falling spheres — gravity-driven flow", "Glass funnel + colored spheres"],
        ["Marketing", "Search Engine Optimization", "Magnifying glass over ranked list — focused search", "Brass lens + paper rankings"],
        ["Marketing", "Social Media", "Network constellation — connected profile nodes", "Glowing nodes + connection lines"],
        ["Creative", "Graphic Design", "Pen + bezier curve — drawing tool in motion", "Brushed steel + ink trail"],
        ["Creative", "Web Design", "Wireframe morphing to mockup — design evolution", "Wireframe cyan → solid purple"],
        ["Creative", "Video Production", "Clapperboard + film reel — cinematic tools", "Wood + black film + brass reel"],
        ["Flagship", "Starter Kit", "Unfolding toolbox — kit opening to reveal tools", "Powder-coated steel + tool colors"],
    ]
    story.append(styled_table(service_3d_table, col_widths=[55, 110, 200, 86]))
    story.append(spacer(8))
    story.append(p(
        'The material palette is restricted to seven finishes — translucent glass, brushed '
        'metal, soft silicone, polished chrome, dark steel, frosted glass, and aged paper — '
        'across all 24 assets. This restriction enforces visual cohesion: a prospect '
        'navigating from /services/ai/llm to /services/web/saas sees two distinct objects '
        'but recognizes them as members of the same design system. The lighting rig is '
        'identical across all assets: three-point setup with a pink key light (warm, 5500K '
        'tinted), a blue fill light (cool, 3200K tinted), and a purple rim light for '
        'separation from the navy hero background.',
        "BodyJustified"
    ))

    # 1.2 — Layout Integrity
    story.append(add_heading("1.2 — Layout Integrity: Non-Destructive Depth Optimization", "H2", 1))
    story.append(p(
        'The layout integrity principle is simple: no functional section may be removed to '
        'accommodate a visual element. The current DeepDiveLayout renders 12 sections per '
        'page (Hero, Problem, Deep Dive, Tech Stack, Methodology, Use Cases, Comparative '
        'Analysis, Business Impact, Integrations, Case Studies, FAQ, Final CTA), and every '
        'one of those sections serves a conversion or SEO function. The 3D assets specified '
        'in section 1.1 are additive — they occupy the hero column and the section dividers '
        'between major sections, not the body content area.',
        "BodyJustified"
    ))
    story.append(p(
        'The non-destructive approach requires that every visual addition be measured '
        'against three constraints: (1) it must not displace any existing functional '
        'element, (2) it must not increase the page load time by more than 180 milliseconds '
        'on a 4G connection, and (3) it must not reduce the Lighthouse Performance score '
        'below 90 on any service page. The current Nx3DCharacter and Nx3DScene components '
        'already enforce the third constraint via dynamic imports with ssr: false and lazy '
        'Three.js loading — the new per-service assets will follow the same pattern.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Layout Integrity Constraints", "H3"))
    layout_table = [
        ["Constraint", "Threshold", "Measurement Method", "Owner"],
        ["Functional section displacement", "0 sections removed", "Diff against current DeepDiveLayout", "Frontend Lead"],
        ["Page load time (4G, P75)", "≤ 180ms increase", "Lighthouse mobile, P75 across 30 days", "Performance Eng"],
        ["Lighthouse Performance score", "≥ 90 on all service pages", "Weekly CI run on every PR", "DevOps"],
        ["3D asset bundle size", "≤ 220 KB gzipped per asset", "Bundle analyzer on every PR", "Frontend Lead"],
        ["CLS (Cumulative Layout Shift)", "≤ 0.05 on all pages", "RUM via Vercel Analytics", "Performance Eng"],
        ["First Contentful Paint", "≤ 1.8s on 4G mobile", "Lighthouse mobile, field data", "DevOps"],
    ]
    story.append(styled_table(layout_table, col_widths=[140, 100, 150, 80]))
    story.append(spacer(8))

    # 1.3 — Micro-Animations
    story.append(add_heading("1.3 — Micro-Animations: Ambient Motion for Premium Depth", "H2", 1))
    story.append(p(
        'Micro-animations are the difference between a static brochure and a living '
        'interface. The current site already ships three ambient motion systems — the '
        'BackgroundScene canvas (animated orbs), the ScrollProgressBar (top gradient), and '
        'the per-section Nx3DCharacter float animation. The enterprise upgrade extends '
        'this layer with four additional motion primitives, each scoped to a specific '
        'interaction context and each tuned for subtlety rather than spectacle.',
        "BodyJustified"
    ))
    story.append(p(
        'The motion principle is restraint. Every animation must serve a communication '
        'function — indicating state change, drawing attention to a CTA, or providing '
        'spatial continuity during navigation. Decorative motion that exists only to '
        '"look cool" is forbidden because it competes with content for cognitive '
        'bandwidth. The timing curve catalog below codifies this principle: every '
        'animation in the system uses one of six approved easing functions, and every '
        'duration falls within one of four approved ranges.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Motion Principles & Timing Catalog", "H3"))
    motion_table = [
        ["Context", "Duration", "Easing", "Trigger", "Purpose"],
        ["Hero text fade-in", "500ms", "easeOut", "Page load", "Establish hierarchy"],
        ["3D asset entrance", "600ms", "easeOut", "In-view (once)", "Anchor visual identity"],
        ["Sticky ToC active swap", "200ms", "easeInOut", "Scroll position", "Confirm navigation"],
        ["CTA button hover", "180ms", "easeOut", "Mouse enter", "Affordance feedback"],
        ["Mega menu open", "200ms", "easeOut", "Hover (desktop)", "Reveal available paths"],
        ["Mobile drawer slide", "300ms", "easeOut", "Tap hamburger", "Spatial transition"],
        ["Section divider 3D", "4s loop", "easeInOut", "Continuous", "Visual breathing room"],
        ["Reading progress bar", "100ms tick", "linear", "Scroll", "Confirm progress"],
        ["Accordion expand", "300ms", "easeInOut", "Tap", "Reveal answer"],
        ["Toast notification", "240ms in/out", "easeOut", "Form submit", "Confirm action"],
    ]
    story.append(styled_table(motion_table, col_widths=[100, 60, 60, 90, 141]))
    story.append(spacer(8))
    story.append(callout(
        'Every animation in the system must respect prefers-reduced-motion: reduce. Users '
        'who have opted out of motion at the OS level see instant state transitions with '
        'no opacity or transform animations. This is non-negotiable accessibility, not '
        'a nice-to-have. The current globals.css already enforces this for the custom '
        'cursor and scroll-reveal components — the new motion primitives must follow '
        'the same pattern.',
        "Accessibility Constraint"
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 5: PILLAR 2 — TECHNICAL SEO & SILO ARCHITECTURE
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Pillar 2: Technical SEO & Silo Architecture", "H1", 0))
    story.append(p(
        'Internal linking architecture is the single highest-leverage SEO investment for a '
        'site of this scale. With 24 service pages, 6 solution pages, 12 blog posts, 6 case '
        'studies, and 4 corporate pages, the site contains 52 indexable URLs — enough to '
        'build real topical authority if the link graph is structured correctly, and enough '
        'to dilute that authority entirely if it is not. The Hub & Spoke (Pillar & Cluster) '
        'model specified in this section eliminates orphan pages, concentrates link equity '
        'on revenue-generating service pages, and gives Google’s crawler an unambiguous '
        'topical hierarchy to evaluate.',
        "BodyJustified"
    ))

    # 2.1 — Hub & Spoke Model
    story.append(add_heading("2.1 — The Hub & Spoke Linking Model", "H2", 1))
    story.append(p(
        'The Hub & Spoke model organizes content into topical clusters, each anchored by a '
        'single pillar page that links out to multiple cluster pages, and each cluster page '
        'links back to its pillar. For ClickTake, the four pillar pages are the category '
        'index pages: /services (AI), /services (Web), /services (Marketing), and /services '
        '(Creative). The cluster pages are the 24 individual service detail pages. The '
        'current site already has the pillar-cluster structure in place via the ServicesPage '
        'component — what is missing is the strict internal linking discipline that makes '
        'the structure visible to crawlers and useful to users.',
        "BodyJustified"
    ))
    story.append(p(
        'The linking rules below are mandatory for every page in the system. Compliance is '
        'verified by a weekly CI script that crawls every URL, extracts the first 200 words, '
        'and checks for the presence of a contextual link to the parent pillar. Pages that '
        'fail the check are flagged for revision before they can be deployed.',
        "BodyJustified"
    ))

    story.append(spacer(6))
    story.append(p("Hierarchical Linking Rules", "H3"))
    linking_table = [
        ["Link Type", "Direction", "Placement Rule", "Anchor Text Pattern", "Rationale"],
        ["Cluster → Pillar", "Service → Category index", "Within first 200 words of body",
         "Natural inline: ‘our <a>AI development services</a> practice’", "Passes equity up to the pillar"],
        ["Pillar → Cluster", "Category index → Service", "Via service card grid (existing)",
         "Service title as link text (existing)", "Distributes equity across clusters"],
        ["Sibling → Sibling", "Service ↔ Service (same category)", "In ‘Related Services’ section, end of body",
         "Service name + brief context: ‘For deeper <a>RAG pipeline</a> work…’", "Keeps users in-cluster"],
        ["Solution → Service", "Solution → Service (cross-category)", "In ‘Technical Implementation’ section",
         "Service capability: ‘built on our <a>custom LLM</a> platform’", "Bridges industry → capability"],
        ["Service → Solution", "Service → Solution (cross-category)", "In ‘Use Cases’ section",
         "Industry vertical: ‘<a>e-commerce brands</a> use this for…’", "Bridges capability → industry"],
        ["Any → Resource", "Any page → Blog/Case Study/Pricing", "In ‘Related Resources’ footer section",
         "Article title as link text", "Captures research-stage intent"],
    ]
    story.append(styled_table(linking_table, col_widths=[68, 75, 95, 110, 100]))
    story.append(spacer(8))

    # 2.2 — Solution-to-Service Bridge
    story.append(add_heading("2.2 — The Solution-to-Service Bridge", "H2", 1))
    story.append(p(
        'The six Solution pages (/solutions/startups, /solutions/local-businesses, '
        '/solutions/ecommerce-brands, /solutions/repair-shops, /solutions/uk-businesses, '
        '/solutions/agencies) target industry-vertical intent: a prospect searching for '
        '"AI agency for ecommerce brands" lands on /solutions/ecommerce-brands. The 24 '
        'Service pages target capability intent: a prospect searching for "custom LLM '
        'development" lands on /services/ai/llm. The bridge between these two intent '
        'layers is the highest-converting internal link pattern on the site, and it is '
        'currently under-built.',
        "BodyJustified"
    ))
    story.append(p(
        'The bridge mechanism is a dedicated "Technical Implementation" section inserted '
        'into every Solution page, between the "Methodology" and "Business Impact" '
        'sections. This section explicitly names the 3-5 Service pages that deliver the '
        'solution, using natural anchor text that reflects the capability rather than the '
        'service title. The pattern below shows the bridge in context for the ecommerce '
        'solution page.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Solution-to-Service Bridge — Example for /solutions/ecommerce-brands", "H3"))
    story.append(code_block(
        "## Technical Implementation\n\n"
        "Our e-commerce engagement model combines five core capabilities into a\n"
        "single delivery pipeline:\n\n"
        "1. **Storefront engineering** — built on our [headless commerce platform]\n"
        "   (/services/web/ecommerce) with Next.js + Shopify Hydrogen.\n"
        "2. **Conversion optimization** — continuous [CRO experimentation]\n"
        "   (/services/digital-marketing/cro) across PDP, cart, and checkout.\n"
        "3. **Organic acquisition** — [technical SEO] (/services/seo) with\n"
        "   structured data for Product, Offer, and Review schemas.\n"
        "4. **Paid amplification** — [paid advertising] (/services/digital-marketing/\n"
        "   paid-advertising) managed via server-side conversion APIs.\n"
        "5. **Lifetime value growth** — [content strategy] (/services/digital-marketing/\n"
        "   content-strategy) for post-purchase retention flows.\n\n"
        "Each capability is delivered by a dedicated pod within the e-commerce practice,\n"
        "coordinated by a senior delivery lead."
    ))
    story.append(spacer(8))
    story.append(p(
        'The anchor text in the bridge section uses capability language ("headless commerce '
        'platform", "CRO experimentation") rather than service titles ("E-commerce '
        'Development", "Conversion Rate Optimization") because capability language matches '
        'the prospect’s mental model and reads naturally in prose. Service titles are '
        'reserved for the Related Services section at the bottom of the page, where they '
        'appear as card labels — a context where the branded title is the correct signal.',
        "BodyJustified"
    ))

    # 2.3 — Contextual Resource Linking
    story.append(add_heading("2.3 — Contextual Resource Linking: Mandatory Footer Section", "H2", 1))
    story.append(p(
        'Every page on the site — without exception — must end with a "Related Resources" '
        'section that links to at least three and at most six contextually relevant pages '
        'from the blog, case studies, or pricing. This section serves two functions: it '
        'captures prospects who are still in research mode (not yet ready to book a call) '
        'and keeps them on-site rather than bouncing back to Google, and it distributes '
        'link equity to long-tail content that would otherwise be orphaned.',
        "BodyJustified"
    ))
    story.append(p(
        'The resource selection logic prioritizes relevance by tag matching: each blog '
        'post and case study is tagged with one or more service slugs, and the Related '
        'Resources section on any page queries for content tagged with that page’s '
        'service slug. If fewer than three tagged resources exist, the section falls back '
        'to the most recent blog posts in the same category. The section never shows more '
        'than six items to avoid overwhelming the user with choices at the decision point.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Related Resources — Placement & Format Rules", "H3"))
    resource_table = [
        ["Rule", "Specification", "Exception"],
        ["Section title", "‘Related Resources’ (H2, nx-text styling)", "None — title is fixed"],
        ["Placement", "After Final CTA, before footer", "None — always last content section"],
        ["Item count", "Minimum 3, maximum 6", "If <3 tagged resources exist, fill from recent posts"],
        ["Item format", "Card with thumbnail + title + 2-line excerpt", "Text-only fallback on mobile (≤640px)"],
        ["Link target", "Internal pages only (no external)", "None"],
        ["Rel attribute", "‘noopener’ for case studies opening in new tab", "None — internal navigation stays in-tab"],
        ["Refresh cadence", "Re-queried on every page render", "None — always reflects latest content"],
    ]
    story.append(styled_table(resource_table, col_widths=[100, 220, 131]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 6: PILLAR 3 — CONTENT STRATEGY & BRAND VOICE
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Pillar 3: Content Strategy & Brand Voice", "H1", 0))
    story.append(p(
        'Content is where freelancer positioning is most often betrayed. A site can have '
        'world-class visual design and flawless technical SEO, but if the body copy reads '
        'like a solo operator’s portfolio, the prospect will classify the agency as a '
        'freelancer and price the engagement accordingly. This pillar specifies the '
        'vocabulary upgrade, industry-specific authority signals, and the AI copywriting '
        'system prompt that enforces both across all 32 long-form pages.',
        "BodyJustified"
    ))

    # 3.1 — Vocabulary Upgrade
    story.append(add_heading("3.1 — Vocabulary Upgrade: From Feature-Based to Outcome-Based", "H2", 1))
    story.append(p(
        'The vocabulary shift is the single fastest lever for enterprise positioning. '
        'Feature-based language describes what the agency does; outcome-based language '
        'describes what the client achieves. The table below codifies the shift for the '
        '20 most common phrases in the current site copy. Every page on the site must be '
        'audited against this table, and any feature-based phrase must be rewritten in '
        'its outcome-based form before the page can be published.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Vocabulary Upgrade — Feature-Based to Outcome-Based", "H3"))
    vocab_table = [
        ["Feature-Based (Freelancer)", "Outcome-Based (Enterprise)", "Why the Shift Matters"],
        ["We make websites", "We engineer scalable digital ecosystems", "Communicates systems thinking, not page assembly"],
        ["We build chatbots", "We deploy conversational AI with guardrails", "Signals LLM maturity, not script bots"],
        ["We do SEO", "We engineer organic acquisition systems", "Frames SEO as compounding asset, not service"],
        ["We design logos", "We codify brand systems across touchpoints", "Positions design as system, not deliverable"],
        ["We write content", "We architect content moats for category authority", "Frames content as competitive advantage"],
        ["We run ads", "We manage paid acquisition with attribution rigor", "Signals measurement discipline"],
        ["We build apps", "We ship production mobile systems at scale", "Communicates production readiness"],
        ["We fix websites", "We remediate technical debt and harden uptime", "Frames work as engineering, not patching"],
        ["We set up analytics", "We instrument attribution across the full funnel", "Signals measurement infrastructure"],
        ["We do automation", "We design deterministic workflows with audit trails", "Communicates reliability, not scripts"],
        ["We help startups", "We accelerate zero-to-one delivery for founders", "Frames work as velocity, not help"],
        ["We work with small businesses", "We partner with growth-stage operators", "Signals peer relationship, not charity"],
        ["We make pretty designs", "We engineer conversion-optimized interfaces", "Connects design to revenue outcome"],
        ["We are a digital agency", "We are a multi-region engineering organization", "Communicates scale, not services"],
        ["We deliver projects", "We ship production systems with SLA backing", "Signals operational maturity"],
        ["We are passionate", "We are accountable to measurable outcomes", "Replaces emotion with accountability"],
        ["We are creative", "We are systematic in our creative process", "Replaces mystique with process"],
        ["We have experience", "We have shipped 120+ production systems", "Quantifies rather than asserts"],
        ["We are affordable", "We price for outcomes, not hours", "Repositions pricing model"],
        ["Contact us to learn more", "Book a 30-minute scoping call", "Specific CTA vs vague invitation"],
    ]
    story.append(styled_table(vocab_table, col_widths=[150, 165, 136]))
    story.append(spacer(8))

    # 3.2 — Industry-Specific Authority
    story.append(add_heading("3.2 — Industry-Specific Authority Terminology", "H2", 1))
    story.append(p(
        'Enterprise buyers evaluate vendor copy for domain vocabulary. A procurement team '
        'reviewing an AI agency’s service page scans for specific terms — RAG, guardrails, '
        'fine-tuning, evals — as proof that the agency has shipped real systems rather '
        'than read a blog post. The terminology catalogs below specify the mandatory '
        'vocabulary for each of the four practice areas plus the solutions layer. Every '
        'service page in a given category must use at least 8 of the 12 mandatory terms, '
        'and every solution page must use at least 5 of the 8 compliance/workflow terms.',
        "BodyJustified"
    ))

    story.append(spacer(6))
    story.append(p("AI & Automation — Mandatory Terminology", "H3"))
    ai_terms_table = [
        ["Term", "Definition (1-line)", "Where to Use"],
        ["RAG (Retrieval-Augmented Generation)", "Pattern that grounds LLM output in a verified knowledge base", "LLM + Chatbots + CV-NLP pages"],
        ["LLM Guardrails", "Input/output filters that prevent unsafe or off-topic model responses", "LLM + Chatbots + Automation pages"],
        ["Data Privacy (PII redaction)", "Pipeline stage that strips personally identifiable info before model inference", "All AI pages"],
        ["Vector embeddings", "Numerical representations of text used for semantic search and retrieval", "LLM + CV-NLP pages"],
        ["Fine-tuning vs. RAG", "Decision framework: when to retrain weights vs. ground at inference time", "LLM page"],
        ["Eval framework", "Systematic testing protocol for measuring LLM accuracy on domain tasks", "LLM + Chatbots pages"],
        ["Token economics", "Cost-per-request modeling based on input/output token counts", "LLM + Chatbots pages"],
        ["Inference latency (P50/P95)", "Median and tail-end response time percentiles", "LLM + Chatbots + Automation"],
        ["Hallucination rate", "Percentage of model responses that contain fabricated facts", "LLM + Chatbots pages"],
        ["Context window", "Maximum token count the model can process in a single request", "LLM + CV-NLP pages"],
        ["Function calling", "LLM capability to invoke external tools/APIs based on user intent", "Chatbots + Automation pages"],
        ["Audit trail", "Immutable log of every model input, output, and override decision", "All AI pages (compliance)"],
    ]
    story.append(styled_table(ai_terms_table, col_widths=[150, 220, 81]))
    story.append(spacer(8))

    story.append(p("Web & Software — Mandatory Terminology", "H3"))
    web_terms_table = [
        ["Term", "Definition (1-line)", "Where to Use"],
        ["Microservices architecture", "Service decomposition where each business capability runs independently", "Full-stack + SaaS + Custom Software"],
        ["Horizontal scalability", "Ability to add capacity by running more instances, not upgrading hardware", "SaaS + Custom Software + LLM"],
        ["CI/CD pipeline", "Automated build, test, and deploy workflow triggered on every commit", "All Web pages"],
        ["Zero-downtime deployment", "Release strategy that swaps new code in without dropping requests", "SaaS + Custom Software"],
        ["API gateway", "Single entry point that routes, authenticates, and rate-limits external requests", "SaaS + Custom Software + Auth"],
        ["Idempotent operations", "Operations that produce the same result regardless of how many times they run", "Auth + E-commerce + SaaS"],
        ["Observability stack", "Logs + metrics + traces instrumented across every service for debugging", "All Web pages"],
        ["Infrastructure as Code", "Server/network config defined in version-controlled files, not clicked in UI", "SaaS + Custom Software"],
        ["Database sharding", "Horizontal partitioning strategy for scaling write throughput", "SaaS + Custom Software"],
        ["Circuit breaker pattern", "Failure-isolation pattern that prevents cascading service outages", "SaaS + Custom Software"],
        ["Blue-green deployment", "Release strategy with two identical environments for instant rollback", "SaaS + Custom Software"],
        ["SLA (Service Level Agreement)", "Contractual uptime and latency commitments with penalty clauses", "All Web pages"],
    ]
    story.append(styled_table(web_terms_table, col_widths=[150, 220, 81]))
    story.append(spacer(8))

    story.append(p("Digital Marketing — Mandatory Terminology", "H3"))
    mkt_terms_table = [
        ["Term", "Definition (1-line)", "Where to Use"],
        ["ROAS (Return on Ad Spend)", "Revenue generated per dollar of ad investment, expressed as a ratio", "Paid Advertising + CRO"],
        ["LTV (Lifetime Value)", "Projected total revenue a customer generates across the relationship", "Paid Ads + Content + CRO"],
        ["Attribution model", "Rule set for assigning conversion credit across touchpoints in a funnel", "Paid Ads + SEO + Social"],
        ["Multi-touch attribution", "Model that distributes credit across all touchpoints, not just last click", "Paid Ads + SEO"],
        ["Conversion rate (PDP → cart)", "Percentage of product-detail-page viewers who add to cart", "CRO + E-commerce solution"],
        ["Bounce rate (engaged sessions)", "Percentage of sessions with <10s dwell and no scroll", "SEO + Content Strategy"],
        ["Cost per acquisition (CPA)", "Total ad spend divided by number of paying customers acquired", "Paid Advertising"],
        ["Incrementality testing", "Holdout-group methodology for measuring true ad-driven conversions", "Paid Advertising"],
        ["SERP feature capture", "Achieving rich-result placement beyond the standard 10 blue links", "SEO"],
        ["Search Console impressions", "Number of times the site appeared in Google results over a period", "SEO"],
        ["Engagement rate (social)", "Percentage of impressions that produced a like, comment, or share", "Social Media"],
        ["Content velocity", "Cadence of published articles per month, measured for compounding SEO effect", "Content Strategy + SEO"],
    ]
    story.append(styled_table(mkt_terms_table, col_widths=[150, 220, 81]))
    story.append(spacer(8))

    story.append(p("Solutions — Compliance & Workflow Terminology", "H3"))
    sol_terms_table = [
        ["Term", "Industry Context", "Where to Use"],
        ["FCA compliance", "UK Financial Conduct Authority rules for financial services marketing", "UK Businesses solution"],
        ["GDPR data subject rights", "EU regulation: access, rectification, erasure, portability", "UK Businesses + E-commerce"],
        ["PCI-DSS Level 1", "Payment Card Industry security standard for processing card data", "E-commerce + Repair Shops"],
        ["HIPAA business associate", "US healthcare privacy rule for vendors handling PHI", "UK Businesses (healthcare clients)"],
        ["SOC 2 Type II", "Audited controls report for security, availability, confidentiality", "SaaS + Custom Software"],
        ["ISO 27001", "International standard for information security management systems", "SaaS + Custom Software"],
        ["KYC (Know Your Customer)", "Identity verification workflow required for financial onboarding", "UK Businesses + E-commerce"],
        ["Audit log immutability", "Append-only logging pattern for regulated industry record-keeping", "All Solutions"],
    ]
    story.append(styled_table(sol_terms_table, col_widths=[150, 220, 81]))
    story.append(spacer(8))

    # 3.3 — Master AI Copywriting Prompt
    story.append(add_heading("2.3 — Master AI Copywriting System Prompt", "H2", 1))
    story.append(p(
        'The system prompt below is used to generate or revise every long-form page on the '
        'site. It enforces the 12-section deep-dive structure, mandates natural contextual '
        'linking, requires 2,500+ words of original analysis, and maintains a McKinsey-'
        'level professional tone. The prompt is versioned in the repository at '
        '/prompts/deep-dive-writer.md and any change to it requires review by both the '
        'Content Lead and the SEO Lead before deployment.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Master AI Copywriting Prompt (use as system message)", "H3"))
    story.append(code_block(
        'You are the Senior Content Architect at ClickTake Technologies, a multi-region\n'
        'engineering organization with offices in Birmingham, Multan, Austin, and Dubai.\n'
        'You write long-form service, solution, and corporate pages that position the\n'
        'agency as a $50,000+ enterprise partner. Your output is held to McKinsey-grade\n'
        'editorial standards: every claim is backed by a number, every paragraph adds\n'
        'specifications or logical transitions, and every section earns its word count.\n\n'
        'TASK: Write a 2,500-3,500 word deep-dive page for the service/solution titled\n'
        '"[PAGE TITLE]". The page must follow this 12-section structure exactly:\n\n'
        '  1. HERO — Eyebrow chip, H1, subtitle, GEO definition (3-sentence encyclopedic\n'
        '     definition for AI engine citation), 2 CTAs, 3 stats, 3D character variant.\n'
        '  2. PROBLEM — 250+ words on the specific technical/business problem this\n'
        '     service solves. Quantify the cost of inaction (revenue loss, latency,\n'
        '     compliance risk). Cite at least 2 industry data points.\n'
        '  3. DEEP DIVE — 400+ words explaining the technical approach. Use 5+ mandatory\n'
        '     category terms (see terminology catalog). Include 1 comparison table.\n'
        '  4. TECH STACK — Bullet grid of technologies with version numbers and rationale\n'
        '     for each choice. 8-12 items minimum.\n'
        '  5. METHODOLOGY — 5-7 step delivery process as a timeline. Each step has a\n'
        '     deliverable and a measurable exit criterion.\n'
        '  6. USE CASES — 3 use case cards (Problem / Application / Result format).\n'
        '     Each result must include a number.\n'
        '  7. COMPARATIVE ANALYSIS — Table comparing this service to 3 alternatives\n'
        '     (DIY, generic agency, specialized competitor). 6+ comparison dimensions.\n'
        '  8. BUSINESS IMPACT — 250+ words on ROI mechanics. Cite 3 case study data\n'
        '     points. Include 1 pull quote from a (fictional but realistic) client.\n'
        '  9. INTEGRATIONS — Pill list of 12+ tools/platforms this service integrates\n'
        '     with. Group by category (data, auth, analytics, etc.).\n'
        ' 10. CASE STUDIES — 2 STAR-method case studies (Situation, Task, Action,\n'
        '     Result). Each result must include a number and a timeframe.\n'
        ' 11. FAQ — 10-14 questions across 4 categories. Each answer 50-100 words.\n'
        '     Output as FAQPage JSON-LD schema for Google Rich Results eligibility.\n'
        ' 12. FINAL CTA — Title, subtitle, 3-step process, primary CTA + secondary CTA.\n\n'
        'LINKING RULES (MANDATORY):\n'
        '  - Within the first 200 words of section 2 (Problem), include 1 contextual\n'
        '    link to the parent pillar page using natural anchor text.\n'
        '  - In section 6 (Use Cases), include 1-2 sibling service links using\n'
        '    capability language as anchor text (e.g., "built on our <a>custom LLM</a>\n'
        '    platform").\n'
        '  - In section 8 (Business Impact), include 1 solution page link using\n'
        '    industry-vertical anchor text.\n'
        '  - All anchor text must read naturally in prose. Never use "click here" or\n'
        '    the raw URL.\n\n'
        'TONE OF VOICE:\n'
        '  - Outcome-based, not feature-based. Every sentence describes what the client\n'
        '    achieves, not what the agency does.\n'
        '  - McKinsey-grade precision. Every claim has a number, every metric has a\n'
        '    unit, every comparison has a dimension.\n'
        '  - Anti-fluff. Forbidden words: cutting-edge, revolutionary, world-class,\n'
        '    best-in-class, leading, premier, top-tier, innovative, transformative.\n'
        '    These words signal freelancer positioning.\n'
        '  - Senior voice. The reader is a CTO, Head of Product, or VP Engineering.\n'
        '    Do not explain basic concepts. Do define specialized terms on first use.\n'
        '  - Active voice. Passive constructions are permitted only when the actor is\n'
        '    genuinely unknown or when passive improves flow.\n\n'
        'FORBIDDEN PATTERNS:\n'
        '  - Single-sentence paragraphs. Minimum 3 sentences per paragraph.\n'
        '  - Bullet lists without explanatory context. Every list must be framed by a\n'
        '    sentence explaining why the list matters.\n'
        '  - Conclusions that restate the introduction. The final section must add new\n'
        '    information or a new framing.\n'
        '  - "As mentioned above" or "as discussed earlier". Each section must stand\n'
        '    alone — readers may jump directly to any section from the sticky ToC.\n\n'
        'OUTPUT FORMAT: TypeScript module exporting a DeepDiveContent object that\n'
        'matches the schema in /src/components/site/deep-dive/deep-dive-types.ts.\n'
        'The content is rendered by DeepDiveLayout, which handles the sticky ToC,\n'
        'reading progress bar, 3D character dividers, and FAQ JSON-LD schema\n'
        'automatically. Do not emit raw HTML — emit the typed content object.'
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 7: ADMIN UI REDESIGN
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Admin UI Redesign Specifications", "H1", 0))
    story.append(p(
        'The admin interface is the operational surface of the agency. It is the place '
        'where the team spends hours every day, where prospects and partners occasionally '
        'land during audits, and where the visual quality bar must be as high as the '
        'public site. This section documents the redesign shipped in this cycle — the '
        'login button visibility fix, the theme system architecture, and the responsive '
        'breakpoint additions — as a case study in applying enterprise standards equally '
        'to internal and external surfaces.',
        "BodyJustified"
    ))

    # 4.1 — Login Button Fix
    story.append(add_heading("4.1 — Login Button Visibility Fix", "H2", 1))
    story.append(p(
        'The admin login button was reported invisible due to a white-on-white color '
        'scheme. Root cause analysis revealed the issue was not a token misconfiguration '
        'but a Tailwind v4 gradient utility reliability problem. The button used the '
        'class combination bg-gradient-to-r from-brand-blue to-brand-pink with text-'
        'white. In Tailwind v4, the custom utility classes .from-brand-blue and '
        '.to-brand-pink (defined in globals.css) set the --tw-gradient-from and --tw-'
        'gradient-to CSS variables but did not reliably trigger the gradient application '
        'on the element. The result: the button rendered with no background, leaving '
        'white text invisible on the white (light mode) page background.',
        "BodyJustified"
    ))
    story.append(p(
        'The fix replaces the Tailwind gradient utility classes with an inline style '
        'attribute that hard-codes the brand gradient. This approach is rendering-'
        'engine-independent: the gradient is baked into the HTML at SSR time and '
        'displayed identically by every browser, regardless of Tailwind version or '
        'utility resolution order. The same pattern was applied to the logo block, '
        'the forgot-password page, and the create-admin page — all three auth surfaces '
        'now use inline gradients for guaranteed visibility in both light and dark mode.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Admin Login Button — Before vs After", "H3"))
    login_fix_table = [
        ["Property", "Before (Broken)", "After (Fixed)"],
        ["Background class", "bg-gradient-to-r from-brand-blue to-brand-pink", "style={{ background: linear-gradient(...) }}"],
        ["Render in light mode", "No background (white text on white = invisible)", "Pink-purple-blue gradient (always visible)"],
        ["Render in dark mode", "Intermittent gradient (depends on utility resolution)", "Same gradient (consistent)"],
        ["Card background", "bg-card/70 (translucent — collapses to near-white on white)", "bg-card (solid — clearly distinguishable)"],
        ["Input background", "bg-background/60 (translucent)", "bg-background (solid) + placeholder:text-muted-foreground/70"],
        ["Link color", "text-brand-blue (resolves to #136DFF, low contrast on white)", "text-[#FF53A9] with dark: variants for AA contrast"],
        ["Background orbs", "brand-blue/20 with blur-2xl", "[#136DFF]/15 with blur-3xl + animate-pulse"],
        ["Hover behavior", "Not visible (button had no bg to hover)", "Gradient shifts to deeper brand gradient on hover"],
    ]
    story.append(styled_table(login_fix_table, col_widths=[120, 175, 156]))
    story.append(spacer(8))

    # 4.2 — Theme System
    story.append(add_heading("4.2 — Theme System Architecture", "H2", 1))
    story.append(p(
        'The admin theme system follows the always-dark pattern used by Stripe, Vercel, '
        'and Linear dashboards. The .ct-admin wrapper hard-codes dark CSS variables '
        '(background #03000D, foreground #F0EBF8, card #0D0025) so the admin renders '
        'correctly regardless of the html.dark class state. This is intentional: admin '
        'interfaces are typically used for extended sessions, and the dark palette '
        'reduces eye strain during long-form content editing, data review, and CRM work.',
        "BodyJustified"
    ))
    story.append(p(
        'The auth pages (login, forgot-password, create-admin) are the exception. They '
        'do not use the .ct-admin wrapper and instead use the global --background and '
        '--foreground tokens, which means they respect the user’s theme preference. A '
        'user who has set the public site to light mode will see the login page in '
        'light mode; a user who has set it to dark will see it in dark mode. The brand '
        'gradient button is identical in both modes because it is hard-coded inline. '
        'The color-scheme: dark property was added to the .ct-admin wrapper so native '
        'form controls (scrollbars, date pickers, checkbox accents) render in dark mode '
        'within the admin, even when the user’s preference is light.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Theme System — Surface-by-Surface Strategy", "H3"))
    theme_table = [
        ["Surface", "Theme Strategy", "Rationale"],
        ["Admin dashboard (.ct-admin)", "Always dark (hard-coded tokens)", "Extended-session eye strain reduction"],
        ["Admin login page", "Follows user preference (global tokens)", "First impression — match public site"],
        ["Admin forgot-password", "Follows user preference (global tokens)", "Consistency with login"],
        ["Admin create-admin", "Follows user preference (global tokens)", "Consistency with login"],
        ["Public site (NxPageLayout)", "Follows user preference (nx-* tokens)", "Marketing surface — let user choose"],
        ["Public site (NxNavbar)", "Follows user preference (theme-aware)", "Navigation — match page theme"],
        ["Public site (NxFooter)", "Always dark (intentional contrast block)", "Visual anchor — SaaS pattern"],
        ["Public site (NxPageHero)", "Always dark (nx-hero-bg gradient)", "Hero consistency across pages"],
        ["Public site (deep-dive final CTA)", "Always brand gradient (solid)", "White text on saturated gradient = AA in both modes"],
    ]
    story.append(styled_table(theme_table, col_widths=[150, 175, 126]))
    story.append(spacer(8))

    # 4.3 — Responsive Breakpoints
    story.append(add_heading("4.3 — Responsive Breakpoint Additions", "H2", 1))
    story.append(p(
        'The admin CSS previously had a single breakpoint at 768px (mobile sidebar '
        'transformation). This cycle added two additional breakpoints to cover the full '
        'device landscape: a small-mobile breakpoint at 480px (where stat grids collapse '
        'to 1 column and the live clock hides to save space) and a tablet breakpoint '
        'covering 769-1024px (where the sidebar narrows to 200px). The complete '
        'breakpoint catalog is documented below.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("Admin Responsive Breakpoints", "H3"))
    responsive_table = [
        ["Breakpoint", "Target Devices", "Layout Changes", "Rationale"],
        ["≤ 480px (small mobile)", "iPhone SE, Galaxy Fold closed", "Stat/monitor grids → 1 column; live clock hidden; content padding 8px", "Prevent horizontal scroll on narrow viewports"],
        ["481-768px (mobile)", "iPhone 14, Galaxy S23", "Sidebar transforms off-canvas; breadcrumb hidden; content padding 12px", "Touch-first single-column interaction"],
        ["769-1024px (tablet)", "iPad, Galaxy Tab", "Sidebar narrows to 200px; content padding 18px", "Maintain sidebar visibility on landscape tablets"],
        ["≥ 1025px (desktop)", "Laptop, desktop", "Full 240px sidebar; standard content padding 24px", "Multi-column dashboard grids active"],
    ]
    story.append(styled_table(responsive_table, col_widths=[110, 110, 160, 71]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 8: IMPLEMENTATION ROADMAP
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Implementation Roadmap", "H1", 0))
    story.append(p(
        'The full enterprise repositioning program runs 12 weeks across four phases. '
        'Each phase has a single accountable owner, a defined exit criterion, and a '
        'dependency on the previous phase. The phases are sequential — parallelization '
        'is not appropriate here because each phase’s output is the input to the next. '
        'The timeline below assumes a dedicated team of 4 (Frontend Lead, 3D Artist, '
        'Content Architect, SEO Lead) plus part-time support from Design and DevOps.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("12-Week Implementation Roadmap", "H3"))
    roadmap_table = [
        ["Phase", "Weeks", "Workstream", "Exit Criterion", "Owner"],
        ["1 — 3D Asset Creation", "1-3", "Model + rig 24 unique 3D assets per service mapping in section 1.1. Integrate into DeepDiveLayout with lazy loading.",
         "All 24 service pages render with their unique 3D asset. Lighthouse Performance ≥ 90 on every page.", "3D Artist + Frontend Lead"],
        ["2 — SEO Silo Architecture", "4-6", "Implement Hub & Spoke linking rules. Add Solution-to-Service bridge sections. Add Related Resources section to every page.",
         "Weekly CI crawl reports 0 orphan pages. Internal link depth ≥ 3 for every URL.", "SEO Lead + Frontend Lead"],
        ["3 — Content Rewrite", "7-9", "Rewrite all 32 long-form pages using the Master AI Copywriting Prompt. Apply vocabulary upgrade table to every page.",
         "Every page ≥ 2,500 words. Every page uses ≥ 8 mandatory category terms. Every page has 1+ pull quote + 2+ STAR case studies.", "Content Architect"],
        ["4 — QA + Launch", "10-12", "Lighthouse audit across all 32 pages. Cross-browser testing (Chrome, Safari, Firefox, Edge). Mobile device testing (iOS, Android). Performance optimization pass.",
         "Lighthouse Performance/Accessibility/Best Practices/SEO ≥ 90 on every page. Zero P0 bugs. Deploy to production.", "DevOps + Frontend Lead"],
    ]
    story.append(styled_table(roadmap_table, col_widths=[95, 38, 175, 110, 33]))
    story.append(spacer(8))
    story.append(p(
        'The critical path runs through Phase 1 (3D assets) because Phase 3 (content '
        'rewrite) references the 3D character variants in the hero section of each page. '
        'If Phase 1 slips, Phase 3 must slip correspondingly. Phase 2 (SEO architecture) '
        'can run in parallel with Phase 1 because the linking rules are implemented in '
        'the DeepDiveLayout component, not in the content itself. The recommended '
        'approach is to start Phase 2 in week 2 (overlapping with Phase 1) to compress '
        'the timeline by one week without adding risk.',
        "BodyJustified"
    ))
    story.append(p(
        'The total program budget is dominated by Phase 1 (3D asset creation). Each '
        'asset requires approximately 16 hours of senior 3D artist time — 4 hours for '
        'concept sketching, 8 hours for modeling and rigging, and 4 hours for '
        'integration testing. At a blended rate of $120/hour, the 24 assets total '
        '$46,080. Phases 2-4 are largely internal labor and add approximately $24,000 '
        'in opportunity cost. The total program investment is approximately $70,000, '
        'which is recovered with the first $50K+ enterprise engagement won post-launch.',
        "BodyJustified"
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 9: SUCCESS METRICS & KPIs
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Success Metrics & KPIs", "H1", 0))
    story.append(p(
        'Success is measured across four dimensions: visual quality, SEO performance, '
        'content quality, and business impact. Each dimension has 3-5 KPIs with a '
        'current baseline, a 90-day target, and a defined measurement method. The KPIs '
        'below are tracked in a weekly dashboard reviewed by the Content Lead, SEO Lead, '
        'and Frontend Lead. Any KPI that misses target for two consecutive weeks '
        'triggers a root-cause analysis and a corrective action plan.',
        "BodyJustified"
    ))
    story.append(spacer(6))
    story.append(p("KPI Dashboard — 4 Dimensions, 14 Metrics", "H3"))
    kpi_table = [
        ["Dimension", "KPI", "Baseline", "90-Day Target", "Measurement"],
        ["Visual", "3D asset uniqueness per page", "1 of 4 variants (shared)", "24 of 24 unique", "Manual audit + asset hash check"],
        ["Visual", "Lighthouse Performance score", "82 (avg)", "≥ 90 on all pages", "Weekly CI run"],
        ["Visual", "Lighthouse Accessibility score", "94 (avg)", "100 on all pages", "Weekly CI run"],
        ["SEO", "Orphan page count", "8 pages", "0 pages", "Weekly crawl (Screaming Frog)"],
        ["SEO", "Internal link depth (avg)", "2.1", "≥ 3.0", "Crawl analysis"],
        ["SEO", "Organic traffic (monthly)", "4,200 sessions", "8,000 sessions", "Google Search Console"],
        ["SEO", "Enterprise keyword rankings", "0 in top 10", "12 in top 10", "Ahrefs position tracking"],
        ["Content", "Avg word count per page", "2,800", "≥ 2,500 (maintain)", "CI script on every PR"],
        ["Content", "Avg time on page", "1m 42s", "≥ 3m 00s", "Vercel Analytics"],
        ["Content", "Bounce rate (engaged sessions)", "68%", "≤ 55%", "Google Analytics 4"],
        ["Content", "Mandatory term usage per page", "3-5 of 12", "≥ 8 of 12", "CI lint against terminology catalog"],
        ["Business", "Avg project value (won deals)", "$8,400", "≥ $50,000", "CRM (HubSpot)"],
        ["Business", "Inbound enterprise leads/month", "2", "≥ 8", "CRM lead source = inbound"],
        ["Business", "Sales cycle length", "12 days", "≥ 28 days (longer = enterprise)", "CRM stage duration"],
    ]
    story.append(styled_table(kpi_table, col_widths=[58, 145, 78, 88, 82]))
    story.append(spacer(8))
    story.append(callout(
        'The single most important KPI is "Avg project value (won deals)". If that '
        'number does not move from $8,400 to $50,000+ within 90 days of launch, the '
        'repositioning has failed regardless of how the other 13 KPIs perform. The '
        'other metrics are leading indicators; project value is the lagging indicator '
        'that determines whether the program paid for itself.',
        "North-Star KPI"
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 10: CONCLUSION & NEXT STEPS
    # ═══════════════════════════════════════════════════════════════════════
    story.append(add_heading("Conclusion & Next Steps", "H1", 0))
    story.append(p(
        'This brief specifies the three pillars — visual and motion design, technical '
        'SEO silo architecture, and content strategy with brand voice — plus the admin '
        'UI redesign that together transition ClickTake Technologies from a freelancer '
        'aesthetic to a verifiable $50,000+ enterprise agency standard. The core thesis '
        'bears repeating: premium positioning is engineered through measurable '
        'structural decisions, not declared through marketing language. A site with '
        'bespoke 3D assets per service page, a strict Hub & Spoke linking architecture, '
        'and outcome-based copy that uses mandatory industry terminology does not need '
        'to claim it is an enterprise agency — it self-evidently is one.',
        "BodyJustified"
    ))
    story.append(p(
        'The 12-week implementation roadmap is sequenced, owned, and budgeted. The KPI '
        'dashboard is defined with baselines, targets, and measurement methods. The '
        'admin UI redesign documented in section 7 is already shipped, demonstrating '
        'that the standards specified in this brief are achievable in the current code '
        'base. What remains is the decision to begin.',
        "BodyJustified"
    ))
    story.append(spacer(10))
    story.append(pull_quote(
        'The difference between a $5,000 proposal and a $50,000 proposal is not the '
        'scope of work. It is the visual depth, the link architecture, and the '
        'vocabulary discipline that signal — before the first call — which category '
        'the agency belongs to. Engineering those signals is the work. Everything '
        'else follows.',
        "ClickTake Technologies — Strategy Brief v1.0"
    ))
    story.append(spacer(12))
    story.append(add_heading("Approval & Kickoff", "H2", 1))
    story.append(p(
        'To begin the 12-week enterprise repositioning program, the following three '
        'actions are required from leadership this week:',
        "Body"
    ))
    story.append(bullet("<b>Approve this brief</b> in its current form or with documented revisions. Approval unlocks Phase 1 budget allocation."))
    story.append(bullet("<b>Allocate the Phase 1 budget</b> ($46,080) for 3D asset creation. This is the only phase requiring external spend; Phases 2-4 are internal labor."))
    story.append(bullet("<b>Schedule the kickoff meeting</b> with the four-person delivery team (Frontend Lead, 3D Artist, Content Architect, SEO Lead) and the executive sponsor."))
    story.append(spacer(10))
    story.append(p(
        'On approval, the delivery team will publish a detailed week-by-week sprint '
        'plan within 48 hours, with the first 3D asset (Custom LLM Solutions) scheduled '
        'for delivery review at the end of week 1. Weekly progress reviews are held '
        'every Friday at 14:00 BST for the duration of the 12-week program.',
        "BodyJustified"
    ))
    story.append(spacer(20))
    story.append(hr(BRAND_PINK, 1.5, 4, 12))
    story.append(p(
        '<font name="MonoFont" color="#6E5F80" size="8">'
        'Document end. Prepared by ClickTake Technologies — Strategy &amp; Delivery. '
        'For questions or revision requests, contact the Content Architect.'
        '</font>',
        "Body"
    ))

    # ─── Build ──────────────────────────────────────────────────────────────
    doc.multiBuild(story)
    print(f"PDF generated: {output_path}")
    print(f"File size: {os.path.getsize(output_path):,} bytes")


if __name__ == "__main__":
    output = "/home/z/my-project/download/clicktake-enterprise-design-brief.pdf"
    os.makedirs(os.path.dirname(output), exist_ok=True)
    build_pdf(output)
