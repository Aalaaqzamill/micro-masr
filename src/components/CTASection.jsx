import { Smartphone, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#4A7554] via-[#5F8A61] to-[#4A7554]" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#9BBF4E]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }} />

        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-[#E09162]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }} />

        <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-[#9BBF4E]/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#4A7554]/30 to-transparent"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-24 bg-[#FFFFFF]"
        style={{ clipPath: 'ellipse(75% 100% at 50% 0%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9BBF4E] to-[#E09162] rounded-3xl blur-xl opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <Smartphone className="text-[#4A7554]" size={48} strokeWidth={2.5} />
            </div>
          </div>

          <h2 className="text-white mb-6 text-4xl md:text-5xl font-bold leading-tight">
            جاهز تبدأ مشوارك؟
          </h2>

          <p className="text-white/95 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            حمل تطبيق <span className="text-[#9BBF4E] font-bold">Micro Masr</span> النهاردة واستمتع بأسهل وأسرع طريقة لحجز الميكروباص في مصر.
            <br className="hidden md:block" /> رحلتك الجاية على بعد ضغطة زر.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-64 py-4 bg-white text-[#4a7554] rounded-2xl flex items-center justify-center gap-3 font-bold text-xl shadow-lg transition-none hover:bg-[#F2EEE3]"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              App Store
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-64 py-4 bg-[#E09162] text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-xl shadow-lg transition-colors hover:bg-[#d07f54]"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </motion.button>

          </motion.div>

          <div className="mt-12 flex items-center justify-center gap-3 text-white/80">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-sm font-bold">
                  👤
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base font-medium">
              انضم لأكثر من <span className="text-[#9BBF4E] font-bold">10,000+</span> مستخدم سعيد
            </p>
          </div>

        </div>
      </div>

      {/* Curved bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FFFFFF]" 
        style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }} />

    </section>
  );
}