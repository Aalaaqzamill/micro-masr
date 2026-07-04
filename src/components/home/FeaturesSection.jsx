import React, { useState, useEffect } from "react";
import { Bus, ShieldCheck, Clock, CircleDollarSign, Users2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: Bus,
    title: "حجز سهل وسريع",
    description: "احجز مكانك أو اطلب ميكروباص كامل في ثواني من خلال الموقع أو التطبيق.",
  },
  {
    icon: ShieldCheck,
    title: "أمان وضمان",
    description: "كل السائقين عندنا موثوقين وبياناتهم كاملة، وعربياتنا بتتفحص بشكل دوري لسلامتك.",
  },
  {
    icon: Clock,
    title: "مواعيد مرنة",
    description: "اختار الميعاد اللي يناسبك من جدول رحلاتنا المتوفر طول اليوم.",
  },
  {
    icon: CircleDollarSign,
    title: "أسعار اقتصادية",
    description: "أفضل سعر في مصر بدون أي مصاريف خفية، السعر اللي بتشوفه هو اللي بتدفعه.",
  },
  {
    icon: Users2,
    title: "رحلات عائلية وجماعية",
    description: "لو انتم مجموعة كبيرة، تقدروا تحجزوا ميكروباص مخصوص ليكم وتسافروا براحتكم.",
  },
  {
    icon: MapPin,
    title: "تغطية شاملة",
    description: "شبكة خطوطنا بتغطي معظم محافظات ومدن مصر، عشان نوصلك لأي مكان.",
  },
];

export function FeaturesSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % features.length);
  const prev = () => setCurrent((prev) => (prev - 1 + features.length) % features.length);
  
  return (
    <section className="py-24 bg-[#F9F7F1] relative overflow-hidden" dir="rtl">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9BBF4E]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E09162]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-5xl font-black">
            ليه تختار ميكرو مصر؟
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            ببساطة لأننا وفرنا لك كل اللي بتحتاجه في مكان واحد لتجربة سفر مريحة وآمنة.
          </p>
        </div>
        
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
               
                className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[#4A7554]/10 rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:bg-[#E09162] group-hover:text-white transition-colors duration-300">
                  <Icon className="text-[#4A7554] group-hover:text-white transition-colors duration-300" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#3a5a41] mb-3 text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="md:hidden relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) next();
                if (info.offset.x > 100) prev();
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 backdrop-blur-lg border border-white p-10 rounded-[2.5rem] flex flex-col items-center text-center justify-center shadow-xl"
            >
              <div className="w-20 h-20 bg-[#4A7554]/10 rounded-2xl flex items-center justify-center mb-6">
                {React.createElement(features[current].icon, { className: "text-[#4A7554]", size: 40, strokeWidth: 1.5 })}
              </div>
              <h3 className="text-[#3a5a41] mb-4 text-2xl font-bold">{features[current].title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{features[current].description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-8 gap-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${current === index ? "w-8 bg-[#E09162]" : "w-2 bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}