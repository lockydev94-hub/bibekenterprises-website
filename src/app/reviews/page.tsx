import type { Metadata } from "next";
import { getDomainBySlug, getDomainSeo } from "@/lib/domain";
import { API_URL } from "@/lib/config";
import ReviewsPageClient from "./ReviewsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomainBySlug();
  const seo    = domain ? await getDomainSeo(domain.id) : null;
  const siteName = domain?.name ?? "Bibek Enterprises";
  return {
    title: `Customer Reviews | ${siteName}`,
    description: `Read verified customer reviews and ratings for ${siteName}. Real feedback from real customers across Odisha.`,
    robots: "index,follow",
    openGraph: {
      title: `Customer Reviews | ${siteName}`,
      description: `Verified reviews from ${siteName} customers.`,
      siteName,
      type: "website",
    },
  };
}

async function fetchReviews(domainId?: string) {
  try {
    const qs = domainId ? `?domain_id=${domainId}&limit=100` : "?limit=100";
    const res = await fetch(`${API_URL}/reviews${qs}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json ?? null;
  } catch {
    return null;
  }
}

export default async function ReviewsPage() {
  const domain   = await getDomainBySlug();
  const data     = await fetchReviews(domain?.id);
  const siteName = domain?.name ?? "Bibek Enterprises";
  const brand    = domain?.primary_color ?? "#1A3FA4";
  return <ReviewsPageClient data={data} siteName={siteName} brand={brand} />;
}
