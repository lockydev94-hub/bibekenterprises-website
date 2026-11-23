import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { getLegalPageData, legalMetadata, legalBreadcrumb, LEGAL_ACCENT } from "@/lib/legal";

const PAGE_KEY = "terms";

/** ISR — an edit in Admin Dashboard → Domains → Legal goes live within a minute. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata(PAGE_KEY);
}

export default async function TermsPage() {
  const data = await getLegalPageData(PAGE_KEY);
  if (!data) notFound();

  const { page, brand, siteName, email, phone, phoneHref } = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalBreadcrumb(PAGE_KEY, page.title)) }}
      />
      <LegalPageShell
        brand={brand}
        accent={LEGAL_ACCENT}
        siteName={siteName}
        title={page.title}
        subtitle={page.subtitle}
        updated={page.effective_date}
        email={email}
        phone={phone}
        phoneHref={phoneHref}
        sections={page.sections}
        footerNote={page.footer_note}
      />
    </>
  );
}
