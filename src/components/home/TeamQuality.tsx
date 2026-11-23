import Image from "next/image";
import Container from "./Container";

const QUALITY = [
  { label: "AC Servicing", image: "/images/home/work/ac-service.webp" },
  { label: "Washing Machine", image: "/images/home/work/washing-machine.webp" },
  { label: "Refrigerator", image: "/images/home/work/refrigerator.webp" },
  { label: "AC Installation", image: "/images/home/work/ac-installation.webp" },
];

export default function TeamQuality() {
  return (
    <section className="bg-white py-4" aria-labelledby="team-title">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[58%_42%]">
          <div className="relative grid overflow-hidden rounded-lg border border-[#EEF0F5] bg-[#F8FAFC] sm:grid-cols-[58%_42%]">
            <div className="relative z-10 p-5 sm:p-6">
              <h2
                id="team-title"
                className="text-[20px] font-extrabold leading-[1.15] text-[#172554] sm:text-[22px]"
                style={{ fontFamily: "Poppins, Inter, sans-serif" }}
              >
                Meet Our
                <br />
                Professional Technicians
              </h2>
              <p className="mt-2 max-w-[270px] text-[10.5px] leading-[1.7] text-[#6B7280]">
                Experienced, verified and trained technicians dedicated to provide
                quality and reliable service at your doorstep.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-md bg-white px-3 py-2 shadow-sm">
                  <span className="block text-[15px] font-extrabold leading-none text-[#172554]">500+</span>
                  <span className="mt-0.5 block text-[8px] font-medium text-[#6B7280]">Verified experts</span>
                </span>
                <span className="flex items-center gap-1 text-[9px] font-semibold text-[#26315A]">
                  <span className="text-[13px] text-amber-500">★</span>
                  4.8 average rating
                </span>
              </div>
            </div>
            <div className="relative h-[158px] sm:h-auto">
              <div aria-hidden className="absolute left-1/2 top-1/2 h-[145px] w-[145px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FDE7D3]" />
              <Image
                src="/images/home/team/technician.webp"
                alt="Bibek professional technician"
                fill
                sizes="(min-width: 640px) 260px, 100vw"
                className="object-contain object-bottom px-3 pt-3"
              />
            </div>
          </div>

          <div className="rounded-lg border border-[#EEF0F5] bg-white p-4 sm:p-5">
            <h3
              className="text-[20px] font-extrabold leading-tight text-[#172554]"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Our Work &amp; Repair Quality
            </h3>
            <p className="mt-1 text-[10px] text-[#6B7280]">
              A glimpse of our recent appliance repair and service work.
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {QUALITY.map((item) => (
                <div key={item.label} className="group">
                  <div className="relative h-[56px] overflow-hidden rounded-md border border-[#E7E9F2] bg-[#F8FAFC]">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1024px) 100px, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-1.5 block truncate text-center text-[8px] font-semibold text-[#374151]">
                    {item.label}
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
