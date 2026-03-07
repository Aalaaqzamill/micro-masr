import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Footer() {
  const mediumGreenBg = "#406348"; 

  // الأنيميشن الخاص بظهور العناصر 
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
      className="text-white py-16 overflow-hidden border-t border-white/5"
      style={{ backgroundColor: mediumGreenBg }}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* 1. نص الشركة */}
          <motion.div variants={itemVariants} className="lg:pr-4">
            <h3 className="text-2xl font-bold mb-6">Micro Masr</h3>
            <p className="text-white/85 leading-loose text-lg mb-8 max-w-sm">
              منصتك الأولى الموثوقة لحجز الميكروباص في مصر. بنوصلك لأي مكان بأمان وراحة.
            </p>
            
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 2. روابط سريعة */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              <li>
                <Link to="/" className="hover:text-white hover:mr-2 transition-all duration-300 inline-block">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:mr-2 transition-all duration-300 inline-block">
                  عن Micro Masr
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:mr-2 transition-all duration-300 inline-block">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                {/* تم تعديل هذا الرابط ليعمل مع React Router */}
                <Link to="/contact" className="hover:text-white hover:mr-2 transition-all duration-300 inline-block">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* 3. خدماتنا */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6">خدماتنا</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              {['سجل كسائق', 'احجز كراكب', 'رحلات جماعية', 'انتقالات الشركات'].map((service) => (
                <li key={service}>
                  <a href="#" className="hover:text-white hover:mr-2 transition-all duration-300 inline-block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. تواصل معنا (بيانات الاتصال) */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6">بيانات الاتصال</h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: "القاهرة، مصر" },
                { Icon: Phone, text: "+20 123 456 7890", dir: "ltr" },
                { Icon: Mail, text: "info@micromasr.com" }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-4 text-white/80 group cursor-default"
                >
                  <div className="text-white/40 group-hover:text-white transition-colors duration-300">
                    <item.Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-lg group-hover:text-white transition-colors duration-300" dir={item.dir}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* الخط السفلي وحقوق الملكية */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-white/40 text-base font-medium">
            © 2026 Micro Masr. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-8 text-base text-white/40">
            {['سياسة الخصوصية', 'الشروط والأحكام'].map((legal) => (
              <a key={legal} href="#" className="hover:text-white transition-colors duration-300">
                {legal}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
}