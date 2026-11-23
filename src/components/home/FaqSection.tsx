"use client";

import { useState } from "react";
import Container from "./Container";

const FAQS = [
  {
    q: "How can I book a service?",
    a: "Choose your appliance service, pick a convenient date and slot, enter your address and confirm the booking online. You can also call our support number.",
  },
  {
    q: "Do you provide same-day service?",
    a: "Yes. Same-day service is available in most Bhubaneswar localities when you book before noon, subject to technician availability.",
  },
  {
    q: "Is there a warranty on repair service?",
    a: "Every repair carries a 30-day service warranty covering the work performed. Manufacturer warranties on new spare parts are passed on to you.",
  },
  {
    q: "Do you use genuine spare parts?",
    a: "We use genuine or OEM-equivalent parts. Any replacement is quoted transparently and only carried out after your approval.",
  },
  {
    q: "What are the payment options?",
    a: "Pay conveniently by UPI, card, net banking or cash after the service is completed. You receive a digital invoice for every booking.",
  },
  {
    q: "Which areas do you currently serve?",
    a: "We currently serve Bhubaneswar, Cuttack, Puri, Khordha, Jatni, Pipili and nearby localities.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-4" aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[210px_1fr] lg:gap-8">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F97316]">
              Need Help?
            </p>
            <h2
              id="faq-title"
              className="mt-1 text-[21px] font-extrabold leading-[1.14] text-[#172554] sm:text-[23px]"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className="mt-2 max-w-[170px] text-[10.5px] leading-relaxed text-[#6B7280]">
              Find quick answers to common queries about our services.
            </p>
          </div>

          <div className="grid gap-x-5 sm:grid-cols-2">
            {FAQS.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.q} className="border-b border-[#EEF0F5]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
                  >
                    <span className="text-[10.5px] font-semibold text-[#26315A]">{faq.q}</span>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[12px] leading-none transition-all ${
                        isOpen
                          ? "rotate-45 border-[#F97316] bg-[#FFF1E7] text-[#F97316]"
                          : "border-[#E2E8F0] text-[#94A3B8]"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden text-[9.5px] leading-[1.65] text-[#6B7280]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
