'use client'

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Calendar, Clock, Sparkles, Search, Tag,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogPost } from "@/lib/site-data";

const CAT_COLOR: Record<string, string> = {
  "SEO": "from-emerald-500 to-teal-600",
  "Web Dev": "from-brand-blue to-brand-cyan",
  "Digital Marketing": "from-amber-500 to-orange-500",
  "AI Automation": "from-brand-magenta to-brand-pink",
  "Business Startup": "from-amber-500 to-brand-pink",
  "E-commerce": "from-brand-cyan to-brand-blue",
  "Case Studies": "from-brand-pink to-orange-500",
  "Company News": "from-brand-magenta to-brand-blue",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function PostCard({ post }: { post: BlogPost }) {
  const gradient = CAT_COLOR[post.category] || "from-brand-blue to-brand-cyan";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/40 hover:bg-card/60 transition"
    >
      <div className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
            {post.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <Sparkles className="h-5 w-5 text-white/80" />
        </div>
      </div>
      <div className="flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold leading-tight group-hover:text-foreground text-foreground/90 line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogIndexPage() {
  const [activeCat, setActiveCat] = useState<string | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let r = BLOG_POSTS;
    if (activeCat !== "all") r = r.filter((p) => p.category === activeCat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...r].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [activeCat, query]);

  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Blog
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Field notes from the ClickTake team.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Practical, no-fluff articles on SEO, web development, AI automation, e-commerce and
              growth marketing — written by the engineers, marketers and designers who ship this work
              every day for clients across the UK, Pakistan, USA and Dubai.
            </p>
          </motion.div>

          {/* Search + filter */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-full border border-border bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCat("all")}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeCat === "all"
                    ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                    : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
                }`}
              >
                All
              </button>
              {BLOG_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    activeCat === c
                      ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                      : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-border bg-card/40 backdrop-blur-md p-10 text-center">
              <Tag className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <div className="text-base font-semibold">No articles found</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or category filter.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                >
                  <PostCard post={p} />
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
                Want this work shipped for your brand?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a free 30-minute consultation. We&apos;ll scope it together.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
