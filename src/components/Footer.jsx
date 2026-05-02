import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Footer() {
  const mediumGreenBg = "#406348";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer
      className="text-white py-20 overflow-hidden border-t border-white/5"
      style={{ backgroundColor: mediumGreenBg }}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 mb-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-start">
            <h3 className="text-3xl font-bold mb-6 tracking-tight">ميكرو مصر</h3>
            <p className="text-white/85 leading-loose text-xl mb-8 max-w-md">
              منصتك الأولى الموثوقة لحجز الميكروباص في مصر. 
              نحن نؤمن بأن الوصول لوجهتك يجب أن يكون تجربة آمنة، مريحة، وبأعلى معايير الجودة.
            </p>

            <div className="flex gap-5">
              {[Instagram, Twitter, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 border border-white/5"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-start md:items-start lg:mr-auto">
            <h4 className="text-2xl font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-white/20 after:rounded-full">
              تواصل معنا
            </h4>
            <ul className="space-y-8">
              {[
                { Icon: MapPin, text: "القاهرة، جمهورية مصر العربية" },
                { Icon: Phone, text: "+20 123 456 7890", dir: "ltr" },
                { Icon: Mail, text: "info@micromasr.com" }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: -8 }}
                  className="flex items-center gap-5 text-white/80 group cursor-default"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                    <item.Icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-xl group-hover:text-white transition-colors duration-300 font-medium" dir={item.dir}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <p className="text-white/40 text-lg font-medium tracking-wide">
            © 2026 Micro Masr. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-10 text-base text-white/40 font-medium">
            {['سياسة الخصوصية', 'الشروط والأحكام'].map((legal) => (
              <a key={legal} href="#" className="hover:text-white transition-colors duration-300 relative group">
                {legal}
                <span className="absolute -bottom-1 right-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
}