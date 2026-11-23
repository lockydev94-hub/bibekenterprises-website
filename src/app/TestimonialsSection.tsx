"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATIC_REVIEWS = [
  { id: "s1", customer_name: "Priya Sharma",  customer_city: "Bhubaneswar", rating: 5, review: "Excellent service! Technician arrived within 2 hours and fixed my AC perfectly. Very professional and transparent pricing." },
  { id: "s2", customer_name: "Rajesh Kumar",  customer_city: "Cuttack",     rating: 5, review: "My washing machine was repaired same day. Technician explained everything clearly. Will definitely use again!" },
  { id: "s3", customer_name: "Anita Das",     customer_city: "Puri",        rating: 5, review: "Outstanding experience from booking to payment. Real-time tracking feature is amazing. Highly recommended!" },
  { id: "s4", customer_name: "Suresh Patel",  customer_city: "Berhampur",   rating: 5, review: "Refrigerator repair done in under an hour. Fair pricing, genuine parts, and 30-day warranty gave me peace of mind." },
  { id: "s5", customer_name: "Meena Nair",    customer_city: "Rourkela",    rating: 5, review: "Booked at 9 AM, technician came by 11. Fixed my geyser quickly. The app tracking was super convenient!" },
  { id: "s6", customer_name: "Deepak Mishra", customer_city: "Sambalpur",   rating: 4, review: "Professional service, certified technician, no surprise charges. Got a proper quotation before work started." },
];

interface Review {
  id:            string;
  customer_name: string;
  customer_city: string | null;
  rating:        number;
  review?:       string | null;
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function StarRow({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i <= Math.round(count) ? color : "#d1d5db"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ r, brand }: { r: Review; brand: string }) {
  return (
    <div className="w-80 flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(26,63,164,0.06)" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${brand} 0%, #F26522 100%)` }}>
            {initials(r.customer_name)}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{r.customer_name}</div>
            <div className="text-xs text-gray-400">{r.customer_city || ""}</div>
          </div>
        </div>
        <StarRow count={r.rating} color={brand} />
      </div>
      {r.review && <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{r.review}</p>}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: brand }} />
        <span className="text-[11px] font-semibold" style={{ color: brand }}>Verified Customer</span>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ brand = "#1A3FA4", domainId }: { brand?: string; domainId?: string }) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const trackRef   = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused]  = useState(false);
  const [reviews,  setReviews]   = useState<Review[]>(STATIC_REVIEWS);
  const [avg,      setAvg]       = useState<number | null>(null);
  const [total,    setTotal]     = useState<number | null>(null);
  const [fromApi,  setFromApi]   = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (!apiUrl) return;
    const qs = domainId ? `?domain_id=${domainId}&limit=20` : "?limit=20";
    fetch(`${apiUrl}/reviews${qs}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const list = data?.data?.reviews ?? data?.reviews;
        if (list?.length) {
          setReviews(list.map((r: Review) => ({ ...r, customer_name: r.customer_name || "Customer", customer_city: r.customer_city || "" })));
          const stats = data?.data?.stats ?? data?.stats;
          if (stats) { setAvg(stats.average); setTotal(stats.total); }
          setFromApi(true);
        }
      })
      .catch(() => {});
  }, [domainId]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame: number;
    let pos = 0;
    const scroll = () => {
      if (!isPaused && track) {
        pos += 0.5;
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [isPaused, reviews]);

  const doubled = [...reviews, ...reviews];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full opacity-[0.03]"
          style={{ background: brand }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div ref={headerRef} className={`text-center transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: brand }}>Customer Reviews</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Real reviews from real customers across Odisha.</p>

          {fromApi && avg !== null && total !== null && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: `${brand}12`, color: brand }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={brand}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {Number(avg).toFixed(1)} / 5 &nbsp;·&nbsp; {total} verified reviews
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, white, transparent)" }} />
        <div ref={trackRef} className="flex gap-5 py-2 w-max">
          {doubled.map((r, i) => <ReviewCard key={`${r.id}-${i}`} r={r} brand={brand} />)}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/reviews"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: `linear-gradient(135deg, ${brand} 0%, #F26522 100%)` }}>
          View All Reviews
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
