import React, { useState, useEffect } from "react";
import { Bus, ShieldCheck, Clock, CircleDollarSign, Users2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { icon: Bus, title: "حجز سهل وسريع", description: "احجز مكانك أو اطلب ميكروباص كامل في ثواني من خلال الموقع أو التطبيق." },
  { icon: ShieldCheck, title: "أمان وضمان", description: "كل السواقين عندنا موثوقين وبياناتهم كاملة، وعربياتنا بتتفحص بشكل دوري لسلامتك." },
  { icon: Clock, title: "مواعيد مرنة", description: "اختار الميعاد اللي يناسبك من جدول رحلاتنا المتوفر طول اليوم." },
  { icon: CircleDollarSign, title: "أسعار اقتصادية", description: "أفضل سعر في مصر بدون أي مصاريف خفية، السعر اللي بتشوفه هو اللي بتدفعه." },
  { icon: Users2, title: "رحلات عائلية وجماعية", description: "لو انتم مجموعة كبيرة، تقدروا تحجزوا ميكروباص مخصوص ليكم وتسافروا براحتكم." },
  { icon: MapPin, title: "تغطية شاملة", description: "شبكة خطوطنا بتغطي معظم محافظات ومدن مصر، عشان نوصلك لأي مكان." },
];

export function FeaturesSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % features.length);
  const prev = () => setCurrent((prev) => (prev - 1 + features.length) % features.length);

  const Icon = features[current].icon;

  return (
    <section className="py-24 bg-[#F2EEE3]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-4xl font-extrabold">
            ليه تختار Micro Masr؟
          </h2>
          <p className="text-[#4A7554] max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            بنقدملك تجربة سفر مريحة وآمنة بأحدث الميكروباصات وأفضل السواقين في مصر.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <div className="w-16 h-16 bg-[#9BBF4E] rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="text-white" size={30} />
                </div>
                <h3 className="text-[#3a5a41] mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Carousel with preview */}
        <div className="md:hidden relative overflow-hidden max-w-md mx-auto">
          <div className="flex gap-4 relative">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              // calculate position relative to current
              const offset = index - current;
              return (
                <motion.div
                  key={index}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -80) next();
                    if (info.offset.x > 80) prev();
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: offset === 0 ? 1 : 0.5, x: offset * 280 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-xl min-w-[250px] flex-shrink-0 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-[#9BBF4E] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-white" size={30} />
                  </div>
                  <h3 className="text-[#3a5a41] mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Dots indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-6 bg-[#9BBF4E]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}