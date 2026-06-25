import { Smartphone, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Floating Rounded Banner */}
        <div className="bg-[#4A7554] rounded-[3rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
          
          {/* Elegant Geometric Background Patterns */}
          <div className="absolute top-0 right-0 w-80 h-80 border-[50px] border-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 border-[30px] border-white/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full -translate-y-1/2 pointer-events-none"></div>
          
          {/* Grid pattern overlay (subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">
            
            {/* Text Content */}
            <div className="text-white lg:max-w-xl text-center lg:text-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                احجز رحلتك القادمة من الموبايل
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                حمل تطبيق ميكرو مصر أو اشترك في نشرتنا البريدية لتصلك أحدث العروض والرحلات المخفضة.
              </p>
              
              <form className="relative flex items-center max-w-md mx-auto lg:mx-0" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني..." 
                  className="w-full py-3.5 pr-5 pl-14 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#E09162] focus:border-transparent transition-all backdrop-blur-sm shadow-inner"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute left-1.5 w-10 h-10 bg-[#E09162] text-white rounded-full flex items-center justify-center hover:bg-[#d07f54] transition-colors shadow-lg"
                >
                  <ArrowLeft size={18} />
                </button>
              </form>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-row flex-wrap justify-center lg:justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-[#4a7554] rounded-2xl flex items-center gap-3 font-bold shadow-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-right">
                  <span className="block text-[10px] text-[#4a7554]/70 leading-tight">Download on the</span>
                  <span className="block text-sm leading-tight">App Store</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-900 text-white rounded-2xl flex items-center gap-3 font-bold shadow-xl hover:bg-black transition-colors border border-gray-800"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-right">
                  <span className="block text-[10px] text-white/70 leading-tight">GET IT ON</span>
                  <span className="block text-sm leading-tight">Google Play</span>
                </div>
              </motion.button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}