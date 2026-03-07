import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Lock, ArrowLeft, Mail, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoginPage() {
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);

  // إعداد التحقق من المدخلات باستخدام Yup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('البريد الإلكتروني غير صحيح')
        .required('يرجى إدخال البريد الإلكتروني'),
      password: Yup.string()
        .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
        .required('يرجى إدخال كلمة المرور'),
    }),
    onSubmit: (values) => {
      setFormLoading(true);
      // محاكاة عملية تسجيل دخول (هنا نربط الـ Firebase لاحقاً)
      setTimeout(() => {
        console.log("بيانات الدخول:", values);
        setFormLoading(false);
        navigate('/'); // العودة للرئيسية بعد الدخول
      }, 1500);
    },
  });

  return (
    <div className="min-h-screen bg-[#F2EEE3] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-md w-full">
        
        {/* زر العودة للرئيسية */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#4A7554] hover:text-[#5F8A61] mb-8 transition-colors font-bold"
        >
          <ArrowLeft size={20} className="ml-1" />
          رجوع للرئيسية
        </Link>

        {/* كارت تسجيل الدخول */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(74,117,84,0.12)] p-8 md:p-10 border border-[#E5DBC8]/30"
        >
          <div className="text-center mb-8">
            <h1 className="text-[#4A7554] text-3xl font-extrabold mb-3">أهلاً بك</h1>
            <p className="text-gray-500">سجل دخولك عشان تبدأ مشوارك مع ميكرو مصر</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* حقل الإيميل */}
            <div>
              <label className="block text-gray-700 mb-2 font-bold text-sm mr-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  {...formik.getFieldProps('email')}
                  placeholder="example@mail.com"
                  className={`w-full pr-12 pl-4 py-4 border-2 rounded-2xl focus:outline-none transition-all text-right ${
                    formik.touched.email && formik.errors.email 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-[#E5DBC8] focus:border-[#4A7554]'
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1 mr-2 font-medium">{formik.errors.email}</p>
              )}
            </div>

            {/* حقل كلمة المرور */}
            <div>
              <label className="block text-gray-700 mb-2 font-bold text-sm mr-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  {...formik.getFieldProps('password')}
                  placeholder="••••••••"
                  className={`w-full pr-12 pl-4 py-4 border-2 rounded-2xl focus:outline-none transition-all ${
                    formik.touched.password && formik.errors.password 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-[#E5DBC8] focus:border-[#4A7554]'
                  }`}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1 mr-2 font-medium">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E5DBC8] text-[#4A7554] focus:ring-[#4A7554]" />
                <span className="text-gray-500 text-sm group-hover:text-[#4A7554] transition-colors">تذكرني </span>
              </label>
              <a href="#" className="text-[#4A7554] hover:underline font-bold text-xs">نسيت كلمة السر؟</a>
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full px-8 py-4 bg-[#4A7554] text-white rounded-2xl hover:bg-[#3d6145] transition-all shadow-lg hover:shadow-[#4A7554]/20 font-bold text-lg flex justify-center items-center gap-3 disabled:opacity-70"
            >
              {formLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "دخول"}
            </button>
          </form>

          <div className="relative my-9">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5DBC8]"></div></div>
            <div className="relative flex justify-center"><span className="px-4 bg-white text-gray-400 text-xs font-bold uppercase tracking-widest">أو</span></div>
          </div>

          {/* زر جوجل */}
          <button
            type="button"
            className="w-full py-4 bg-white border-2 border-[#E5DBC8] text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-[#4A7554]/30 transition-all font-bold flex items-center justify-center gap-3 shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
            تسجيل بواسطة جوجل
          </button>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              معندكش حساب؟{' '}
              <Link to="/register" className="text-[#4A7554] font-bold underline decoration-2 underline-offset-4 hover:text-[#3d6145]">
                اعمل حساب جديد
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}