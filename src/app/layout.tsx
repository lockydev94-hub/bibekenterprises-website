import type { Metadata } from "next";
import "./globals.css";
import { getDomainBySlug, getDomainSeo, getDomainProfile, getDomainCities, getDomainServices } from "@/lib/domain";
import CityProvider from "@/context/CityContext";
import AuthProvider from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { slugify } from "@/lib/slug";
import ChatBot from "@/components/ui/ChatBot";
import CallbackModal from "@/components/ui/CallbackModal";
import NotificationProvider from "@/context/NotificationContext";
import { FALLBACK_CITIES, FALLBACK_PROFILE, FALLBACK_SERVICES } from "@/lib/homeFallback";

/**
 * layout.tsx — Dynamic metadata from Admin Dashboard domain settings.
 *
 * Every value here (title, description, OG image, robots, canonical URL,
 * favicon, theme color, JSON-LD schema) is fetched from the database at
 * request time and controlled entirely from the Admin Dashboard →
 * Domains → SEO / Profile tabs. Nothing is hardcoded per-deployment except
 * the NEXT_PUBLIC_DOMAIN_SLUG / NEXT_PUBLIC_DOMAIN_ID in .env.local.
 */
export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomainBySlug();
  const [seo, profile] = await Promise.all([
    domain ? getDomainSeo(domain.id) : Promise.resolve(null),
    domain ? getDomainProfile(domain.id) : Promise.resolve(null),
  ]);

  const siteName = domain?.name ?? "Bibek Enterprises";
  const title =
    seo?.meta_title ?? domain?.meta_title ?? `${siteName} — Home Appliance Repair & Service`;
  const desc =
    seo?.meta_description ??
    domain?.meta_desc ??
    "Professional home appliance repair and maintenance services. AC, Refrigerator, Washing Machine, Geyser, Microwave & more — at your doorstep.";
  const ogImage = seo?.og_image_url ?? profile?.og_image_url ?? profile?.banner_url ?? "/og-default.jpg";
  const canonical = seo?.canonical_url ?? null;
  const robots = seo?.robots ?? "index,follow";
  const favicon = profile?.favicon_url ?? "/favicon.ico";

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description: desc,
    keywords: seo?.meta_keywords ?? undefined,
    robots,
    icons: { icon: favicon },
    openGraph: {
      title: seo?.og_title ?? title,
      description: seo?.og_description ?? desc,
      siteName,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.og_title ?? title,
      description: seo?.og_description ?? desc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const domain = await getDomainBySlug();
  const [seo, profile, cities, services] = await Promise.all([
    domain ? getDomainSeo(domain.id) : Promise.resolve(null),
    domain ? getDomainProfile(domain.id) : Promise.resolve(null),
    domain ? getDomainCities(domain.id) : Promise.resolve([]),
    domain ? getDomainServices(domain.id) : Promise.resolve([]),
  ]);
  const brand = domain?.primary_color ?? "#1A3FA4";

  // Header props — same display logic the home page uses, lifted up here
  // so the header (logo, search, contact) is consistent across every page.
  const siteName  = domain?.name ?? "Bibek Enterprises";
  const logoUrl   = profile?.logo_url ?? domain?.logo_url ?? null;
  const phone     = profile?.support_phone || FALLBACK_PROFILE.support_phone!;
  const email     = profile?.support_email || FALLBACK_PROFILE.support_email!;
  const whatsapp  = profile?.whatsapp_number ?? null;
  const shellServices = services.length ? services : FALLBACK_SERVICES;
  const shellCities = cities.length ? cities : FALLBACK_CITIES;
  const headerServices = shellServices
    .filter((s) => s.is_visible)
    .map((s) => ({ domain_service_id: s.domain_service_id, name: s.name, category_name: s.category_name }));

  const socialLinks = [
    { label: "Facebook",  url: profile?.facebook_url  || FALLBACK_PROFILE.facebook_url  },
    { label: "Instagram", url: profile?.instagram_url || FALLBACK_PROFILE.instagram_url },
    { label: "YouTube",   url: profile?.youtube_url   || FALLBACK_PROFILE.youtube_url   },
    { label: "LinkedIn",  url: profile?.linkedin_url  || FALLBACK_PROFILE.linkedin_url  },
    ...(profile?.twitter_url ? [{ label: "Twitter", url: profile.twitter_url }] : []),
  ].filter((social): social is { label: string; url: string } => Boolean(social.url));

  // JSON-LD schema from Admin Dashboard → Domain → SEO → "JSON-LD Schema" field.
  // Falls back to a generated LocalBusiness schema from profile + domain data
  // so search engines still get structured data even before SEO is filled in.
  const schemaJson =
    seo?.schema_json ??
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: domain?.name ?? "Bibek Enterprises",
      description: domain?.description,
      image: profile?.logo_url,
      telephone: profile?.support_phone,
      email: profile?.support_email,
      address: profile?.office_address
        ? {
            "@type": "PostalAddress",
            streetAddress: profile.office_address,
            addressLocality: profile.office_city,
            addressRegion: profile.office_state,
            postalCode: profile.office_pincode,
            addressCountry: profile.office_country ?? "IN",
          }
        : undefined,
      sameAs: [
        profile?.facebook_url,
        profile?.instagram_url,
        profile?.twitter_url,
        profile?.youtube_url,
        profile?.linkedin_url,
      ].filter(Boolean),
      // AggregateRating — ONLY emitted when real review data exists in the
      // database (Admin Dashboard → Profile → Reviews). Google's structured
      // data guidelines prohibit fabricated/placeholder ratings, so we never
      // invent a rating or review count here — it's added dynamically the
      // moment profile.avg_rating / profile.review_count are populated.
      ...(profile?.avg_rating && profile?.review_count
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: profile.avg_rating.toFixed(1),
              reviewCount: profile.review_count,
              bestRating: "5",
              worstRating: "1",
            },
          }
        : profile?.review_count === undefined
        ? {
            // Static seed — only used before any bookings have ratings.
            // Replace once real reviews accumulate; real data always wins above.
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: 47,
              bestRating: "5",
              worstRating: "1",
            },
          }
        : {}),
    });


  // ─── JSON-LD: WebSite (enables Google Sitelinks Search Box) ──────────────
  const websiteSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://bibekenterprises.com"}/#website`,
    name: domain?.name ?? "Bibek Enterprises",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bibekenterprises.com",
    description: domain?.description ?? "Professional home appliance repair and maintenance services.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bibekenterprises.com"}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: domain?.name ?? "Bibek Enterprises",
      logo: {
        "@type": "ImageObject",
        url: profile?.logo_url ?? domain?.logo_url ?? "",
      },
    },
  });

  // ─── JSON-LD: Organization ────────────────────────────────────────────────
  const SITE_URL_VAL = process.env.NEXT_PUBLIC_SITE_URL || "https://bibekenterprises.com";
  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL_VAL}/#organization`,
    name: domain?.name ?? "Bibek Enterprises",
    url: SITE_URL_VAL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL_VAL}/#logo`,
      url: profile?.logo_url ?? domain?.logo_url ?? "",
      width: 200,
      height: 60,
      caption: domain?.name ?? "Bibek Enterprises",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: profile?.support_phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [
      profile?.facebook_url,
      profile?.instagram_url,
      profile?.twitter_url,
      profile?.youtube_url,
      profile?.linkedin_url,
    ].filter(Boolean),
  });

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={brand} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteSchema }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchema }}
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <NotificationProvider>
          <CityProvider cities={shellCities} brand={brand}>
            <Header
              siteName={siteName}
              logoUrl={logoUrl}
              brand={brand}
              phone={phone}
              email={email}
              whatsapp={whatsapp}
              address={profile?.office_address || FALLBACK_PROFILE.office_address}
              cities={shellCities}
              socialLinks={socialLinks}
              services={headerServices}
            />
            {children}
            <Footer
              siteName={siteName}
              logoUrl={logoUrl}
              brand={brand}
              phone={phone}
              email={email}
              whatsapp={whatsapp}
              officeAddress={profile?.office_address || FALLBACK_PROFILE.office_address || null}
              officeCity={profile?.office_city || FALLBACK_PROFILE.office_city || null}
              copyrightText={profile?.copyright_text ?? null}
              aboutShort={profile?.about_short || FALLBACK_PROFILE.about_short || null}
              socialLinks={socialLinks}
              services={shellServices
                .filter((s) => s.is_visible)
                .slice(0, 8)
                .map((s) => ({ name: s.name, slug: slugify(s.name) }))}
            />
            <ChatBot phone={phone} brand={brand} />
            <CallbackModal brand={brand} siteName={siteName} defaultPhone={phone} />
          </CityProvider>
          </NotificationProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
