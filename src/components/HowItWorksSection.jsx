import React from 'react';
import { Search, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    number: '١',
    title: 'دور على رحلتك',
    description: 'اكتب مكانك والمكان اللي عايز تروحه عشان تشوف الخطوط المتاحة.',
  },
  {
    icon: Calendar,
    number: '٢',
    title: 'اختار الميعاد',
    description: 'حدد اليوم والساعة المناسبة ليك، واحجز كرسيك أو احجز العربية بالكامل.',
  },
  {
    icon: CreditCard,
    number: '٣',
    title: 'ادفع بأمان',
    description: 'ادفع تمن الرحلة بسهولة وأمان عن طريق فودافون كاش أو إنستا باي.',
  },
  {
    icon: CheckCircle,
    number: '٤',
    title: 'استمتع برحلتك',
    description: 'هتجيلك رسالة تأكيد فيها كل التفاصيل. استعد لرحلة مريحة وآمنة.',
  },
];

export function HowItWorksSection() {
  
  const brandGreen = "#4A7554"; 
  
  const customGrey = "#7a7c81ff"; 

  return (
    <section className="py-24 bg-white overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[#3a5a41] mb-5 text-3xl md:text-4xl font-extrabold tracking-tight">ازاي تحجز رحلتك؟</h2>
          
          <p 
            className="max-w-2xl mx-auto text-lg font-medium"
            style={{ color: customGrey }}
          >
            خطوات بسيطة تفصلك عن رحلتك الجاية مع Micro Masr
          </p>
        </div>

        <div className="relative">
          
          <div className="hidden lg:block absolute top-[45%] left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group"
                >
                  
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#E09162] rounded-full flex items-center justify-center text-white shadow-md font-bold text-lg z-20 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>

                  
                  <div className="bg-[#F2EEE3] p-8 rounded-3xl flex flex-col items-center text-center aspect-square justify-center hover:shadow-xl hover:bg-[#ebe6d8] transition-all duration-300 border border-transparent">
                    
                    
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                      style={{ backgroundColor: brandGreen }}
                    >
                      <Icon className="text-white" size={32} strokeWidth={1.5} />
                    </div>

                    
                    <h3 
                      className="mb-3 text-xl font-black"
                      style={{ color: brandGreen }}
                    >
                      {step.title}
                    </h3>
                    
                    
                    <p 
                      className="leading-relaxed text-sm font-medium px-2"
                      style={{ color: customGrey }} 
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 