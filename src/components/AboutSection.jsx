import React from 'react';
import { Target, Eye, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const brandLime = "#9BBF4E"; 

  const valuesData = [
    {
      icon: Target,
      title: "مهمتنا",
      description: "تطوير منظومة النقل في مصر وخليها متاحة، اقتصادية، وموثوقة لكل الناس.",
    },
    {
      icon: Eye,
      title: "رؤيتنا",
      description: "نكون المنصة الأكثر ثقة وانتشاراً لربط كل شبر في مصر ببعضه.",
    },
    {
      icon: Award,
      title: "قيمنا",
      description: "الأمان، الثقة، التوفير، ورضا العميل هما أساس كل حاجة بنعملها.",
    }
  ];

  return (
    <section id="about" className="py-20 md:py-24 bg-[#E5DBC8]" dir="rtl">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* سكشن المحتوى العلوي */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-20">
          
          <motion.div
            className="text-center lg:text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-[#3a5a41] mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              عن Micro Masr
            </h2>

            {/* نصوص السكشن بلون أسود باهت وبدون Bold */}
            <p className="text-gray-600 mb-6 text-lg sm:text-xl leading-relaxed font-normal">
              Micro Masr هي المنصة الأولى الرائدة لحجز الميكروباص في مصر. احنا بنوصل السواقين بالركاب في كل المحافظات، وهدفنا هو توفير وسيلة مواصلات آمنة، موفرة، ومريحة لكل الناس.
            </p>

            <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed font-normal">
              سواء كنت بتسافر كل يوم لشغلك، أو مسافر مع عيلتك وأصحابك، أو حتى سواق عايز تزود دخلك، Micro Masr بتوفرلك الحل الأسهل والأسرع.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              احنا بنجمع بين التكنولوجيا الحديثة وكرم الضيافة المصري عشان نقدم تجربة سفر مميزة لكل مستخدمينا.
            </p>
          </motion.div>

          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-3 sm:p-5 rounded-3xl shadow-2xl max-w-sm lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"
                alt="مسافرين سعداء"
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-2xl"
              />
            </div>

            <motion.div 
              className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:-left-8 bg-[#9BBF4E] text-white p-4 sm:p-7 rounded-2xl shadow-xl flex flex-col items-center"
              initial={{ rotate: -15, scale: 0.5 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="text-3xl sm:text-4xl mb-1 font-extrabold">10,000+</div>
              <div className="text-base sm:text-lg font-bold">مسافر سعيد</div>
            </motion.div>
          </motion.div>
        </div>

        {/* سكشن الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {valuesData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
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
                className="bg-white p-8 sm:p-10 rounded-[2.5rem] text-center cursor-pointer flex flex-col items-center group shadow-sm"
              >

                <motion.div 
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: brandLime }}
                >
                  <Icon className="text-white" size={30} />
                </motion.div>

                <h3 className="text-[#3a5a41] mb-3 text-xl sm:text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>

                {/* نصوص الكروت أيضاً لون أسود باهت وبدون Bold */}
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-normal">
                  {item.description}
                </p>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}