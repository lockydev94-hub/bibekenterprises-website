import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const REVIEWS = [
  {
    name: "Sunam Behera",
    city: "Bhubaneswar",
    text: "Excellent AC service! The technician was professional, on time and fixed the issue quickly. Highly recommended!",
  },
  {
    name: "Priyanka Mohanty",
    city: "Cuttack",
    text: "Very reliable service. Transparent pricing and great support. I will definitely use Bibek Enterprises again.",
  },
];

const PROMISES = [
  "30-Day Service Warranty",
  "Genuine Service & Parts",
  "Professional & Verified Technicians",
  "Dedicated Customer Support",
];

export default function ReviewsGuarantee() {
  return (
    <section className="bg-white py-4" aria-labelledby="reviews-title">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[62%_38%]">
          <div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2
                  id="reviews-title"
                  className="text-[20px] font-extrabold leading-tight text-[#172554] sm:text-[22px]"
                  style={{ fontFamily: "Poppins, Inter, sans-serif" }}
                >
                  What Our Customers Say
                </h2>
                <p className="mt-0.5 text-[10px] text-[#6B7280]">Real feedback from our valued customers.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Link href="/reviews" aria-label="Previous reviews" className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E7E9F2] bg-white text-[#94A3B8] transition-colors hover:border-[#FDBA74] hover:text-[#F97316]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </Link>
                <Link href="/reviews" aria-label="More reviews" className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E7E9F2] bg-white text-[#94A3B8] transition-colors hover:border-[#FDBA74] hover:text-[#F97316]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </Link>
              </div>
            </div>

            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
              {REVIEWS.map((review) => (
                <article key={review.name} className="rounded-lg border border-[#EEF0F5] bg-white p-3 shadow-[0_2px_10px_rgba(23,37,84,0.035)]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF1E7] text-[10px] font-extrabold text-[#EA580C]">
                      {review.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[10.5px] font-bold text-[#172554]">{review.name}</p>
                      <p className="text-[8.5px] text-[#94A3B8]">{review.city}</p>
                    </div>
                    <span className="ml-auto shrink-0 text-[10px] tracking-[0.08em] text-amber-500">★★★★★</span>
                  </div>
                  <p className="mt-2 text-[9px] leading-[1.6] text-[#6B7280]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[#EEF0F5] bg-[#F8FAFC] p-4 sm:p-5">
            <div className="relative z-10 max-w-[72%]">
              <h3
                className="text-[21px] font-extrabold leading-tight text-[#172554]"
                style={{ fontFamily: "Poppins, Inter, sans-serif" }}
              >
                Our Service Guarantee
              </h3>
              <p className="mt-1 text-[9.5px] text-[#6B7280]">Your satisfaction is our priority.</p>
              <ul className="mt-3 space-y-2">
                {PROMISES.map((promise) => (
                  <li key={promise} className="flex items-start gap-1.5 text-[9px] font-medium leading-[1.3] text-[#26315A]">
                    <span className="mt-px flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#FFF1E7] text-[#F97316]">
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </span>
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pointer-events-none absolute -bottom-2 -right-3 h-[125px] w-[125px] sm:h-[145px] sm:w-[145px]">
              <Image
                src="/images/home/guarantee/warranty-badge.webp"
                alt="30-day service warranty"
                fill
                sizes="165px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
