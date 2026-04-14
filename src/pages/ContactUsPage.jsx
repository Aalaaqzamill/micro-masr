import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      content: ' 7890 456 123 20+',
      subContent: 'من السبت للخميس، 9 ص - 6 م',
      color: '#4A7554'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      content: 'info@micromasr.com',
      subContent: 'نرد على الرسائل خلال 24 ساعة',
      color: '#4A7554'
    },
    {
      icon: MapPin,
      title: 'عنواننا',
      content: 'القاهرة، مصر الجديدة',
      subContent: 'شارع الحجاز، برج Micro Masr',
      color: '#4A7554'
    }
  ];

  const socialMedia = [
    { icon: Facebook, name: 'Facebook', link: '#', color: '#1877F2' },
    { icon: Instagram, name: 'Instagram', link: '#', color: '#E4405F' },
    { icon: Twitter, name: 'Twitter', link: '#', color: '#1DA1F2' }
  ];

  return (
    <div className="min-h-screen bg-[#F2EEE3]" dir="rtl">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#4A7554] to-[#5F8A61]">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#9BBF4E]/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#E09162]/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block mb-8"
          >
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <MessageCircle className="text-[#4A7554]" size={48} strokeWidth={2.5} />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-6xl font-bold mb-6"
          >
            تواصل معنا
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/95 text-xl md:text-2xl max-w-2xl mx-auto"
          >
            عندك استفسار أو اقتراح؟ احنا هنا عشان نساعدك. تواصل معانا في أي وقت!
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 relative -mt-6 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0px 20px 30px rgba(0,0,0,0.1)",
                    transition: { type: "spring", stiffness: 200, damping: 20 },
                  }}
                  className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(74,117,84,0.1)] border border-gray-100 cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div 
                      initial={{ rotate: -10 }}
                      animate={{ rotate: 0 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg" 
                      style={{ backgroundColor: info.color }}
                    >
                      <IconComponent className="text-white" size={28} strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-gray-800 font-bold text-xl mb-3">{info.title}</h3>
                    <p className="text-[#4A7554] font-bold text-lg mb-2">{info.content}</p>
                    <p className="text-gray-500 text-sm">{info.subContent}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            
            {/* Right Side: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(74,117,84,0.1)] border border-gray-100 flex flex-col"
            >
              <h2 className="text-[#4A7554] text-3xl font-bold mb-3">ابعتلنا رسالة</h2>
              <p className="text-gray-600 mb-8 text-lg">املا البيانات دي وهنرد عليك في أسرع وقت</p>

              <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">الاسم</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="اكتب اسمك"
                    className="w-full px-5 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#4A7554] focus:outline-none transition-colors bg-gray-50 focus:bg-white text-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full px-5 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#4A7554] focus:outline-none transition-colors bg-gray-50 focus:bg-white text-lg text-right"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">رقم الموبايل</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    className="w-full px-5 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#4A7554] focus:outline-none transition-colors bg-gray-50 focus:bg-white text-lg text-right"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-bold">رسالتك</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full px-5 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#4A7554] focus:outline-none transition-colors bg-gray-50 focus:bg-white text-lg resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#4A7554] text-white rounded-xl hover:bg-[#5F8A61] transition-all shadow-lg flex items-center justify-center gap-3 font-bold text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> جاري الإرسال...</>
                  ) : (
                    <><Send size={22} /> إرسال الرسالة</>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Left Side: Map & Info */}
            <div className="flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(74,117,84,0.1)] border border-gray-100 flex-grow relative min-h-[300px]"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1697582718102-bd0e67cdf7ad?auto=format&fit=crop&q=80&w=1080')] bg-cover bg-center">
                   <div className="absolute inset-0 bg-[#4A7554]/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="text-center bg-white/95 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl">
                      <MapPin className="text-[#4A7554] mx-auto mb-3" size={40} strokeWidth={2.5} />
                      <p className="text-gray-800 font-bold text-xl">مصر الجديدة، القاهرة</p>
                      <p className="text-gray-600 mt-1">شارع الحجاز</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(74,117,84,0.1)] border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#E09162] rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="text-white" size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[#4A7554] text-2xl font-bold">ساعات العمل</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">السبت - الخميس</span>
                    <span className="text-[#4A7554] font-bold">9:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">الجمعة</span>
                    <span className="text-red-600 font-bold">مغلق</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(74,117,84,0.1)] border border-gray-100"
              >
                <h3 className="text-[#4A7554] text-2xl font-bold mb-6 text-center">تابعنا على</h3>
                <div className="flex justify-center gap-4">
                  {socialMedia.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a 
                        key={index} 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        href={social.link} 
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg" 
                        style={{ backgroundColor: social.color }}
                      >
                        <IconComponent className="text-white" size={24} strokeWidth={2.5} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[#4A7554] text-4xl font-bold mb-4">الأسئلة الشائعة</h2>
          <p className="text-gray-600 text-lg mb-12">إجابات سريعة على أكثر الأسئلة تكرارًا</p>
          <div className="space-y-4 text-right">
            {[
              { q: 'إزاي أحجز رحلة؟', a: 'بكل بساطة، اختار مكان السفر والوصول، حدد الموعد، وادفع بأمان عبر فودافون كاش أو إنستا باي.' },
              { q: 'هل ممكن ألغي الحجز؟', a: 'أيوه، تقدر تلغي الحجز قبل موعد الرحلة ب 24 ساعة وهترجعلك فلوسك كاملة.' },
              { q: 'طرق الدفع المتاحة؟', a: 'نوفر الدفع عبر فودافون كاش وإنستا باي لضمان سرعة وأمان المعاملات.' },
              { q: 'هل الميكروباصات مكيفة؟', a: 'أكيد! كل الميكروباصات مكيفة ونظيفة ومجهزة بكل وسائل الراحة والأمان.' }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#F2EEE3] rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#E5DBC8]"
              >
                <h4 className="text-[#4A7554] font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[#4A7554] py-8 text-center">
        <p className="text-white/80">© 2026 Micro Masr. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}