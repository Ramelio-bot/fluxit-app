"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, FileText, Calculator, Video, FileMusic, Currency } from "lucide-react";
import { containerStagger, floatingEntry, antigravityHover } from "@/lib/animations";
import Link from "next/link";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";

const CATEGORIES = [
  {
    id: "media-studio",
    title: "Media Studio",
    span: "col-span-1 md:col-span-2",
    description: "Pro-grade image, video, and audio format pipelines.",
    tools: [
      { name: "WebP Converter", icon: ImageIcon, slug: "webp-converter" },
      { name: "MP4 to GIF", icon: Video, slug: "mp4-to-gif" },
      { name: "Audio Extract", icon: FileMusic, slug: "audio-extract" }
    ],
    accent: "from-brand-primary/20"
  },
  {
    id: "document-suite",
    title: "Document Suite",
    span: "col-span-1",
    description: "PDF manipulation and text processing workflows.",
    tools: [
      { name: "PDF to Word", icon: FileText, slug: "pdf-to-word" },
      { name: "Merge PDFs", icon: FileText, slug: "merge-pdfs" }
    ],
    accent: "from-brand-secondary/20"
  },
  {
    id: "precision-lab",
    title: "Precision Lab",
    span: "col-span-1",
    description: "Calculators and data parsing instruments.",
    tools: [
      { name: "Unit Converter", icon: Calculator, slug: "unit-converter" },
      { name: "Crypto Rates", icon: Currency, slug: "crypto-rates" }
    ],
    accent: "from-blue-500/20"
  }
];

export const FeatureGrid = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 z-20 relative">
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            variants={floatingEntry}
            className={cat.span}
          >
            <motion.div 
              variants={antigravityHover}
              initial="rest"
              whileHover="hover"
              className={`h-full antigravity-glass rounded-3xl p-8 flex flex-col bg-gradient-to-br ${cat.accent} to-transparent border-t-white/10`}
            >
              <h2 className="text-2xl font-bold text-white mb-2">{cat.title}</h2>
              <p className="text-sm text-slate-400 mb-8">{cat.description}</p>
              
              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link href={`/${tool.slug}`} key={tool.slug}>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                        <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-brand-primary transition-colors">
                          <Icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{tool.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ))}

        <motion.div variants={floatingEntry} className="col-span-1 md:col-span-2">
          <AdSensePlaceholder className="h-full min-h-[200px]" slot="grid-middle-banner" format="horizontal" />
        </motion.div>
      </motion.div>
    </section>
  );
};
