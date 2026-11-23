import Image from "next/image";
import Link from "next/link";
import type { DomainService } from "@/types";
import { serviceHref, slugify } from "@/lib/slug";
import { featuredService, serviceImage, serviceLabel, serviceFallback } from "@/lib/home";
import Container from "./Container";
import SmartImage from "./SmartImage";

export default function FeaturedService({ services }: { services: DomainService[] }) {
  const featured = featuredService(services);
  if (!featured) return null;

  const preferred = ["AC Uninstallation", "AC Installation", "Air Conditioner Repair", "AC Deep Cleaning"]
    .map((name) => services.find((s) => s.name === name))
    .filter((s): s is DomainService => Boolean(s))
    .slice(0, 4);

  const list = preferred.length >= 3
    ? preferred
    : services.filter((s) => s.name.startsWith("AC ")).slice(0, 4);

  return (
    <section className="bg-white pb-6" aria-labelledby="featured-service-title">
      <Container>
        <div className="relative grid overflow-hidden rounded-xl bg-[#0B1533] lg:grid-cols-[34%_30%_36%]">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#1D4ED8]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-[#F97316]/20 blur-3xl"
          />

          {/* Copy */}
          <div className="relative z-10 flex flex-col justify-center p-5 sm:p-6">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#F97316]">
              What We Repair &amp; Maintain
            </p>
            <h2
              id="featured-service-title"
              className="mt-1.5 max-w-[270px] text-[23px] font-extrabold leading-[1.12] text-white"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              {featured.name === "AC Uninstallation" ? "AC Uninstallation Service" : serviceLabel(featured.name)}
            </h2>
            <p className="mt-2 max-w-[245px] text-[10.5px] leading-[1.65] text-white/60">
              {featured.description} Safe professional service with careful handling, gas safety and damage-free removal.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-[9px] text-white/50">
                From
                <strong className="ml-1 text-[17px] font-extrabold text-[#F97316]">
                  ₹{featured.base_price.toLocaleString("en-IN")}
                </strong>
              </span>
              <Link
                href={`/booking?service=${slugify(featured.name)}`}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#F97316] px-4 py-2 text-[10.5px] font-bold text-white transition-colors hover:bg-[#EA580C]"
              >
                Book Now
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div className="relative hidden min-h-[185px] lg:block">
            <Image
              src="/images/home/feature/technician.webp"
              alt="Bibek technician servicing an air conditioner"
              fill
              sizes="(min-width: 1024px) 340px, 0px"
              className="object-cover object-center"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0B1533] via-transparent to-[#0B1533]/70" />
          </div>

          {/* Quick list */}
          <div className="relative z-10 flex flex-col justify-center gap-1 p-3.5 sm:p-4">
            {list.map((service) => (
              <Link
                key={service.domain_service_id}
                href={serviceHref(service)}
                className="group flex items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.055] px-2.5 py-1.5 transition-colors hover:border-[#F97316]/60 hover:bg-white/[0.09]"
              >
                <span className="relative h-8 w-9 shrink-0 overflow-hidden rounded bg-white/10">
                  <SmartImage
                    src={serviceImage(service)}
                    fallback={serviceFallback(service)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[10.5px] font-bold text-white">
                    {serviceLabel(service.name)}{serviceLabel(service.name).includes("Service") ? "" : " Service"}
                  </span>
                  <span className="mt-0.5 block text-[9px] text-[#F97316]">
                    From ₹{service.base_price.toLocaleString("en-IN")}
                  </span>
                </span>
                <span className="text-[12px] text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-[#F97316]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
