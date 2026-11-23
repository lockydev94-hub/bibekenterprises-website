import Link from "next/link";

interface SocialLink { label: string; url: string }
interface ServiceItem { name: string; slug: string }

interface Props {
  siteName: string;
  logoUrl: string | null;
  brand: string;
  phone: string;
  email: string;
  whatsapp?: string | null;
  officeAddress?: string | null;
  officeCity?: string | null;
  copyrightText?: string | null;
  aboutShort?: string | null;
  socialLinks?: SocialLink[];
  services?: ServiceItem[];
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Service Areas", href: "/#service-areas" },
  { label: "Offers", href: "/services" },
  { label: "Contact Us", href: "/#contact" },
];

const SUPPORT_LINKS = [
  { label: "Book a Service", href: "/booking" },
  { label: "Track Service", href: "/customer/bookings" },
  { label: "Service Warranty", href: "/refund-policy" },
  { label: "FAQs", href: "/#faq-title" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("facebook")) return <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (key.includes("instagram")) return <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  if (key.includes("youtube")) return <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M23 12s0-4-.5-5.9c-.3-1-1.1-1.8-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.5c-1 .3-1.8 1.1-2.1 2.1C1 8 1 12 1 12s0 4 .5 5.9c.3 1 1.1 1.8 2.1 2.1 1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5c1-.3 1.8-1.1 2.1-2.1C23 16 23 12 23 12zM9.8 15.5v-7l6 3.5-6 3.5z" /></svg>;
  return <span className="text-[8px] font-bold">{label[0]}</span>;
}

export default function Footer({
  siteName,
  logoUrl,
  brand,
  phone,
  email,
  whatsapp,
  officeAddress,
  officeCity,
  copyrightText,
  aboutShort,
  socialLinks = [],
  services = [],
}: Props) {
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const year = new Date().getFullYear();
  const address = officeAddress && officeCity && !officeAddress.toLowerCase().includes(officeCity.toLowerCase())
    ? `${officeAddress}, ${officeCity}`
    : officeAddress || officeCity || "";

  return (
    <footer id="contact" className="bg-[#0B1533] text-[#CBD5E1]">
      <div className="mx-auto max-w-[1180px] px-4 pb-5 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.75fr_1.2fr_0.8fr_1.4fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5" aria-label={siteName}>
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={siteName} className="h-9 object-contain brightness-0 invert" />
              ) : (
                <>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3 2.4-2.4z" />
                  </svg>
                  <span className="leading-none">
                    <span className="flex items-baseline gap-1">
                      <span className="text-[22px] font-black tracking-[-0.05em] text-white" style={{ fontFamily: "Poppins, sans-serif" }}>BIBEK</span>
                      <span className="text-[11px] font-extrabold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>ENTERPRISES</span>
                    </span>
                    <span className="mt-1 block text-[5.5px] font-bold uppercase tracking-[0.17em] text-[#F97316]">Home Appliance Repair</span>
                  </span>
                </>
              )}
            </Link>
            <p className="mt-2 max-w-[205px] text-[9px] leading-[1.65] text-[#94A3B8]">
              {aboutShort || `Your trusted partner for home appliance repair and maintenance services in Bhubaneswar, Odisha.`}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-3 flex gap-1.5">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#F97316]">
                    <SocialIcon label={social.label} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10.5px] font-bold text-white">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-[9px]">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#FDBA74]">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10.5px] font-bold text-white">Our Services</h4>
            <ul className="mt-2 space-y-1 text-[9px]">
              {(services.length ? services.slice(0, 6) : [
                { name: "AC Repair & Service", slug: "air-conditioner-repair" },
                { name: "Refrigerator Repair", slug: "refrigerator-repair" },
                { name: "Washing Machine Repair", slug: "washing-machine-repair" },
                { name: "Water Purifier Repair", slug: "water-purifier-repair" },
                { name: "Geyser Repair", slug: "geyser-repair" },
                { name: "Microwave Repair", slug: "microwave-repair" },
              ]).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="transition-colors hover:text-[#FDBA74]">• {service.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-[#FDBA74] hover:text-white">View all services →</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10.5px] font-bold text-white">Support</h4>
            <ul className="mt-2 space-y-1 text-[9px]">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#FDBA74]">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10.5px] font-bold text-white">Contact Us</h4>
            <ul className="mt-2 space-y-1.5 text-[9px] leading-[1.5]">
              <li className="flex items-start gap-1.5">
                <span className="mt-0.5 text-[#F97316]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </span>
                <span>{address || "Bhubaneswar, Odisha, India"}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#F97316]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                </span>
                <a href={phoneHref} className="transition-colors hover:text-white">{phone}</a>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#F97316]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                </span>
                <a href={`mailto:${email}`} className="break-all transition-colors hover:text-white">{email}</a>
              </li>
              {whatsapp && (
                <li className="flex items-center gap-1.5">
                  <span className="text-[#F97316]">●</span>
                  <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">WhatsApp Support</a>
                </li>
              )}
              <li className="flex items-center gap-1.5">
                <span className="text-[#F97316]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <span>Mon–Sat: 8:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white text-[#374151]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-1.5 px-4 py-2.5 text-[8.5px] sm:flex-row sm:px-6 lg:px-8">
          <p>{copyrightText || `© ${year} ${siteName}. All Rights Reserved.`}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/privacy" className="hover:text-[#F97316]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#F97316]">Terms</Link>
            <Link href="/refund-policy" className="hover:text-[#F97316]">Refund</Link>
            <span className="text-[#CBD5E1]">|</span>
            <span>
              Designed &amp; Developed by{" "}
              <a
                href="https://www.lockydev.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F97316] hover:underline"
              >
                LockyDev
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
