/**
 * City Database — single source of truth for Programmatic SEO (Phase 3 #4).
 *
 * Each city generates:
 *   - A city hub page at /cities/[citySlug]
 *   - N city × service pages at /cities/[citySlug]/[serviceSlug]
 *
 * The page composer (city-service-content.ts) consumes this metadata to
 * inject city-specific hero, intro, FAQ, and LocalBusiness JSON-LD into
 * every permutation — without runtime LLM calls.
 *
 * City selection prioritizes:
 *   1. ClickTake office locations (Birmingham UK, Multan, Austin, Dubai)
 *   2. Major commercial hubs near each office (UK: London/Manchester;
 *      Pakistan: Lahore/Karachi/Islamabad; US: NYC/SF; UAE: Abu Dhabi)
 *   3. High-intent search markets in target countries
 *
 * Add cities here in order of business priority. Page count grows
 * linearly: (cities × services). With 12 cities × 25 services = 300
 * programmatic landing pages + 12 city hubs = 312 new URLs.
 *
 * See /download/clicktake-enterprise-design-brief.pdf §Phase 3 #4.
 */

export type Country = "GB" | "PK" | "US" | "AE";

export type CityContext = {
  /** One-line economy/industry summary used in hero subtitles */
  economy: string;
  /** 2-3 sentence local-context paragraph used in the city intro */
  localContext: string;
  /** Top 3-5 local industries this service targets */
  keyIndustries: string[];
  /** Local regulatory/compliance notes (e.g. "GDPR for UK", "FBR for PK") */
  complianceNotes?: string;
  /** Currency symbol for pricing display */
  currency: string;
  /** Approximate starting price in local currency for the cheapest service */
  startingPriceFrom: string;
  /** Local language(s) for hreflang/og:locale */
  languages: string[];
};

export type City = {
  /** URL slug — lowercase, hyphenated, no diacritics */
  slug: string;
  /** Display name (e.g. "Birmingham", "New York") */
  name: string;
  /** Country code */
  country: Country;
  /** ISO 3166-2 region code (e.g. "GB-BIR", "US-TX", "PK-PB") */
  regionCode: string;
  /** Latitude for LocalBusiness geo.coordinates */
  lat: number;
  /** Longitude for LocalBusiness geo.coordinates */
  lng: number;
  /** Timezone (IANA) */
  timezone: string;
  /** Population (used to set sitemap priority tier) */
  population: number;
  /** Search volume tier — 3=high, 2=medium, 1=low. Drives sitemap priority. */
  searchTier: 1 | 2 | 3;
  /** Whether ClickTake has a physical office here */
  hasOffice: boolean;
  /** City-specific context for content composition */
  context: CityContext;
  /** Nearby cities (slugs) — used for "Also serving" cross-links */
  nearbyCities: string[];
};

export const CITIES: City[] = [
  // ─── United Kingdom ────────────────────────────────────────────────────
  {
    slug: "birmingham",
    name: "Birmingham",
    country: "GB",
    regionCode: "GB-BIR",
    lat: 52.4862,
    lng: -1.8904,
    timezone: "Europe/London",
    population: 1144000,
    searchTier: 3,
    hasOffice: true,
    context: {
      economy: "UK's second-largest economy — finance, advanced manufacturing, life sciences, and a fast-growing tech cluster around Brindleyplace and Innovation Birmingham.",
      localContext: "Birmingham is the largest UK tech hub outside London, with the Curzon Street HS2 terminus driving investment in digital infrastructure. The city's Start-Up Engine programme and Innovation Birmingham campus support over 170 tech firms across AI, fintech, and creative industries. ClickTake's Birmingham HQ serves the West Midlands, Midlands Engine, and beyond.",
      keyIndustries: ["Finance & Banking", "Advanced Manufacturing", "Life Sciences", "Digital Media", "Automotive"],
      complianceNotes: "GDPR (UK GDPR post-Brexit), FCA for fintech clients, Data Protection Act 2018",
      currency: "£",
      startingPriceFrom: "£3,500",
      languages: ["en-GB"],
    },
    nearbyCities: ["london", "manchester", "leeds"],
  },
  {
    slug: "london",
    name: "London",
    country: "GB",
    regionCode: "GB-LND",
    lat: 51.5074,
    lng: -0.1278,
    timezone: "Europe/London",
    population: 8982000,
    searchTier: 3,
    hasOffice: false,
    context: {
      economy: "Europe's largest tech ecosystem — fintech, AI/ML research (DeepMind, OpenAI London), adtech, and SaaS scaleups concentrated around Shoreditch, Soho, and King's Cross.",
      localContext: "London hosts 1,300+ AI startups and the largest concentration of venture capital in Europe. The city's fintech sector alone raised £4.6B in 2024, with regulatory sandboxes from the FCA enabling rapid innovation. ClickTake serves London clients remotely from Birmingham HQ with same-day on-site availability for enterprise engagements.",
      keyIndustries: ["Fintech", "AI/ML Research", "Adtech", "SaaS", "Media & Publishing"],
      complianceNotes: "GDPR, FCA, ICO registration, SOC 2 Type II expected for enterprise clients",
      currency: "£",
      startingPriceFrom: "£4,500",
      languages: ["en-GB"],
    },
    nearbyCities: ["birmingham", "manchester", "leeds"],
  },
  {
    slug: "manchester",
    name: "Manchester",
    country: "GB",
    regionCode: "GB-MAN",
    lat: 53.4808,
    lng: -2.2426,
    timezone: "Europe/London",
    population: 547627,
    searchTier: 2,
    hasOffice: false,
    context: {
      economy: "Northern Powerhouse tech hub — MediaCityUK (BBC/ITV), e-commerce scaleups, and a fast-growing SaaS cluster around Spinningfields and the Oxford Road Corridor.",
      localContext: "Manchester ranks among the top 3 UK tech cities, with MediaCityUK anchoring digital media production and the Northern Powerhouse initiative driving infrastructure investment. The city's GM Cyber Foundry supports cybersecurity adoption across 1,200 SMEs in Greater Manchester. ClickTake serves Manchester businesses with weekly on-site visits from Birmingham HQ.",
      keyIndustries: ["Media & Broadcasting", "E-commerce", "SaaS", "Cybersecurity", "Digital Health"],
      complianceNotes: "GDPR, NHS DSPT for digital health clients, Cyber Essentials Plus certification expected",
      currency: "£",
      startingPriceFrom: "£3,800",
      languages: ["en-GB"],
    },
    nearbyCities: ["birmingham", "leeds", "london"],
  },
  {
    slug: "leeds",
    name: "Leeds",
    country: "GB",
    regionCode: "GB-LDS",
    lat: 53.8008,
    lng: -1.5491,
    timezone: "Europe/London",
    population: 536280,
    searchTier: 2,
    hasOffice: false,
    context: {
      economy: "UK's largest financial centre outside London — banking, insurance, legal services, and a growing health-tech cluster around Leeds Teaching Hospitals.",
      localContext: "Leeds hosts over 30 national and international banks and is home to NHS England's headquarters. The city's finch-forward ecosystem (Channel 4 relocation, LeedsBID digital investment) makes it a strategic market for fintech, health-tech, and enterprise SaaS. ClickTake serves Leeds clients remotely with quarterly on-site delivery.",
      keyIndustries: ["Banking & Finance", "Insurance", "Health-Tech", "Legal Services", "Retail"],
      complianceNotes: "GDPR, FCA for banking clients, NHS DSPT for health-tech, ISO 27001 common in legal",
      currency: "£",
      startingPriceFrom: "£3,500",
      languages: ["en-GB"],
    },
    nearbyCities: ["manchester", "birmingham", "london"],
  },

  // ─── Pakistan ─────────────────────────────────────────────────────────
  {
    slug: "multan",
    name: "Multan",
    country: "PK",
    regionCode: "PK-PB",
    lat: 30.1575,
    lng: 71.5249,
    timezone: "Asia/Karachi",
    population: 1871843,
    searchTier: 3,
    hasOffice: true,
    context: {
      economy: "South Punjab's commercial hub — agriculture-tech, e-commerce, manufacturing, and a growing software export cluster serving UK/US clients via ClickTake's delivery centre.",
      localContext: "Multan is South Punjab's largest city and a strategic delivery location for software exports to the UK, US, and UAE. The city benefits from PSEB (Pakistan Software Export Board) incentives and a lower cost base than Lahore/Karachi, enabling ClickTake to deliver enterprise-grade work at 40-60% lower TCO than UK/US agencies. Our Multan engineering hub serves clients across all four global offices.",
      keyIndustries: ["AgriTech", "E-commerce", "Textile Manufacturing", "Software Export", "Logistics"],
      complianceNotes: "PSEB registration, GDPR compliance for EU clients, data residency agreements with EU/US clients",
      currency: "Rs",
      startingPriceFrom: "Rs 250,000",
      languages: ["en-PK", "ur-PK"],
    },
    nearbyCities: ["lahore", "islamabad", "karachi"],
  },
  {
    slug: "lahore",
    name: "Lahore",
    country: "PK",
    regionCode: "PK-PB",
    lat: 31.5204,
    lng: 74.3587,
    timezone: "Asia/Karachi",
    population: 13090000,
    searchTier: 3,
    hasOffice: false,
    context: {
      economy: "Pakistan's second-largest tech ecosystem — Arfa Software Technology Park, fintech, e-commerce, and IT outsourcing serving MENA, UK, and US markets.",
      localContext: "Lahore hosts Pakistan's densest concentration of IT firms at Arfa Software Technology Park (250+ companies) and is the national hub for fintech innovation with EasyPaisa, JazzCash, and SadaPay headquarters. The city's Punjab Information Technology Board (PITB) drives digital transformation across government and healthcare. ClickTake serves Lahore enterprise clients with bi-weekly on-site visits from Multan.",
      keyIndustries: ["Fintech", "E-commerce", "IT Outsourcing", "EduTech", "Government Tech"],
      complianceNotes: "PSEB, SBP regulations for fintech, PECA 2016 (Prevention of Electronic Crimes Act)",
      currency: "Rs",
      startingPriceFrom: "Rs 280,000",
      languages: ["en-PK", "ur-PK"],
    },
    nearbyCities: ["islamabad", "multan", "karachi"],
  },
  {
    slug: "karachi",
    name: "Karachi",
    country: "PK",
    regionCode: "PK-SD",
    lat: 24.8607,
    lng: 67.0011,
    timezone: "Asia/Karachi",
    population: 16459000,
    searchTier: 3,
    hasOffice: false,
    context: {
      economy: "Pakistan's financial capital — banking HQs, port logistics, e-commerce scaleups, and the country's largest software export cluster at ITCN Asia / Karachi Software Technology Park.",
      localContext: "Karachi contributes 25% of Pakistan's GDP and hosts the headquarters of every major bank, the Pakistan Stock Exchange, and the country's largest e-commerce platforms (Daraz, Telemart). The city's IT parks (Karachi Software Technology Park, Arfa Tower) house 400+ software firms. ClickTake serves Karachi enterprise clients remotely from Multan with monthly on-site delivery.",
      keyIndustries: ["Banking & Finance", "E-commerce", "Logistics & Shipping", "FMCG", "IT Outsourcing"],
      complianceNotes: "PSEB, SBP, SECP for fintech/corporate clients, PECA 2016",
      currency: "Rs",
      startingPriceFrom: "Rs 300,000",
      languages: ["en-PK", "ur-PK"],
    },
    nearbyCities: ["lahore", "islamabad", "multan"],
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    country: "PK",
    regionCode: "PK-IS",
    lat: 33.6844,
    lng: 73.0479,
    timezone: "Asia/Karachi",
    population: 1095064,
    searchTier: 2,
    hasOffice: false,
    context: {
      economy: "Pakistan's capital — government tech, fintech regulation (SBP HQ), and the National IT Park serving federal ministries, multinationals, and the diplomatic community.",
      localContext: "Islamabad is Pakistan's political and regulatory capital, home to the State Bank of Pakistan (SBP), the National IT Board (NITB), and Islamabad Software Technology Park (500+ IT firms). The city's high per-capita income and concentration of multinationals make it a strategic market for enterprise SaaS, govtech, and regulated fintech. ClickTake serves Islamabad clients remotely with monthly on-site delivery from Multan.",
      keyIndustries: ["Government Tech", "Fintech Regulation", "Telecom", "Diplomatic Missions", "EdTech"],
      complianceNotes: "PSEB, SBP, SECP, NITB compliance for government clients, PECA 2016",
      currency: "Rs",
      startingPriceFrom: "Rs 280,000",
      languages: ["en-PK", "ur-PK"],
    },
    nearbyCities: ["lahore", "karachi", "multan"],
  },

  // ─── United States ────────────────────────────────────────────────────
  {
    slug: "austin",
    name: "Austin",
    country: "US",
    regionCode: "US-TX",
    lat: 30.2672,
    lng: -97.7431,
    timezone: "America/Chicago",
    population: 974447,
    searchTier: 3,
    hasOffice: true,
    context: {
      economy: "America's fastest-growing tech hub — Tesla, Oracle, Dell HQs, SXSW-driven creative economy, and a venture-funded AI/SaaS corridor along the MoPac expressway.",
      localContext: "Austin ranks #1 in net tech job growth for 5 consecutive years (CompTIA Cyberstates 2024), with Tesla's Gigafactory, Oracle's HQ relocation, and Apple's $1B North Austin campus anchoring the ecosystem. The city's SXSW festival drives global creative-tech convergence. ClickTake's Austin desk covers North American business development across US time zones.",
      keyIndustries: ["SaaS & B2B", "Semiconductors", "EV Manufacturing", "Creative Media", "Health-Tech"],
      complianceNotes: "SOC 2 Type II, HIPAA for health-tech, CCPA-equivalent Texas Data Privacy & Security Act (TDPSA, 2024)",
      currency: "$",
      startingPriceFrom: "$5,000",
      languages: ["en-US"],
    },
    nearbyCities: ["san-francisco", "new-york", "dallas"],
  },
  {
    slug: "new-york",
    name: "New York",
    country: "US",
    regionCode: "US-NY",
    lat: 40.7128,
    lng: -74.006,
    timezone: "America/New_York",
    population: 8336817,
    searchTier: 3,
    hasOffice: false,
    context: {
      economy: "Global financial capital — Wall Street, Madison Avenue adtech, Silicon Alley SaaS, and the world's largest concentration of media and publishing HQs.",
      localContext: "New York hosts the NYSE, NASDAQ, and 8 of the world's 10 largest investment banks, with fintech innovation centred on the Flatiron District and Brooklyn DUMBO tech cluster. The city's advertising ecosystem (Madison Avenue) drives global adtech investment. ClickTake serves NYC enterprise clients remotely from Austin with monthly on-site engagement for top-tier accounts.",
      keyIndustries: ["Fintech", "Adtech", "Media & Publishing", "Real Estate Tech", "Enterprise SaaS"],
      complianceNotes: "SOC 2 Type II, NYDFS Cybersecurity Regulation (23 NYCRR 500) for fintech, HIPAA, CCPA-equivalent SHIELD Act",
      currency: "$",
      startingPriceFrom: "$6,500",
      languages: ["en-US"],
    },
    nearbyCities: ["austin", "san-francisco", "boston"],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    country: "US",
    regionCode: "US-CA",
    lat: 37.7749,
    lng: -122.4194,
    timezone: "America/Los_Angeles",
    population: 873965,
    searchTier: 3,
    hasOffice: false,
    context: {
      economy: "Global AI capital — OpenAI, Anthropic, Scale AI, and the world's deepest venture-funded AI/ML cluster across SoMa, Mission Bay, and the Peninsula.",
      localContext: "San Francisco hosts 45% of global AI venture funding (PitchBook 2024), with OpenAI, Anthropic, Scale AI, and 350+ foundation model startups concentrated in SoMa and Mission Bay. The broader Bay Area (Palo Alto, Mountain View) anchors enterprise SaaS (Salesforce, Workday, Snowflake). ClickTake serves Bay Area clients remotely from Austin with on-site delivery for Series B+ accounts.",
      keyIndustries: ["AI/ML Research", "Enterprise SaaS", "Crypto & Web3", "Biotech", "Climate Tech"],
      complianceNotes: "SOC 2 Type II, CCPA/CPRA, HIPAA for biotech, FDA 21 CFR Part 11 for medical software",
      currency: "$",
      startingPriceFrom: "$7,000",
      languages: ["en-US"],
    },
    nearbyCities: ["austin", "new-york", "seattle"],
  },

  // ─── United Arab Emirates ─────────────────────────────────────────────
  {
    slug: "dubai",
    name: "Dubai",
    country: "AE",
    regionCode: "AE-DU",
    lat: 25.2048,
    lng: 55.2708,
    timezone: "Asia/Dubai",
    population: 3500000,
    searchTier: 3,
    hasOffice: true,
    context: {
      economy: "MENA's digital capital — DIFC fintech, Dubai Internet City, AI government strategy, and a free-zone ecosystem serving GCC, Africa, and South Asia.",
      localContext: "Dubai ranks #1 in MENA for tech startup investment (Magnitt 2024), with Dubai Internet City (1,600+ tech firms), DIFC's innovation hub (1,000+ fintechs), and the UAE's National AI Strategy 2031 driving government AI adoption. Free zones (DMCC, DIFC, DWTC) enable 100% foreign ownership. ClickTake's Dubai desk covers MENA business development across GCC, North Africa, and South Asia.",
      keyIndustries: ["Fintech", "PropTech", "Logistics", "Government AI", "Tourism Tech"],
      complianceNotes: "UAE PDPL (Personal Data Protection Law), DIFC Data Protection Law, free-zone-specific regulations, NESA cybersecurity for government",
      currency: "AED",
      startingPriceFrom: "AED 18,000",
      languages: ["en-AE", "ar-AE"],
    },
    nearbyCities: ["abu-dhabi", "riyadh", "doha"],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    country: "AE",
    regionCode: "AE-AZ",
    lat: 24.4539,
    lng: 54.3773,
    timezone: "Asia/Dubai",
    population: 1500000,
    searchTier: 2,
    hasOffice: false,
    context: {
      economy: "UAE capital — sovereign wealth (ADIA, Mubadala), Hub71 tech ecosystem, G42 AI champion, and the UAE government's AI ministry.",
      localContext: "Abu Dhabi hosts Hub71 (the UAE's flagship tech ecosystem with $2B+ in VC capital) and G42 (the region's largest AI company). The emirate's sovereign wealth funds (ADIA, Mubadala, ADQ) drive venture and infrastructure investment globally. ClickTake serves Abu Dhabi enterprise clients remotely from Dubai with weekly on-site delivery.",
      keyIndustries: ["Sovereign AI", "Energy Tech", "Defence Tech", "Healthcare", "Fintech"],
      complianceNotes: "UAE PDPL, DoH regulations for healthcare, free-zone rules (ADGM, twofour54)",
      currency: "AED",
      startingPriceFrom: "AED 18,000",
      languages: ["en-AE", "ar-AE"],
    },
    nearbyCities: ["dubai", "riyadh", "doha"],
  },
];

// ─── Lookup helpers ─────────────────────────────────────────────────────

const CITIES_BY_SLUG = new Map(CITIES.map((c) => [c.slug, c]));
const CITIES_BY_COUNTRY = new Map<Country, City[]>();
for (const c of CITIES) {
  if (!CITIES_BY_COUNTRY.has(c.country)) CITIES_BY_COUNTRY.set(c.country, []);
  CITIES_BY_COUNTRY.get(c.country)!.push(c);
}

export function getCity(slug: string): City | undefined {
  return CITIES_BY_SLUG.get(slug);
}

export function getCitiesByCountry(country: Country): City[] {
  return CITIES_BY_COUNTRY.get(country) || [];
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

export function getNearbyCities(slug: string, limit = 4): City[] {
  const city = CITIES_BY_SLUG.get(slug);
  if (!city) return [];
  return city.nearbyCities
    .map((s) => CITIES_BY_SLUG.get(s))
    .filter((c): c is City => !!c)
    .slice(0, limit);
}

// ─── Country metadata ───────────────────────────────────────────────────

export const COUNTRY_META: Record<Country, { name: string; flag: string; dialCode: string }> = {
  GB: { name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  PK: { name: "Pakistan", flag: "🇵🇰", dialCode: "+92" },
  US: { name: "United States", flag: "🇺🇸", dialCode: "+1" },
  AE: { name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
};

export const COUNTRY_ORDER: Country[] = ["GB", "PK", "US", "AE"];

/**
 * Total programmatic SEO pages generated:
 *   = CITIES.length city hubs
 *   + CITIES.length × SERVICES.length city × service pages
 *
 * With 12 cities × 25 services = 300 city × service pages + 12 hubs = 312 URLs.
 * Plus 1 cities index page = 313 new URLs.
 */
export const PROGRAMMATIC_SEO_PAGE_COUNT = CITIES.length + CITIES.length * 25 + 1;
