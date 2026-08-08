"""
Generate the CLIENT_PORTFOLIO TypeScript constant for src/lib/site-data.ts
based on real fetched data from /home/z/my-project/download/client-sites-summary.json
"""
import json
import os

with open("/home/z/my-project/download/client-sites-summary.json") as f:
    sites = json.load(f)

# Manually curated metadata (category, region, year, icon, blurb, tech) for the 12 entries.
# Slugs match the client-sites-summary.json `slug` field.
META = {
    "dib-t0ug-onrender-com": {
        "name": "DibNow",
        "category": "SaaS Platform",
        "region": "Global",
        "year": "2024",
        "icon": "Wrench",
        "blurb": "Cloud-based gadget repair management software & POS with serialized inventory, multi-branch support, and AI-powered customer service.",
        "tech_stack": ["React", "Node.js", "Render", "Stripe"],
        "color": "from-cyan-500/25 to-blue-500/40",
    },
    "panel-clicktake-web-app": {
        "name": "Panel — Employee Management",
        "category": "SaaS Platform",
        "region": "Global",
        "year": "2025",
        "icon": "Users",
        "blurb": "Modern employee management system with attendance tracking, project management, and team analytics.",
        "tech_stack": ["Next.js", "React", "Firebase"],
        "color": "from-indigo-500/25 to-violet-500/40",
    },
    "logitrack-blzq-onrender-com": {
        "name": "LogiTrack",
        "category": "SaaS Platform",
        "region": "Global",
        "year": "2025",
        "icon": "Truck",
        "blurb": "Logistics and shipment tracking platform with real-time dashboards and carrier integrations.",
        "tech_stack": ["React", "Node.js", "Render"],
        "color": "from-emerald-500/25 to-teal-500/40",
    },
    "clickopticx-onrender-com": {
        "name": "ClickOpticX",
        "category": "SaaS Platform",
        "region": "Global",
        "year": "2025",
        "icon": "Eye",
        "blurb": "Optical retail management platform with prescription tracking, inventory, and customer journey tools.",
        "tech_stack": ["React", "Node.js", "Render"],
        "color": "from-amber-500/25 to-orange-500/40",
    },
    "mearnsgadgetrepair-co-uk": {
        "name": "Mearns Gadget Repair",
        "category": "Gadget Repair",
        "region": "Glasgow, UK",
        "year": "2024",
        "icon": "Smartphone",
        "blurb": "Fast mobile, MacBook, and tablet repair booking site with live WooCommerce checkout and Stripe payments.",
        "tech_stack": ["WordPress", "WooCommerce", "Stripe"],
        "color": "from-fuchsia-500/25 to-pink-500/40",
    },
    "gadgetdoctorls-co-uk": {
        "name": "Gadget Doctor LS",
        "category": "Gadget Repair",
        "region": "Leeds, UK",
        "year": "2024",
        "icon": "Stethoscope",
        "blurb": "Same-day device repair shop site with WooCommerce catalog, branch info, and integrated repair-status lookups.",
        "tech_stack": ["WordPress", "WooCommerce"],
        "color": "from-rose-500/25 to-red-500/40",
    },
    "gadgetrepairsglasgow-co-uk": {
        "name": "Gadget Repairs Glasgow",
        "category": "Gadget Repair",
        "region": "Glasgow, UK",
        "year": "2024",
        "icon": "Smartphone",
        "blurb": "Mobile, tablet and laptop repair site with WooCommerce checkout and Stripe payments for Glasgow customers.",
        "tech_stack": ["WordPress", "WooCommerce", "Stripe"],
        "color": "from-violet-500/25 to-purple-500/40",
    },
    "nltceducation-web-app": {
        "name": "NLTC Nottingham",
        "category": "Education",
        "region": "Nottingham, UK",
        "year": "2024",
        "icon": "GraduationCap",
        "blurb": "Language and training centre management system — course catalog, enrolments, attendance, and learner progress.",
        "tech_stack": ["React", "Firebase"],
        "color": "from-sky-500/25 to-cyan-500/40",
    },
    "students-learning-hub-web-app": {
        "name": "Students Learning Hub",
        "category": "Education",
        "region": "Nottingham, UK",
        "year": "2024",
        "icon": "BookOpen",
        "blurb": "After-school childcare & learning platform in New Basford, Nottingham — homework support, scheduling, parent portal.",
        "tech_stack": ["React", "Firebase"],
        "color": "from-lime-500/25 to-emerald-500/40",
    },
    "slasa-co-uk": {
        "name": "SLASA",
        "category": "Education",
        "region": "UK",
        "year": "2024",
        "icon": "Users2",
        "blurb": "Sri Lankan Academy and community organisation site — events, courses, memberships, and CMS-driven content.",
        "tech_stack": ["WordPress"],
        "color": "from-amber-500/25 to-yellow-500/40",
    },
    "techrepairsglasgow-co-uk": {
        "name": "Tech Repairs Glasgow",
        "category": "Gadget Repair",
        "region": "Glasgow, UK",
        "year": "2024",
        "icon": "Smartphone",
        "blurb": "Mobile, tablet and laptop repair site with WooCommerce checkout and Stripe payments for Glasgow customers.",
        "tech_stack": ["WordPress", "WooCommerce", "Stripe"],
        "color": "from-indigo-500/25 to-blue-500/40",
    },
    "clicktake-academy-web-app": {
        "name": "ClickTake Academy",
        "category": "SaaS Platform",
        "region": "Global",
        "year": "2025",
        "icon": "School",
        "blurb": "Academy management system — manage students, teachers, attendance, fees, and reporting in one dashboard.",
        "tech_stack": ["React", "Firebase"],
        "color": "from-brand-blue/25 to-brand-cyan/40",
    },
}

out = []
out.append("// ─── CLIENT PORTFOLIO (12 live client sites, fetched real data) ────────")
out.append("// AUTO-GENERATED by scripts/port_portfolio_to_ts.py — do not edit by hand.")
out.append("")
out.append("export type ClientPortfolio = {")
out.append("  slug: string;")
out.append("  name: string;")
out.append("  category: 'SaaS Platform' | 'Education' | 'Gadget Repair';")
out.append("  url: string;")
out.append("  blurb: string;")
out.append("  techStack: string[];")
out.append("  icon: string;")
out.append("  year: string;")
out.append("  region: string;")
out.append("  color: string;")
out.append("};")
out.append("")
out.append("export const CLIENT_PORTFOLIO: ClientPortfolio[] = [")

for s in sites:
    slug = s["slug"]
    url = s["url"]
    meta = META.get(slug, {})
    if not meta:
        continue
    out.append("  {")
    out.append(f"    slug: {json.dumps(slug)},")
    out.append(f"    name: {json.dumps(meta['name'])},")
    out.append(f"    category: {json.dumps(meta['category'])},")
    out.append(f"    url: {json.dumps(url)},")
    out.append(f"    blurb: {json.dumps(meta['blurb'])},")
    out.append(f"    techStack: {json.dumps(meta['tech_stack'])},")
    out.append(f"    icon: {json.dumps(meta['icon'])},")
    out.append(f"    year: {json.dumps(meta['year'])},")
    out.append(f"    region: {json.dumps(meta['region'])},")
    out.append(f"    color: {json.dumps(meta['color'])},")
    out.append("  },")

out.append("];")
out.append("")

OUT = "/home/z/my-project/scripts/portfolio_data.ts"
with open(OUT, "w") as f:
    f.write("\n".join(out))
print(f"Wrote {OUT} ({os.path.getsize(OUT)} bytes)")
print(f"Entries: {sum(1 for s in sites if s['slug'] in META)}/12")
