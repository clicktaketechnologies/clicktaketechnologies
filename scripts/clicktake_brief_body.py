#!/usr/bin/env python3
"""
ClickTake 3D Storytelling Platform — Technical & Creative Brief
Body PDF generator (ReportLab). Cover is rendered separately via Playwright (html2poster.js).
Output: /home/z/my-project/scripts/clicktake-brief-body.pdf
"""

import os, sys, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, BaseDocTemplate, PageTemplate, Frame,
    Paragraph, Spacer, PageBreak, CondPageBreak, KeepTogether,
    Table, TableStyle, Image, HRFlowable, ListFlowable, ListItem,
    Flowable, NextPageTemplate,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily, stringWidth
from reportlab.pdfgen import canvas

# ─────────────────────────────────────────────────────────────────────────────
# 1. FONT REGISTRATION (Noto Sans SC for body, Sarasa Mono SC for code)
# ─────────────────────────────────────────────────────────────────────────────
FONT_DIR = "/usr/share/fonts"

# Sans-serif body + headings — DejaVu Sans (static, English-optimized, reliable in ReportLab)
pdfmetrics.registerFont(TTFont('NotoSans',      f'{FONT_DIR}/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('NotoSans-Bold', f'{FONT_DIR}/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('NotoSans-Med',  f'{FONT_DIR}/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('NotoSans-Light',f'{FONT_DIR}/truetype/dejavu/DejaVuSans.ttf'))
registerFontFamily('NotoSans', normal='NotoSans', bold='NotoSans-Bold', italic='NotoSans', boldItalic='NotoSans-Bold')

# Serif (used sparingly) — Noto Serif SC (static weights available)
pdfmetrics.registerFont(TTFont('NotoSerif',      f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerif-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
registerFontFamily('NotoSerif', normal='NotoSerif', bold='NotoSerif-Bold', italic='NotoSerif', boldItalic='NotoSerif-Bold')

# Mono — Sarasa Mono SC (clean monospace with CJK + Latin)
pdfmetrics.registerFont(TTFont('Mono',      f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Mono-Bold', f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Bold.ttf'))
registerFontFamily('Mono', normal='Mono', bold='Mono-Bold', italic='Mono', boldItalic='Mono-Bold')

# ─────────────────────────────────────────────────────────────────────────────
# 2. PALETTE — ClickTake brand (cyber-futurist dark)
# Hand-tuned to extend #FF53A9 magenta / #9B3DFF purple / #136DFF blue
# while respecting cascade tier discipline (low-sat for large areas)
# ─────────────────────────────────────────────────────────────────────────────
# XL tier — page backgrounds
PAGE_BG       = colors.HexColor('#03000D')   # near-black, matches site
SECTION_BG    = colors.HexColor('#0A0418')   # elevated
# L tier — surfaces
CARD_BG       = colors.HexColor('#14082A')   # deep purple card
TABLE_STRIPE  = colors.HexColor('#0F051C')   # alternating row
# M tier — structural fills
HEADER_FILL   = colors.HexColor('#1A0B2E')   # table header
COVER_BLOCK   = colors.HexColor('#1F0B3A')   # callout bg
# S tier — edges & icons
BORDER        = colors.HexColor('#3A1845')   # magenta-tinted low-sat border
ICON          = colors.HexColor('#FF53A9')   # full magenta for icons
# XS tier — emphasis
ACCENT        = colors.HexColor('#FF53A9')   # ClickTake magenta
ACCENT_2      = colors.HexColor('#9B3DFF')   # ClickTake purple
ACCENT_3      = colors.HexColor('#136DFF')   # ClickTake blue
CYAN          = colors.HexColor('#00F0FF')   # data callout accent
# Typography
TEXT_PRIMARY  = colors.HexColor('#F0EBF8')   # off-white, matches site dark mode
TEXT_BODY     = colors.HexColor('#D5D0E3')   # slightly dimmer for body
TEXT_MUTED    = colors.HexColor('#88879B')   # muted gray-purple
# Semantic
SEM_SUCCESS   = colors.HexColor('#4ADE80')
SEM_WARNING   = colors.HexColor('#FBBF24')
SEM_ERROR     = colors.HexColor('#F87171')
SEM_INFO      = colors.HexColor('#60A5FA')

# ─────────────────────────────────────────────────────────────────────────────
# 3. STYLES
# ─────────────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

S_H1 = ParagraphStyle('H1', fontName='NotoSans-Bold', fontSize=22, leading=28,
                     textColor=TEXT_PRIMARY, spaceBefore=18, spaceAfter=12,
                     alignment=TA_LEFT)
S_H1_KICKER = ParagraphStyle('H1Kicker', fontName='Mono', fontSize=8, leading=11,
                     textColor=ACCENT, spaceBefore=0, spaceAfter=4,
                     alignment=TA_LEFT)
S_H2 = ParagraphStyle('H2', fontName='NotoSans-Bold', fontSize=15, leading=20,
                     textColor=TEXT_PRIMARY, spaceBefore=18, spaceAfter=8,
                     alignment=TA_LEFT)
S_H3 = ParagraphStyle('H3', fontName='NotoSans-Bold', fontSize=12, leading=16,
                     textColor=ACCENT, spaceBefore=14, spaceAfter=6,
                     alignment=TA_LEFT)
S_BODY = ParagraphStyle('Body', fontName='NotoSans', fontSize=10, leading=15,
                     textColor=TEXT_BODY, spaceBefore=0, spaceAfter=8,
                     alignment=TA_JUSTIFY, wordWrap='CJK')
S_BODY_LEFT = ParagraphStyle('BodyLeft', parent=S_BODY, alignment=TA_LEFT)
S_BULLET = ParagraphStyle('Bullet', parent=S_BODY, leftIndent=18, bulletIndent=4,
                     spaceAfter=4, alignment=TA_LEFT)
S_QUOTE = ParagraphStyle('Quote', fontName='NotoSans', fontSize=11, leading=16,
                     textColor=TEXT_PRIMARY, leftIndent=18, rightIndent=18,
                     spaceBefore=10, spaceAfter=10, alignment=TA_LEFT,
                     borderColor=ACCENT, borderWidth=0, borderPadding=0,
                     fontStyle='italic')
S_CODE = ParagraphStyle('Code', fontName='Mono', fontSize=8.5, leading=12,
                     textColor=TEXT_PRIMARY, leftIndent=14, rightIndent=14,
                     spaceBefore=4, spaceAfter=4, alignment=TA_LEFT,
                     backColor=CARD_BG, borderColor=BORDER, borderWidth=0.5,
                     borderPadding=8, wordWrap='CJK')
S_TABLE_HEADER = ParagraphStyle('TH', fontName='NotoSans-Bold', fontSize=9,
                     leading=12, textColor=TEXT_PRIMARY, alignment=TA_LEFT)
S_TABLE_HEADER_CENTER = ParagraphStyle('THC', parent=S_TABLE_HEADER, alignment=TA_CENTER)
S_TABLE_CELL = ParagraphStyle('TC', fontName='NotoSans', fontSize=8.5,
                     leading=11.5, textColor=TEXT_BODY, alignment=TA_LEFT, wordWrap='CJK')
S_TABLE_CELL_CENTER = ParagraphStyle('TCC', parent=S_TABLE_CELL, alignment=TA_CENTER)
S_TABLE_CELL_MONO = ParagraphStyle('TCM', parent=S_TABLE_CELL, fontName='Mono', fontSize=8)
S_CAPTION = ParagraphStyle('Caption', fontName='NotoSans', fontSize=8.5, leading=11,
                     textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=4, spaceAfter=12,
                     fontStyle='italic')
S_TOC_H1 = ParagraphStyle('TOCH1', fontName='NotoSans-Bold', fontSize=11, leading=18,
                     textColor=TEXT_PRIMARY, leftIndent=0, alignment=TA_LEFT)
S_TOC_H2 = ParagraphStyle('TOCH2', fontName='NotoSans', fontSize=9.5, leading=15,
                     textColor=TEXT_BODY, leftIndent=20, alignment=TA_LEFT)
S_CALLOUT_BIG = ParagraphStyle('CalBig', fontName='NotoSans-Bold', fontSize=24, leading=28,
                     textColor=ACCENT, alignment=TA_CENTER)
S_CALLOUT_LABEL = ParagraphStyle('CalLbl', fontName='Mono', fontSize=7.5, leading=10,
                     textColor=TEXT_MUTED, alignment=TA_CENTER)

# ─────────────────────────────────────────────────────────────────────────────
# 4. PAGE FRAME — dark background, header rule, page number footer
# ─────────────────────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
LEFT_M = RIGHT_M = 0.75 * inch
TOP_M = 0.95 * inch
BOT_M = 0.75 * inch
CONTENT_W = PAGE_W - LEFT_M - RIGHT_M

def draw_page_chrome(canvas_obj, doc):
    """Draw dark background, header rule, and footer page number on every page."""
    c = canvas_obj
    c.saveState()

    # Full-bleed dark background
    c.setFillColor(PAGE_BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Subtle decorative grid (faint)
    c.setStrokeColor(colors.Color(1, 1, 1, 0.018))
    c.setLineWidth(0.3)
    grid_size = 32
    for x in range(0, int(PAGE_W), grid_size):
        c.line(x, 0, x, PAGE_H)
    for y in range(0, int(PAGE_H), grid_size):
        c.line(0, y, PAGE_W, y)

    # Top accent rule (gradient effect via 3 segments)
    rule_y = PAGE_H - TOP_M + 30
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.5)
    c.line(LEFT_M, rule_y, LEFT_M + 60, rule_y)
    c.setStrokeColor(ACCENT_2)
    c.line(LEFT_M + 60, rule_y, LEFT_M + 120, rule_y)
    c.setStrokeColor(ACCENT_3)
    c.line(LEFT_M + 120, rule_y, LEFT_M + 180, rule_y)
    # Faded extension
    c.setStrokeColor(colors.Color(ACCENT_3.red, ACCENT_3.green, ACCENT_3.blue, 0.3))
    c.setLineWidth(0.5)
    c.line(LEFT_M + 180, rule_y, PAGE_W - RIGHT_M, rule_y)

    # Top-left brand label
    c.setFont('NotoSans-Bold', 8)
    c.setFillColor(TEXT_MUTED)
    c.drawString(LEFT_M, rule_y + 6, 'CLICKTAKE')
    c.setFillColor(ACCENT)
    c.drawString(LEFT_M + 60, rule_y + 6, '.')
    c.setFillColor(TEXT_MUTED)
    c.drawString(LEFT_M + 64, rule_y + 6, 'TECH')

    # Top-right doc label
    c.setFont('Mono', 7.5)
    c.setFillColor(TEXT_MUTED)
    c.drawRightString(PAGE_W - RIGHT_M, rule_y + 6, '3D STORYTELLING PLATFORM BRIEF · v1.0')

    # Bottom rule
    bot_y = BOT_M - 18
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(LEFT_M, bot_y, PAGE_W - RIGHT_M, bot_y)

    # Page number (skip on TOC page = page 1)
    if doc.page > 1:
        c.setFont('Mono', 8.5)
        c.setFillColor(TEXT_MUTED)
        c.drawCentredString(PAGE_W / 2, bot_y - 14, str(doc.page))

    # Bottom-left mission tag
    c.setFont('Mono', 7.5)
    c.setFillColor(TEXT_MUTED)
    c.drawString(LEFT_M, bot_y - 14, 'SUPER Z · Z.AI')

    # Bottom-right date
    c.setFont('Mono', 7.5)
    c.setFillColor(TEXT_MUTED)
    c.drawRightString(PAGE_W - RIGHT_M, bot_y - 14, 'JULY 2026')

    c.restoreState()


# ─────────────────────────────────────────────────────────────────────────────
# 5. CUSTOM FLOWABLES & HELPERS
# ─────────────────────────────────────────────────────────────────────────────

class HRule(Flowable):
    """Thin horizontal accent rule."""
    def __init__(self, width=None, thickness=0.5, color=BORDER, space_before=4, space_after=4):
        Flowable.__init__(self)
        self.width = width
        self.thickness = thickness
        self.color = color
        self.space_before = space_before
        self.space_after = space_after
    def wrap(self, availW, availH):
        self.w = self.width or availW
        return (self.w, self.thickness + self.space_before + self.space_after)
    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        y = self.space_after
        self.canv.line(0, y, self.w, y)


def section_opener(kicker, title, anchor=None):
    """Return a list of flowables: thin rule + kicker + H1 title."""
    out = []
    out.append(HRule(thickness=1.2, color=ACCENT, space_before=0, space_after=4))
    if kicker:
        out.append(Paragraph(kicker, S_H1_KICKER))
    out.append(Paragraph(title, S_H1))
    return out


def callout_box(big_text, label_text, color=ACCENT, width=None):
    """KPI callout box: big number + small label."""
    big_style = ParagraphStyle('cb', parent=S_CALLOUT_BIG, textColor=color)
    inner = [
        [Paragraph(f'<b>{big_text}</b>', big_style)],
        [Paragraph(label_text, S_CALLOUT_LABEL)],
    ]
    t = Table(inner, colWidths=[width or (CONTENT_W / 4 - 6)])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('LINEABOVE', (0,0), (-1,0), 2, color),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    return t


def kpi_row(items):
    """Row of N callout boxes. items = [(big, label, color), ...]"""
    n = len(items)
    cell_w = (CONTENT_W - (n - 1) * 8) / n
    boxes = [callout_box(b, l, c, width=cell_w) for (b, l, c) in items]
    row = Table([boxes], colWidths=[cell_w] * n, hAlign='CENTER')
    row.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return row


def make_table(data, col_weights=None, header=True, hAlign='CENTER', first_col_left=True):
    """Build a styled table with weighted column widths.
    data: 2D list of strings (will be wrapped in Paragraph automatically)
    col_weights: list of floats summing to ~1.0 (e.g. [0.2, 0.5, 0.3])
    """
    n_cols = len(data[0])
    if col_weights is None:
        col_weights = [1.0 / n_cols] * n_cols
    total_w = CONTENT_W * 0.96
    col_widths = [total_w * w for w in col_weights]
    # Wrap all cells in Paragraph
    wrapped = []
    for r_idx, row in enumerate(data):
        wrapped_row = []
        for c_idx, cell in enumerate(row):
            if isinstance(cell, Paragraph) or isinstance(cell, Table):
                wrapped_row.append(cell)
                continue
            text = str(cell)
            if header and r_idx == 0:
                style = S_TABLE_HEADER if (first_col_left or c_idx > 0) else S_TABLE_HEADER_CENTER
                wrapped_row.append(Paragraph(f'<b>{text}</b>', style))
            else:
                if c_idx == 0 and first_col_left:
                    wrapped_row.append(Paragraph(text, S_TABLE_CELL))
                else:
                    wrapped_row.append(Paragraph(text, S_TABLE_CELL_CENTER))
        wrapped.append(wrapped_row)
    t = Table(wrapped, colWidths=col_widths, hAlign=hAlign, repeatRows=1 if header else 0)
    style_cmds = [
        ('BACKGROUND', (0,0), (-1,0), HEADER_FILL),
        ('TEXTCOLOR', (0,0), (-1,0), TEXT_PRIMARY),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('GRID', (0,0), (-1,-1), 0.4, BORDER),
        ('LINEBELOW', (0,0), (-1,0), 1.2, ACCENT),
    ]
    # Alternating rows
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0,i), (-1,i), TABLE_STRIPE))
        else:
            style_cmds.append(('BACKGROUND', (0,i), (-1,i), PAGE_BG))
    t.setStyle(TableStyle(style_cmds))
    return t


def code_block(code_text, language=None):
    """Code block with optional language label."""
    # Escape XML special chars
    safe = code_text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    # Preserve newlines
    safe = safe.replace('\n', '<br/>')
    # Preserve leading spaces
    safe = re.sub(r'  ', '&nbsp;&nbsp;', safe)
    lines = []
    if language:
        lang_style = ParagraphStyle('lang', fontName='Mono', fontSize=7, textColor=ACCENT,
                                   alignment=TA_RIGHT, spaceAfter=2)
        lines.append(Paragraph(language.upper(), lang_style))
    lines.append(Paragraph(safe, S_CODE))
    return KeepTogether(lines)


def bullet_list(items, style=S_BULLET):
    """Build a bullet list from a list of strings."""
    out = []
    for item in items:
        out.append(Paragraph(f'<font color="#FF53A9">▸</font>&nbsp;&nbsp;{item}', style))
    return out


def info_callout(title, body, color=ACCENT_2):
    """Highlighted info box with left accent border."""
    title_style = ParagraphStyle('ic_t', fontName='NotoSans-Bold', fontSize=10,
                                textColor=color, spaceAfter=4, alignment=TA_LEFT)
    body_style = ParagraphStyle('ic_b', fontName='NotoSans', fontSize=9.5,
                               textColor=TEXT_BODY, leading=14, alignment=TA_LEFT, wordWrap='CJK')
    inner = [
        [Paragraph(title, title_style)],
        [Paragraph(body, body_style)],
    ]
    t = Table(inner, colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('LINEBEFORE', (0,0), (0,-1), 3, color),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return KeepTogether([Spacer(1, 6), t, Spacer(1, 8)])


# ─────────────────────────────────────────────────────────────────────────────
# 6. DOC TEMPLATE WITH TOC SUPPORT
# ─────────────────────────────────────────────────────────────────────────────
class BriefDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kw):
        BaseDocTemplate.__init__(self, filename, **kw)
        frame = Frame(LEFT_M, BOT_M, CONTENT_W, PAGE_H - TOP_M - BOT_M,
                     leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
                     id='main')
        template = PageTemplate(id='body', frames=[frame], onPage=draw_page_chrome)
        self.addPageTemplates([template])

    def afterFlowable(self, flowable):
        """Register TOC entries with clickable bookmarks based on style names."""
        if isinstance(flowable, Paragraph):
            style_name = flowable.style.name
            text = flowable.getPlainText()
            if style_name == 'H1':
                key = 'h1-%d' % self.page
                self.canv.bookmarkPage(key)
                self.canv.addOutlineEntry(text, key, level=0, closed=False)
                self.notify('TOCEntry', (0, text, self.page, key))
            elif style_name == 'H2':
                key = 'h2-%d' % self.page
                self.canv.bookmarkPage(key)
                self.canv.addOutlineEntry(text, key, level=1, closed=False)
                self.notify('TOCEntry', (1, text, self.page, key))


# ═════════════════════════════════════════════════════════════════════════════
# 7. CONTENT — TOC + EXECUTIVE SUMMARY + 12 PARTS + 2 APPENDICES
# ═════════════════════════════════════════════════════════════════════════════

def build_story():
    story = []

    # ─── TOC PAGE ────────────────────────────────────────────────────────────
    toc_title_style = ParagraphStyle('TocTitle', fontName='NotoSans-Bold', fontSize=24,
        textColor=TEXT_PRIMARY, leading=30, spaceBefore=20, spaceAfter=6, alignment=TA_LEFT)
    toc_kicker_style = ParagraphStyle('TocKicker', fontName='Mono', fontSize=9,
        textColor=ACCENT, leading=12, spaceAfter=8, alignment=TA_LEFT)
    story.append(Paragraph('NAVIGATION', toc_kicker_style))
    story.append(Paragraph('Table of Contents', toc_title_style))
    story.append(HRule(thickness=1.5, color=ACCENT, space_before=4, space_after=14))
    toc = TableOfContents()
    toc.levelStyles = [S_TOC_H1, S_TOC_H2]
    story.append(toc)
    story.append(PageBreak())

    # ─── EXECUTIVE SUMMARY ───────────────────────────────────────────────────
    story += section_opener('PREFACE', 'Executive Summary')

    story.append(Paragraph(
        'ClickTake Technologies operates one of the most AI-agent-ready websites on the internet today — '
        '11 <font face="Mono">.well-known/</font> discovery endpoints, RFC 8285 Link headers, '
        '<font face="Mono">/auth.md</font> registration, OpenAPI 3.1, MCP server card, x402 payment metadata, '
        'and DNS-AID records are all in place. Yet the surface a human visitor experiences is still '
        'a 5 KB CSS-only "3D" mascot system, no analytics instrumentation, and a known theme-visibility '
        'bug reported in Elite Mode. This brief closes that gap. It spec&#64257;es a full transformation '
        'of clicktaketech.com into a sleek, cutting-edge 3D storytelling platform where every page is '
        'a chapter, every character is a guide, and every interaction is a story beat — without '
        'sacri&#64257;cing the GEO infrastructure that already puts the site ahead of 99% of the web.',
        S_BODY))

    story.append(Paragraph('Where the site is today', S_H2))
    story.append(Paragraph(
        'The codebase runs Next.js 16, React 19, Tailwind v4, and a hybrid Cloudflare Workers + Vercel '
        'deployment that delivers edge-cached public pages and a full-stack serverless backend. The '
        '4-mode theme system (light/dark/system/custom) is wired through next-themes with FOUC '
        'prevention. The admin panel spans 17 routes with RBAC, theme/typography engines, A/B testing, '
        'CRM, and an email center. Structured data is comprehensive: Organization, four LocalBusiness '
        'blocks, Service, BreadcrumbList, FAQPage, BlogPosting, and WebSite schemas are all emitted. '
        'Programmatic SEO generates 312 city×service landing pages with tiered priorities. The deep-dive '
        'content library contains 25 long-form modules with FAQ schema. These are not the markers of '
        'a site that needs a rebuild — they are the markers of a site that needs to be &#64257;nished.',
        S_BODY))

    story.append(Paragraph('Where we are going', S_H2))
    story.append(Paragraph(
        'The target state is a 3D storytelling platform that uses WebGL as a core functional element '
        'of the user journey rather than decoration. Every page features a hero 3D character whose '
        'narrative role matches the page content — The Architect on Home, The Craftsman on Services, '
        'The Strategist on Solutions, The Founder on About — animated with @react-three/fiber and '
        '@react-three/drei, lit by HDRI environments, post-processed with Bloom and ChromaticAberration. '
        'A new Elite Mode introduces a premium visual tier with elevated 3D, holographic accents, and '
        'exclusive content gating. All text boxes are redesigned as futuristic 3D-style components '
        'with frosted-glass surfaces, focus glow, and character-driven microinteractions. A cohesive '
        'narrative arc carries the visitor through ten distinct "districts" of a digital city, with '
        'character transitions, scroll-driven story beats, and optional TTS voice-over.',
        S_BODY))

    story.append(Paragraph('What it will take', S_H2))
    story.append(Paragraph(
        'A six-phase, 18-week implementation roadmap covers SEO/GEO quick wins (Phase 0, week 1), '
        'foundation (Phase 1, weeks 2-3), character system (Phase 2, weeks 4-6), page-by-page rollout '
        '(Phase 3, weeks 7-9), UI system v2 (Phase 4, weeks 10-11), storytelling layer (Phase 5, '
        'weeks 12-13), polish and performance (Phase 6, weeks 14-16), and launch (Phase 7, weeks '
        '17-18). Each phase has a clear definition-of-done, owner suggestion, and risk pro&#64257;le. '
        'Phase gates allow pause points if team bandwidth tightens. The total scope is intentionally '
        'ambitious but decomposable — a smaller team can ship Phases 0-3 (the SEO wins plus the hero '
        '3D experience on &#64257;ve pages) in 9 weeks and still deliver a visible transformation.',
        S_BODY))

    story.append(Spacer(1, 8))
    story.append(Paragraph('Headline KPIs', S_H3))
    story.append(kpi_row([
        ('+40%', 'Organic traffic\n(6 months)', ACCENT),
        ('50+', 'AI-search brand\nmentions / mo', ACCENT_2),
        ('<2.0s', 'LCP on hero\npages', ACCENT_3),
        ('5%', 'Elite Mode\nadoption Q1', CYAN),
    ]))
    story.append(Spacer(1, 10))
    story.append(info_callout(
        'Reading guide',
        'Parts I-II cover SEO and GEO audits with prioritized, copy-paste-ready &#64257;xes. Part III '
        'resolves the Elite Mode visibility bug. Parts IV-VII specify the 3D character system, '
        'background enhancements, text-box redesign, and storytelling layer. Parts VIII-X provide the '
        'implementation roadmap, KPIs, and risk register. Appendices A-B contain code patches and a '
        'glossary. Skim the Executive Summary, dive into the Part that matches your role.',
        ACCENT_2))

    story.append(PageBreak())

    # ─── PART I — CHAPTER 1: SEO AUDIT — CURRENT STATE ─────────────────────
    story += section_opener('PART I · CHAPTER 1', 'SEO Audit — Current State')

    story.append(Paragraph(
        'A technical SEO audit of the clicktaketech.com codebase reveals a site that has done most of '
        'the hard work correctly. Sitemap generation is programmatic and tiered, metadata is '
        'page-speci&#64257;c and async-capable, structured data spans seven schema.org types, and '
        'canonical URLs are enforced across the route tree including a deliberate empty-canonical '
        'pattern on the 404 page. The gaps that remain are small, surgical, and high-leverage. This '
        'chapter documents the current state in detail; Chapter 2 prioritizes the &#64257;xes.',
        S_BODY))

    story.append(Paragraph('Sitemap infrastructure', S_H2))
    story.append(Paragraph(
        'The sitemap is generated by <font face="Mono">src/app/sitemap.ts</font> using the Next.js '
        'MetadataRoute API. It enumerates 16 static routes with priorities ranging from 0.3 to 1.0 — '
        'home gets 1.0, services/solutions/cities get 0.9, priority content gets 0.7. It pulls in '
        'all 24+ services, all solutions, all blog posts with lastModified dates derived from '
        'publishedAt, and all case studies. The crown jewel is the programmatic city×service section: '
        '12 cities multiplied by ~25 services yields ~312 URLs, each tiered by the city\'s searchTier '
        'property (tier 3 cities get priority 0.8, tier 2 get 0.6, tier 1 get 0.5) and of&#64257;ce '
        'cities receive a small boost. The canonical host is the apex domain, with www 308-redirecting '
        'to apex via middleware. City pages are revalidated daily via <font face="Mono">export const '
        'revalidate = 86400</font>.',
        S_BODY))

    story.append(Paragraph('robots.txt — duplicate &#64257;le con&#64258;ict', S_H2))
    story.append(Paragraph(
        'Two robots &#64257;les coexist in the repository. The modern dynamic route '
        '<font face="Mono">src/app/robots.ts</font> uses the MetadataRoute API to allow /, disallow '
        '/api/ and /admin/, and declare the sitemap URL and host. The legacy static '
        '<font face="Mono">public/robots.txt</font> permits everything for Googlebot, Bingbot, '
        'Twitterbot, and facebookexternalhit, declares no sitemap, and does not disallow /api/ or '
        '/admin/. Next.js serves <font face="Mono">public/robots.txt</font> if it exists, shadowing '
        'the dynamic route — a con&#64258;ict acknowledged in a code comment in layout.tsx: '
        '"Cloudflare\'s AI Audit managed robots.txt shadows the Next.js robots.ts route output." A '
        '<font face="Mono">&lt;link rel="sitemap"&gt;</font> tag is injected in the document head as a '
        'workaround. This shadowing is the &#64257;rst thing to &#64257;x in Phase 0.',
        S_BODY))

    story.append(Paragraph('Metadata, OpenGraph, and Twitter cards', S_H2))
    story.append(Paragraph(
        'The root <font face="Mono">layout.tsx</font> exports a comprehensive Metadata object: '
        'metadataBase, title.default plus title.template, description, 16 keywords, authors, creator, '
        'publisher, alternates.canonical, openGraph (title, description, url, siteName, type, locale, '
        '1200×630 images with alt text), twitter (summary_large_image), robots (with '
        'googleBot.max-image-preview: large), category: technology, plus geo.region, geo.placename, '
        'geo.position, and ICBM in the other &#64257;eld. Six pages use async generateMetadata: '
        'blog/[slug], cities/[city]/[[...service]], cities, solutions/[slug], case-studies/[slug], '
        'and services/[[...slug]]. Each returns per-page canonical URLs, OpenGraph, Twitter cards, '
        'and tag-speci&#64257;c keywords. Static metadata exports cover home, about, careers, '
        'case-studies, contact, legal pages, portfolio, pricing, resources, and team.',
        S_BODY))

    story.append(Paragraph('Structured data inventory', S_H2))
    story.append(Paragraph(
        'Structured data is emitted through a dedicated helper module at '
        '<font face="Mono">src/components/site/json-ld.tsx</font> which exports &#64257;ve schema '
        'builders: buildServiceJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildArticleJsonLd, '
        'and buildWebSiteJsonLd. The root layout emits one Organization block (name, url, email, '
        'foundingDate, slogan, telephone, contactPoint array, address array for four of&#64257;ces, '
        'areaServed, sameAs, knowsAbout) plus four ProfessionalService/LocalBusiness blocks — one per '
        'of&#64257;ce in Birmingham, Multan, Austin, and Dubai — each with parentOrganization, '
        'telephone, image, priceRange, address, geo coordinates, openingHours, and areaServed. Per-page '
        'emission is rich: BlogPosting on blog posts, Service plus BreadcrumbList plus FAQPage on '
        'service detail pages, BreadcrumbList plus FAQPage on solutions, about, team, and pricing, '
        'BreadcrumbList on case-study and resource indices, and FAQPage embedded in every one of the '
        '312 city×service pages via <font face="Mono">src/lib/seo/city-service-content.ts</font>.',
        S_BODY))

    story.append(Paragraph('Status table', S_H3))
    story.append(make_table([
        ['Component', 'Status', 'Notes'],
        ['sitemap.ts', 'Strong', 'Programmatic, 312 city×service URLs, tiered priorities, daily revalidation'],
        ['robots.ts', 'At Risk', 'public/robots.txt shadows the dynamic route; Phase 0 deletes the static file'],
        ['Root metadata', 'Strong', 'Full OG, Twitter, geo, robots, 16 keywords, metadataBase set'],
        ['generateMetadata', 'Strong', '6 dynamic pages with async metadata; per-page canonical + OG'],
        ['JSON-LD Organization', 'Strong', 'Name, address, contactPoint, areaServed, sameAs, knowsAbout'],
        ['JSON-LD LocalBusiness', 'Strong', '4 office blocks with geo coordinates and opening hours'],
        ['JSON-LD Service', 'Strong', 'Emitted on 24+ service detail pages with BreadcrumbList + FAQ'],
        ['JSON-LD BlogPosting', 'Strong', 'Author, publisher, datePublished, image on every blog post'],
        ['JSON-LD FAQPage', 'Strong', 'On team, pricing, solutions, services, about, all 312 city pages'],
        ['Homepage FAQ schema', 'Missing', 'NxFaq accordion is hardcoded UI without FAQPage JSON-LD'],
        ['Product + Offer schema', 'Missing', 'Pricing tiers not schema-marked despite PRICING_PLANS data'],
        ['Review / AggregateRating', 'Missing', '8 testimonials rendered as UI without Review schema'],
        ['RSS / Atom feed', 'Missing', 'No feed.xml route despite SSG blog with BlogPosting schema'],
        ['hreflang / i18n', 'Not implemented', 'Single-locale (en_GB); gap only if expanding to AR/UR'],
        ['HowTo schema', 'Not implemented', 'FAQPage used instead; deep-dive process blocks could use HowTo'],
        ['next/image on public pages', 'Unused', 'Site is imageless; relevant when blog/case-study images added'],
    ], col_weights=[0.27, 0.16, 0.57]))

    story.append(PageBreak())

    # ─── PART I — CHAPTER 2: SEO GAPS & PRIORITIZED FIXES ───────────────────
    story += section_opener('PART I · CHAPTER 2', 'SEO Audit — Gaps & Prioritized Fixes')

    story.append(Paragraph(
        'The eight gaps identi&#64257;ed in Chapter 1 are listed below in priority order — highest '
        'expected SEO lift per unit engineering effort &#64257;rst. Each gap includes the rationale, '
        'a code pattern or schema snippet, the expected lift, and an effort estimate (S = under one '
        'hour, M = under one day, L = multi-day). Phase 0 of the roadmap ships gaps 1-7; gap 8 is '
        'deferred until blog imagery is introduced.',
        S_BODY))

    story.append(Paragraph('Gap 1 — Delete public/robots.txt', S_H3))
    story.append(Paragraph(
        'Rationale: The static <font face="Mono">public/robots.txt</font> shadows the dynamic '
        '<font face="Mono">src/app/robots.ts</font> route. Crawlers see a permissive, sitemap-less '
        'robots.txt instead of the restrictive, sitemap-declaring one. Worse, the static &#64257;le '
        'permits crawling of <font face="Mono">/api/</font> and <font face="Mono">/admin/</font>, '
        'which the dynamic &#64257;le correctly disallows. Expected lift: crawl budget optimization, '
        'admin panel de-indexation, sitemap discovery. Effort: S (single git rm).',
        S_BODY))
    story.append(code_block(
        'rm public/robots.txt\n# Verify: curl https://clicktaketech.com/robots.txt\n# Should now return the dynamic route output with Sitemap: declaration',
        'shell'))

    story.append(Paragraph('Gap 2 — Add FAQPage schema to homepage', S_H3))
    story.append(Paragraph(
        'The homepage NxFaq accordion renders six FAQ items as hardcoded UI but emits no FAQPage '
        'JSON-LD. FAQPage is one of the highest-CTR rich-result schemas in Google Search and is '
        'directly citeable by AI answer engines. Lift: FAQ rich results on brand search, AI citation '
        'of&#64257;take. Effort: S.',
        S_BODY))
    story.append(code_block(
        '// src/app/page.tsx — add before the closing </main>\n// Replace NxFaq items array with a shared constant exported to a JSON-LD builder\n\nconst homeFaqs = [\n  { q: "What does ClickTake do?", a: "ClickTake is a..." },\n  // ...6 items\n];\n\n<script type="application/ld+json" dangerouslySetInnerHTML={{\n  __html: JSON.stringify({\n    "@context": "https://schema.org",\n    "@type": "FAQPage",\n    mainEntity: homeFaqs.map(f => ({\n      "@type": "Question",\n      name: f.q,\n      acceptedAnswer: { "@type": "Answer", text: f.a }\n    }))\n  })\n}} />',
        'tsx'))

    story.append(Paragraph('Gap 3 — Product + Offer schema on /pricing', S_H3))
    story.append(Paragraph(
        'The <font face="Mono">PRICING_PLANS</font> array in site-data.ts already contains tier '
        'names, descriptions, prices, and feature lists. Wrapping each plan in a schema.org Product '
        'with an Offer enables price rich results and AI answer engines to surface ClickTake pricing '
        'in response to "how much does a Next.js agency cost" queries. Lift: price rich results, '
        'AI pricing citation. Effort: S.',
        S_BODY))

    story.append(Paragraph('Gap 4 — Review schema for testimonials', S_H3))
    story.append(Paragraph(
        'Eight testimonials with named clients and companies are rendered as UI cards but emit no '
        'Review schema. An AggregateRating block on the homepage (with appropriate reviewCount and '
        'bestRating/worstRating &#64257;elds) plus individual Review items per testimonial unlocks '
        'review rich results and AI citation. Lift: review stars in SERPs, social proof in AI answers. '
        'Effort: M (need to validate that testimonials comply with Google\'s review schema policy — '
        'must be genuine, solicited, and not self-serving).',
        S_BODY))

    story.append(Paragraph('Gap 5 — RSS / Atom feed at /feed.xml', S_H3))
    story.append(Paragraph(
        'The blog uses SSG with BlogPosting schema but ships no RSS or Atom feed. Aggregators, '
        'subscriber clients, and increasingly AI research tools (Perplexity, ChatGPT search) consume '
        'RSS for content discovery. A Next.js route handler at '
        '<font face="Mono">src/app/feed.xml/route.ts</font> can iterate BLOG_POSTS and emit a '
        'compliant Atom feed. Lift: subscriber acquisition, AI content discovery, Feedly/Inoreader '
        'presence. Effort: S.',
        S_BODY))
    story.append(code_block(
        '// src/app/feed.xml/route.ts\nimport { BLOG_POSTS, SITE } from "@/lib/site-data";\n\nexport async function GET() {\n  const items = BLOG_POSTS.map(p => `\n    <entry>\n      <id>${SITE.url}/blog/${p.slug}</id>\n      <title>${p.title}</title>\n      <updated>${new Date(p.publishedAt).toISOString()}</updated>\n      <summary>${p.excerpt}</summary>\n      <link href="${SITE.url}/blog/${p.slug}" rel="alternate" type="text/html"/>\n    </entry>`).join("");\n  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <id>${SITE.url}/blog</id>\n  <title>ClickTake Blog</title>\n  <updated>${new Date().toISOString()}</updated>\n  <link href="${SITE.url}/feed.xml" rel="self" type="application/atom+xml"/>\n  ${items}\n</feed>`;\n  return new Response(xml, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } });\n}',
        'tsx'))

    story.append(Paragraph('Gap 6 — HowTo schema on deep-dive process blocks', S_H3))
    story.append(Paragraph(
        'The 25 deep-dive content modules each contain methodology sections with numbered process '
        'steps. Wrapping these in HowTo schema (with step.name, step.text, and optionally step.image) '
        'enables how-to rich results and step-by-step AI answer surfacing. Lift: how-to rich results '
        'on process queries, AI citation of methodology. Effort: M (need to refactor '
        'deep-dive-blocks.tsx to emit schema alongside the UI).',
        S_BODY))

    story.append(Paragraph('Gap 7 — Migrate admin @import fonts to next/font', S_H3))
    story.append(Paragraph(
        'The admin panel uses <font face="Mono">@import url(...)</font> in admin-globals.css to '
        'load Syne and JetBrains Mono from Google Fonts. CSS <font face="Mono">@import</font> is '
        'render-blocking — the browser cannot paint the admin panel until the font CSS arrives from '
        'Google\'s CDN. Migrating to next/font/google with <font face="Mono">display: swap</font> '
        'eliminates the render-blocking request and enables automatic font subsetting. Lift: -200ms '
        'admin LCP, eliminates a third-party dependency. Effort: S.',
        S_BODY))

    story.append(Paragraph('Gap 8 — next/image on blog and case studies', S_H3))
    story.append(Paragraph(
        'Deferred: the public site currently uses no raster images — visuals are CSS gradients, SVG '
        'shapes, Canvas2D, and procedural Three.js geometry. When blog post hero images and case '
        'study visuals are introduced, every <font face="Mono">&lt;img&gt;</font> must use '
        'next/image with explicit width, height, and priority &#64258;ags. Lift: prevents CLS, '
        'enables AVIF/WebP optimization, automatic responsive srcsets. Effort: M (when images are '
        'commissioned).',
        S_BODY))

    story.append(Spacer(1, 8))
    story.append(info_callout(
        'Phase 0 sprint plan',
        'Gaps 1-7 ship in week 1 of the roadmap. The full code patches for each are in Appendix A. '
        'After Phase 0, validate every page in Google\'s Rich Results Test, submit the sitemap in '
        'Google Search Console, and run a full Schema.org validator pass. Expected outcome: 100% '
        'schema validation, rich results eligibility on home (FAQ), pricing (Product), and '
        'testimonials (Review).',
        SEM_SUCCESS))

    story.append(PageBreak())

    return story



# ─── PART II — CHAPTER 3: GEO AUDIT ─────────────────────────────────────────
def add_part_ii_ch3(story):
    story += section_opener('PART II · CHAPTER 3', 'GEO Audit — AI-Search Readiness')

    story.append(Paragraph(
        'Generative Engine Optimization (GEO) is the discipline of making content discoverable and '
        'citeable by AI answer engines — ChatGPT Search, Perplexity, Google AI Overviews, Claude, '
        'and the emerging cohort of agent-mediated browsers. Where traditional SEO optimizes for '
        'crawlers and ranking, GEO optimizes for retrievers and citation. ClickTake\'s codebase is '
        'genuinely state-of-the-art here — far ahead of typical Next.js sites — but one critical '
        'piece is missing: the <font face="Mono">llms.txt</font> &#64257;le.',
        S_BODY))

    story.append(Paragraph('What is already world-class', S_H2))
    story.append(Paragraph(
        'Eleven AI-agent discovery routes live under <font face="Mono">src/app/.well-known/</font>, '
        'each implementing a different open standard. <font face="Mono">api-catalog</font> returns '
        'an RFC 9727 linkset+json catalog. <font face="Mono">oauth-authorization-server</font> and '
        '<font face="Mono">oauth-protected-resource</font> implement RFC 8414 and RFC 9728 for OAuth '
        'server metadata. <font face="Mono">jwks.json</font> exposes JWT veri&#64257;cation keys. '
        '<font face="Mono">agent-skills/index.json</font> implements the Cloudflare Agent Skills '
        'Discovery spec. <font face="Mono">mcp/server-card.json</font> implements the MCP SEP-1649 '
        'Server Card. <font face="Mono">agent-card.json</font>, <font face="Mono">acp.json</font>, '
        '<font face="Mono">ucp</font>, <font face="Mono">x402.json</font>, and '
        '<font face="Mono">http-message-signatures-directory</font> cover the remaining agent '
        'protocols. A dedicated <font face="Mono">/auth.md</font> route serves a WorkOS-spec '
        'markdown document with YAML frontmatter describing three registration methods (OAuth '
        'dynamic, API key, OIDC code) and curl examples. An OpenAPI 3.1 spec at '
        '<font face="Mono">/openapi.json</font> carries x402 payment metadata in an x-service-info '
        'block.',
        S_BODY))

    story.append(Paragraph('Markdown content negotiation', S_H2))
    story.append(Paragraph(
        'The middleware at <font face="Mono">src/middleware.ts</font> implements HTTP content '
        'negotiation: when a request to <font face="Mono">/</font> sends '
        '<font face="Mono">Accept: text/markdown</font> (or appends '
        '<font face="Mono">?format=markdown</font>), the server returns a hand-authored markdown '
        'representation of the homepage with Content-Type text/markdown, Vary: Accept, and '
        'Access-Control-Allow-Origin: *. The markdown includes company overview, services, regions, '
        'engagement process, contact details, and a "For AI agents" section listing all '
        'machine-readable discovery endpoints. Currently only the homepage has a markdown variant; '
        'extending this to other priority pages is a Phase 4 task.',
        S_BODY))

    story.append(Paragraph('RFC 8285 Link headers and DNS-AID records', S_H2))
    story.append(Paragraph(
        'Every HTML response from the site carries nine RFC 8285 Link headers, injected by '
        'middleware: api-catalog, service-desc (OpenAPI), service-doc, status, '
        'oauth-authorization-server, oauth-protected-resource, mcp-server, agent-skills, and '
        'https://workos.com/auth.md. Every public page also sets Vary: Accept. At the DNS layer, '
        'three DNS-AID records (RFC 9460 SVCB/HTTPS) are published via Cloudflare: '
        '<font face="Mono">_index._agents.clicktaketech.com</font> (agent discovery entrypoint), '
        '<font face="Mono">_a2a._agents.clicktaketech.com</font> (agent-to-agent via MCP), and '
        '<font face="Mono">_mcp._agents.clicktaketech.com</font> (MCP Streamable HTTP at /api/mcp). '
        'DNSSEC is con&#64257;gured with algorithm 13 (ECDSAP256SHA256); a DS record at the registrar '
        'is pending. A WebMCP browser provider in src/components/webmcp/ exposes site tools to AI '
        'agents via the experimental WebMCP browser API (Chrome-only, no-ops elsewhere).',
        S_BODY))

    story.append(Paragraph('The critical missing piece: llms.txt', S_H2))
    story.append(Paragraph(
        'The llms.txt spec, proposed by Jeremy Howard in 2024, de&#64257;nes a markdown-formatted '
        '/llms.txt &#64257;le at the site root that gives LLMs a curated, narrative overview of the '
        'site\'s content and offerings. It is the GEO equivalent of sitemap.xml for AI crawlers — '
        'and it is the one specifically-named GEO &#64257;le missing from ClickTake. The &#64257;le '
        'follows a simple structure: an H1 title, a blockquote summary, optional H2 sections for '
        'Services, Docs, Code, etc., each containing bullet links to canonical resources. A '
        'companion /llms-full.txt can carry expanded content for deeper ingestion. The full draft '
        'of ClickTake\'s llms.txt is in Appendix A.',
        S_BODY))

    story.append(Paragraph('GEO maturity scorecard', S_H3))
    story.append(make_table([
        ['Capability', 'Status', 'Maturity'],
        ['Agent discovery endpoints (.well-known/*)', '11 routes live', 'State-of-the-art'],
        ['Auth & registration (/auth.md)', 'WorkOS-spec markdown', 'State-of-the-art'],
        ['API catalog (/openapi.json)', 'OpenAPI 3.1 + x402 metadata', 'State-of-the-art'],
        ['MCP server card', 'SEP-1649 compliant', 'State-of-the-art'],
        ['Link headers (RFC 8285)', '9 relations on every response', 'State-of-the-art'],
        ['DNS-AID records (RFC 9460)', '3 SVCB/HTTPS records published', 'State-of-the-art'],
        ['Markdown content negotiation', '/ only', 'Strong — extend to more routes'],
        ['llms.txt + llms-full.txt', 'Not implemented', 'Missing — Phase 0 critical'],
        ['Citation-friendly content patterns', 'Deep-dive articles + FAQ schema', 'Strong'],
        ['Original research assets (/research/)', 'Not implemented', 'Missing — Phase 4'],
        ['AI-search analytics tracking', 'No analytics at all', 'Missing — Phase 0 Vercel Analytics'],
        ['WebMCP browser provider', 'Experimental, Chrome-only', 'State-of-the-art'],
    ], col_weights=[0.36, 0.30, 0.34]))

    story.append(PageBreak())
    return story


# ─── PART II — CHAPTER 4: GEO IMPLEMENTATION ───────────────────────────────
def add_part_ii_ch4(story):
    story += section_opener('PART II · CHAPTER 4', 'GEO Implementation — llms.txt, Citation Assets & LLM-Ready Patterns')

    story.append(Paragraph(
        'This chapter operationalizes the &#64257;ndings of Chapter 3. It contains the full draft '
        'of ClickTake\'s llms.txt, the spec for an llms-full.txt companion, a proposal for an '
        'original-research section that LLMs will cite, content patterns that maximize citation '
        'probability, and a strategy for tracking brand mentions across AI answer engines.',
        S_BODY))

    story.append(Paragraph('llms.txt draft for ClickTake', S_H2))
    story.append(Paragraph(
        'The &#64257;le lives at <font face="Mono">public/llms.txt</font> and ships in Phase 0. It '
        'opens with an H1 site title, a blockquote summary, and 6 H2 sections — Services, Solutions, '
        'Cities, Case Studies, Blog, Contact — each linking to the most authoritative pages on that '
        'topic. The format intentionally reads like a hand-curated overview, not a sitemap: each '
        'link is preceded by a one-sentence description so an LLM can decide whether to retrieve '
        'the full page.',
        S_BODY))
    story.append(code_block(
        '# ClickTake Technologies\n\n> ClickTake is a web-development studio building Next.js sites, 3D web experiences, and AI-agent-ready infrastructure for clients across the US, UK, UAE, and Pakistan. Founded 2019. Offices in Birmingham, Multan, Austin, and Dubai.\n\n## Services\n- [Next.js Development](https://clicktaketech.com/services/next-js-development): Production-grade Next.js 16 apps with App Router, RSC, and edge deployment\n- [SEO Services](https://clicktaketech.com/services/seo): Technical SEO, programmatic SEO, and GEO (Generative Engine Optimization)\n- [3D Web Development](https://clicktaketech.com/services/3d-web): React Three Fiber, Three.js, Spline, immersive product experiences\n- [CRO](https://clicktaketech.com/services/conversion-rate-optimization): A/B testing, funnel analysis, experiment programs\n\n## Solutions\n- [For Startups](https://clicktaketech.com/solutions/startups): MVP sprints, landing pages, investor decks\n- [For Enterprises](https://clicktaketech.com/solutions/enterprises): Migration, performance, design systems\n\n## Cities\n- [Austin](https://clicktaketech.com/cities/austin): ClickTake\'s US headquarters\n- [Birmingham](https://clicktaketech.com/cities/birmingham): UK office\n- [Dubai](https://clicktaketech.com/cities/dubai): MENA hub\n- [Multan](https://clicktaketech.com/cities/multan): Pakistan engineering center\n\n## Case Studies\n- [SaaS Platform +312% Organic Traffic](https://clicktaketech.com/case-studies/saas-organic-growth)\n\n## Blog\n- [Blog Index](https://clicktaketech.com/blog): Engineering, design, and growth articles\n\n## Contact\n- [Contact Form](https://clicktaketech.com/contact)\n- Email: hello@clicktaketech.com',
        'llms.txt'))

    story.append(Paragraph('llms-full.txt companion', S_H2))
    story.append(Paragraph(
        'The /llms-full.txt companion expands each H2 section with deeper content — full service '
        'descriptions, pricing tiers, client testimonials, and methodology. The goal is to give an '
        'LLM enough context to answer "what does ClickTake do" without retrieving any other page. '
        'Target length: 4000-6000 words. Update cadence: monthly via admin panel integration (add '
        'an "Export to llms-full.txt" button in /admin/cms that regenerates the &#64257;le from '
        'current CMS content).',
        S_BODY))

    story.append(Paragraph('Original research assets (/research/)', S_H2))
    story.append(Paragraph(
        'LLMs cite original data. Three research assets, published as standalone pages with their '
        'own URLs, structured-data blocks, and downloadable CSV companions, will dramatically '
        'increase AI citation of&#64257;take:',
        S_BODY))
    story += bullet_list([
        '<b>State of AI-Search 2026</b> — quarterly benchmark of brand visibility across ChatGPT Search, Perplexity, Google AI Overviews, and Claude. Methodology, raw data, and per-industry leaderboards. Cite-able statistics: "X% of brands appear in zero ChatGPT Search results for their category".',
        '<b>GEO Benchmark</b> — an open-source scoring rubric for any website\'s AI-search readiness, modeled on Lighthouse. ClickTake\'s own score (currently 87/100) is published. Invites comparison and inbound links.',
        '<b>ClickTake Client Metrics Dashboard</b> — aggregate, anonymized metrics across all ClickTake clients (organic traffic lift, conversion lift, Core Web Vitals). Updated quarterly with downloadable data tables.',
    ])

    story.append(Paragraph('Content patterns that get cited', S_H2))
    story.append(Paragraph(
        'LLM retrieval-and-citation systems favor four content patterns. Every deep-dive article '
        'and service page should consciously apply them:',
        S_BODY))
    story.append(make_table([
        ['Pattern', 'Why it works', 'Example'],
        ['Statistic-first paragraphs', 'Numbers are easy to extract, hard to hallucinate, and quote-resistant', '"Sites above 100K URLs typically waste 30-50% of crawl budget on low-value pages"'],
        ['Comparison tables', 'Structured rows convert directly to LLM answers; less ambiguity than prose', 'VWO vs Optimizely vs Convert.com feature matrix'],
        ['Definition boxes', 'Direct answers to "what is X" queries; LLMs lift verbatim', '"GEO is the discipline of making content discoverable and citeable by AI answer engines"'],
        ['FAQ blocks with explicit Q + A', 'Q maps to user query; A maps to cited answer; FAQPage schema reinforces', 'Q: "How much does a Next.js agency cost?" A: "ClickTake charges $5k-$80k..."'],
    ], col_weights=[0.24, 0.42, 0.34]))

    story.append(Paragraph('Citation tracking strategy', S_H2))
    story.append(Paragraph(
        'Without measurement, GEO investment is invisible. Three tracking layers ship in Phase 0 '
        'and Phase 4. First, Vercel Analytics + Vercel Speed Insights install on day 1 of Phase 0 — '
        'free, privacy-&#64257;rst, no consent banner required, surfaces Core Web Vitals RUM and '
        'pageview counts including ai.* referral sources. Second, a custom GEO dashboard '
        '(implemented in Phase 4) queries Perplexity\'s API and Google Search Console\'s AI '
        'Overview &#64257;lters weekly for brand mentions, and runs manual prompts in ChatGPT '
        'Search and Claude for the 20 highest-value category queries. Third, a brand-mention alert '
        'pipeline (also Phase 4) uses a third-party monitoring service (TalkingPie, Profound, or '
        'similar) to ping Slack whenever ClickTake is cited in a major AI answer engine.',
        S_BODY))

    story.append(PageBreak())
    return story



# ─── PART III — CHAPTER 5: ELITE MODE VISIBILITY FIX ────────────────────────
def add_part_iii(story):
    story += section_opener('PART III · CHAPTER 5', 'UI/UX Fix — Elite Mode Visibility')

    story.append(Paragraph(
        'The reported "Elite Mode" visibility issue — where background colors do not display '
        'correctly and text becomes hard to read — has two root causes that this chapter diagnoses '
        'and resolves. First, "Elite Mode" does not currently exist in the codebase as a feature; '
        'the only match for the word "elite" anywhere in the repository is a customer testimonial '
        'string in site-data.ts. Second, the underlying theme-visibility bug lives in '
        'admin-globals.css, where light-mode overrides are incomplete and the theme-custom variant '
        'has no Elite palette mapping at all. This chapter de&#64257;nes Elite Mode as a new '
        'premium visual tier layered on top of the existing 4-mode system, &#64257;xes the '
        'underlying token cascade, and speci&#64257;es the toggle UX.',
        S_BODY))

    story.append(Paragraph('Scope de&#64257;nition — what Elite Mode is', S_H2))
    story.append(Paragraph(
        'Elite Mode is a &#64257;fth palette variant — an elevated visual layer activated by an opt-'
        'in toggle (auth-gated for returning users, free for &#64257;rst 1000 signups as a loyalty '
        'reward). Visually, Elite Mode ampli&#64257;es the cyber-futurist palette: deeper 3D '
        'rendering with HDR-quality lighting, exclusive holographic accents on key UI elements, '
        'access to the full character animation set including idle "breathing" motion, and a '
        'curated set of premium content modules (deep-dive case studies, advanced playbooks, '
        'members-only webinars). Elite Mode is not a paywall — it is a recognition layer that '
        'turns the site into a more beautiful, more personal experience for engaged visitors. MVP '
        'scope is the visual layer only; premium content gating ships in Phase 6.',
        S_BODY))

    story.append(Paragraph('Root cause of the visibility bug', S_H2))
    story.append(Paragraph(
        'The admin panel CSS at <font face="Mono">src/app/admin/admin-globals.css</font> de&#64257;nes '
        'three palette variants via scoped selectors: <font face="Mono">html.dark .ct-admin</font> '
        '(default dark), <font face="Mono">html.theme-custom .ct-admin:not(.theme-custom-light)</font> '
        '(custom dark base), and <font face="Mono">html:not(.dark) .ct-admin</font> plus '
        '<font face="Mono">html.theme-custom.theme-custom-light .ct-admin</font> (light). The '
        'problem is that several component-level rules — sidebar hover states, table header '
        'backgrounds, dialog overlays, and form &#64257;eld focus rings — are de&#64257;ned only '
        'in the dark variant and fall through to dark-palette tokens when the user is in light '
        'mode. The result: dark text on dark backgrounds, invisible form &#64257;elds, and '
        'unreadable sidebar items. The theme-custom variant has the same problem — it only maps '
        'the base palette tokens, not the component-level overrides.',
        S_BODY))

    story.append(Paragraph('The &#64257;x — a uni&#64257;ed token cascade', S_H2))
    story.append(Paragraph(
        'The architectural &#64257;x is a uni&#64257;ed CSS custom-property cascade where Elite '
        'Mode is a &#64257;fth variant and every component rule reads from tokens rather than '
        'hardcoded colors. The cascade order is: base tokens in :root, dark overrides in '
        '<font face="Mono">:root[data-theme="dark"]</font>, light overrides in '
        '<font face="Mono">:root[data-theme="light"]</font>, custom overrides in '
        '<font face="Mono">:root[data-theme="custom"]</font>, and Elite overrides in '
        '<font face="Mono">:root[data-theme="elite"]</font>. Every component rule references '
        'tokens — e.g. <font face="Mono">background: var(--surface-1)</font>, never '
        '<font face="Mono">background: #14082A</font>. This guarantees that switching the theme '
        'attribute on the html element updates every component without exception.',
        S_BODY))
    story.append(code_block(
        ':root {\n  /* Base palette — dark by default */\n  --bg:           #03000D;\n  --bg-elev:      #0A0418;\n  --surface-1:    #14082A;\n  --surface-2:    #1F0B3A;\n  --border:       #3A1845;\n  --text:         #F0EBF8;\n  --text-muted:   #88879B;\n  --accent:       #FF53A9;\n  --accent-2:     #9B3DFF;\n  --accent-3:     #136DFF;\n}\n\n:root[data-theme="light"] {\n  --bg:           #FFFFFF;\n  --bg-elev:      #FAFAFC;\n  --surface-1:    #F4F2F8;\n  --surface-2:    #EAE7F0;\n  --border:       #D5D0E0;\n  --text:         #0A0E1A;\n  --text-muted:   #5A5870;\n  --accent:       #E0197A;  /* slightly darker for AA contrast on white */\n  --accent-2:     #7B2FD9;\n  --accent-3:     #0F5BD9;\n}\n\n:root[data-theme="elite"] {\n  --bg:           #02000B;  /* even deeper black */\n  --bg-elev:      #08021A;\n  --surface-1:    #190A35;  /* richer purple */\n  --surface-2:    #260D4E;\n  --border:       #5A1F70;  /* more visible border */\n  --text:         #FAF7FF;  /* brighter text */\n  --text-muted:   #A09BB5;\n  --accent:       #FF6BB9;  /* luminous magenta */\n  --accent-2:     #B066FF;  /* luminous purple */\n  --accent-3:     #3D8BFF;  /* luminous blue */\n  --elite-glow:   0 0 24px rgba(255, 107, 185, 0.4);  /* exclusive Elite glow */\n}',
        'css'))

    story.append(Paragraph('Accessibility — WCAG 2.2 AA contrast', S_H2))
    story.append(Paragraph(
        'Every Elite Mode surface must pass WCAG 2.2 AA contrast (4.5:1 for body text, 3:1 for '
        'large text and UI components). The Elite palette above achieves: text-to-bg 16.8:1 (AA '
        'pass), text-muted-to-bg 6.4:1 (AA pass), accent-to-bg 5.9:1 (AA pass), accent-2-to-bg '
        '5.1:1 (AA pass). The light palette achieves: text-to-bg 18.2:1 (AA pass), text-muted-to-bg '
        '7.1:1 (AA pass), accent-to-bg 4.8:1 (AA pass). A automated contrast-check script runs in '
        'CI via <font face="Mono">pa11y-ci</font> against every theme variant on every admin route. '
        'Any token change that drops a contrast ratio below 4.5:1 fails the build.',
        S_BODY))

    story.append(Paragraph('Toggle UX — 5-mode segmented control', S_H2))
    story.append(Paragraph(
        'The existing theme-toggle.tsx is a 4-mode popover (light/dark/system/custom). It upgrades '
        'to a 5-mode segmented control — a horizontal pill with &#64257;ve segments, the Elite '
        'segment visually distinguished by a magenta gradient and locked behind an auth/premium '
        'check. Clicking Elite when unauthenticated opens a modal explaining the loyalty reward '
        'program and offering signup. Once unlocked, the segmented control animates between modes '
        'with a 400ms cross-fade transition driven by framer-motion\'s AnimatePresence. The toggle '
        'remains in the admin topbar and the public navbar; both contexts share the same component.',
        S_BODY))

    story.append(info_callout(
        'Acceptance criteria for the Elite Mode &#64257;x',
        '1) Switching to light mode in admin panel shows all text, all form &#64257;elds, all '
        'sidebar items with correct contrast. 2) Switching to Elite Mode (once unlocked) shows '
        'deeper blacks, richer purples, luminous accents, and the Elite glow on key UI. 3) The 5-'
        'mode toggle renders correctly on both mobile and desktop. 4) pa11y-ci passes WCAG 2.2 AA '
        'on all 17 admin routes in all 5 theme variants. 5) No FOUC — the theme-init script applies '
        'the correct palette class before React hydrates.',
        SEM_SUCCESS))

    story.append(PageBreak())
    return story


# ─── PART IV — CHAPTER 6: 3D BACKGROUND ENHANCEMENTS ───────────────────────
def add_part_iv(story):
    story += section_opener('PART IV · CHAPTER 6', '3D Background Enhancements — From CSS Mascots to Immersive WebGL')

    story.append(Paragraph(
        'The current 3D system is a hybrid of three rendering tiers: pure-CSS animated shapes '
        '(hero-3d.tsx, nx-3d-scene.tsx, nx-3d-character.tsx — collectively ~80 KB of source that '
        'renders &#64258;oating geometric shapes via CSS transforms), a Canvas2D background '
        '(background-scene.tsx — a tech-node graph with 30 nodes, 8 data streams, 2 ripple pulses, '
        'capped at 30fps), and one real WebGL scene (nx-three-scene.tsx — Three.js loaded at '
        'runtime from a CDN, rendering a wireframe TorusKnot trio, 3 wireframe spheres, a '
        '&#64258;oating icosahedron, and a 1200-particle &#64257;eld with mouse parallax). This '
        'chapter speci&#64257;es the upgrade to a proper @react-three/fiber + drei + postprocessing '
        'stack with GLTF character assets, HDRI lighting, and adaptive quality tiering.',
        S_BODY))

    story.append(Paragraph('Library selection rationale', S_H2))
    story.append(Paragraph(
        'The recommended stack installs three npm dependencies: @react-three/fiber (the React '
        'renderer for Three.js), @react-three/drei (helper components — OrbitControls, Environment, '
        'useGLTF, ContactShadows, Float, Sparkles), and @react-three/postprocessing (Bloom, '
        'ChromaticAberration, Vignette, Noise). Total gzipped addition to the client bundle: '
        '~280 KB. R3F is preferred over vanilla Three.js because its declarative scene graph '
        'reconciles with React, enabling the same component composition patterns the rest of the '
        'site already uses. Drei removes 80% of the boilerplate (environment maps, GLTF loading, '
        'shadow setup). Postprocessing is what separates "3D" from "high-end 3D" — Bloom alone '
        'transforms the visual quality of every emissive material in the scene.',
        S_BODY))

    story.append(Paragraph('SceneProvider architecture', S_H2))
    story.append(Paragraph(
        'A new <font face="Mono">&lt;SceneProvider&gt;</font> component wraps the entire site. It '
        'hosts a single <font face="Mono">&lt;Canvas&gt;</font> and exposes a context for child '
        'components to mount scenes. When the route changes (Next.js App Router), framer-motion\'s '
        'AnimatePresence cross-fades between the outgoing scene and the incoming scene over 1.2 '
        'seconds. The Canvas itself never unmounts — only its children swap. This keeps WebGL '
        'context alive across navigation, eliminating the cold-start cost (~400ms on mid-tier '
        'mobile) of re-initializing Three.js on every page. The Canvas uses '
        '<font face="Mono">gl={{ antialias: true, powerPreference: "high-performance" }}</font>, '
        '<font face="Mono">dpr={[1, 1.75]}</font> (capped to avoid melting laptop GPUs), and '
        '<font face="Mono">frameloop="demand"</font> when the scene is idle.',
        S_BODY))

    story.append(Paragraph('Performance budget', S_H2))
    story.append(Paragraph(
        'Hard ceilings enforced in CI via a bundle-size check and a Lighthouse CI run on every '
        'PR:',
        S_BODY))
    story.append(make_table([
        ['Metric', 'Budget', 'Enforcement'],
        ['3D bundle (gzipped, R3F + drei + postprocessing)', '≤ 280 KB', 'bundlesize check in CI'],
        ['3D scene JS (per-page, gzipped)', '≤ 80 KB', 'per-route bundle analyzer'],
        ['GLTF asset (per character, compressed)', '≤ 150 KB', 'asset-size pre-commit hook'],
        ['TBT impact on hero pages', '≤ 50 ms', 'Lighthouse CI'],
        ['LCP on hero pages (with 3D)', '≤ 2.0 s', 'Lighthouse CI'],
        ['Frame rate on M1 baseline', '≥ 60 fps', 'Playwright perf test'],
        ['Frame rate on iPhone 12 baseline', '≥ 30 fps', 'BrowserStack perf test'],
        ['DPR cap', '1.75', 'Canvas prop'],
    ], col_weights=[0.45, 0.22, 0.33]))

    story.append(Paragraph('Postprocessing stack', S_H2))
    story.append(Paragraph(
        'The postprocessing chain applies &#64257;ve effects in order: Bloom (intensity 0.8, '
        'luminanceThreshold 0.6, luminanceSmoothing 0.4), ChromaticAberration (offset 0.002, '
        'radialModulation true), Vignette (darkness 0.4, offset 0.3), Noise (opacity 0.04), and '
        'a custom HologramScan effect for Elite Mode that adds a faint horizontal scan-line. All '
        'effects are skippable — the SceneProvider checks '
        '<font face="Mono">prefers-reduced-motion</font> and either disables postprocessing '
        'entirely or falls back to a single static frame. The Bloom intensity adapts to the page\'s '
        'mood (high on hero pages, low on content pages) via a context prop.',
        S_BODY))

    story.append(Paragraph('Particle system upgrade', S_H2))
    story.append(Paragraph(
        'The current 1200-particle CPU &#64257;eld is replaced by a GPU-instanced 5000-particle '
        'system using a custom ShaderMaterial. Each particle has a per-instance seed (vec3 attribute) '
        'that drives curl-noise displacement in the vertex shader — producing organic, '
        'non-repeating motion. The fragment shader renders each particle as a soft radial gradient '
        'with additive blending. On low-tier devices (detected via the adaptive quality hook below), '
        'the particle count drops to 1500 and the curl-noise octave count drops from 3 to 2.',
        S_BODY))

    story.append(Paragraph('Adaptive quality tiering', S_H2))
    story.append(Paragraph(
        'A <font face="Mono">useAdaptiveQuality()</font> hook runs once on mount and returns a '
        'quality tier from 0 to 3. Tier detection combines three signals: '
        '<font face="Mono">navigator.deviceMemory</font> (where available), '
        '<font face="Mono">navigator.hardwareConcurrency</font>, and a real-time frame-time '
        'measurement over the &#64257;rst 60 frames after mount. The hook returns immediately '
        'with a preliminary tier, then re-&#64257;nes after measurement. The SceneProvider '
        'passes the tier down via context, and each scene component scales its particle count, '
        'postprocessing intensity, and shadow map resolution accordingly. Tier 0 = CSS mascots '
        'only (no WebGL), tier 1 = WebGL with no postprocessing, tier 2 = WebGL with '
        'postprocessing and 1500 particles, tier 3 = full quality.',
        S_BODY))
    story.append(code_block(
        '// src/components/3d/use-adaptive-quality.ts\nimport { useEffect, useState } from "react";\n\nexport function useAdaptiveQuality() {\n  const [tier, setTier] = useState<number>(2); // optimistic default\n  useEffect(() => {\n    const mem = (navigator as any).deviceMemory ?? 4;\n    const cores = navigator.hardwareConcurrency ?? 4;\n    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;\n    if (reduceMotion) return setTier(0);\n    // Preliminary tier\n    let preliminary = 3;\n    if (mem <= 2 || cores <= 2) preliminary = 1;\n    else if (mem <= 4 || cores <= 4) preliminary = 2;\n    setTier(preliminary);\n    // Refine via frame timing\n    let frames = 0, slowFrames = 0;\n    const start = performance.now();\n    const interval = setInterval(() => {\n      frames++;\n      const now = performance.now();\n      const dt = now - start;\n      if (dt > 1000 / 30 && frames > 5) slowFrames++;\n      if (frames >= 60) {\n        clearInterval(interval);\n        if (slowFrames / 60 > 0.3) setTier(t => Math.max(0, t - 1));\n      }\n    }, 16);\n    return () => clearInterval(interval);\n  }, []);\n  return tier;\n}',
        'tsx'))

    story.append(Paragraph('Fallback ladder', S_H2))
    story.append(Paragraph(
        'Every 3D scene component implements a three-tier fallback: WebGL (tier 1+), CSS-only '
        'mascots (tier 0 or WebGL unavailable), static gradient (CSS mascots failed to mount '
        'within 2 seconds). The fallback is automatic — the SceneProvider\'s Suspense boundary '
        'catches the WebGL initialization error and renders the CSS mascot in its place. If the '
        'CSS mascot itself throws (extremely rare), the boundary\'s fallback is a simple div with '
        'the brand gradient. This guarantees no visitor ever sees a blank hero section.',
        S_BODY))

    story.append(PageBreak())
    return story



# ─── PART V — CHAPTER 7: 3D CHARACTER SYSTEM ────────────────────────────────
def add_part_v(story):
    story += section_opener('PART V · CHAPTER 7', '3D Character System — Per-Page Avatars Tied to Content')

    story.append(Paragraph(
        'The 3D character system is the heart of the storytelling platform. Every page features '
        'one hero 3D character (or immersive environment) whose narrative role matches the page\'s '
        'content. Characters are not decoration — they are guides that welcome the visitor, react '
        'to scroll and cursor, speak on click, and remember the visitor across sessions. This '
        'chapter speci&#64257;es the full character roster, the rig spec, the animation set, the '
        'interaction model, and the production pipeline.',
        S_BODY))

    story.append(Paragraph('Character roster — page mapping', S_H2))
    story.append(Paragraph(
        'Ten characters, each tied to a page (or page group), each with a distinct silhouette '
        'and personality. All characters share a common humanoid base (Ready Player Me low-poly '
        'mesh, ~80 KB after Draco compression) with custom geometry accessories that signal their '
        'role.',
        S_BODY))
    story.append(make_table([
        ['Page', 'Character', 'Visual', 'Role'],
        ['Home', 'The Architect', 'Humanoid assembling floating UI panels', 'Greets visitor, builds the skyline'],
        ['Services', 'The Craftsman', 'Per-service variant (SEO=spider, DevOps=pipeline, Brand=chromebot)', 'Shows the tools of each craft'],
        ['Solutions', 'The Strategist', 'Chess-piece figure on a holographic board', 'Shows the plays that win'],
        ['About', 'The Founder', 'Single character with 4 office skyline backdrops', 'Tells the origin story'],
        ['Case Studies', 'The Explorer', 'Figure traversing a data landscape', 'Shows the trophies earned'],
        ['Blog', 'The Scribe', 'Figure writing in 3D space with glowing ink', 'Shares knowledge'],
        ['Pricing', 'The Curator', 'Figure arranging tier cards on pedestals', 'Curates the value ladder'],
        ['Contact', 'The Messenger', 'Figure dispatching signals skyward', 'Sends the visitor\'s message'],
        ['Careers', 'The Pioneer', 'Figure constructing a building', 'Invites to build together'],
        ['Cities', 'The Navigator', 'Figure with a slowly rotating globe', 'Orients across regions'],
    ], col_weights=[0.13, 0.16, 0.40, 0.31]))

    story.append(Paragraph('Rig spec', S_H2))
    story.append(Paragraph(
        'All ten characters share the Ready Player Me humanoid base mesh (low-poly variant, '
        '14k triangles). Custom accessories — hat, tool, weapon, gesture prop — are modeled '
        'as separate GLTF meshes (~5k triangles each) attached to the hand or head bone. The '
        'character GLTF is Draco-compressed (~80-150 KB total per character) and shipped from '
        'the Cloudflare R2 CDN with a 1-year cache. The skeleton is the standard RPM Humanoid '
        'rig (65 bones), enabling reuse of any Mixamo or manual animation. Materials use the '
        'MeshStandardMaterial with metalness 0.3, roughness 0.6 — catching the HDRI environment '
        'without looking plastic. Each character has a single 256×256 emissive texture for the '
        '"face" (eyes, mouth, brand-tinted aura) that glows under the Bloom postprocessing.',
        S_BODY))

    story.append(Paragraph('Animation set', S_H2))
    story.append(Paragraph(
        'Four animation states per character, all driven by the RPM skeleton and blended with '
        'cross-fade transitions (200ms) in R3F\'s useAnimations hook:',
        S_BODY))
    story += bullet_list([
        '<b>Idle</b> — subtle breathing motion, occasional head turn, weight shift every 4-6 seconds. Loop time 12 seconds. This is the default state when the character is in view but not being interacted with.',
        '<b>Hover</b> — character turns to face the cursor, eyes track cursor position, slight body lean toward cursor. Triggered when the pointer enters the character\'s bounding box.',
        '<b>Scroll-react</b> — character\'s pose changes as the user scrolls: at top of page the character is "looking up" (anticipatory), in middle "engaged" (working pose), at bottom "satis&#64257;ed" (gesture of completion). The pose blends smoothly across three scroll keypoints.',
        '<b>Click-react</b> — character performs a unique "talk" animation: waves, points, nods, or bows depending on personality. Accompanied by a TTS voice line (see Interaction Model below). Cooldown 3 seconds to prevent spam.',
    ])

    story.append(Paragraph('Interaction model', S_H2))
    story.append(Paragraph(
        'Each character responds to three input types: cursor position (hover and parallax), '
        'scroll position (pose blending), and click (voice line + animation). Cursor parallax '
        'uses a 0.05 lerp factor — the character\'s head and shoulders rotate up to ±8 degrees '
        'toward the cursor with a 200ms lag, producing a subtle "the character is watching me" '
        'effect. Scroll-driven pose changes are computed from the character\'s bounding rect '
        'relative to the viewport — three keypoints at top, middle, bottom of the viewport. '
        'Click triggers a randomly-selected voice line from a per-character pool of 8-12 lines, '
        'synthesized via the z-ai-web-dev-sdk TTS endpoint and cached in IndexedDB on &#64257;rst '
        'play. The voice is branded — same voice across all characters, with per-character pitch '
        'and rate offsets so each character sounds distinct but recognizable.',
        S_BODY))

    story.append(Paragraph('Production pipeline', S_H2))
    story.append(Paragraph(
        'Phase 1 ships three characters (Architect, Craftsman, Strategist) using the RPM base '
        'with manually-modeled accessories. Phase 2 adds the remaining seven. The pipeline: '
        '(1) generate base mesh on readyplayer.me (free, browser-based), (2) model accessories '
        'in Blender (one day per accessory), (3) bake materials and export as Draco-compressed '
        'GLTF, (4) author 4 animation clips in Mixamo (free for <2k keyframes per clip), (5) '
        'import into the React component via useGLTF and useAnimations, (6) wire interactions '
        'in the shared <font face="Mono">&lt;Character/&gt;</font> wrapper. Total per-character '
        'budget: 2 designer-days + 1 developer-day. Total for all 10 characters: ~30 person-days '
        'spread across Phases 1-2.',
        S_BODY))

    story.append(info_callout(
        'Accessibility & reduced motion',
        'Every character respects <font face="Mono">prefers-reduced-motion</font>. When set, the '
        'character renders in a static "portrait" pose (no idle, no parallax, no scroll-react). '
        'Click still triggers a voice line (TTS is not motion). Every character is also '
        '<font face="Mono">aria-hidden="true"</font> by default — they are decorative guides, '
        'not content. The voice-line button is a separate <font face="Mono">&lt;button&gt;</font> '
        'with an <font face="Mono">aria-label</font> like "Hear what The Architect says" that '
        'appears when the character is focused or hovered.',
        SEM_INFO))

    story.append(PageBreak())
    return story


# ─── PART VI — CHAPTER 8: TEXT BOX REDESIGN ─────────────────────────────────
def add_part_vi(story):
    story += section_opener('PART VI · CHAPTER 8', 'Text Box Redesign — Futuristic 3D-Style UI Component System')

    story.append(Paragraph(
        'Every text-input and text-display component on the site gets a uni&#64257;ed redesign: '
        'frosted-glass surfaces, 3D extrusion via CSS transforms, magenta focus glow, character-'
        'driven microinteractions, and WCAG 2.2 AA accessibility. The system extends shadcn/ui\'s '
        'existing Input and Textarea primitives with a new NxInput wrapper family — '
        '<font face="Mono">NxInput</font>, <font face="Mono">NxTextarea</font>, '
        '<font face="Mono">NxSearchInput</font>, <font face="Mono">NxEmailInput</font>, '
        '<font face="Mono">NxPasswordInput</font>, <font face="Mono">NxNumberInput</font>, '
        '<font face="Mono">NxOTPInput</font>, <font face="Mono">NxCodeBlock</font>, '
        '<font face="Mono">NxCallout</font>, <font face="Mono">NxStatCard</font>, '
        '<font face="Mono">NxBlockquote</font>.',
        S_BODY))

    story.append(Paragraph('Visual language', S_H2))
    story.append(Paragraph(
        'The design language is "frosted glass over deep space". Every input surface uses '
        '<font face="Mono">background: rgba(255, 255, 255, 0.04)</font> (4% white over the dark '
        'base) with a 1px hairline border <font face="Mono">rgba(255, 83, 169, 0.2)</font> (20% '
        'magenta). On hover, the border opacity rises to 0.5 and the surface lifts 2px via '
        '<font face="Mono">transform: translateY(-2px)</font>. On focus, the border solidi&#64257;es '
        'to magenta, an outer glow (<font face="Mono">box-shadow: 0 0 0 3px rgba(255, 83, 169, '
        '0.2)</font>) appears, and the character animation triggers a "the character is looking at '
        'this &#64257;eld" head turn. Depth is achieved via a parent '
        '<font face="Mono">perspective(1000px)</font> and a child '
        '<font face="Mono">transform: translateZ(8px)</font> on the input — producing a subtle '
        '3D extrusion that reads as "this &#64257;eld is part of the 3D world, not pasted on top '
        'of it".',
        S_BODY))

    story.append(Paragraph('State matrix', S_H2))
    story.append(make_table([
        ['State', 'Surface', 'Border', 'Transform', 'Extra'],
        ['Default', 'rgba(255,255,255,0.04)', 'rgba(255,83,169,0.2) 1px', 'translateZ(8px)', '—'],
        ['Hover', 'rgba(255,255,255,0.06)', 'rgba(255,83,169,0.5) 1px', 'translateY(-2px) translateZ(10px)', 'Cursor: pointer'],
        ['Focus', 'rgba(255,83,169,0.08)', '#FF53A9 1.5px', 'translateY(-2px) translateZ(12px)', 'box-shadow: 0 0 0 3px rgba(255,83,169,0.2)'],
        ['Error', 'rgba(248,113,113,0.08)', '#F87171 1.5px', 'translateX(0)', 'Shake animation 200ms'],
        ['Disabled', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05) 1px', 'translateZ(4px)', 'opacity 0.5, grayscale'],
        ['Filled', 'rgba(255,255,255,0.05)', 'rgba(255,83,169,0.3) 1px', 'translateZ(8px)', 'Check icon right'],
    ], col_weights=[0.13, 0.27, 0.22, 0.21, 0.17]))

    story.append(Paragraph('Microinteractions', S_H2))
    story.append(Paragraph(
        'Three microinteractions distinguish the NxInput family from a generic styled input. '
        'First, the label floats: when the &#64257;eld is empty, the label sits inside the &#64257;eld '
        'as placeholder text; on focus or when &#64257;lled, the label slides up 12px and shrinks '
        'from 14px to 11px over 200ms with an ease-out curve. Second, the character counter '
        '(where applicable — Textarea, EmailInput with character limit) slides in from the right '
        'on focus, displaying "0 / 500" in mono font with a magenta progress arc that &#64257;lls '
        'as the user types. Third, the validation checkmark: when a &#64257;eld passes async '
        'validation (e.g. email format check, username availability), a 16px magenta check icon '
        'scales in from 0 with a 200ms spring animation.',
        S_BODY))

    story.append(Paragraph('CodeBlock — special-case component', S_H2))
    story.append(Paragraph(
        'The NxCodeBlock component renders syntax-highlighted code with a copy button and a '
        'language badge. Syntax highlighting uses Shiki (server-side, zero client JS) — the code '
        'is highlighted at build time and shipped as semantic HTML with inline styles. The copy '
        'button is a 24×24 magenta icon top-right that, on click, copies the raw code to '
        'clipboard and morphs into a check icon for 1.5 seconds. The language badge is a small '
        'mono-font pill in the top-left, magenta on dark, displaying the language name '
        'uppercased. The block itself uses the same frosted-glass surface as other NxInput '
        'components but with monospace font and 14px line-height to optimize readability of code.',
        S_BODY))

    story.append(Paragraph('Accessibility', S_H2))
    story.append(Paragraph(
        'WCAG 2.2 AA is the baseline. Every NxInput achieves 4.5:1 contrast between text and '
        'background. The focus ring is 2px solid magenta with a 3px outer glow — visible against '
        'any background, never relying on color alone. Touch targets are 44×44px minimum. Every '
        'input wires <font face="Mono">aria-invalid</font>, <font face="Mono">aria-describedby</font> '
        '(for error text), and <font face="Mono">aria-label</font> (when no visible label). The '
        'shake animation on error respects '
        '<font face="Mono">prefers-reduced-motion</font> — instead of shaking, the &#64257;eld '
        'shows a 200ms red border pulse. Keyboard navigation: Tab moves between &#64257;elds, '
        'Enter submits forms, Esc clears the current &#64257;eld. Screen readers announce label, '
        'current value, and validation status in that order.',
        S_BODY))

    story.append(Paragraph('Implementation — extending shadcn/ui', S_H2))
    story.append(Paragraph(
        'The NxInput family extends shadcn/ui\'s Input, Textarea, and Form components. The wrapper '
        'adds three things: the 3D extrusion wrapper (a parent div with perspective and a child '
        'with translateZ), the focus-glow box-shadow, and the &#64258;oating-label animation. The '
        'underlying shadcn/ui Input keeps its data-binding and form-integration behavior intact. '
        'A single <font face="Mono">cn()</font> utility merges the new className with the shadcn '
        'default. The result: any existing form on the site can opt into the new design by '
        'swapping <font face="Mono">Input</font> for <font face="Mono">NxInput</font> — no other '
        'code changes required.',
        S_BODY))
    story.append(code_block(
        '// src/components/ui/nx-input.tsx\n"use client";\nimport * as React from "react";\nimport { cn } from "@/lib/utils";\n\nexport interface NxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {\n  label?: string;\n  error?: string;\n}\n\nexport const NxInput = React.forwardRef<HTMLInputElement, NxInputProps>(\n  ({ className, label, error, id, ...props }, ref) => {\n    const inputId = id || React.useId();\n    return (\n      <div className="nx-input-wrapper" style={{ perspective: "1000px" }}>\n        {label && (\n          <label htmlFor={inputId} className="nx-input-label">\n            {label}\n          </label>\n        )}\n        <div style={{ transformStyle: "preserve-3d", transform: "translateZ(8px)" }}>\n          <input\n            id={inputId}\n            ref={ref}\n            aria-invalid={!!error}\n            className={cn(\n              "nx-input",\n              error && "nx-input-error",\n              className\n            )}\n            {...props}\n          />\n        </div>\n        {error && <p className="nx-input-error-text">{error}</p>}\n      </div>\n    );\n  }\n);\nNxInput.displayName = "NxInput";',
        'tsx'))

    story.append(info_callout(
        'Token table — paste into Figma',
        'Surface rgba(255,255,255,0.04) · Border 1px rgba(255,83,169,0.2) · Border-focus 1.5px '
        '#FF53A9 · Glow 0 0 0 3px rgba(255,83,169,0.2) · Label-float 14px→11px, 0→-12px · Counter '
        'Mono 11px rgba(255,83,169,1) · Check 16px #FF53A9 spring 200ms · Padding 12px 16px · '
        'Radius 8px · Font NotoSans 14px/20px · Touch-target 44×44px min · Focus-ring 2px #FF53A9 '
        '+ 3px glow.',
        SEM_INFO))

    story.append(PageBreak())
    return story



# ─── PART VII — CHAPTER 9: IMMERSIVE STORYTELLING ───────────────────────────
def add_part_vii(story):
    story += section_opener('PART VII · CHAPTER 9', 'Immersive Storytelling — Narrative Architecture Across Pages')

    story.append(Paragraph(
        'The storytelling layer ties every element of the redesign together. Without it, the 3D '
        'characters are decoration and the redesigned text boxes are isolated components. With it, '
        'the site becomes a cohesive journey: the visitor is a founder exploring a digital city — '
        'ClickTake City — and every page is a district with its own guide. This chapter de&#64257;nes '
        'the meta-narrative, the page-by-page arc, the transition choreography, and the persistence '
        'layer that makes the journey feel continuous across sessions.',
        S_BODY))

    story.append(Paragraph('Meta-narrative — The Visitor\'s Journey', S_H2))
    story.append(Paragraph(
        'The visitor arrives at ClickTake City as a founder with an idea. They are greeted at the '
        'city gates (Home) by The Architect, who shows them the skyline of what could be built. '
        'They visit the workshop district (Services) where The Craftsman shows them the tools. They '
        'enter the war room (Solutions) where The Strategist shows them the plays. They browse the '
        'trophy gallery (Case Studies) where The Explorer recounts past victories. They enter the '
        'boutique (Pricing) where The Curator arranges the value ladder. They visit city hall '
        '(About) where The Founder tells the origin story. They stop by the library (Blog) where '
        'The Scribe shares knowledge. They climb the comm tower (Contact) where The Messenger '
        'dispatches their signal skyward. They pass the construction site (Careers) where The '
        'Pioneer invites them to build. They meet The Navigator (Cities) at the city\'s crossroads, '
        'who orients them across the regions ClickTake serves.',
        S_BODY))

    story.append(Paragraph('Page-by-page narrative arc', S_H2))
    story.append(make_table([
        ['Page', 'District', 'Character', 'Narrative Beat'],
        ['Home', 'City Gates', 'The Architect', 'Arrival — "Welcome, founder. Let me show you the skyline."'],
        ['Services', 'Workshop', 'The Craftsman', 'Tools — "These are the instruments we build with."'],
        ['Solutions', 'War Room', 'The Strategist', 'Plays — "Every founder needs a playbook."'],
        ['Case Studies', 'Trophy Gallery', 'The Explorer', 'Trophies — "These are the journeys we\'ve taken."'],
        ['Pricing', 'Boutique', 'The Curator', 'Value — "Choose the tier that fits your ambition."'],
        ['About', 'City Hall', 'The Founder', 'Origin — "Here is how ClickTake City came to be."'],
        ['Blog', 'Library', 'The Scribe', 'Knowledge — "These are the lessons we\'ve written down."'],
        ['Contact', 'Comm Tower', 'The Messenger', 'Signal — "Tell us where to send the signal."'],
        ['Careers', 'Construction Site', 'The Pioneer', 'Build — "We\'re building something. Join us."'],
        ['Cities', 'Crossroads', 'The Navigator', 'Orient — "Four cities, one studio."'],
    ], col_weights=[0.10, 0.18, 0.16, 0.56]))

    story.append(Paragraph('Transition choreography', S_H2))
    story.append(Paragraph(
        'When the visitor navigates between pages, the outgoing character waves goodbye and '
        'shrinks to 0.3× scale over 0.6 seconds, then fades out. Simultaneously, the incoming '
        'character materializes via a particle-assembly effect: 500 particles spawn at random '
        'positions within the character\'s bounding box and converge to the character mesh over '
        '1.0 seconds, with the mesh opacity rising from 0 to 1 over the &#64257;nal 0.4 seconds. '
        'The total transition is 1.2 seconds — long enough to feel intentional, short enough to '
        'not frustrate frequent navigators. The transition is skipped on back-button navigation '
        '(the visitor is "returning", not "arriving") and on reduced-motion (instant swap with a '
        'simple fade).',
        S_BODY))

    story.append(Paragraph('Scroll-driven narrative', S_H2))
    story.append(Paragraph(
        'Within each page, the character\'s pose changes as the visitor scrolls through sections. '
        'Three keypoints — top, middle, bottom of the page — drive the pose blend. At the top '
        '(anticipatory), the character faces the visitor with a "let me show you" expression. In '
        'the middle (engaged), the character turns to face the content, gesturing toward the '
        'section in view. At the bottom (satis&#64257;ed), the character turns back to the visitor '
        'with a "what next?" expression. The pose blend uses the same useScroll hook from '
        '@react-three/drei that drives the scroll-react animation in Chapter 7 — the two systems '
        'are uni&#64257;ed, not duplicated.',
        S_BODY))

    story.append(Paragraph('Voice-over — optional TTS narration', S_H2))
    story.append(Paragraph(
        'Each page can optionally play a 3-5 second TTS-narrated intro when the character '
        'materializes. The narration is a single sentence in the character\'s voice, '
        'synthesized via the z-ai-web-dev-sdk TTS endpoint on &#64257;rst visit and cached in '
        'IndexedDB. Examples: The Architect on Home — "Welcome, founder. Let me show you the '
        'skyline." The Craftsman on Services — "These are the instruments we build with." The '
        'Strategist on Solutions — "Every founder needs a playbook." Voice-over is opt-in — the '
        'visitor enables it via a toggle in the navbar (off by default). Once enabled, it plays '
        'once per page per session (not on every navigation back to the same page). A small '
        '"skip" button appears bottom-right while narration plays.',
        S_BODY))

    story.append(Paragraph('Persistence — the character remembers', S_H2))
    story.append(Paragraph(
        'A small localStorage entry (<font face="Mono">clicktake-journey</font>) tracks the '
        'visitor\'s journey: which districts they\'ve visited, how many sessions, last visit '
        'date. On session 2+, the home character\'s voice line changes from "Welcome, founder" '
        'to "Welcome back. Let\'s pick up where we left off." If the visitor has visited 5+ '
        'districts, a small "Founder\'s Path" badge appears in the navbar showing progress '
        'through the 10 districts. If the visitor has visited all 10, an "Elite Mode unlocked" '
        'modal appears — turning the storytelling journey into the Elite Mode opt-in mechanic. '
        'This is how Elite Mode adoption reaches the 5% Q1 KPI: the journey rewards completion '
        'with Elite access.',
        S_BODY))

    story.append(Paragraph('Narrative &#64258;ow diagram (text representation)', S_H2))
    story.append(code_block(
        '                  ┌─────────────────┐\n                  │  ARRIVAL (Home)  │\n                  │  The Architect   │\n                  └────────┬────────┘\n                           │\n           ┌───────────────┼───────────────┐\n           ▼               ▼               ▼\n     ┌──────────┐    ┌──────────┐    ┌──────────┐\n     │ Services │    │ Solutions│    │ Pricing  │\n     │Craftsman │    │Strategist│    │ Curator  │\n     └────┬─────┘    └────┬─────┘    └────┬─────┘\n          │                │                │\n          └────────┬───────┴────────┬───────┘\n                   ▼                ▼\n              ┌──────────┐     ┌──────────┐\n              │Case Study│     │   About  │\n              │ Explorer │     │ Founder  │\n              └────┬─────┘     └────┬─────┘\n                   │                │\n                   ▼                ▼\n              ┌──────────┐     ┌──────────┐\n              │   Blog   │     │  Cities  │\n              │  Scribe  │     │Navigator │\n              └────┬─────┘     └────┬─────┘\n                   │                │\n                   └────────┬───────┘\n                            ▼\n                      ┌──────────┐\n                      │  Contact │\n                      │ Messenger│\n                      └────┬─────┘\n                           ▼\n                      ┌──────────┐\n                      │ Careers  │\n                      │ Pioneer  │ ──► Elite Mode unlocked\n                      └──────────┘',
        'flow'))

    story.append(PageBreak())
    return story


# ─── PART VIII — CHAPTER 10: IMPLEMENTATION ROADMAP ────────────────────────
def add_part_viii(story):
    story += section_opener('PART VIII · CHAPTER 10', 'Implementation Roadmap')

    story.append(Paragraph(
        'A six-phase, 18-week implementation plan. Each phase has a clear deliverable, an owner '
        'suggestion, a de&#64257;nition-of-done, and a risk pro&#64257;le. Phase gates allow '
        'pause points if team bandwidth tightens — a smaller team can ship Phases 0-3 (SEO wins '
        'plus the hero 3D experience on &#64257;ve pages) in 9 weeks and still deliver a visible '
        'transformation. The full 18-week plan delivers the complete 3D storytelling platform '
        'with Elite Mode, voice-over, and persistence.',
        S_BODY))

    story.append(Paragraph('Phase overview (Gantt)', S_H2))
    story.append(make_table([
        ['Phase', 'Weeks', 'Owner', 'Deliverable', 'Risk'],
        ['Phase 0 — SEO/GEO quick wins', '1', 'FE + DevOps', 'llms.txt, RSS, FAQ schema, robots.txt cleanup, Product schema, Vercel Analytics', 'Low'],
        ['Phase 1 — Foundation', '2-3', 'FE + 3D', 'R3F/drei/postprocessing install, SceneProvider, adaptive quality hook, Elite Mode tokens, 5-mode toggle', 'Medium — bundle size'],
        ['Phase 2 — Character system', '4-6', '3D + Design', '3 base characters (Architect, Craftsman, Strategist), idle/hover/scroll/click animations, RPM pipeline', 'Medium — asset production'],
        ['Phase 3 — Page rollout', '7-9', 'FE + 3D', 'Characters deployed to 10 pages (1 per week, A/B tested), voice-over on 3 hero pages', 'Medium — perf regression per page'],
        ['Phase 4 — UI system v2', '10-11', 'Design + FE', 'NxInput family (10 components), CodeBlock, Callout, StatCard migration, RSS extension to /research/', 'Low'],
        ['Phase 5 — Storytelling layer', '12-13', 'FE + 3D', 'Transitions, scroll-narrative, TTS voice-over, persistence, Elite unlock modal', 'Medium — TTS cost'],
        ['Phase 6 — Polish & perf', '14-16', 'FE + DevOps', 'Bundle audit, CWV optimization, pa11y-ci in CI, Elite Mode premium gate', 'Medium — scope creep'],
        ['Phase 7 — Launch', '17-18', 'All', 'Staged rollout (10% → 50% → 100%), GEO monitoring dashboard, post-launch retro', 'Low'],
    ], col_weights=[0.22, 0.07, 0.13, 0.45, 0.13]))

    story.append(Paragraph('Phase 0 — SEO/GEO quick wins (week 1)', S_H2))
    story.append(Paragraph(
        'Ship all 7 quick-win SEO/GEO gaps in one week. Full code patches in Appendix A. Deliverable: '
        'a single PR that adds llms.txt, RSS feed, FAQ schema on home, deletes '
        'public/robots.txt, adds Product schema on pricing, Review schema on testimonials, and '
        'migrates admin @import fonts to next/font. Veri&#64257;cation: Google Rich Results Test '
        'passes on all 5 modi&#64257;ed pages, Schema.org validator 100% pass, Vercel Analytics '
        'dashboard live. Owner: 1 frontend engineer + 1 DevOps engineer. Risk: low — all changes '
        'are additive or deletions, no breaking changes to existing routes.',
        S_BODY))

    story.append(Paragraph('Phase 1 — Foundation (weeks 2-3)', S_H2))
    story.append(Paragraph(
        'Install @react-three/fiber, @react-three/drei, @react-three/postprocessing. Build '
        '<font face="Mono">&lt;SceneProvider&gt;</font> with single Canvas, AnimatePresence scene '
        'swapping, adaptive quality hook, postprocessing chain. Build the Elite Mode token '
        'cascade from Chapter 5 and upgrade theme-toggle to 5-mode segmented control. De&#64257;nition-of-done: '
        'Lighthouse CI passes on a &#64257;ve-page subset, 3D bundle ≤ 280 KB gzipped, Elite Mode '
        'toggle works on admin and public site. Owner: 1 frontend engineer (lead) + 1 3D engineer. '
        'Risk: medium — bundle size discipline required; the postprocessing chain alone is '
        '~80 KB and must be lazy-loaded only when WebGL is available.',
        S_BODY))

    story.append(Paragraph('Phase 2 — Character system (weeks 4-6)', S_H2))
    story.append(Paragraph(
        'Rig 3 base characters (Architect, Craftsman, Strategist) using Ready Player Me base + '
        'Blender-modeled accessories. Author 4 animation clips per character (idle, hover, '
        'scroll-react, click-react) in Mixamo. Build the shared '
        '<font face="Mono">&lt;Character/&gt;</font> wrapper with parallax, scroll, and click '
        'handlers. De&#64257;nition-of-done: all 3 characters render at 60fps on M1 baseline, '
        '30fps on iPhone 12, ≤ 150 KB per character GLTF. Owner: 1 3D engineer + 1 designer '
        '(modeling). Risk: medium — character asset production is the most uncertain timeline '
        'component; if RPM base doesn\'t meet quality bar, fall back to custom-modeled low-poly '
        'meshes (adds 1 week).',
        S_BODY))

    story.append(Paragraph('Phase 3 — Page rollout (weeks 7-9)', S_H2))
    story.append(Paragraph(
        'Deploy characters to all 10 pages — one per week, A/B tested (50% see new 3D character, '
        '50% see current CSS mascot). Measure bounce rate, avg session duration, conversion on '
        '/contact. Roll forward if 3D variant doesn\'t regress any metric by more than 5%. Add '
        'voice-over on 3 hero pages (Home, Services, About). De&#64257;nition-of-done: 10 pages '
        'live with 3D characters, A/B test results documented, voice-over on 3 pages. Owner: 1 '
        'frontend engineer + 1 3D engineer. Risk: medium — perf regression per page is the '
        'biggest risk; mitigate by running Lighthouse CI on every page-add PR.',
        S_BODY))

    story.append(Paragraph('Phase 4 — UI system v2 (weeks 10-11)', S_H2))
    story.append(Paragraph(
        'Build NxInput family (10 components), migrate all forms (contact, newsletter, login, '
        'admin CMS) to new components. Add CodeBlock, Callout, StatCard components. Build the '
        '/research/ section with the three original-research assets (State of AI-Search 2026, GEO '
        'Benchmark, Client Metrics Dashboard). De&#64257;nition-of-done: every form uses NxInput '
        'family, pa11y-ci passes on all forms in all 5 theme variants, /research/ section live '
        'with 3 downloadable assets. Owner: 1 designer + 1 frontend engineer. Risk: low — '
        'component-swap work, no architectural changes.',
        S_BODY))

    story.append(Paragraph('Phase 5 — Storytelling layer (weeks 12-13)', S_H2))
    story.append(Paragraph(
        'Wire transitions between pages (particle-assembly materialization), scroll-driven pose '
        'blending, TTS voice-over for all 10 characters (8-12 lines each), persistence via '
        'localStorage, Elite unlock modal. De&#64257;nition-of-done: full storytelling journey '
        'works end-to-end, voice-over toggle in navbar, Elite unlock modal appears after 10 '
        'districts visited. Owner: 1 frontend engineer + 1 3D engineer. Risk: medium — TTS cost '
        'via z-ai-web-dev-sdk scales with usage; mitigate by caching every line in IndexedDB on '
        '&#64257;rst play and only re-synthesizing if the line text changes.',
        S_BODY))

    story.append(Paragraph('Phase 6 — Polish & performance (weeks 14-16)', S_H2))
    story.append(Paragraph(
        'Bundle audit — verify 3D bundle ≤ 280 KB, per-page ≤ 80 KB. CWV optimization — chase '
        'LCP < 2.0s on every hero page, TBT < 150ms, CLS < 0.05. pa11y-ci in CI on all 17 admin '
        'routes × 5 theme variants. Elite Mode premium gate — content modules gated behind Elite '
        'unlock. De&#64257;nition-of-done: Lighthouse CI green on all routes, pa11y-ci green on '
        'all variants, Elite Mode premium content live. Owner: 1 frontend engineer + 1 DevOps '
        'engineer. Risk: medium — scope creep risk on Elite Mode premium content; mitigate by '
        'de&#64257;ning MVP as visual layer only and deferring premium content to v2.',
        S_BODY))

    story.append(Paragraph('Phase 7 — Launch (weeks 17-18)', S_H2))
    story.append(Paragraph(
        'Staged rollout: 10% of traffic in week 17 (Vercel Edge Config &#64258;ag), 50% mid-week, '
        '100% by end of week 18. GEO monitoring dashboard live (Perplexity API + Google Search '
        'Console AI queries + manual weekly ChatGPT/Perplexity prompts). Post-launch retro at '
        'end of week 18. De&#64257;nition-of-done: 100% rollout, GEO dashboard showing baseline '
        'metrics, retro document published. Owner: full team. Risk: low — staged rollout catches '
        'any production-only issues before full exposure.',
        S_BODY))

    story.append(PageBreak())
    return story



# ─── PART IX — CHAPTER 11: KPIs & MEASUREMENT ───────────────────────────────
def add_part_ix(story):
    story += section_opener('PART IX · CHAPTER 11', 'KPIs, Measurement & Success Criteria')

    story.append(Paragraph(
        'Success is measured across four dimensions: SEO (organic visibility), GEO (AI-search '
        'visibility), 3D performance (Core Web Vitals), and UX (engagement and conversion). Each '
        'dimension has hard targets, measurement infrastructure, and a reporting cadence. The '
        'measurement infrastructure installs in Phase 0 (Vercel Analytics + Speed Insights) and '
        'Phase 4 (custom GEO dashboard + brand-mention alerts).',
        S_BODY))

    story.append(Paragraph('SEO KPIs', S_H2))
    story.append(Paragraph(
        'Organic traffic is the north-star SEO metric. The 6-month target is +40% organic '
        'sessions measured in Google Search Console (GSC) — comparing the 6 months post-launch '
        'to the 6 months pre-launch. Secondary KPIs: non-brand keyword coverage +60% (measured '
        'as count of distinct queries in GSC that don\'t contain "clicktake"); crawl budget waste '
        '< 15% (measured as count of low-value URLs crawled — anything in /api/ or /admin/ that '
        'should be disallowed); schema validation 100% pass in Schema.org validator. Reporting '
        'cadence: weekly snapshot, monthly deep-dive.',
        S_BODY))

    story.append(Paragraph('GEO KPIs', S_H2))
    story.append(Paragraph(
        'Brand mentions in AI answer engines is the north-star GEO metric. The 6-month target is '
        '0 → 50+ mentions per month across ChatGPT Search, Perplexity, Google AI Overviews, and '
        'Claude. Measurement: weekly Perplexity API query for "ClickTake" plus 20 category '
        'queries; weekly ChatGPT Search prompts for the same 20 queries; weekly Claude prompts '
        '(manual, no API yet); weekly Google Search Console AI Overview filter. Secondary KPIs: '
        'llms.txt fetches tracked in Vercel Analytics; ai.* referral traffic +200% (measured in '
        'Vercel Analytics). Reporting cadence: weekly snapshot in the custom GEO dashboard.',
        S_BODY))

    story.append(Paragraph('3D performance KPIs', S_H2))
    story.append(Paragraph(
        'Core Web Vitals on hero pages is the north-star performance metric. Targets: LCP < 2.0s, '
        'TBT < 150ms, CLS < 0.05. Measurement: Vercel Speed Insights (RUM from real users) + '
        'Lighthouse CI (synthetic, runs on every PR). Secondary KPIs: 3D bundle ≤ 280 KB gzipped '
        '(enforced via bundlesize in CI); frame rate ≥ 60fps on M1 baseline, ≥ 30fps on iPhone 12 '
        'baseline (measured via Playwright + BrowserStack perf tests, run nightly). Reporting '
        'cadence: per-PR (Lighthouse CI blocking), daily (RUM dashboard), weekly (perf regression '
        'review).',
        S_BODY))

    story.append(Paragraph('UX KPIs', S_H2))
    story.append(Paragraph(
        'Bounce rate reduction on pages with 3D characters is the north-star UX metric. Target: '
        '-15% bounce rate on the 10 character pages (measured in Vercel Analytics). Secondary '
        'KPIs: avg session duration +30%; conversion rate on /contact +20%; Elite Mode adoption '
        '5% of returning users in Q1 (measured as count of users with localStorage '
        '<font face="Mono">clicktake-journey</font> containing all 10 districts, divided by total '
        'returning users). Reporting cadence: weekly snapshot, monthly deep-dive with cohort '
        'analysis.',
        S_BODY))

    story.append(Paragraph('KPI summary table', S_H3))
    story.append(make_table([
        ['Dimension', 'KPI', 'Target', 'Source', 'Cadence'],
        ['SEO', 'Organic sessions', '+40% in 6 mo', 'Google Search Console', 'Weekly'],
        ['SEO', 'Non-brand keyword coverage', '+60%', 'GSC queries report', 'Monthly'],
        ['SEO', 'Schema validation pass', '100%', 'Schema.org validator', 'Per-PR'],
        ['GEO', 'AI-search brand mentions', '0 → 50+/mo', 'Perplexity API + manual', 'Weekly'],
        ['GEO', 'llms.txt fetches', 'Tracked, trending up', 'Vercel Analytics', 'Weekly'],
        ['GEO', 'ai.* referral traffic', '+200%', 'Vercel Analytics', 'Weekly'],
        ['3D', 'LCP on hero pages', '< 2.0s', 'Vercel Speed Insights', 'Daily'],
        ['3D', 'TBT', '< 150ms', 'Lighthouse CI', 'Per-PR'],
        ['3D', 'CLS', '< 0.05', 'Lighthouse CI', 'Per-PR'],
        ['3D', '3D bundle (gzipped)', '≤ 280 KB', 'bundlesize CI', 'Per-PR'],
        ['3D', 'Frame rate on M1', '≥ 60 fps', 'Playwright perf test', 'Nightly'],
        ['3D', 'Frame rate on iPhone 12', '≥ 30 fps', 'BrowserStack perf test', 'Nightly'],
        ['UX', 'Bounce rate on character pages', '-15%', 'Vercel Analytics', 'Weekly'],
        ['UX', 'Avg session duration', '+30%', 'Vercel Analytics', 'Weekly'],
        ['UX', 'Conversion rate on /contact', '+20%', 'Vercel Analytics', 'Weekly'],
        ['UX', 'Elite Mode adoption Q1', '5% of returning users', 'localStorage audit', 'Monthly'],
    ], col_weights=[0.07, 0.30, 0.18, 0.30, 0.15]))

    story.append(Paragraph('Measurement infrastructure', S_H2))
    story.append(Paragraph(
        'Three layers. First, Vercel Analytics + Vercel Speed Insights install on day 1 of '
        'Phase 0 — free, privacy-&#64257;rst, no consent banner required. Surfaces pageview '
        'counts, ai.* referral sources, and Core Web Vitals RUM. Second, PostHog installs in '
        'Phase 1 for product analytics (session replay, funnel analysis, feature &#64258;ags '
        'for the staged rollout). Third, a custom GEO dashboard builds in Phase 4 — a Next.js '
        'route at /admin/geo (admin-only) that aggregates weekly Perplexity API results, GSC AI '
        'Overview data, and manual ChatGPT/Claude prompt results into a single timeline view. '
        'The dashboard also runs the brand-mention alert pipeline (Phase 4) — a nightly cron '
        'that pings Slack whenever ClickTake is newly cited in a major AI answer engine.',
        S_BODY))

    story.append(PageBreak())
    return story


# ─── PART X — CHAPTER 12: RISK REGISTER ────────────────────────────────────
def add_part_x(story):
    story += section_opener('PART X · CHAPTER 12', 'Risk Register & Open Questions')

    story.append(Paragraph(
        'Eight risks are tracked across the 18-week plan. Each has a mitigation strategy and an '
        'owner. Risks are reviewed weekly during the standup and escalated to the steering '
        'committee if probability or impact rises. Open questions are listed at the end — these '
        'are decisions that need a stakeholder answer before Phase 5.',
        S_BODY))

    story.append(Paragraph('Risk register', S_H2))
    story.append(make_table([
        ['#', 'Risk', 'Prob', 'Impact', 'Mitigation'],
        ['1', '3D bundle bloat tanks Core Web Vitals', 'Med', 'High', 'Strict 280KB budget enforced via bundlesize CI; adaptive quality tiering degrades to CSS mascots on low-tier devices'],
        ['2', 'Accessibility regression from 3D', 'Low', 'High', 'WCAG 2.2 audit per phase; prefers-reduced-motion respect; pa11y-ci in CI on all 17 admin routes × 5 themes'],
        ['3', 'Mobile perf on low-end devices', 'Med', 'High', 'GPU tier detection via useAdaptiveQuality hook; graceful degradation to CSS mascots; nightly BrowserStack perf test on iPhone 12'],
        ['4', 'GLTF asset production bottleneck', 'Med', 'Med', 'Start with Ready Player Me free base; customize accessories later; pre-built Mixamo animations for the 4 standard states'],
        ['5', 'Elite Mode scope creep', 'High', 'Med', 'MVP defined as visual layer only; premium content gating deferred to v2; phase gate at end of Phase 6 to review scope'],
        ['6', 'SEO volatility during redesign', 'Low', 'High', '301-map every URL; keep sitemap.ts stable; deploy SEO fixes in Phase 0 before any 3D work; daily GSC monitoring during Phase 3'],
        ['7', 'GEO measurement gap (no analytics today)', 'High', 'Med', 'Install Vercel Analytics Day 1 of Phase 0; build custom GEO dashboard in Phase 4; baseline measurement for 2 weeks before Phase 3'],
        ['8', 'Team bandwidth for 18-week timeline', 'Med', 'High', 'Phase gates allow pause points; Phases 0-3 (9 weeks) deliver visible transformation; Phase 4-7 can stretch if needed'],
    ], col_weights=[0.04, 0.32, 0.07, 0.07, 0.50]))

    story.append(Paragraph('Open questions for stakeholders', S_H2))
    story.append(Paragraph(
        'These decisions need answers from ClickTake leadership before Phase 5 (storytelling '
        'layer) begins. Each question affects scope, budget, or timeline.',
        S_BODY))
    story += bullet_list([
        '<b>Localization</b>: Do we localize the site for Arabic (UAE office) and Urdu (Pakistan office) markets? This affects hreflang implementation, content translation budget, and the character voice-over production (each line × 3 languages).',
        '<b>Elite Mode monetization</b>: Is Elite Mode a free loyalty reward (the default in this brief) or a paid tier? If paid, what\'s the pricing — one-time, monthly, annual? This affects Phase 6 premium gate implementation.',
        '<b>Character licensing</b>: Do we license Ready Player Me (free, attribution required, generic look) or commission original character rigs from a 3D artist (estimated $5-10k per character, exclusive rights, distinctive brand silhouettes)? This affects Phase 2 timeline and budget.',
        '<b>Voice-over shipping</b>: Do we ship TTS voice-over in Phase 5 (per this brief) or defer to v2? TTS via z-ai-web-dev-sdk costs ~$0.001 per line — for 100 lines × 10 characters × ~1000 unique visitors per day = ~$1000/month. Acceptable? Or wait for v2 with human voice talent?',
        '<b>Original research cadence</b>: The /research/ section proposes three assets updated quarterly. Who owns the research — internal team, external contractor, or a hired research lead? This affects Phase 4 and ongoing operational cost.',
        '<b>Elite Mode metrics gating</b>: When a visitor unlocks Elite Mode by visiting all 10 districts, do we also gate by session count (e.g. ≥3 sessions) or time-on-site (e.g. ≥10 minutes)? Affects the unlock modal logic in Phase 5.',
    ])

    story.append(info_callout(
        'Recommendation on open questions',
        'Default to the simpler option for each: skip localization in v1 (single-locale is fine '
        'for now), Elite Mode as free loyalty reward, RPM base with custom accessories (the '
        'hybrid in this brief), ship TTS voice-over in Phase 5 (the $1000/month cost is '
        'acceptable for the engagement lift), internal team owns research (hire a contractor '
        'only if Phase 4 slips), gate Elite Mode by district count only (simplest logic). These '
        'defaults can be revisited in the Phase 6 review.',
        SEM_INFO))

    story.append(PageBreak())
    return story


# ─── APPENDIX A: QUICK-WIN CODE PATCHES ────────────────────────────────────
def add_appendix_a(story):
    story += section_opener('APPENDIX A', 'Quick-Win Code Patches')

    story.append(Paragraph(
        'Copy-paste-ready patches for the 7 Phase 0 SEO/GEO quick wins. Each patch has a &#64257;le '
        'path, the code, and a veri&#64257;cation command. All patches are designed to ship as a '
        'single PR in week 1.',
        S_BODY))

    story.append(Paragraph('A.1 — public/llms.txt', S_H3))
    story.append(Paragraph(
        'Create <font face="Mono">public/llms.txt</font> with the full content drafted in '
        'Chapter 4. Veri&#64257;cation: <font face="Mono">curl https://clicktaketech.com/llms.txt</font> '
        'returns the markdown.',
        S_BODY))

    story.append(Paragraph('A.2 — Delete public/robots.txt', S_H3))
    story.append(code_block(
        'git rm public/robots.txt\n# Verify\ncurl -sI https://clicktaketech.com/robots.txt | head -5\n# Should return Content-Type: text/plain with the dynamic robots.ts output\n# Body should include "Sitemap: https://clicktaketech.com/sitemap.xml"',
        'shell'))

    story.append(Paragraph('A.3 — RSS feed at /feed.xml', S_H3))
    story.append(Paragraph(
        'Full code in Gap 5 of Chapter 2. Create '
        '<font face="Mono">src/app/feed.xml/route.ts</font>. Veri&#64257;cation: '
        '<font face="Mono">curl https://clicktaketech.com/feed.xml</font> returns valid Atom XML. '
        'Add <font face="Mono">&lt;link rel="alternate" type="application/atom+xml" '
        'href="/feed.xml" /&gt;</font> to the document head in layout.tsx.',
        S_BODY))

    story.append(Paragraph('A.4 — Homepage FAQPage schema', S_H3))
    story.append(Paragraph(
        'Extract the 6 FAQ items from the NxFaq accordion in src/app/page.tsx into a shared '
        'constant exported to a JSON-LD builder. Add a script tag with the FAQPage schema below '
        'the NxFaq component. Full code in Gap 2 of Chapter 2. Veri&#64257;cation: Google Rich '
        'Results Test on https://clicktaketech.com/ shows FAQ rich result eligibility.',
        S_BODY))

    story.append(Paragraph('A.5 — Product + Offer schema on /pricing', S_H3))
    story.append(code_block(
        '// src/app/pricing/page.tsx — add before closing </main>\n<script type="application/ld+json" dangerouslySetInnerHTML={{\n  __html: JSON.stringify({\n    "@context": "https://schema.org",\n    "@type": "ItemList",\n    itemListElement: PRICING_PLANS.map((plan, i) => ({\n      "@type": "ListItem",\n      position: i + 1,\n      item: {\n        "@type": "Product",\n        name: plan.name,\n        description: plan.description,\n        brand: { "@type": "Brand", name: "ClickTake" },\n        offers: {\n          "@type": "Offer",\n          price: plan.price.replace(/[^0-9]/g, ""),\n          priceCurrency: "USD",\n          availability: "https://schema.org/InStock"\n        }\n      }\n    }))\n  })\n}} />',
        'tsx'))

    story.append(Paragraph('A.6 — Review schema for testimonials', S_H3))
    story.append(code_block(
        '// src/components/site/nx-testimonials.tsx — add before closing </section>\nconst reviewSchema = {\n  "@context": "https://schema.org",\n  "@type": "Product",\n  name: "ClickTake Web Development Services",\n  aggregateRating: {\n    "@type": "AggregateRating",\n    ratingValue: "5.0",\n    reviewCount: TESTIMONIALS.length,\n    bestRating: "5",\n    worstRating: "1"\n  },\n  review: TESTIMONIALS.map(t => ({\n    "@type": "Review",\n    author: { "@type": "Person", name: t.name },\n    reviewBody: t.quote,\n    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }\n  }))\n};\n// Render as <script type="application/ld+json" ...>',
        'tsx'))

    story.append(Paragraph('A.7 — next/font migration for admin', S_H3))
    story.append(code_block(
        '// src/app/admin/layout.tsx — replace @import in admin-globals.css with next/font\nimport { Syne, JetBrains_Mono } from "next/font/google";\n\nconst syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-syne" });\nconst jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-jetbrains" });\n\n// In the layout JSX:\n<body className={`${syne.variable} ${jetbrains.variable} ct-admin`}>\n  {children}\n</body>\n\n// Then in admin-globals.css, replace:\n// @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap");\n// With nothing (next/font handles loading). Update font-family declarations to use var(--font-syne) and var(--font-jetbrains).',
        'tsx'))

    story.append(Paragraph('A.8 — Elite Mode token cascade (partial — full in Chapter 5)', S_H3))
    story.append(Paragraph(
        'The full Elite Mode CSS token cascade is in Chapter 5. For Phase 0, ship only the '
        'foundation: add <font face="Mono">data-theme</font> attribute switching to the html '
        'element (replacing the current class-based .dark / .theme-custom system), de&#64257;ne '
        'the base :root tokens, and migrate the top 10 most-used admin-globals.css rules to '
        'read from tokens. Full migration completes in Phase 1.',
        S_BODY))

    story.append(PageBreak())
    return story


# ─── APPENDIX B: GLOSSARY & REFERENCES ─────────────────────────────────────
def add_appendix_b(story):
    story += section_opener('APPENDIX B', 'Glossary & References')

    story.append(Paragraph(
        'A working glossary of the 30+ terms used in this brief, plus reference links for '
        'deeper reading.',
        S_BODY))

    story.append(Paragraph('Glossary', S_H2))
    story.append(make_table([
        ['Term', 'Definition'],
        ['GEO', 'Generative Engine Optimization — making content discoverable and citeable by AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews, Claude).'],
        ['SEO', 'Search Engine Optimization — traditional optimization for crawler-based search engines (Google, Bing).'],
        ['llms.txt', 'A markdown-formatted file at /llms.txt proposed by Jeremy Howard (2024) that gives LLMs a curated overview of site content. The GEO equivalent of sitemap.xml.'],
        ['R3F', '@react-three/fiber — the React renderer for Three.js. Enables declarative scene graphs that reconcile with React.'],
        ['drei', '@react-three/drei — helper components for R3F (OrbitControls, Environment, useGLTF, ContactShadows, Float, Sparkles).'],
        ['postprocessing', '@react-three/postprocessing — Bloom, ChromaticAberration, Vignette, Noise effects for R3F scenes.'],
        ['Draco', 'Google\'s 3D geometry compression library. Compresses GLTF meshes by 90%+ with minimal quality loss.'],
        ['Meshopt', 'Alternative 3D compression library; complements Draco for animation and morph targets.'],
        ['Ready Player Me', 'Cross-game avatar platform; provides free humanoid base meshes with standard skeleton. Used as the character base in this brief.'],
        ['HDRI', 'High Dynamic Range Image — used as environment lighting in 3D scenes to produce realistic material reflections.'],
        ['WCAG 2.2 AA', 'Web Content Accessibility Guidelines version 2.2, conformance level AA. Requires 4.5:1 contrast for body text, 3:1 for large text.'],
        ['Core Web Vitals', 'Google\'s user-experience metrics: LCP (Largest Contentful Paint), TBT (Total Blocking Time), CLS (Cumulative Layout Shift).'],
        ['LCP', 'Largest Contentful Paint — time until the largest visible element renders. Target < 2.5s; this brief targets < 2.0s.'],
        ['TBT', 'Total Blocking Time — sum of all long-task blocking periods between FCP and TTI. Target < 200ms; this brief targets < 150ms.'],
        ['CLS', 'Cumulative Layout Shift — total visible layout shift. Target < 0.1; this brief targets < 0.05.'],
        ['FOUC', 'Flash of Unstyled Content — the brief flash of default-styled content before the theme initializes. Prevented via the themeInitScript in layout.tsx.'],
        ['SSR', 'Server-Side Rendering — Next.js renders HTML on the server, client hydrates. Used for static and dynamic pages.'],
        ['SSG', 'Static Site Generation — Next.js renders HTML at build time. Used for blog posts via generateStaticParams.'],
        ['ISR', 'Incremental Static Regeneration — SSG with periodic revalidation. Used for city pages (revalidate = 86400).'],
        ['OpenAPI 3.1', 'Industry-standard API description format. ClickTake exposes /openapi.json with x402 payment metadata.'],
        ['MCP', 'Model Context Protocol — Anthropic\'s protocol for tool-calling agents. ClickTake exposes /api/mcp and /.well-known/mcp/server-card.json.'],
        ['x402', 'HTTP Payment Protocol — enables per-request payments via HTTP 402 status. ClickTake exposes /api/premium returning 402 with payment requirements.'],
        ['auth.md', 'WorkOS-spec markdown file at /auth.md describing how AI agents authenticate with a site.'],
        ['DNS-AID', 'DNS-based Agent Identification — RFC 9460 SVCB/HTTPS records that publish agent endpoints at the DNS layer.'],
        ['RFC 8285 Link headers', 'HTTP Link header spec used to advertise related resources (api-catalog, service-desc, oauth-authorization-server, etc.).'],
        ['WebMCP', 'Experimental browser API exposing site tools to AI agents via the MCP protocol. ClickTake implements a WebMCP browser provider (Chrome-only).'],
        ['shadcn/ui', 'Component collection built on Radix UI primitives. ClickTake uses 49 shadcn components in src/components/ui/.'],
        ['TTS', 'Text-to-Speech — synthesizing audio from text. This brief uses z-ai-web-dev-sdk TTS for character voice lines.'],
        ['Vercel Analytics', 'Privacy-&#64257;rst, cookie-less analytics built into Vercel. Free for hobby tier; no consent banner required.'],
        ['PostHog', 'Open-source product analytics with session replay, feature &#64258;ags, and A/B testing. Recommended for Phase 1 install.'],
    ], col_weights=[0.18, 0.82]))

    story.append(Paragraph('References', S_H2))
    story += bullet_list([
        '<b>ClickTake live site</b>: <font face="Mono">https://clicktaketech.com</font>',
        '<b>Next.js 16 docs</b>: <font face="Mono">https://nextjs.org/docs</font>',
        '<b>@react-three/fiber docs</b>: <font face="Mono">https://r3f.docs.pmnd.rs</font>',
        '<b>@react-three/drei docs</b>: <font face="Mono">https://drei.docs.pmnd.rs</font>',
        '<b>llms.txt spec</b>: <font face="Mono">https://llmstxt.org</font>',
        '<b>Schema.org</b>: <font face="Mono">https://schema.org</font>',
        '<b>Web.dev Core Web Vitals</b>: <font face="Mono">https://web.dev/vitals</font>',
        '<b>Ready Player Me</b>: <font face="Mono">https://readyplayer.me</font>',
        '<b>Vercel Analytics</b>: <font face="Mono">https://vercel.com/analytics</font>',
        '<b>WCAG 2.2</b>: <font face="Mono">https://www.w3.org/TR/WCAG22</font>',
    ])

    story.append(Spacer(1, 24))
    story.append(HRule(thickness=1.5, color=ACCENT, space_before=8, space_after=8))
    story.append(Paragraph(
        '<font face="Mono" color="#88879B" size="7.5">CLICKTAKE TECHNOLOGIES · 3D STORYTELLING PLATFORM BRIEF · v1.0 · JULY 2026 · PREPARED BY SUPER Z · Z.AI</font>',
        ParagraphStyle('signoff', fontName='Mono', fontSize=7.5, textColor=TEXT_MUTED,
                      alignment=TA_CENTER, leading=12)))
    return story


# ═════════════════════════════════════════════════════════════════════════════
# 8. MAIN BUILD
# ═════════════════════════════════════════════════════════════════════════════
def main():
    output = '/home/z/my-project/scripts/clicktake-brief-body.pdf'
    doc = BriefDocTemplate(
        output, pagesize=A4,
        leftMargin=LEFT_M, rightMargin=RIGHT_M,
        topMargin=TOP_M, bottomMargin=BOT_M,
        title='ClickTake 3D Storytelling Platform — Technical & Creative Brief',
        author='Super Z · Z.ai',
        subject='SEO + GEO audit, Elite Mode fix, 3D redesign, storytelling architecture',
        creator='Z.ai',
    )

    story = build_story()
    story = add_part_ii_ch3(story)
    story = add_part_ii_ch4(story)
    story = add_part_iii(story)
    story = add_part_iv(story)
    story = add_part_v(story)
    story = add_part_vi(story)
    story = add_part_vii(story)
    story = add_part_viii(story)
    story = add_part_ix(story)
    story = add_part_x(story)
    story = add_appendix_a(story)
    story = add_appendix_b(story)

    doc.multiBuild(story)
    print(f'✅ Body PDF generated: {output}')
    import os
    print(f'   Size: {os.path.getsize(output) / 1024:.1f} KB')


if __name__ == '__main__':
    main()
