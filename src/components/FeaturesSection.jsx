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
  const brandGreen = "#9BBF4E";
  const [current, setCurrent] = useState(0);

  // Auto slide for mobile carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % features.length);
  const prev = () => setCurrent((prev) => (prev - 1 + features.length) % features.length);
  return (
    <section className="py-24 bg-[#F2EEE3]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-4xl font-extrabold">
            ليه تختار Micro Masr؟
          </h2>
          <p className="text-[#4A7554] max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            بنقدملك تجربة سفر مريحة وآمنة بأحدث الميكروباصات وأفضل السائقين في مصر.
          </p>
        </div>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                  boxShadow: "0px 20px 30px rgba(0,0,0,0.2)",
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white p-10 rounded-[2.5rem] cursor-pointer"
              >
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                  className="w-16 h-16 bg-[#9BBF4E] rounded-2xl flex items-center justify-center mb-6"
                >
                  <Icon className="text-white" size={30} />
                </motion.div>
                <h3 className="text-[#3a5a41] mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
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
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.25 }}
              className="bg-white p-8 rounded-[2.5rem] flex flex-col items-center text-center justify-center shadow-xl cursor-grab"
            >
              <div className="w-16 h-16 bg-[#9BBF4E] rounded-2xl flex items-center justify-center mb-6">
                {React.createElement(features[current].icon, { className: "text-white", size: 30 })}
              </div>
              <h3 className="text-[#3a5a41] mb-3 text-xl font-bold">{features[current].title}</h3>
              <p className="text-gray-500">{features[current].description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-6 gap-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${current === index ? "w-6 bg-[#9BBF4E]" : "w-2 bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}