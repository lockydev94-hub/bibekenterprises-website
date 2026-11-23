import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function HomeFinalCta({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  return (
    <section className="bg-white pb-6">
      <Container>
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            background:
              "linear-gradient(100deg,#F97316 0%,#F26A12 16%,#D4500C 28%,#A63218 35%,#56265A 44%,#1D3D9B 58%,#14245F 76%,#0B1533 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_38%,rgba(59,91,219,0.2)_55%,transparent_74%)]"
          />

          <div className="relative flex min-h-[154px] flex-col items-center justify-center gap-4 px-5 py-5 text-center sm:min-h-[142px] md:min-h-[112px] md:flex-row md:items-center md:gap-5 md:px-6 md:py-3 md:text-left lg:min-h-[104px] lg:gap-6 lg:px-7">
            {/* Appliance collage */}
            <div className="relative hidden h-[92px] w-[215px] shrink-0 md:block lg:h-[96px] lg:w-[250px]">
              <div className="absolute bottom-0 left-[62px] z-10 h-[92px] w-[78px] lg:left-[70px] lg:h-[96px] lg:w-[82px]">
                <Image
                  src="/images/home/hero/refrigerator.webp"
                  alt=""
                  fill
                  sizes="84px"
                  className="object-contain object-bottom [filter:drop-shadow(0_6px_7px_rgba(7,12,30,0.35))]"
                />
              </div>
              <div className="absolute bottom-0 left-0 z-20 h-[90px] w-[80px] lg:left-[2px] lg:h-[94px] lg:w-[84px]">
                <Image
                  src="/images/home/hero/washing-machine.webp"
                  alt=""
                  fill
                  sizes="86px"
                  className="object-contain object-bottom [filter:drop-shadow(0_6px_7px_rgba(7,12,30,0.35))]"
                />
              </div>
              <div className="absolute bottom-1 left-[140px] z-30 h-[42px] w-[72px] lg:left-[162px] lg:h-[45px] lg:w-[78px]">
                <Image
                  src="/images/home/hero/microwave.webp"
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain object-bottom [filter:drop-shadow(0_6px_7px_rgba(7,12,30,0.35))]"
                />
              </div>
            </div>

            <div className="flex-1 md:pl-2 lg:pl-8">
              <p
                className="text-[21px] font-extrabold leading-[1.12] text-white sm:text-[23px] md:text-[21px] lg:text-[26px]"
                style={{ fontFamily: "Poppins, Inter, sans-serif" }}
              >
                Appliance not working?
                <br /> Get it fixed today!
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-white px-4 py-2.5 text-[12px] font-bold text-[#172554] shadow-[0_4px_14px_rgba(3,8,28,0.18)] transition-transform hover:-translate-y-0.5 lg:px-5 lg:py-3"
              >
                Book a Service Now
                <span aria-hidden>→</span>
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/55 bg-[#0B1533]/35 px-4 py-2.5 text-[12px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-[#0B1533]/60 lg:px-5 lg:py-3"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
