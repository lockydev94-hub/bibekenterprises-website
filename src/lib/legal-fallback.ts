/**
 * legal-fallback.ts — Offline-safe copy of the legal pages.
 *
 * The authoritative text lives in the backend (`domain_legal_pages`, edited in
 * Admin Dashboard → Domains → Legal) and is fetched by getDomainLegalPage().
 * This module is the fallback rendered when that fetch returns null — during
 * `next build` with SKIP_API_DURING_BUILD, or if the API is briefly unreachable.
 *
 * WHY IT MATTERS: Google Play rejected the technician apps (Aug 30, 2026)
 * because the privacy policy did not disclose Location collection. A reviewer
 * fetching /privacy must NEVER see a blank or non-compliant page, so the
 * fallback below is itself a complete, Play-compliant policy — including the
 * precise + background location disclosure. Keep it that way.
 *
 * Everything is parameterised, so this file is identical across all three
 * websites; only the values passed in differ per brand.
 */

import type { DomainLegalPage, DomainLegalSection } from "@/types";

export const LEGAL_PAGE_KEYS = ["privacy", "terms", "refund-policy"] as const;
export type LegalPageKey = (typeof LEGAL_PAGE_KEYS)[number];

export const LEGAL_LABELS: Record<string, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  "refund-policy": "Refund & Cancellation Policy",
};

export interface LegalCtx {
  siteName: string;
  legalName: string;
  email: string;
  phone: string;
  address?: string;
  gstin?: string;
  updated: string;
}

/* ── Privacy Policy ─────────────────────────────────────────────────────────── */
function privacySections(c: LegalCtx): DomainLegalSection[] {
  const where = c.address ? ` Our registered address is ${c.address}.` : "";
  return [
    {
      id: "who-we-are",
      title: "1. Who We Are",
      content: `${c.legalName} (operating as "${c.siteName}") provides on-site appliance repair, installation and maintenance services in India.${where} This policy explains what personal data we collect through our website, our customer app and our technician app ("Field App"), why we collect it, who we share it with, and the choices you have. It applies to every customer, technician and visitor who uses our services.`,
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: `Information you give us: your name, mobile number, email address, service address with pincode, appliance details (brand, model, purchase or warranty date), and the description of the fault you report. Information we generate: your booking history, quotations, invoices, payment status, service reports, technician notes, and the ratings or complaints you submit. Information collected automatically: IP address, device and browser type, app version, and pages or screens viewed, through cookies and equivalent app-side identifiers. We do not collect your card number, CVV or bank credentials — those go directly to our payment gateway.`,
    },
    {
      id: "location",
      title: "3. Location Information",
      content: `We access and collect location data, and this section explains exactly how.

(a) Customers. With your permission, the website and customer app read your device's approximate or precise location once, when you tap "use my location", to pre-fill your service address and to check whether your area is serviceable. You can always decline and type the address instead. We do not track customers in the background.

(b) Technicians using the Field App. After a technician signs in and switches their duty status to Online, the app collects precise GPS location — including in the background and when the screen is off — using an Android foreground service that shows a persistent notification for as long as tracking is active. We use it only to: assign the nearest available technician to a job, show the customer a live "technician on the way" position and arrival estimate, confirm attendance at the correct service address, calculate travel distance for allowances, and keep an evidence trail for billing or safety disputes. Background collection starts only after the technician grants the "Allow all the time" location permission and goes Online. It stops immediately when they go Offline, sign out, or revoke the permission in Android settings. Nothing is collected while the technician is Offline or on leave, and the app does not track technicians outside their duty hours.

(c) We do not sell location data, we do not share it with advertising networks or data brokers, and we do not use it to build advertising profiles.

(d) Retention. Individual location pings are retained for 90 days for dispute resolution and then deleted or aggregated; only coarse trip summaries are kept for accounting.`,
    },
    {
      id: "camera-and-photos",
      title: "4. Camera, Photos and Signatures",
      content: `Our technician app requests camera access so a technician can photograph the appliance and the completed work as service evidence, and it captures the customer's digital signature on job completion. These images and signatures are attached to the job record and used for quality checks, warranty claims and dispute resolution. The camera is used only while a technician is actively completing a job — never in the background. We do not request broad photo or media library permissions, and we cannot browse, read or index the other photos and videos stored on your device. When a file needs to be chosen from your device, the app uses your operating system's own picker, which returns only the item you select.`,
    },
    {
      id: "device-and-notifications",
      title: "5. Device Identifiers and Notifications",
      content: `We store a push notification token (Firebase Cloud Messaging) for your device so we can send booking confirmations, technician-assigned and technician-arriving alerts, quotation approvals, payment receipts, and — for technicians — new job alerts. We also record the app version, OS version and device model to diagnose crashes and to decide when to force an update. You can turn notifications off in your device settings; core alerts will then be sent by SMS or WhatsApp instead.`,
    },
    {
      id: "payments",
      title: "6. Payments",
      content: `Online payments are processed by our payment partners (such as Razorpay and UPI providers). They receive the amount, order reference and the contact details needed to complete the transaction, and they handle your card, UPI or netbanking credentials under their own privacy policies and PCI-DSS obligations. We receive and store only the transaction status, reference number, method, amount and timestamp. For cash payments we record the amount collected and the technician who collected it.`,
    },
    {
      id: "how-we-use",
      title: "7. How We Use Your Information",
      content: `To create and manage your account; to schedule, dispatch and complete the service you booked; to route the nearest technician and share live tracking with you; to prepare quotations, invoices and GST records; to process payments, refunds and warranty claims; to send transactional messages by push notification, SMS, WhatsApp or email; to provide customer support and resolve complaints; to detect and prevent fraud or misuse; to improve our services and train our technicians; and to comply with legal, tax and audit obligations. We do not carry out automated decision-making that has a legal or similarly significant effect on you.`,
    },
    {
      id: "sharing",
      title: "8. Who We Share It With",
      content: `The assigned technician or franchise partner, who sees your name, address, contact number and the reported fault so they can perform the service. Payment gateways, for transactions. Communication providers, to deliver SMS, WhatsApp and push messages. Cloud hosting and media storage providers that run our platform. Manufacturers or brand service networks, only when your appliance is under their warranty and a claim requires it. Professional advisers, auditors and government authorities where the law requires disclosure. We do not sell your personal data, and we do not share it with advertisers. If our business is merged or acquired, your data may transfer to the new entity under equivalent protection.`,
    },
    {
      id: "retention",
      title: "9. Data Retention",
      content: `We keep your account and service records for as long as your account is active, and afterwards only as long as needed to resolve disputes, honour warranties and satisfy legal duties — invoices and GST records are retained for eight years as required by Indian tax law. Location pings are kept for 90 days. Service photographs are kept for two years or the length of the applicable warranty, whichever is longer. Support call recordings, where made, are kept for six months.`,
    },
    {
      id: "security",
      title: "10. How We Protect Your Data",
      content: `All traffic between your device and our servers is encrypted with HTTPS/TLS. Passwords are stored only as salted hashes. Access to customer data is role-based and limited to the staff who need it, and technicians see only the jobs assigned to them. Admin access requires authentication and privileged actions are written to an audit log. We follow reasonable security practices under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. No system is perfectly secure; if a breach affects your data we will notify you and the Data Protection Board as required by law.`,
    },
    {
      id: "your-rights",
      title: "11. Your Rights",
      content: `Under the Digital Personal Data Protection Act, 2023 you may: ask what personal data we hold about you and how it is processed; have inaccurate or incomplete data corrected; ask us to erase data we no longer need; withdraw a consent you previously gave, including location or notification consent; nominate someone to exercise your rights if you are unable to; and raise a grievance with us. Write to ${c.email} and we will respond within 30 days. Withdrawing location consent is always possible in your device settings — for technicians this means live tracking and automatic job assignment will stop working.`,
    },
    {
      id: "deletion",
      title: "12. Account and Data Deletion",
      content: `You can ask us to delete your account and personal data at any time by emailing ${c.email} from your registered address, or by calling ${c.phone}. We verify the request, delete your profile, addresses, appliance records, location history and notification tokens within 30 days, and confirm in writing. Invoices, GST records and any data tied to an open dispute are retained for the statutory period, unlinked from your profile where possible. Deleting your account cancels any upcoming bookings.`,
    },
    {
      id: "children",
      title: "13. Children",
      content: `Our services are meant for adults. We do not knowingly collect personal data from anyone under 18, and we do not use children's data for tracking or targeted advertising. If you believe a minor has given us personal data, contact us and we will delete it promptly.`,
    },
    {
      id: "changes",
      title: "14. Changes to This Policy",
      content: `We may update this policy when our services, our partners or the law change. The effective date at the top of this page always shows the current version. If a change materially affects how we use your data we will notify you in the app, by email or by a prominent notice on this website at least 14 days before it takes effect.`,
    },
    {
      id: "contact",
      title: "15. Contact and Grievance Officer",
      content: `For any privacy question, to exercise your rights, or to complain about how your data has been handled, contact our Grievance Officer: ${c.legalName}${c.address ? `, ${c.address}` : ""}. Email: ${c.email}. Phone: ${c.phone}. We acknowledge every grievance within 48 hours and resolve it within 30 days. If you are not satisfied with our response you may escalate to the Data Protection Board of India.`,
    },
  ];
}

/* ── Terms of Service ───────────────────────────────────────────────────────── */
function termsSections(c: LegalCtx): DomainLegalSection[] {
  return [
    {
      id: "acceptance",
      title: "1. Acceptance of These Terms",
      content: `These terms govern your use of the ${c.siteName} website, customer app and services operated by ${c.legalName}. By booking a service, creating an account or using our platform you agree to them. If you do not agree, please do not use the service. We may update these terms and will post the revised version on this page with a new effective date.`,
    },
    {
      id: "services",
      title: "2. What We Provide",
      content: `We arrange on-site repair, installation, servicing and maintenance of home and commercial appliances through our own technicians and authorised franchise partners. Availability depends on your pincode, the appliance type and technician availability. We may decline or cancel a booking that is outside our service area, unsafe to perform, or beyond our technical capability, and we will tell you why.`,
    },
    {
      id: "booking",
      title: "3. Bookings and Scheduling",
      content: `A booking is confirmed when you receive a confirmation message with a booking reference. Time slots are indicative: traffic, earlier jobs running long and parts availability can shift a visit, and we will inform you if the schedule changes. Please ensure an adult is present at the address during the visit, that the appliance is accessible, and that power and water supply are available where the work needs them.`,
    },
    {
      id: "pricing",
      title: "4. Pricing, Quotations and GST",
      content: `Prices shown on the website are indicative starting prices for the listed scope of work. After inspecting the appliance the technician raises a quotation covering labour and any parts required; work begins only after you approve it. Additional faults found during the job are quoted separately for your approval. All prices are in Indian Rupees and GST is charged at the applicable rate${c.gstin ? ` under GSTIN ${c.gstin}` : ""}. A visit or inspection charge may apply if you decline the quotation after the technician has arrived; the amount is disclosed before the visit.`,
    },
    {
      id: "payment",
      title: "5. Payment",
      content: `Payment is due on completion of the job unless a written credit arrangement exists. You can pay online (UPI, card, netbanking) or in cash to the technician, who will record the collection and issue a receipt. A GST invoice is generated for every completed job. We may suspend service on accounts with overdue amounts.`,
    },
    {
      id: "cancellation",
      title: "6. Cancellation and Refunds",
      content: `You can cancel or reschedule from the app or by calling support. Cancellation windows, visit-charge deductions and refund timelines are set out in our Refund & Cancellation Policy, which forms part of these terms.`,
    },
    {
      id: "warranty",
      title: "7. Workmanship Warranty",
      content: `We warrant our labour for 30 days from job completion unless a longer period is stated on your invoice: if the same fault recurs within that period we will re-attend at no labour cost. Spare parts carry only the warranty offered by their manufacturer, and the invoice records it. The warranty does not cover new or unrelated faults, damage from misuse, voltage fluctuation, water ingress, pest damage, or work later performed by someone else. Tampering with the repaired unit or its seals voids the warranty.`,
    },
    {
      id: "your-responsibilities",
      title: "8. Your Responsibilities",
      content: `Give accurate contact and address details, describe the fault honestly, and disclose known prior repairs. Keep pets secured and provide safe access and working space for the technician. Remove valuables and fragile items from the work area. Do not ask a technician to carry out work outside the approved quotation, to bypass safety devices, or to work on an installation that is unsafe — they are instructed to refuse. Treat our technicians with respect; we will withdraw service in cases of abuse, harassment or unsafe premises.`,
    },
    {
      id: "parts",
      title: "9. Parts and Spares",
      content: `We use new parts, or manufacturer-refurbished parts clearly identified as such on the quotation. Replaced faulty parts are handed to you unless you ask us to dispose of them, or unless a manufacturer warranty claim requires their return. Where a part is not available we will tell you the expected wait or advise that the repair is not viable.`,
    },
    {
      id: "liability",
      title: "10. Limitation of Liability",
      content: `We are responsible for direct loss or damage caused by our own negligence during the service, and our total liability for any claim is limited to the amount you paid for that job or the cost of repairing the damage we caused, whichever is lower. We are not liable for indirect or consequential loss such as loss of income, spoiled food or stored goods, data loss, or damage caused by a pre-existing defect, unauthorised earlier repair or unsuitable electrical supply. Nothing in these terms excludes liability that cannot be excluded under Indian law, including your rights under the Consumer Protection Act, 2019.`,
    },
    {
      id: "intellectual-property",
      title: "11. Intellectual Property and Acceptable Use",
      content: `The ${c.siteName} name, logo, website, apps and content belong to ${c.legalName} and may not be copied or reused without written permission. You may not scrape our data, attempt to break or overload our systems, reverse-engineer our apps, or use the platform for anything unlawful. We may suspend accounts that do.`,
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Contact",
      content: `These terms are governed by the laws of India and the courts of the district in which ${c.legalName} is registered have jurisdiction, without prejudice to consumer-forum remedies available to you. Questions about these terms: ${c.email} or ${c.phone}.`,
    },
  ];
}

/* ── Refund & Cancellation Policy ───────────────────────────────────────────── */
function refundSections(c: LegalCtx): DomainLegalSection[] {
  return [
    {
      id: "scope",
      title: "1. Scope",
      content: `This policy covers cancellations, refunds and adjustments for services booked with ${c.siteName}. It forms part of our Terms of Service. Anything stated on your quotation or invoice for a specific job takes precedence over this general policy.`,
    },
    {
      id: "before-visit",
      title: "2. Cancelling Before the Technician Is Dispatched",
      content: `Cancel from the app or by calling support at any time before the technician starts travelling to your address and there is no charge. Any amount already paid online is refunded in full to the original payment method.`,
    },
    {
      id: "after-dispatch",
      title: "3. Cancelling After the Technician Is Dispatched",
      content: `If you cancel once the technician is on the way, or the technician cannot carry out the job because nobody was present, the appliance was inaccessible, or power or water was unavailable, the visit charge applies and the balance of any prepayment is refunded. The visit charge is shown to you before you confirm the booking.`,
    },
    {
      id: "declined-quotation",
      title: "4. Declining the Quotation",
      content: `You are never obliged to approve a quotation. If you decline after inspection, only the inspection or visit charge is payable — you are not charged for the quoted repair. If the technician recommends against repair (for example the appliance is beyond economical repair), we tell you so and only the inspection charge applies.`,
    },
    {
      id: "unsatisfactory-work",
      title: "5. If the Work Is Not Right",
      content: `Report a problem with completed work within 30 days, or within the warranty period stated on your invoice if it is longer. We re-attend at no labour cost. If we cannot resolve the same fault after a reasonable re-attempt, we refund the labour charge for that job. Where a part we supplied is faulty, we replace it under the manufacturer's warranty at no labour cost to you.`,
    },
    {
      id: "timelines",
      title: "6. Refund Timelines",
      content: `Approved refunds are initiated within 3 working days. Online payments are returned to the original method and typically appear within 5 to 7 working days depending on your bank or UPI provider. Cash payments are refunded by UPI or bank transfer to the account you nominate, or credited to your ${c.siteName} wallet if you prefer. GST charged on a refunded amount is reversed on the credit note.`,
    },
    {
      id: "non-refundable",
      title: "7. What Is Not Refundable",
      content: `Inspection and visit charges once the technician has attended. Consumables already used, such as gas charging, chemicals or filters. Custom-ordered or specially procured parts once fitted. Labour for work you approved and we completed correctly. Damage caused after our visit by misuse, voltage fluctuation, water ingress, pests, or work done by someone else. Repeat visits caused by the same avoidable access failure.`,
    },
    {
      id: "parts-returns",
      title: "8. Parts Returns",
      content: `Unused parts supplied but not fitted can be returned within 7 days in original condition and packaging for a full refund. Fitted parts are covered by the manufacturer's warranty rather than a return. Replaced faulty parts are handed back to you unless a warranty claim requires us to return them to the manufacturer.`,
    },
    {
      id: "how-to-request",
      title: "9. How to Request a Refund",
      content: `Raise the request in the app against the booking, email ${c.email} with your booking reference, or call ${c.phone}. We acknowledge within 48 hours, decide within 7 working days, and explain the outcome in writing. Unresolved disputes can be escalated to our Grievance Officer at the same address; consumer-forum remedies under the Consumer Protection Act, 2019 remain available to you.`,
    },
  ];
}

/* ── assembly ───────────────────────────────────────────────────────────────── */
const BUILDERS: Record<string, (c: LegalCtx) => DomainLegalSection[]> = {
  privacy: privacySections,
  terms: termsSections,
  "refund-policy": refundSections,
};

const SUBTITLES: Record<string, (c: LegalCtx) => string> = {
  privacy: (c) => `How ${c.siteName} collects, uses and protects your personal information — including location, camera and device data.`,
  terms: (c) => `The terms on which ${c.siteName} provides appliance repair, installation and maintenance services.`,
  "refund-policy": (c) => `When you can cancel, what it costs, and how quickly ${c.siteName} refunds you.`,
};

const FOOTER_NOTES: Record<string, (c: LegalCtx) => string> = {
  privacy: (c) => `We take your privacy seriously. If you ever have a concern about how ${c.siteName} handles your data — including the location data our technician app collects while a technician is on duty — write to ${c.email} and we will address it promptly and transparently.`,
  terms: (c) => `If anything here is unclear before you book, ask us first — call ${c.phone} or email ${c.email}. We would rather explain the terms up front than argue about them later.`,
  "refund-policy": (c) => `If you feel a charge or refund decision is unfair, escalate it to ${c.email}. We would rather correct a genuine mistake than keep money we have not earned.`,
};

/**
 * Build the offline-safe version of one legal page. Returns null for an unknown
 * key so callers can 404 rather than render an empty shell.
 */
export function fallbackLegalPage(pageKey: string, c: LegalCtx): DomainLegalPage | null {
  const build = BUILDERS[pageKey];
  if (!build) return null;
  const label = LEGAL_LABELS[pageKey] ?? pageKey;
  return {
    page_key: pageKey,
    label,
    title: label,
    subtitle: SUBTITLES[pageKey]?.(c) ?? "",
    sections: build(c),
    footer_note: FOOTER_NOTES[pageKey]?.(c) ?? "",
    effective_date: c.updated,
    meta_title: `${label} | ${c.siteName}`,
    meta_description: SUBTITLES[pageKey]?.(c) ?? label,
    // Play reviewers fetch these URLs directly — they must stay indexable.
    robots: "index,follow",
    is_published: true,
  };
}
