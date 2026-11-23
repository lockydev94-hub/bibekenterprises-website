import Link from "next/link";
import type { City } from "@/types";
import Container from "./Container";

const NEARBY = ["Khordha", "Jatni", "Pipili", "Balianata", "Dhauli", "Surrounding Areas"];

const MAP_NODES = [
  { label: "Khordha", className: "left-[7%] top-[44%]" },
  { label: "Cuttack", className: "left-[25%] top-[76%]" },
  { label: "Puri", className: "left-[52%] top-[83%]" },
  { label: "Jatni", className: "right-[11%] top-[45%]" },
  { label: "Pipili", className: "right-[22%] top-[75%]" },
] as const;

export default function ServiceAreas({ cities }: { cities: City[] }) {
  const locations = Array.from(
    new Set([
      ...cities.map((city) => city.name),
      ...NEARBY,
    ])
  ).slice(0, 9);

  return (
    <section id="service-areas" className="bg-white py-5" aria-labelledby="service-areas-title">
      <Container>
        <div className="grid items-center gap-7 lg:grid-cols-[54%_46%] lg:gap-8">
          <div className="grid items-center gap-4 sm:grid-cols-[185px_1fr]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F97316]">
                Our Service Locations
              </p>
              <h2
                id="service-areas-title"
                className="mt-1 text-[21px] font-extrabold leading-[1.14] text-[#172554] sm:text-[23px]"
                style={{ fontFamily: "Poppins, Inter, sans-serif" }}
              >
                Service Areas
                <br />
                We Cover
              </h2>
              <p className="mt-2 max-w-[180px] text-[10.5px] leading-relaxed text-[#6B7280]">
                We provide home appliance repair service across Bhubaneswar and surrounding areas.
              </p>
            </div>

            <div className="relative h-[195px] overflow-hidden rounded-lg border border-[#EEF0F5] bg-[#F8FAFC]">
              <svg aria-hidden viewBox="0 0 420 240" className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E8EDF5" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="420" height="240" fill="url(#map-grid)" />
                <path d="M-20 190 C 70 120, 135 215, 220 150 S 360 70, 450 120" fill="none" stroke="#DCE5F0" strokeWidth="13" strokeLinecap="round" />
                <path d="M10 55 C 95 75, 130 30, 210 72 S 335 145, 430 100" fill="none" stroke="#E7EDF6" strokeWidth="8" strokeLinecap="round" />
                <path d="M130 240 C 140 175, 205 145, 218 105" fill="none" stroke="#FED7AA" strokeWidth="2.5" strokeDasharray="5 6" />
                <path d="M218 105 C 290 118, 295 175, 360 196" fill="none" stroke="#FED7AA" strokeWidth="2.5" strokeDasharray="5 6" />
                <circle cx="218" cy="105" r="55" fill="none" stroke="#FED7AA" strokeWidth="1.5" strokeDasharray="4 6" />
                <circle cx="218" cy="105" r="83" fill="none" stroke="#E5EAF3" strokeWidth="1.2" />
              </svg>

              <div className="absolute left-1/2 top-[39%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="rounded-lg bg-[#F97316] px-3 py-2 text-center text-white shadow-[0_8px_18px_-8px_rgba(249,115,22,0.9)]">
                  <span className="block text-[9px] font-extrabold leading-tight">Bibek Enterprises</span>
                  <span className="mt-0.5 block text-[7.5px] font-medium text-white/85">Bhubaneswar, Odisha</span>
                </span>
                <span className="h-2.5 w-2.5 rotate-45 bg-[#F97316]" />
                <span className="mt-1 h-3 w-3 rounded-full border-[3px] border-white bg-[#F97316] shadow" />
              </div>

              <span className="absolute left-[43%] top-[16%] rounded-full border border-[#FDBA74]/50 bg-white/90 px-2 py-1 text-[8px] font-bold text-[#9A3412] shadow-sm">
                Bhubaneswar
              </span>

              {MAP_NODES.map((node) => (
                <span
                  key={node.label}
                  className={`absolute ${node.className} -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E2E8F0] bg-white px-2 py-1 text-[7.5px] font-semibold text-[#26315A] shadow-sm`}
                >
                  {node.label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:border-l lg:border-[#EEF0F5] lg:pl-8">
            <h3
              className="text-[21px] font-extrabold leading-tight text-[#172554]"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Our Service Locations
            </h3>
            <p className="mt-1 text-[10.5px] text-[#6B7280]">
              Book service in these areas and nearby localities.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {locations.map((location) => (
                <Link
                  key={location}
                  href="/services"
                  className="flex items-center gap-1.5 rounded-full border border-[#E7E9F2] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#374151] transition-colors hover:border-[#FDBA74] hover:bg-[#FFF7ED]"
                >
                  <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#FFF1E7] text-[#F97316]">
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="truncate">{location}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
