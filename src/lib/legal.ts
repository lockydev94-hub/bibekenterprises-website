/**
 * legal.ts — resolves a legal page (privacy / terms / refund-policy) for this site.
 *
 * Source of truth: the backend `domain_legal_pages` table, edited in
 * Admin Dashboard → Domains → Legal. Fetched with ISR so an admin edit shows up
 * within REVALIDATE seconds without a redeploy.
 *
 * If the API is unreachable (local `next build`, brief outage) we fall back to
 * the bundled copy in legal-fallback.ts, which is itself Play-compliant — a
 * blank or missing privacy policy is what got the technician apps rejected.
 *
 * Per-brand defaults are the four constants below; everything else in this file
 * is identical across the three websites.
 */

import type { Metadata } from "next";
import { getDomainBySlug, getDomainProfile, getDomainLegalPage } from "@/lib/domain";
import { fallbackLegalPage, LEGAL_LABELS, type LegalCtx } from "@/lib/legal-fallback";
import type { DomainLegalPage } from "@/types";

/* ── per-brand defaults (only these differ between the three sites) ── */
const FALLBACK_SITE_NAME = "Bibek Enterprises";
const FALLBACK_SLUG      = "bibekenterprises";
const FALLBACK_BRAND     = "#1A3FA4";
/** Colour of the "Legal" pill in the hero. */
export const LEGAL_ACCENT = "#F26522";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bibekenterprises.com";

/** Shown when the admin has not set an effective date on the page. */
const DEFAULT_UPDATED = "September 2026";

export interface LegalPageData {
  page: DomainLegalPage;
  brand: string;
  siteName: string;
  email: string;
  phone: string;
  phoneHref: string;
  /** true when the copy came from the bundled fallback, not the API. */
  isFallback: boolean;
}

/**
 * Fetch one legal page plus the branding needed to render it.
 * Returns null only for an unknown page key (caller should 404) or when the
 * admin has unpublished the page.
 */
export async function getLegalPageData(pageKey: string): Promise<LegalPageData | null> {
  const domain = await getDomainBySlug();
  const profile = domain ? await getDomainProfile(domain.id) : null;

  const siteName = domain?.name ?? FALLBACK_SITE_NAME;
  const brand    = domain?.primary_color || FALLBACK_BRAND;
  const email    = profile?.support_email || `support@${domain?.slug ?? FALLBACK_SLUG}.com`;
  const phone    = profile?.support_phone || "+91 80000 00000";

  const ctx: LegalCtx = {
    siteName,
    legalName: profile?.business_legal_name || siteName,
    email,
    phone,
    address: [profile?.office_address, profile?.office_city, profile?.office_state, profile?.office_pincode]
      .filter(Boolean)
      .join(", ") || undefined,
    gstin: profile?.gstin || undefined,
    updated: DEFAULT_UPDATED,
  };

  const remote = domain ? await getDomainLegalPage(domain.id, pageKey) : null;

  // Guard against a row that exists but has no usable body.
  const usable = remote && Array.isArray(remote.sections) && remote.sections.length > 0;
  if (usable && remote!.is_published === false) return null;   // admin unpublished it

  const page = usable ? remote! : fallbackLegalPage(pageKey, ctx);
  if (!page) return null;                                      // unknown page key

  return {
    page,
    brand,
    siteName,
    email,
    phone,
    phoneHref: `tel:${phone.replace(/\s/g, "")}`,
    isFallback: !usable,
  };
}

/** Build the <head> metadata for a legal route from the same source. */
export async function legalMetadata(pageKey: string): Promise<Metadata> {
  const data = await getLegalPageData(pageKey);
  const label = LEGAL_LABELS[pageKey] ?? pageKey;
  const siteName = data?.siteName ?? FALLBACK_SITE_NAME;
  const url = `${SITE_URL}/${pageKey}`;

  const title = data?.page.meta_title || `${label} | ${siteName}`;
  const description =
    data?.page.meta_description ||
    data?.page.subtitle ||
    `${label} for ${siteName}.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    // Deliberately indexable: Google Play's policy reviewer fetches this URL and
    // a noindex page can be treated as unavailable.
    robots: data?.page.robots || "index,follow",
    openGraph: { title, description, siteName, type: "website", url },
  };
}

/** BreadcrumbList JSON-LD for a legal route. */
export function legalBreadcrumb(pageKey: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}/${pageKey}` },
    ],
  };
}
