'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, Sparkles, ChevronRight,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { BLOG_POSTS, type BlogPost } from "@/lib/site-data";

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
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

interface Props { post: BlogPost; }

export function BlogPostPage({ post }: Props) {
  const gradient = CAT_COLOR[post.category] || "from-brand-blue to-brand-cyan";
  const related = BLOG_POSTS
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white`}>
              {post.category}
            </div>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {post.title}
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-[10px] font-bold">
                  CT
                </span>
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>
          </motion.div>

          {/* Hero image (gradient placeholder) */}
          <div className={`mt-8 h-48 sm:h-64 rounded-2xl bg-gradient-to-br ${gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 right-4">
              <Sparkles className="h-8 w-8 text-white/80" />
            </div>
          </div>

          {/* Body */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-10 prose prose-invert max-w-none"
          >
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {post.body}
            </p>
            <p className="mt-4 text-sm sm:text-base text-foreground/90 leading-relaxed">
              This article is part of our {post.category} series, written by the ClickTake team
              based on real client engagements across the UK, Pakistan, USA and Dubai. We publish
              new articles every two weeks — subscribe to our newsletter (in the footer) to get
              the next one in your inbox.
            </p>
            <p className="mt-4 text-sm sm:text-base text-foreground/90 leading-relaxed">
              Want this work shipped for your brand? ClickTake Technologies delivers end-to-end
              {post.category.toLowerCase()} engagements — from strategy to execution to ongoing
              optimization — for ambitious brands across four regions. Book a free 30-minute
              consultation and we&apos;ll scope it together.
            </p>
          </motion.article>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Tag className="h-4 w-4 text-muted-foreground mt-1" />
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
                Like what you read?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a free 30-minute consultation with the ClickTake team.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Related */}
          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
                More in {post.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 hover:border-primary/40 hover:bg-card/60 transition"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-brand-blue">
                      {r.category}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold leading-tight line-clamp-2 group-hover:text-foreground text-foreground/90">
                      {r.title}
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">{r.readTime}</div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
