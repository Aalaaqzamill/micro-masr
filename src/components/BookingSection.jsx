import React from 'react';
import { Car, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BookingSection() {
  const navigate = useNavigate();

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden" dir="rtl">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          
          <motion.div 
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              borderColor: "#E09162", 
              transition: { duration: 0.3 } 
            }}
            onClick={() => navigate('/passenger-booking')}
            
            className="group relative bg-white border-2 border-[#E09162] rounded-[3rem] p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(224,145,98,0.15)] cursor-pointer transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-[#E09162] rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-[#E09162]/20"
              >
                <Users className="text-white" size={42} />
              </motion.div>
              
              <h3 className="text-[#4A7554] mb-4 text-2xl md:text-3xl font-black">راكب</h3>
              
              <p className="text-gray-500 mb-10 text-lg md:text-xl leading-relaxed">
                شوف الرحلات المتاحة واحجز مقعدك وسافر وأنت مرتاح في أي مكان في مصر.
              </p>
              
              <motion.button 
                whileTap={{ scale: 0.96 }}
                className="w-full py-5 bg-[#E09162] text-white rounded-[40px] hover:bg-[#d07f54] transition-all shadow-md font-bold text-xl flex items-center justify-center gap-2"
              >
                احجز رحلة
              </motion.button>
            </div>
          </motion.div>

          
          <motion.div 
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              borderColor: "#4A7554", 
              transition: { duration: 0.3 } 
            }}
            onClick={() => navigate('/driver-booking')}
            
            className="group relative bg-white border-2 border-[#4A7554] rounded-[3rem] p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(74,117,84,0.15)] cursor-pointer transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-[#4A7554] rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-[#4A7554]/20"
              >
                <Car className="text-white" size={42} />
              </motion.div>
              
              <h3 className="text-[#E09162] mb-4 text-2xl md:text-3xl font-black">سائق</h3>
              
              <p className="text-gray-600 mb-10 text-lg md:text-xl leading-relaxed max-w-[300px]">
                سجل خط سيرك وحدد سعر تزكرتك، ووصل ركاب في طريقك بسهولة.
              </p>
              
              <motion.button 
                whileTap={{ scale: 0.96 }}
                className="w-full py-5 bg-[#4A7554] text-white rounded-[40px] hover:bg-[#3d6145] transition-all shadow-md font-bold text-xl flex items-center justify-center gap-2"
              >
                ابدأ كسائق
              </motion.button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}