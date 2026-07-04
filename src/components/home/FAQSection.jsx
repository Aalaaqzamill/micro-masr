import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "إزاي أقدر أحجز رحلة كراكب؟",
    answer: "الموضوع بسيط جداً! بمجرد تسجيل الدخول كراكب، تقدر تتصفح الرحلات المتاحة وتختار الرحلة المناسبة لك من حيث الميعاد والسعر. اضغط على 'حجز' وهيتم إرسال طلبك للسائق للموافقة عليه فوراً."
  },
  {
    question: "هل السائقين موثوقين ومسجلين عندكم؟",
    answer: "أكيد، أمانك هو أولويتنا. جميع السائقين على المنصة بيتم مراجعة أوراقهم الرسمية (الرخصة والبطاقة) والتأكد من هويتهم قبل السماح لهم بنشر أي رحلة."
  },
  {
    question: "إزاي اقدر انشئ رحلة كسائق؟",
    answer: "لو إنت مسجل حساب كـ 'سائق'، ادخل على لوحة التحكم واضغط على 'إضافة رحلة جديدة'. حدد مسار الرحلة، الموعد، السعر، وعدد الكراسي الفاضية، وانشر الرحلة عشان الركاب يقدروا يحجزوا معاك."
  },
  {
    question: "هل في مصاريف إضافية على سعر التذكرة؟",
    answer: " لا يوجد أي مصاريف خفية! السعر اللي بتشوفه في تفاصيل الرحلة هو السعر النهائي اللي بتدفعه عن طريق فودافون كاش."
  },
  {
    question: "إيه اللي بيحصل لو السائق لغى الرحلة؟",
    answer: "في حالة إلغاء الرحلة من قِبل السائق لظرف طارئ، بيتم إرسال إشعار فورًا ليك على حسابك، وبتقدر تحجز رحلة بديلة في نفس الوقت بسهولة من خلال قائمة الرحلات."
  }
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#F9F7F1] relative overflow-hidden" dir="rtl">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9BBF4E]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Side Design (Sticky & Card-like) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#4A7554] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Elegant, Simple Geometric Background */}
              <div className="absolute top-0 right-0 w-64 h-64 border-[40px] border-white/5 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full mb-8 font-bold text-sm border border-white/20 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#E09162] animate-pulse"></span>
                  دعم ومساعدة
                </div>
                
                <h2 className="text-white mb-6 text-4xl lg:text-5xl font-black leading-tight">
                  عندك أسئلة؟ <br/> 
                  <span className="text-[#E09162]">عندنا الإجابات.</span>
                </h2>
                
                <p className="text-white/90 text-base leading-relaxed font-medium mb-10 max-w-sm mx-auto lg:mx-0">
                  جمعنا لك الإجابات على أكتر الأسئلة اللي بتوصلنا عشان نسهل عليك استخدام ميكرو مصر وتكون رحلتك دايماً مريحة.
                </p>

                {/* Decorative Card */}
                <div className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-white text-base">تحتاج مساعدة؟</h4>
                    <p className="text-sm text-white/80 mt-0.5">فريق الدعم دايماً معاك</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Accordion Side */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${isActive ? 'border-[#4A7554] bg-white shadow-md' : 'border-gray-100 bg-white hover:border-[#4A7554]/30 hover:shadow-md'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center p-6 text-right focus:outline-none"
                    >
                      <span className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-[#4A7554]' : 'text-gray-800'}`}>
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-all duration-300 ${isActive ? 'bg-[#4A7554] text-white rotate-180' : 'bg-[#F9F7F1] text-gray-500 group-hover:bg-gray-100'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 mt-2 font-medium">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
