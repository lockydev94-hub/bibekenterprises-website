import Image from "next/image";
import Container from "./Container";

const REASONS = [
  { title: "Certified\nTechnicians", image: "/images/home/features/certified-technicians.webp" },
  { title: "Same Day\nService", image: "/images/home/features/same-day.webp" },
  { title: "Transparent\nPricing", image: "/images/home/features/transparent-pricing.webp" },
  { title: "30-Day\nService Warranty", image: "/images/home/features/warranty.webp" },
  { title: "Real-Time\nTracking", icon: "pin" },
  { title: "Easy\nPayment", icon: "card" },
] as const;

function LineIcon({ name }: { name: "pin" | "card" }) {
  const common = {
    width: 29,
    height: 29,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "card") {
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function WhyChoose({ siteName }: { siteName: string }) {
  return (
    <section className="bg-white py-3.5" aria-labelledby="why-choose-title">
      <Container>
        <div className="rounded-lg border border-[#E7E9F2] bg-white px-5 py-3 shadow-[0_3px_16px_rgba(23,37,84,0.06)] sm:px-6">
          <div className="grid items-center gap-4 lg:grid-cols-[245px_1fr]">
            <div className="lg:border-r lg:border-[#E7E9F2] lg:pr-6">
              <h2
                id="why-choose-title"
                className="text-[21px] font-extrabold leading-[1.18] text-[#172554]"
                style={{ fontFamily: "Poppins, Inter, sans-serif" }}
              >
                Why Choose
                <br />
                <span className="text-[#F97316]">{siteName}?</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {REASONS.map((reason) => (
                <div
                  key={reason.title}
                  className="flex flex-col items-center justify-center gap-1.5 border-[#EEF0F5] px-2 text-center lg:border-r lg:last:border-r-0"
                >
                  <span className="flex h-[34px] w-[34px] items-center justify-center text-[#2563EB]">
                    {"image" in reason ? (
                      <Image src={reason.image} alt="" width={34} height={34} className="h-full w-full object-contain" />
                    ) : (
                      <LineIcon name={reason.icon} />
                    )}
                  </span>
                  <span className="whitespace-pre-line text-[10px] font-semibold leading-[1.25] text-[#26315A]">
                    {reason.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
