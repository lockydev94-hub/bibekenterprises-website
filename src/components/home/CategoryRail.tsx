import Link from "next/link";
import type { DomainCategory, DomainService } from "@/types";
import { serviceHref } from "@/lib/slug";
import { categoryImage, categoryLabel, orderedCategories } from "@/lib/home";
import Container from "./Container";
import SmartImage from "./SmartImage";

interface Props {
  categories: DomainCategory[];
  services: DomainService[];
}

export default function CategoryRail({ categories, services }: Props) {
  const ordered = orderedCategories(categories);
  if (!ordered.length) return null;

  const hrefFor = (category: DomainCategory) => {
    const match = services.find(
      (s) => s.category_id === category.category_id || s.category_name === category.name
    );
    return match ? serviceHref(match) : "/services";
  };

  return (
    <section className="bg-white py-8 sm:py-9" aria-labelledby="home-categories">
      <Container>
        <div className="grid items-center gap-5 lg:grid-cols-[240px_1fr] lg:gap-8">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F97316]">
              Our Services
            </p>
            <h2
              id="home-categories"
              className="mt-1 text-[24px] font-extrabold leading-[1.16] text-[#172554] sm:text-[26px]"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Explore Our
              <br />
              Repair Services
            </h2>
            <p className="mt-2 max-w-[215px] text-[11px] leading-relaxed text-[#6B7280]">
              Professional repair and maintenance for all major home appliances.
            </p>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:overflow-visible">
            <div className="flex min-w-max gap-2.5 lg:grid lg:min-w-0 lg:grid-cols-7">
              {ordered.map((category, index) => {
                const active = index === 0;
                return (
                  <Link
                    key={category.domain_category_id}
                    href={hrefFor(category)}
                    className={`group flex h-[104px] w-[118px] flex-col items-center justify-center gap-1.5 rounded-lg border px-1.5 text-center transition-all duration-200 hover:-translate-y-0.5 lg:w-auto ${
                      active
                        ? "border-[#FDBA74] bg-[#FFF7ED] shadow-[0_3px_10px_rgba(249,115,22,0.08)]"
                        : "border-[#E7E9F2] bg-white hover:border-[#FDBA74] hover:bg-[#FFFBF7]"
                    }`}
                  >
                    <SmartImage
                      src={categoryImage(category.name)}
                      fallback={`/images/home/categories/${category.name.toLowerCase().includes("refriger") ? "refrigerator" : "ac"}.webp`}
                      alt=""
                      className="h-[44px] w-[50px] object-contain"
                    />
                    <span className={`text-[10.5px] font-semibold leading-[1.2] ${active ? "text-[#9A3412]" : "text-[#26315A]"}`}>
                      {categoryLabel(category.name)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
