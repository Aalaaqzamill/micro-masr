import React, { useState, useEffect, useRef } from "react";
import { Search, Calendar, CreditCard, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "١",
    icon: Search,
    title: "دور على رحلتك",
    description: "اكتب مكانك والمكان اللي عايز تروحه عشان تشوف الخطوط المتاحة.",
  },
  {
    number: "٢",
    icon: Calendar,
    title: "اختار الميعاد",
    description: "حدد اليوم والساعة المناسبة ليك، واحجز مقعدك أو احجز العربية بالكامل.",
  },
  {
    number: "٣",
    icon: CreditCard,
    title: "ادفع بأمان",
    description: "ادفع تمن الرحلة بسهولة وأمان عن طريق فودافون كاش أو إنستا باي.",
  },
  {
    number: "٤",
    icon: CheckCircle,
    title: "استمتع برحلتك",
    description: "هتجيلك رسالة تأكيد فيها كل التفاصيل. استعد لرحلة مريحة وآمنة.",
  },
];

export function HowItWorksSection() {
  const brandGreen = "#4A7554";
  const customGrey = "#7a7c81ff";

  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % steps.length);
  const prev = () => setCurrent((prev) => (prev - 1 + steps.length) % steps.length);
  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3500); 
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-24 bg-white overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            ازاي تحجز رحلتك؟
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg font-medium"
            style={{ color: customGrey }}
          >
            خطوات بسيطة تفصلك عن رحلتك الجاية مع Micro Masr
          </p>
        </div>
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-[#F2EEE3] p-8 rounded-3xl flex flex-col items-center text-center justify-center hover:shadow-xl hover:bg-[#ebe6d8] transition-all duration-300 border border-transparent aspect-square relative"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#E09162] rounded-full flex items-center justify-center text-white font-bold text-lg z-20">
                  {step.number}
                </div>

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                  style={{ backgroundColor: brandGreen }}
                >
                  <Icon className="text-white" size={32} strokeWidth={1.5} />
                </div>
                <h3
                  className="mb-3 text-xl font-black"
                  style={{ color: brandGreen }}
                >
                  {step.title}
                </h3>
                <p className="leading-relaxed text-sm font-medium px-2" style={{ color: customGrey }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="lg:hidden relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) next();
                if (info.offset.x > 100) prev();
              }}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
              className="bg-[#F2EEE3] p-2 rounded-3xl flex flex-col items-center text-center justify-center hover:shadow-xl hover:bg-[#ebe6d8] transition-all duration-0 border border-transparent aspect-square relative"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#E09162] rounded-full flex items-center justify-center text-white font-bold text-lg z-20">
                {steps[current].number}
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                style={{ backgroundColor: brandGreen }}
              >
                {React.createElement(steps[current].icon, { className: "text-white", size: 32, strokeWidth: 1.5 })}
              </div>
              <h3
                className="mb-3 text-xl font-black"
                style={{ color: brandGreen }}
              >
                {steps[current].title}
              </h3>
              <p className="leading-relaxed text-sm font-medium px-2" style={{ color: customGrey }}>
                {steps[current].description}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-6 gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${current === index ? "w-6 bg-[#4A7554]" : "w-2 bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}