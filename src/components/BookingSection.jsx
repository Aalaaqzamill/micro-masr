import React from 'react';
import { Car, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BookingSection() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="booking-selection" className="py-24 bg-white overflow-hidden" dir="rtl">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* كارد الراكب */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, borderColor: "#E09162" }}
            onClick={() => navigate('/book-passenger')}
            className="group relative bg-white border-2 border-[#E09162]/20 rounded-[3rem] p-10 md:p-12 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }} 
                className="w-20 h-20 md:w-24 md:h-24 bg-[#E09162] rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-[#E09162]/20"
              >
                <Users className="text-white" size={42} />
              </motion.div>
              <h3 className="text-[#4A7554] mb-4 text-2xl md:text-3xl font-black italic">راكب</h3>
              <p className="text-gray-500 mb-10 text-lg md:text-xl leading-relaxed">
                شوف الرحلات المتاحة واحجز مقعدك وسافر وأنت مرتاح مع أفضل السائقين.
              </p>
              <button className="w-full py-5 bg-[#E09162] text-white rounded-[40px] font-bold text-xl hover:bg-[#c97d50] transition-colors shadow-md">
                احجز رحلة الآن
              </button>
            </div>
          </motion.div>

          {/* كارد السائق */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, borderColor: "#4A7554" }}
            onClick={() => navigate('/driver-booking')}
            className="group relative bg-white border-2 border-[#4A7554]/20 rounded-[3rem] p-10 md:p-12 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }} 
                className="w-20 h-20 md:w-24 md:h-24 bg-[#4A7554] rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-[#4A7554]/20"
              >
                <Car className="text-white" size={42} />
              </motion.div>
              <h3 className="text-[#E09162] mb-4 text-2xl md:text-3xl font-black italic">سائق</h3>
              <p className="text-gray-600 mb-10 text-lg md:text-xl leading-relaxed">
                سجل خط سيرك وحدد سعر تذكرتك، وزود دخلك عن طريق توصيل ركاب في طريقك.
              </p>
              <button className="w-full py-5 bg-[#4A7554] text-white rounded-[40px] font-bold text-xl hover:bg-[#3d6145] transition-colors shadow-md">
                ابدأ كسائق الآن
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}