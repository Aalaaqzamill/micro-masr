import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Footer() {
  const mediumGreenBg = "#3A5A41";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <footer
      className="text-white py-12 relative overflow-hidden border-t border-white/5"
      style={{ backgroundColor: mediumGreenBg }}
      dir="rtl"
    >
      {/* Elegant Geometric Background Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 border-[60px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 border-[40px] border-white/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/3 w-24 h-24 border-[10px] border-white/5 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-10"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-right max-w-sm">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">ميكرو مصر</h3>
            <p className="text-white/80 leading-relaxed text-sm mb-6">
              منصتك الأولى الموثوقة لحجز الميكروباص في مصر. تجربة آمنة ومريحة.
            </p>

            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center transition-all duration-300 border border-white/5"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-4 text-white/90">تواصل معنا</h4>
            <ul className="space-y-3">
              {[
                { Icon: MapPin, text: "القاهرة، جمهورية مصر العربية" },
                { Icon: Phone, text: "+20 123 456 7890", dir: "ltr" },
                { Icon: Mail, text: "info@micromasr.com" }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-white/70 group cursor-default text-sm">
                  <item.Icon size={16} />
                  <span className="group-hover:text-white transition-colors duration-300" dir={item.dir}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-4 text-white/90">روابط سريعة</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              {['الرئيسية', 'الرحلات', 'من نحن', 'سياسة الخصوصية', 'الشروط والأحكام'].map((link) => (
                <Link key={link} to="#" className="hover:text-white transition-colors duration-300">
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-center items-center text-center"
        >
          <p className="text-white/40 text-sm font-medium tracking-wide">
            © 2026 Micro Masr. جميع الحقوق محفوظة.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}