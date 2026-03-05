import React from 'react';
import { Bus, ShieldCheck, Clock, CircleDollarSign, Users2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Bus,
    title: 'حجز سهل وسريع',
    description: 'احجز مكانك أو اطلب ميكروباص كامل في ثواني من خلال الموقع أو التطبيق.',
  },
  {
    icon: ShieldCheck,
    title: 'أمان وضمان',
    description: 'كل السواقين عندنا موثوقين وبياناتهم كاملة، وعربياتنا بتتفحص بشكل دوري لسلامتك.',
  },
  {
    icon: Clock,
    title: 'مواعيد مرنة',
    description: 'اختار الميعاد اللي يناسبك من جدول رحلاتنا المتوفر طول اليوم.',
  },
  {
    icon: CircleDollarSign,
    title: 'أسعار اقتصادية',
    description: 'أفضل سعر في مصر بدون أي مصاريف خفية، السعر اللي بتشوفه هو اللي بتدفعه.',
  },
  {
    icon: Users2,
    title: 'رحلات عائلية وجماعية',
    description: 'لو انتم مجموعة كبيرة، تقدروا تحجزوا ميكروباص مخصوص ليكم وتسافروا براحتكم.',
  },
  {
    icon: MapPin,
    title: 'تغطية شاملة',
    description: 'شبكة خطوطنا بتغطي معظم محافظات ومدن مصر، عشان نوصلك لأي مكان.',
  },
];

export function FeaturesSection() {
  return (
    // خلفية القسم "البيج الكريمي"
    <section className="py-24 bg-[#F2EEE3]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-4xl font-extrabold tracking-tight">ليه تختار Micro Masr؟</h2>
          <p className="text-[#4A7554] max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            بنقدملك تجربة سفر مريحة وآمنة بأحدث الميكروباصات وأفضل السواقين في مصر.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                // أنيميشن ظهور سريع (Snappy)
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                // أنيميشن هوفر سريع
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group bg-white p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-transparent hover:border-[#9BBF4E]/20 hover:shadow-2xl transition-all duration-200"
              >
                {/* التعديل هنا: الخلفية خضراء والأيقونة بيضاء زي الصورة */}
                <div className="w-16 h-16 bg-[#9BBF4E] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#9BBF4E]/20 group-hover:rotate-6 transition-transform duration-200">
                  <Icon className="text-white" size={32} strokeWidth={2} />
                </div>
                
                <h3 className="text-[#3a5a41] mb-4 text-2xl font-black tracking-tight">{feature.title}</h3>
                
                <p className="text-gray-500 text-lg leading-relaxed font-medium opacity-90">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}