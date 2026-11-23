"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBox, { SearchableService } from "./SearchBox";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useCity } from "@/context/CityContext";

interface SocialLink { label: string; url: string }

interface Props {
  siteName: string;
  logoUrl: string | null;
  brand: string;
  phone: string;
  email: string;
  whatsapp?: string | null;
  address?: string | null;
  cities?: { name: string }[];
  socialLinks?: SocialLink[];
  services: SearchableService[];
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: "services" as const },
  { label: "Service Areas", href: "/#service-areas", menu: "areas" as const },
  { label: "About Us", href: "/about" },
  { label: "Offers", href: "/services" },
  { label: "Contact", href: "/#contact" },
];

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("facebook")) {
    return <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>;
  }
  if (key.includes("instagram")) {
    return <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  if (key.includes("youtube")) {
    return <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M23 12s0-4-.5-5.9c-.3-1-1.1-1.8-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.5c-1 .3-1.8 1.1-2.1 2.1C1 8 1 12 1 12s0 4 .5 5.9c.3 1 1.1 1.8 2.1 2.1 1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5c1-.3 1.8-1.1 2.1-2.1C23 16 23 12 23 12zM9.8 15.5v-7l6 3.5-6 3.5z" /></svg>;
  }
  return <span className="text-[9px] font-bold">{label[0]}</span>;
}

export default function Header({
  siteName,
  logoUrl,
  brand,
  phone,
  email,
  whatsapp,
  address,
  cities = [],
  socialLinks = [],
  services,
}: Props) {
  const router = useRouter();
  const { hydrated, isLoggedIn, user, logout } = useAuth();
  const { unreadCount, requestPermission, permissionState } = useNotifications();
  const { selectedCity, openCityModal } = useCity();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setMenuOpen(false);
    await logout();
    setLoggingOut(false);
    router.push("/");
  };

  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const initial = user?.name ? user.name.trim()[0].toUpperCase() : "?";
  const visibleServices = services.slice(0, 8);
  const visibleCities = cities.slice(0, 6);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_14px_rgba(23,37,84,0.055)]">
      {/* ── Utility bar ── */}
      <div className="border-b border-[#EEF0F5] bg-white text-[9.5px] text-[#1D4ED8]">
        <div className="mx-auto flex h-[29px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex min-w-0 items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <span className="truncate">{address || "Bhubaneswar, Odisha"}</span>
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Mon–Sat: 8:00 AM – 8:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            {cities.length > 0 && (
              <button onClick={openCityModal} className="flex items-center gap-1 font-semibold transition-colors hover:text-[#F97316]" title="Change city">
                <span className="text-[10px]">📍</span>
                <span className="max-w-[88px] truncate">{selectedCity?.name || "Select City"}</span>
              </button>
            )}
            <a href={`mailto:${email}`} className="hidden items-center gap-1.5 transition-colors hover:text-[#F97316] sm:flex">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
              {email}
            </a>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-1.5 border-l border-[#E7E9F2] pl-3">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-4 w-4 items-center justify-center text-[#1D4ED8] transition-colors hover:text-[#F97316]">
                    <SocialIcon label={social.label} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[62px] items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-1.5" aria-label={siteName}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={siteName} className="h-10 object-contain" />
            ) : (
              <>
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3 2.4-2.4z" />
                </svg>
                <span className="leading-none">
                  <span className="flex items-baseline gap-1">
                    <span className="text-[27px] font-black tracking-[-0.05em]" style={{ color: brand, fontFamily: "Poppins, sans-serif" }}>BIBEK</span>
                    <span className="text-[13px] font-extrabold tracking-[0.03em] text-[#172554]" style={{ fontFamily: "Poppins, sans-serif" }}>ENTERPRISES</span>
                  </span>
                  <span className="mt-1 block text-[6.4px] font-bold uppercase tracking-[0.19em] text-[#F97316]">
                    Home Appliance Repair
                  </span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="ml-2 hidden flex-1 items-center justify-center gap-5 lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 py-4 text-[11.5px] font-semibold text-[#26315A] transition-colors hover:text-[#F97316]"
                >
                  {item.label}
                  {item.menu && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5"><path d="M6 9l6 6 6-6" /></svg>
                  )}
                </Link>

                {item.menu === "services" && visibleServices.length > 0 && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[250px] -translate-x-1/2 rounded-lg border border-[#E7E9F2] bg-white p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {visibleServices.map((service) => (
                      <Link key={service.domain_service_id} href={`/services/${service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`} className="flex items-center justify-between rounded-md px-2.5 py-2 text-[10.5px] font-medium text-[#26315A] hover:bg-[#FFF7ED] hover:text-[#EA580C]">
                        {service.name}
                        <span className="text-[#CBD5E1]">→</span>
                      </Link>
                    ))}
                    <Link href="/services" className="mt-1 block border-t border-[#EEF0F5] px-2.5 pt-2 text-[10px] font-bold text-[#F97316]">View all services →</Link>
                  </div>
                )}

                {item.menu === "areas" && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[205px] -translate-x-1/2 rounded-lg border border-[#E7E9F2] bg-white p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {(visibleCities.length ? visibleCities : [{ name: "Bhubaneswar" }, { name: "Cuttack" }, { name: "Puri" }, { name: "Berhampur" }]).map((city) => (
                      <Link key={city.name} href="/#service-areas" className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[10.5px] font-medium text-[#26315A] hover:bg-[#FFF7ED] hover:text-[#EA580C]">
                        <span className="text-[#F97316]">📍</span> {city.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label="Search services"
              aria-expanded={searchOpen}
              className="hidden h-8 w-8 items-center justify-center rounded-full text-[#26315A] transition-colors hover:bg-[#FFF7ED] hover:text-[#F97316] sm:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>

            {hydrated && isLoggedIn && (
              <button
                onClick={() => {
                  if (permissionState === "default") requestPermission();
                  router.push("/customer/notifications");
                }}
                className="relative hidden h-8 w-8 items-center justify-center rounded-full text-[#26315A] transition-colors hover:bg-[#FFF7ED] hover:text-[#F97316] sm:flex"
                title="Notifications"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-4-5.7V5a2 2 0 1 0-4 0v.3A6 6 0 0 0 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" /></svg>
                {unreadCount > 0 && <span className="absolute right-0 top-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#F97316] px-0.5 text-[7px] font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>}
              </button>
            )}

            {hydrated && !isLoggedIn && (
              <Link href="/login" className="hidden items-center gap-1 text-[11px] font-semibold text-[#26315A] transition-colors hover:text-[#F97316] md:flex">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                Login
              </Link>
            )}

            {hydrated && isLoggedIn && (
              <div ref={menuRef} className="relative hidden md:block">
                <button onClick={() => setMenuOpen((open) => !open)} className="flex items-center gap-1.5 rounded-full border border-[#E7E9F2] py-1 pl-1 pr-2.5 transition-colors hover:border-[#FDBA74]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: brand }}>{initial}</span>
                  <span className="max-w-[70px] truncate text-[10px] font-semibold text-[#26315A]">{user?.name?.split(" ")[0]}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-lg border border-[#E7E9F2] bg-white shadow-xl">
                    <div className="border-b border-[#EEF0F5] px-3 py-2.5">
                      <p className="truncate text-[10.5px] font-bold text-[#172554]">{user?.name}</p>
                      <p className="text-[9px] text-[#94A3B8]">{user?.mobile}</p>
                    </div>
                    {[
                      { href: "/customer/bookings", label: "My Bookings" },
                      { href: "/customer/addresses", label: "My Addresses" },
                      { href: "/customer/profile", label: "Profile" },
                      { href: "/customer/notifications", label: "Notifications" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-[10.5px] font-medium text-[#26315A] hover:bg-[#F8FAFC]">{link.label}</Link>
                    ))}
                    <button onClick={handleLogout} disabled={loggingOut} className="block w-full border-t border-[#EEF0F5] px-3 py-2 text-left text-[10.5px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60">
                      {loggingOut ? "Signing out…" : "Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            )}

            <a href={phoneHref} className="hidden items-center gap-1.5 rounded-full bg-[#F97316] px-3.5 py-2 text-[10.5px] font-bold text-white shadow-sm transition-colors hover:bg-[#EA580C] xl:flex">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              {phone}
            </a>

            <Link href="/booking" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-[#F97316] px-3.5 py-2.5 text-[10.5px] font-bold text-white shadow-[0_5px_12px_-6px_rgba(249,115,22,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#EA580C] sm:px-4">
              Book a Service
            </Link>

            <button onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={mobileOpen} className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E7E9F2] text-[#26315A] lg:hidden">
              {mobileOpen ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-[#EEF0F5] py-3">
            <SearchBox services={services} brand={brand} />
          </div>
        )}

        {mobileOpen && (
          <div className="border-t border-[#EEF0F5] pb-4 lg:hidden">
            <nav className="grid grid-cols-2 gap-1 py-3">
              {NAV.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-[12px] font-semibold text-[#26315A] hover:bg-[#FFF7ED] hover:text-[#EA580C]">
                  {item.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-[12px] font-semibold text-[#26315A] hover:bg-[#FFF7ED] hover:text-[#EA580C]">Login</Link>
            </nav>
            <div className="flex flex-wrap gap-2 border-t border-[#EEF0F5] pt-3">
              {visibleCities.slice(0, 4).map((city) => (
                <Link key={city.name} href="/#service-areas" onClick={() => setMobileOpen(false)} className="rounded-full border border-[#E7E9F2] px-3 py-1.5 text-[10px] font-medium text-[#26315A]">📍 {city.name}</Link>
              ))}
            </div>
            <a href={phoneHref} className="mt-3 flex items-center justify-center gap-2 rounded-md bg-[#F97316] px-4 py-2.5 text-[12px] font-bold text-white">
              Call {phone}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
