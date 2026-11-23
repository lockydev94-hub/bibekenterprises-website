/**
 * LegalPageShell — shared layout for /privacy, /terms and /refund-policy.
 *
 * The three legal routes used to each carry their own copy of this markup plus
 * a hardcoded sections array. The copy now comes from the backend
 * (`domain_legal_pages`, edited in Admin Dashboard → Domains → Legal), so this
 * component is the only place the layout lives and the pages are thin wrappers.
 *
 * Server component — no client-side JS needed.
 */

import Link from "next/link";
import type { DomainLegalSection } from "@/types";

export interface LegalPageShellProps {
  brand: string;
  /** Badge colour behind the "Legal" pill — per-brand accent. */
  accent?: string;
  siteName: string;
  title: string;
  subtitle?: string;
  /** Human-readable effective date, e.g. "September 2026". */
  updated?: string;
  email: string;
  phone: string;
  phoneHref: string;
  sections: DomainLegalSection[];
  footerNote?: string;
}

/** Render a section body, preserving the blank-line paragraph breaks the admin typed. */
function Body({ content }: { content: string }) {
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  if (paragraphs.length <= 1) {
    return <p className="text-ink-500 leading-relaxed text-sm whitespace-pre-line">{content}</p>;
  }
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-ink-500 leading-relaxed text-sm whitespace-pre-line">
          {p.trim()}
        </p>
      ))}
    </div>
  );
}

export default function LegalPageShell({
  brand,
  accent,
  siteName,
  title,
  subtitle,
  updated,
  email,
  phone,
  phoneHref,
  sections,
  footerNote,
}: LegalPageShellProps) {
  const badge = accent || brand;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-ink-400 flex-wrap">
          <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
          <span className="text-ink-200">›</span>
          <span className="text-ink-600 font-medium">{title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05] animate-blob" style={{ background: brand }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 animate-fade-in-up" style={{ background: badge, color: "#fff" }}>
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-ink-900 mb-4 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-ink-400 max-w-xl animate-fade-in-up" style={{ animationDelay: "140ms" }}>{subtitle}</p>
          )}
          {updated && (
            <p className="text-xs text-ink-300 mt-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>Last updated: {updated}</p>
          )}
        </div>
      </section>

      {/* Body: TOC + content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">

          {/* TOC sidebar — sticky */}
          <aside className="hidden lg:block sticky top-6 self-start">
            <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map((s, i) => (
                  <a
                    key={s.id || i}
                    href={`#${s.id || `section-${i + 1}`}`}
                    className="block text-xs text-ink-500 hover:text-ink-900 py-1.5 px-3 rounded-lg hover:bg-ink-50 transition-all duration-150 leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact card */}
            <div className="mt-4 rounded-2xl p-5 border" style={{ background: `${brand}08`, borderColor: `${brand}20` }}>
              <p className="text-xs font-bold text-ink-800 mb-3">Questions about this policy?</p>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs text-ink-500 hover:text-ink-900 mb-2 transition-colors">
                <span>✉️</span> {email}
              </a>
              <a href={phoneHref} className="flex items-center gap-2 text-xs text-ink-500 hover:text-ink-900 transition-colors">
                <span>📞</span> {phone}
              </a>
            </div>
          </aside>

          {/* Content */}
          <article className="min-w-0 space-y-10">
            {sections.map((s, i) => (
              <div
                key={s.id || i}
                id={s.id || `section-${i + 1}`}
                className="scroll-mt-8 animate-fade-in-up pb-10 border-b border-ink-100 last:border-0 last:pb-0"
                style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
              >
                <h2 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full shrink-0" style={{ background: brand }} />
                  {s.title}
                </h2>
                <Body content={s.content} />
              </div>
            ))}

            {/* Bottom note */}
            {footerNote && (
              <div className="rounded-2xl p-6 mt-6" style={{ background: `${brand}08`, borderLeft: `4px solid ${brand}` }}>
                <p className="text-sm font-semibold text-ink-800 mb-1">A note from {siteName}</p>
                <p className="text-xs text-ink-500 leading-relaxed whitespace-pre-line">{footerNote}</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
