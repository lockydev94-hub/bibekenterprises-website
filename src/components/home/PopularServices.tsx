import Link from "next/link";
import type { DomainService } from "@/types";
import { serviceHref } from "@/lib/slug";
import { popularServices, serviceFallback, serviceImage, serviceLabel } from "@/lib/home";
import Container from "./Container";
import SmartImage from "./SmartImage";

interface Props {
  services: DomainService[];
}

export default function PopularServices({ services }: Props) {
  const popular = popularServices(services);
  if (!popular.length) return null;

  return (
    <section id="popular-services" className="bg-white pb-7 pt-1" aria-labelledby="popular-services-title">
      <Container>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F97316]">
              Popular Services
            </p>
            <h2
              id="popular-services-title"
              className="mt-1 text-[24px] font-extrabold leading-tight text-[#172554] sm:text-[26px]"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Our Most Booked Services
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden items-center gap-1.5 text-[11px] font-semibold text-[#F97316] transition-colors hover:text-[#EA580C] sm:inline-flex"
          >
            View All Services
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {popular.map((service, index) => (
            <Link
              key={service.domain_service_id}
              href={serviceHref(service)}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-[#E7E9F2] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#FDBA74] hover:shadow-[0_12px_26px_-16px_rgba(23,37,84,0.55)]"
            >
              {(index === 0 || index === 3) && (
                <span className="absolute left-2 top-2 z-10 rounded-full bg-[#F97316] px-2 py-0.5 text-[8px] font-bold text-white shadow-sm">
                  Popular
                </span>
              )}
              <div className="relative h-[96px] w-full overflow-hidden bg-[#F8FAFC]">
                <SmartImage
                  src={serviceImage(service)}
                  fallback={serviceFallback(service)}
                  alt={serviceLabel(service.name)}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-2">
                <h3 className="text-[12px] font-bold leading-[1.25] text-[#172554]">
                  {serviceLabel(service.name)}
                </h3>
                <p className="mt-0.5 line-clamp-2 min-h-[25px] text-[9.5px] leading-[1.4] text-[#6B7280]">
                  {service.description}
                </p>
                <div className="mt-2 flex items-center justify-between border-t border-[#EEF0F5] pt-1.5">
                  <span className="text-[9px] font-medium text-[#6B7280]">
                    From{" "}
                    <strong className="text-[12px] font-extrabold text-[#EA580C]">
                      ₹{service.base_price.toLocaleString("en-IN")}
                    </strong>
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF1E7] text-[#F97316] transition-colors group-hover:bg-[#F97316] group-hover:text-white">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-5 inline-flex w-full items-center justify-center gap-1.5 text-[11px] font-semibold text-[#F97316] sm:hidden"
        >
          View All Services <span aria-hidden>→</span>
        </Link>
      </Container>
    </section>
  );
}
