import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

interface Props {
  siteName: string;
  phone: string;
  phoneHref: string;
}

const BULLETS = [
  "Same Day Service",
  "30-Day Warranty",
  "Transparent Pricing",
];

const STATS = [
  { value: "10,000+", label: "Services Completed", icon: "clock" },
  { value: "500+", label: "Happy Customers", icon: "users" },
  { value: "50+", label: "Expert Technicians", icon: "gear" },
  { value: "4.8", label: "Average Rating", icon: "star" },
] as const;

function StatIcon({ name }: { name: (typeof STATS)[number]["icon"] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "users") {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (name === "gear") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.07 14H3v-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10 3.07V3h4v.09A1.7 1.7 0 0 0 15 4.65a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9 1.7 1.7 0 0 0 20.93 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15z" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg {...common}>
        <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3L5.8 21 7 14.2 2 9.3l6.9-1L12 2z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function HomeHero({ siteName, phone, phoneHref }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#F6F8FC]">
      {/* Soft blue glow + orange reference wedge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 15% 38%, rgba(37,99,235,0.07), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[74px] right-0 h-[56%] w-[46%] opacity-95"
        style={{
          background: "linear-gradient(135deg,#FB923C 0%,#F97316 58%,#EA580C 100%)",
          clipPath: "polygon(30% 100%, 100% 24%, 100% 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full bg-white/55 blur-2xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-7 py-6 sm:py-8 lg:grid-cols-[46%_54%] lg:gap-4 lg:py-7">
          {/* ── Public promise ── */}
          <div className="relative z-10 max-w-[540px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E7E9F2] bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#26315A] shadow-[0_2px_8px_rgba(23,37,84,0.06)]">
              <span className="text-[13px] text-amber-500">★</span>
              Trusted by 10,000+ Happy Customers
            </div>

            <h1
              className="text-[#111827]"
              style={{
                fontFamily: "Poppins, Inter, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
              }}
            >
              Fast &amp; Reliable
              <br />
              <span style={{ color: "#F97316" }}>Home Appliance</span>
              <br />
              Repair at Your Door
            </h1>

            <p className="mt-3.5 max-w-[500px] text-[12.5px] leading-[1.7] text-[#5B6478] sm:text-[13px]">
              {siteName} provides expert home appliance repair service in
              Bhubaneswar, including AC repair, refrigerator repair, washing
              machine repair, water purifier service, geyser repair, microwave
              oven repair, and more with quick and reliable doorstep service.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5">
              {BULLETS.map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#26315A]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF1E7] text-[#F97316]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {text}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 text-[12.5px] font-bold text-white shadow-[0_8px_18px_-8px_rgba(249,115,22,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EA580C]"
              >
                Book a Service
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 rounded-lg border border-[#DCE0EA] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#26315A] transition-colors hover:border-[#F97316] hover:text-[#F97316]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {phone}
              </a>
            </div>
          </div>

          {/* ── Appliance collage ── */}
          <div className="relative z-10 hidden h-[350px] select-none lg:block xl:h-[375px]">
            <div aria-hidden className="absolute inset-x-8 bottom-8 h-14 rounded-[50%] bg-[#15235A]/10 blur-2xl" />

            <div className="absolute bottom-[18px] left-[4%] h-[74%] w-[31%]">
              <Image src="/images/home/hero/refrigerator.webp" alt="Refrigerator repair" fill sizes="260px" className="object-contain drop-shadow-[0_16px_18px_rgba(20,30,70,0.16)]" priority />
            </div>
            <div className="absolute right-[2%] top-[-1%] h-[23%] w-[48%]">
              <Image src="/images/home/hero/ac.webp" alt="Air conditioner service" fill sizes="340px" className="object-contain drop-shadow-[0_12px_14px_rgba(20,30,70,0.14)]" priority />
            </div>
            <div className="absolute bottom-[25px] right-[28%] h-[53%] w-[30%]">
              <Image src="/images/home/hero/washing-machine.webp" alt="Washing machine repair" fill sizes="240px" className="object-contain drop-shadow-[0_16px_18px_rgba(20,30,70,0.16)]" />
            </div>
            <div className="absolute bottom-[14px] left-[34%] h-[25%] w-[25%]">
              <Image src="/images/home/hero/microwave.webp" alt="Microwave repair" fill sizes="190px" className="object-contain drop-shadow-[0_10px_14px_rgba(20,30,70,0.14)]" />
            </div>
            <div className="absolute bottom-[8px] right-[4%] h-[37%] w-[17%]">
              <Image src="/images/home/hero/water-purifier.webp" alt="RO water purifier service" fill sizes="150px" className="object-contain drop-shadow-[0_10px_14px_rgba(20,30,70,0.14)]" />
            </div>
            <div className="absolute bottom-[17px] right-[-5%] h-[43%] w-[15%]">
              <Image src="/images/home/hero/water-heater.webp" alt="Geyser repair" fill sizes="130px" className="object-contain drop-shadow-[0_10px_14px_rgba(20,30,70,0.14)]" />
            </div>
            <div className="absolute bottom-[4px] left-[26%] h-[54%] w-[16%]">
              <Image src="/images/home/hero/plant.webp" alt="" fill sizes="120px" className="object-contain" />
            </div>
          </div>

          {/* Mobile appliance strip (keeps the hero visual without crowding text) */}
          <div className="relative -mt-2 flex h-[150px] items-end justify-center gap-1 lg:hidden">
            <div className="relative h-[85%] w-[30%]"><Image src="/images/home/hero/refrigerator.webp" alt="Refrigerator" fill sizes="130px" className="object-contain" priority /></div>
            <div className="relative h-[75%] w-[32%]"><Image src="/images/home/hero/washing-machine.webp" alt="Washing machine" fill sizes="140px" className="object-contain" /></div>
            <div className="relative h-[30%] w-[28%] self-start"><Image src="/images/home/hero/ac.webp" alt="Air conditioner" fill sizes="120px" className="object-contain" /></div>
            <div className="relative h-[45%] w-[20%]"><Image src="/images/home/hero/water-purifier.webp" alt="Water purifier" fill sizes="90px" className="object-contain" /></div>
          </div>
        </div>

        {/* ── Trust stats ── */}
        <div className="relative grid grid-cols-2 gap-y-4 border-t border-[#E7E9F2] py-4 sm:grid-cols-4 sm:gap-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3 sm:border-r sm:border-[#E7E9F2] sm:last:border-r-0">
              <span className="text-[#F97316]">
                <StatIcon name={stat.icon} />
              </span>
              <span>
                <span className="block text-[19px] font-extrabold leading-none text-[#172554]">{stat.value}</span>
                <span className="mt-1 block text-[10px] font-medium text-[#6B7280]">{stat.label}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
