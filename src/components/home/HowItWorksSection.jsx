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
  const customGrey = "#7a7c81";

  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % steps.length);
  const prev = () => setCurrent((prev) => (prev - 1 + steps.length) % steps.length);
  
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-5xl font-black tracking-tight">
            ازاي تحجز رحلتك؟
          </h2>
          <p className="max-w-2xl mx-auto text-xl font-medium text-gray-500">
            أربع خطوات بسيطة تفصلك عن رحلتك الجاية مع ميكرو مصر.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="absolute top-12 right-[12.5%] left-[12.5%] h-0.5 bg-gray-200 z-0">
            <div className="absolute inset-0 bg-gradient-to-l from-[#4A7554] to-transparent w-full opacity-30"></div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-white border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-[#4A7554]/30 transition-all duration-300 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#E09162] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {step.number}
                  </div>
                  <Icon className="text-[#4A7554] group-hover:text-[#E09162] transition-colors duration-300" size={36} strokeWidth={2} />
                </div>
                
                <h3 className="mb-4 text-2xl font-bold text-[#3a5a41]">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-base font-medium text-gray-500 px-4">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden relative max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) next();
                if (info.offset.x > 50) prev();
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center justify-center shadow-lg relative"
            >
              <div className="absolute top-6 right-6 w-10 h-10 bg-[#E09162] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {steps[current].number}
              </div>
              <div className="w-24 h-24 rounded-[2rem] bg-[#4A7554]/10 flex items-center justify-center mb-8">
                {React.createElement(steps[current].icon, { className: "text-[#4A7554]", size: 40, strokeWidth: 1.5 })}
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#3a5a41]">
                {steps[current].title}
              </h3>
              <p className="leading-relaxed text-base font-medium text-gray-500">
                {steps[current].description}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-8 gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${current === index ? "w-8 bg-[#4A7554]" : "w-2 bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}