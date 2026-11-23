import Image from "next/image";
import Container from "./Container";

const STEPS = [
  {
    title: "Book a Service",
    description: "Choose your service and preferred time.",
    image: "/images/home/steps/book-service.webp",
  },
  {
    title: "Technician Assigned",
    description: "A verified technician will be assigned to you.",
    image: "/images/home/steps/technician-assigned.webp",
  },
  {
    title: "Doorstep Service",
    description: "Get professional repair at your home.",
    image: "/images/home/steps/doorstep-service.webp",
  },
  {
    title: "Pay & Rate",
    description: "Make a secure payment and share your feedback.",
    image: "/images/home/features/transparent-pricing.webp",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white py-5" aria-labelledby="process-title">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[210px_1fr] lg:items-start lg:gap-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F97316]">
              How It Works
            </p>
            <h2
              id="process-title"
              className="mt-1 text-[21px] font-extrabold leading-[1.16] text-[#172554] sm:text-[23px]"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Our Simple Service Process
            </h2>
            <p className="mt-1.5 max-w-[205px] text-[11px] leading-relaxed text-[#6B7280]">
              Book, relax and get your appliance repaired at your doorstep in 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-2">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative flex items-start gap-2.5">
                {index < STEPS.length - 1 && (
                  <span aria-hidden className="absolute -right-2 top-5 hidden text-[#CBD5E1] sm:block">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
                <div className="relative shrink-0">
                  <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border border-[#E3E8F2] bg-[#F7F9FD]">
                    <Image src={step.image} alt="" width={40} height={40} className="h-full w-full object-cover" />
                  </span>
                  <span className="absolute -left-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F97316] text-[9px] font-extrabold text-white ring-2 ring-white">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold leading-tight text-[#172554]">{step.title}</h3>
                  <p className="mt-0.5 text-[9.5px] leading-[1.45] text-[#6B7280]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
