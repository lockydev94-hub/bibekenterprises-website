import { todayIST } from "@/lib/tz";
import type { Metadata } from "next";
import { getDomainPageData, DomainPageData } from "@/lib/domain";
import { DomainService, DomainCategory } from "@/types";
import { slugify } from "@/lib/slug";
import { FALLBACK_CITIES } from "@/lib/homeFallback";
import HomeHero from "@/components/home/HomeHero";
import CategoryRail from "@/components/home/CategoryRail";
import PopularServices from "@/components/home/PopularServices";
import WhyChoose from "@/components/home/WhyChoose";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedService from "@/components/home/FeaturedService";
import ServiceAreas from "@/components/home/ServiceAreas";
import TeamQuality from "@/components/home/TeamQuality";
import ReviewsGuarantee from "@/components/home/ReviewsGuarantee";
import FaqSection from "@/components/home/FaqSection";
import HomeFinalCta from "@/components/home/HomeFinalCta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bibekenterprises.com";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDomainPageData();
  const { domain, seo, profile } = data ?? {};
  const siteName = domain?.name ?? "Bibek Enterprises";
  const title = seo?.meta_title ?? domain?.meta_title ?? `${siteName} — Home Appliance Repair & Service`;
  const desc =
    seo?.meta_description ??
    domain?.meta_desc ??
    "Professional home appliance repair and maintenance services. AC, Refrigerator, Washing Machine, Geyser & more — at your doorstep.";
  const ogImage = seo?.og_image_url ?? profile?.og_image_url ?? profile?.banner_url ?? "/og-default.jpg";
  return {
    title,
    description: desc,
    keywords: seo?.meta_keywords,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: seo?.og_title ?? title,
      description: seo?.og_description ?? desc,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.og_title ?? title,
      description: seo?.og_description ?? desc,
      images: ogImage ? [ogImage] : [],
    },
  };
}

// ── Fallback data when the backend is unreachable ────────────────────────────
const FALLBACK_CATEGORIES: DomainCategory[] = [
  { domain_category_id: "fc1", category_id: "fc1", name: "AC Services", icon: "❄️", sort_order: 0 },
  { domain_category_id: "fc2", category_id: "fc2", name: "Refrigeration", icon: "🧊", sort_order: 1 },
  { domain_category_id: "fc3", category_id: "fc3", name: "Laundry", icon: "🧺", sort_order: 2 },
  { domain_category_id: "fc4", category_id: "fc4", name: "Water Purifier", icon: "💧", sort_order: 3 },
  { domain_category_id: "fc5", category_id: "fc5", name: "Water Heating", icon: "🚿", sort_order: 4 },
  { domain_category_id: "fc6", category_id: "fc6", name: "Microwave Oven", icon: "📡", sort_order: 5 },
  { domain_category_id: "fc7", category_id: "fc7", name: "Dishwasher", icon: "🍽️", sort_order: 6 },
];

const FALLBACK_SERVICES: DomainService[] = [
  { domain_service_id: "f1", service_id: "f1", name: "Air Conditioner Repair", description: "Repair, servicing, gas refill & performance check", category_id: "fc1", category_name: "AC Services", base_price: 499, gst_percent: 18, duration_mins: 60, is_featured: true, is_visible: true },
  { domain_service_id: "f2", service_id: "f2", name: "AC Installation", description: "Professional AC installation with safety & warranty", category_id: "fc1", category_name: "AC Services", base_price: 799, gst_percent: 18, duration_mins: 90, is_featured: true, is_visible: true },
  { domain_service_id: "f3", service_id: "f3", name: "AC Uninstallation", description: "Safe AC removal & relocation service", category_id: "fc1", category_name: "AC Services", base_price: 399, gst_percent: 18, duration_mins: 60, is_featured: true, is_visible: true },
  { domain_service_id: "f4", service_id: "f4", name: "AC Deep Cleaning", description: "Foam jet cleaning for better cooling & long life", category_id: "fc1", category_name: "AC Services", base_price: 699, gst_percent: 18, duration_mins: 75, is_featured: true, is_visible: true },
  { domain_service_id: "f5", service_id: "f5", name: "AC PCB Repair", description: "Expert PCB diagnosis & repair service", category_id: "fc1", category_name: "AC Services", base_price: 1299, gst_percent: 18, duration_mins: 90, is_featured: true, is_visible: true },
  { domain_service_id: "f6", service_id: "f6", name: "AC Compressor Repair", description: "Compressor checking, repair & replacement", category_id: "fc1", category_name: "AC Services", base_price: 2499, gst_percent: 18, duration_mins: 120, is_featured: true, is_visible: true },
  { domain_service_id: "f7", service_id: "f7", name: "Refrigerator Repair", description: "Single door, double door & side-by-side models", category_id: "fc2", category_name: "Refrigeration", base_price: 399, gst_percent: 18, duration_mins: 60, is_featured: true, is_visible: true },
];

export default async function HomePage() {
  const data: DomainPageData | null = await getDomainPageData();

  const domain = data?.domain;
  const seo = data?.seo;
  const profile = data?.profile;
  const services = data?.services?.length ? data.services.filter((s) => s.is_visible) : FALLBACK_SERVICES;
  const categories = data?.categories?.length ? data.categories : FALLBACK_CATEGORIES;
  const cities = data?.cities?.length ? data.cities : FALLBACK_CITIES;

  const siteName = domain?.name ?? "Bibek Enterprises";
  const phone = profile?.support_phone || "+91 9777260631";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const title = seo?.meta_title ?? domain?.meta_title ?? `${siteName} — Home Appliance Repair & Service`;
  const desc =
    seo?.meta_description ??
    domain?.meta_desc ??
    "Professional home appliance repair and maintenance services. AC, Refrigerator, Washing Machine, Geyser & more — at your doorstep.";

  // ── JSON-LD: WebPage (homepage) ──────────────────────────────────────────
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    name: title,
    description: desc,
    url: SITE_URL,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    datePublished: todayIST(),
    inLanguage: "en-IN",
  };

  // ── JSON-LD: ItemList (all visible services listed for Google) ───────────
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services offered by ${siteName}`,
    description: `Complete list of home appliance repair services by ${siteName}`,
    url: `${SITE_URL}/services`,
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE_URL}/services/${slugify(s.name)}`,
      description: s.description,
    })),
  };

  // ── JSON-LD: BreadcrumbList (homepage) ───────────────────────────────────
  const homeBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }} />

      <HomeHero siteName={siteName} phone={phone} phoneHref={phoneHref} />
      <CategoryRail categories={categories} services={services} />
      <PopularServices services={services} />
      <WhyChoose siteName={siteName} />
      <ProcessSection />
      <FeaturedService services={services} />
      <ServiceAreas cities={cities} />
      <TeamQuality />
      <ReviewsGuarantee />
      <FaqSection />
      <HomeFinalCta phone={phone} phoneHref={phoneHref} />
    </div>
  );
}
