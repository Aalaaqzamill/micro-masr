import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import passengerImg from '../../assets/passenger_illustration.png';
import driverImg from '../../assets/driver_illustration.png';

export function BookingSection() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="booking-selection" className="py-16 bg-[#F9F7F1]/30 relative overflow-hidden" dir="rtl">
      
      {/* الدوائر المقطومة الاستاتيكية (مثل صفحات الأسئلة الشائعة والنشرة البريدية) */}
      <div className="absolute top-0 right-0 w-80 h-80 border-[45px] border-[#4A7554]/5 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 border-[30px] border-[#E09162]/5 rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

      <motion.div
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* الجانب الأيمن: النص والعمليات */}
          <motion.div variants={itemVariants} className="lg:col-span-6 text-right">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A7554]/10 text-[#4A7554] rounded-full mb-6 font-bold text-sm border border-[#4A7554]/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#E09162] animate-pulse"></span>
              ابدأ رحلتك اليوم
            </div>
            
            {/* حالة المستخدم: غير مسجل دخول */}
            {(!isAuthenticated || !user) && (
              <>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                  سواء مسافر أو صاحب عربية، <br/>
                  <span className="text-[#4A7554] relative inline-block">
                    ميكرو مصر
                    <span className="absolute bottom-1 right-0 left-0 h-2 bg-[#E09162]/20 -z-10 rounded"></span>
                  </span> بيسهلك طريقك
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                  انضم إلى أول منصة ذكية تجمع بين ركاب الميكروباص وأصحاب السيارات اليومية في مصر. احجز مقعدك بسهولة ووفر مشوارك، أو شارك طريقك وزود دخلك اليومي بمرونة كاملة وعمولة 0%.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/register')}
                    className="flex-1 py-4 bg-[#E09162] text-white rounded-2xl font-extrabold text-lg hover:bg-[#c97d50] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E09162]/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>احجز رحلة الآن</span>
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </>
            )}


            {isAuthenticated && user?.accountType === 'passenger' && (
              <>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                  أهلاً بك يا <span className="text-[#E09162]">{user?.fullname?.split(' ')[0] || 'مسافرنا'}</span>، <br/>
                  جاهز لرحلتك القادمة؟
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                  ابحث الآن عن الرحلات المتاحة لوجهتك اليومية، احجز مقعدك بضغطة زر وسافر براحة وأمان كامل مع أفضل السائقين الموثقين لدينا.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  
                  <button 
                    onClick={() => navigate('/passenger-dashboard')}
                     className="flex-1 py-4 bg-[#E09162] text-white rounded-2xl font-extrabold text-lg hover:bg-[#c97d50] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E09162]/20 transition-all flex items-center justify-center gap-2 group"
                  >
                   ابحث عن رحلة الآن
                  </button>
                </div>
              </>
            )}

            {/* حالة المستخدم: مسجل دخول كسائق */}
            {isAuthenticated && user?.accountType === 'driver' && (
              <>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                  أهلاً بك يا <span className="text-[#4A7554]">كابتن {user?.fullname?.split(' ')[0] || 'البطل'}</span>، <br/>
                  جاهز لنشر رحلتك؟
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                  سجل خط سيرك اليومي، حدد مواعيدك وسعر تذكرتك واستقبل طلبات الركاب في طريقك لتغطية مصاريف الوقود وزيادة دخلك.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/driver/create-trip')}
                    className="flex-1 py-4 bg-[#4A7554] text-white rounded-2xl font-extrabold text-lg hover:bg-[#3d6145] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4A7554]/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>اضف رحلة جديدة</span>
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('/driver-dashboard')}
                    className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    لوحة التحكم وإدارة الحجوزات
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* الجانب الأيسر: الصور الكبيرة المنسقة كدوائر بسيطة سريعة وبدون أي لاج */}
          <motion.div variants={itemVariants} className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* حالة المستخدم: غير مسجل دخول - صورتين متراكبتين مع شادو وبوردر وبدون أنيميشن متحرك */}
            {(!isAuthenticated || !user) && (
              <div className="relative w-full h-[460px] max-w-[500px] flex items-center justify-center">
                
                {/* صورة السائق (خلفية، إطار دائري بسيط مع شادو) */}
                <motion.div 
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  className="absolute right-0 top-0 w-80 h-80 bg-white p-2 rounded-full shadow-xl border border-gray-100 -rotate-6 transition-all duration-300 z-10"
                >
                  <img 
                    src={driverImg} 
                    alt="سائق ميكرو مصر" 
                    className="w-full h-full object-contain mix-blend-multiply rounded-full"
                  />
                  <div className="absolute bottom-4 right-12 bg-[#4A7554] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md">
                    سائق
                  </div>
                </motion.div>

                {/* صورة الراكب (أمامية، إطار دائري بسيط مع شادو) */}
                <motion.div 
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  className="absolute left-0 bottom-0 w-80 h-80 bg-white p-2 rounded-full shadow-xl border border-gray-100 rotate-6 transition-all duration-300 z-20"
                >
                  <img 
                    src={passengerImg} 
                    alt="مسافر ميكرو مصر" 
                    className="w-full h-full object-contain mix-blend-multiply rounded-full"
                  />
                  <div className="absolute top-4 left-12 bg-[#E09162] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md">
                    مسافر
                  </div>
                </motion.div>
              </div>
            )}

            {/* حالة المستخدم: مسجل دخول كراكب أو كسائق - صورة واحدة دائرية كبيرة نظيفة وسريعة */}
            {isAuthenticated && user && (
              <div className="w-[420px] h-[420px] bg-white p-4 rounded-full shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden z-10 hover:scale-103 transition-transform duration-300">
                <img 
                  src={user.accountType === 'driver' ? driverImg : passengerImg} 
                  alt={user.accountType === 'driver' ? 'سائق ميكرو مصر' : 'راكب ميكرو مصر'} 
                  className="w-full h-full object-contain mix-blend-multiply rounded-full"
                />
              </div>
            )}

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}