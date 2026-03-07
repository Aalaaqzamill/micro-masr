import { Smartphone, Apple } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#4A7554] via-[#5F8A61] to-[#4A7554]" dir="rtl">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large curved wave top */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#9BBF4E]/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        
        {/* Bottom left glow */}
        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-[#E09162]/15 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-[#9BBF4E]/10 rounded-full blur-2xl" />
        
        {/* Diagonal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#4A7554]/30 to-transparent" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }} />
      </div>

      {/* Curved top border */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-[#FFFFFF]" 
           style={{ clipPath: 'ellipse(75% 100% at 50% 0%)' }} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon with gradient background */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9BBF4E] to-[#E09162] rounded-3xl blur-xl opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
              <Smartphone className="text-[#4A7554]" size={48} strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-white mb-6 text-4xl md:text-5xl font-bold leading-tight">
            جاهز تبدأ مشوارك؟
          </h2>
          
          {/* Subheading */}
          <p className="text-white/95 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            حمل تطبيق <span className="text-[#9BBF4E] font-bold">Micro Masr</span> النهاردة واستمتع بأسهل وأسرع طريقة لحجز الميكروباص في مصر
          </p>

          {/* App Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-xl mx-auto">
            {/* App Store Button */}
            <button className="group relative w-full sm:w-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-[#F2EEE3] rounded-2xl transform group-hover:scale-105 transition-transform shadow-xl" />
              <div className="relative px-8 py-5 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4A7554] to-[#5F8A61] rounded-xl flex items-center justify-center shadow-lg">
                  <Apple className="text-white" size={28} strokeWidth={2.5} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600 font-medium">حمل من</div>
                  <div className="text-xl text-[#4A7554] font-bold">App Store</div>
                </div>
              </div>
            </button>

            {/* Google Play Button */}
            <button className="group relative w-full sm:w-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E09162] to-[#d07f54] rounded-2xl transform group-hover:scale-105 transition-transform shadow-xl" />
              <div className="relative px-8 py-5 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/90 font-medium">حمل من</div>
                  <div className="text-xl text-white font-bold">Google Play</div>
                </div>
              </div>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 flex items-center justify-center gap-3 text-white/80">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-sm font-bold">
                👤
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-sm font-bold">
                👤
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-sm font-bold">
                👤
              </div>
            </div>
            <p className="text-sm md:text-base font-medium">
              انضم لأكثر من <span className="text-[#9BBF4E] font-bold">10,000+</span> مستخدم سعيد
            </p>
          </div>
        </div>
      </div>

      {/* Curved bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#F2EEE3]" 
           style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }} />
    </section>
  );
}
