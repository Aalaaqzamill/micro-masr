import React from 'react';
import { Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-[#4a7554] relative overflow-hidden" dir="rtl">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 md:mb-10 mx-auto border border-white/5"
        >
          <Smartphone className="text-white/80" size={30} strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white mb-4 md:mb-6 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight"
        >
          جاهز تبدأ مشوارك؟
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/90 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          حمل تطبيق Micro Masr النهاردة واستمتع بأسهل وأسرع طريقة لحجز الميكروباص في مصر.
          <br className="hidden md:block" />
          رحلتك الجاية على بعد ضغطة زر.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >

          {/* App Store */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-60 py-3 md:py-4 bg-white text-[#4a7554] rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-bold text-base md:text-lg shadow-lg hover:bg-[#F2EEE3]"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            App Store
          </motion.button>

          {/* Google Play */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-60 py-3 md:py-4 bg-[#E09162] text-white rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-bold text-base md:text-lg shadow-lg hover:bg-[#d07f54]"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Google Play
          </motion.button>

        </motion.div>
      </div>
    </section>
  );
}