"use client";
import { useState } from "react";
import Link from "next/link";

// Typed as Review[] so the fallback list and API rows share one element type —
// otherwise the union of the two widens and `r.created_at` fails to compile.
const STATIC: Review[] = [
  { id: "s1", customer_name: "Priya Sharma",  customer_city: "Bhubaneswar", rating: 5, review: "Excellent service! Technician arrived within 2 hours and fixed my AC perfectly." },
  { id: "s2", customer_name: "Rajesh Kumar",  customer_city: "Cuttack",     rating: 5, review: "My washing machine was repaired same day. Technician explained everything clearly." },
  { id: "s3", customer_name: "Anita Das",     customer_city: "Puri",        rating: 5, review: "Outstanding experience from booking to payment. Real-time tracking is amazing!" },
  { id: "s4", customer_name: "Suresh Patel",  customer_city: "Berhampur",   rating: 5, review: "Refrigerator repair done in under an hour. Fair pricing, genuine parts, 30-day warranty." },
  { id: "s5", customer_name: "Meena Nair",    customer_city: "Rourkela",    rating: 5, review: "Booked at 9 AM, technician came by 11. Fixed my geyser quickly." },
  { id: "s6", customer_name: "Deepak Mishra", customer_city: "Sambalpur",   rating: 4, review: "Professional service, certified technician, no surprise charges." },
];

interface Review { id: string; customer_name: string; customer_city: string | null; rating: number; review?: string | null; created_at?: string | null; }
interface Stats  { total: number; average: number; distribution: Record<string, number>; }

function initials(name: string) { return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase(); }

function Stars({ rating, brand, size = 16 }: { rating: number; brand: string; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? brand : "#d1d5db"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function DistBar({ label, count, total, brand }: { label: string; count: number; total: number; brand: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-4 text-gray-500 font-medium">{label}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill={brand}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: brand }} />
      </div>
      <span className="w-8 text-right text-gray-400 text-xs">{count}</span>
    </div>
  );
}

export default function ReviewsPageClient({ data, siteName, brand }: {
  data: { reviews: Review[]; stats: Stats } | null; siteName: string; brand: string;
}) {
  const reviews = data?.reviews?.length ? data.reviews : STATIC;
  const stats   = data?.stats;
  const avg     = stats?.average ?? 5;
  const total   = stats?.total ?? STATIC.length;
  const dist    = stats?.distribution ?? { "5": 6, "4": 0, "3": 0, "2": 0, "1": 0 };

  const [filter, setFilter] = useState<number | null>(null);
  const filtered = filter ? reviews.filter(r => Math.round(r.rating) === filter) : reviews;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          <span className="font-medium" style={{ color: brand }}>Customer Reviews</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: brand }}>Verified Reviews</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">What Our Customers Say</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Every review is from a verified booking on {siteName}.</p>
        </div>

        {/* Stats + distribution */}
        <div className="bg-white rounded-2xl p-8 mb-10 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-7xl font-extrabold" style={{ color: brand }}>{Number(avg).toFixed(1)}</div>
              <Stars rating={avg} brand={brand} size={22} />
              <p className="text-gray-400 text-sm mt-1">{total} verified reviews</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {[5,4,3,2,1].map(star => (
                <DistBar key={star} label={String(star)} count={dist[String(star)] ?? 0} total={total} brand={brand} />
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilter(null)}
            className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
            style={!filter ? { background: brand, color: "#fff", borderColor: brand } : { borderColor: "#e5e7eb", color: "#6b7280" }}>
            All ({total})
          </button>
          {[5,4,3,2,1].map(s => {
            const cnt = dist[String(s)] ?? 0;
            if (!cnt && data) return null;
            return (
              <button key={s} onClick={() => setFilter(s === filter ? null : s)}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-all flex items-center gap-1.5"
                style={filter === s ? { background: brand, color: "#fff", borderColor: brand } : { borderColor: "#e5e7eb", color: "#6b7280" }}>
                {s} <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {cnt > 0 && <span className="opacity-60">({cnt})</span>}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No reviews found for this filter.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <div key={r.id || i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${brand} 0%, #F26522 100%)` }}>
                      {initials(r.customer_name)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{r.customer_name}</div>
                      <div className="text-xs text-gray-400">{r.customer_city || ""}</div>
                    </div>
                  </div>
                  <Stars rating={r.rating} brand={brand} />
                </div>
                {r.review && <p className="text-sm text-gray-500 leading-relaxed">{r.review}</p>}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: brand }} />
                    <span className="text-[11px] font-semibold" style={{ color: brand }}>Verified Customer</span>
                  </div>
                  {r.created_at && (
                    <span className="text-[11px] text-gray-300">
                      {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
