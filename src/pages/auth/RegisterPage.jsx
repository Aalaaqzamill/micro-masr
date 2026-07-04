import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Smartphone, ArrowRight, Mail, CheckCircle2, Car } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'passenger', // 'passenger' | 'driver'
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (formData.fullname.length < 3) newErrors.fullname = 'الاسم يجب أن يكون 3 حروف على الأقل';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صحيح';

    if (!/^01[0125]\d{8}$/.test(formData.phone)) newErrors.phone = 'رقم الموبايل غير صحيح (مثال: 010xxxxxxxx)';

    if (formData.password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 رموز على الأقل';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    if (!formData.agreeTerms) newErrors.agreeTerms = 'يجب الموافقة على الشروط';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      // محاكاة طلب للشبكة
      setTimeout(() => {
        // حفظ في الـ Context
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userData = {
          id: crypto.randomUUID(),
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          accountType: formData.accountType
        };

        users.push(userData);

        localStorage.setItem("users", JSON.stringify(users));

        login(userData);

        toast.success('تم إنشاء الحساب بنجاح!');
        setIsLoading(false);
        navigate('/'); // التوجيه للرئيسية أو صفحة أخرى
      }, 1500);

    } else {
      toast.error('يرجى تصحيح الأخطاء في النموذج');
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({ ...prev, accountType: type }));
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3] flex items-center justify-center px-4 py-24 lg:py-32" dir="rtl">
      <div className="max-w-4xl w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#4A7554] hover:text-[#5F8A61] mb-8 transition-colors font-medium"
        >
          <ArrowRight size={20} className="ml-1" />
          رجوع للرئيسية
        </Link>
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(74,117,84,0.15)] p-8 md:p-10 lg:p-12 border border-[#E5DBC8]/50">
          <div className="text-center mb-10">
            <h1 className="text-[#4A7554] text-3xl md:text-4xl font-bold mb-4">حساب جديد</h1>
            <p className="text-gray-600">انضم لعائلة Micro Masr وابدأ مشوارك</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>

            {/* Account Type Selection */}
            <div className="col-span-1 md:col-span-2 mb-2">
              <label className="block text-gray-700 mb-3 font-bold text-base text-center">نوع الحساب</label>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => handleAccountTypeChange('passenger')}
                  className={`flex-1 max-w-[200px] py-4 px-6 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.accountType === 'passenger' ? 'border-[#4A7554] bg-[#4A7554]/5 text-[#4A7554]' : 'border-[#E5DBC8] text-gray-500 hover:border-[#4A7554]/50'}`}
                >
                  <User size={28} className={formData.accountType === 'passenger' ? 'text-[#4A7554]' : 'text-gray-400'} />
                  <span className="font-bold">راكب</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAccountTypeChange('driver')}
                  className={`flex-1 max-w-[200px] py-4 px-6 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.accountType === 'driver' ? 'border-[#4A7554] bg-[#4A7554]/5 text-[#4A7554]' : 'border-[#E5DBC8] text-gray-500 hover:border-[#4A7554]/50'}`}
                >
                  <Car size={28} className={formData.accountType === 'driver' ? 'text-[#4A7554]' : 'text-gray-400'} />
                  <span className="font-bold">سائق</span>
                </button>
              </div>
            </div>

            {/* Fields Grid */}
            <div>
              <label className="block text-gray-700 mb-1.5 font-bold text-sm">الاسم بالكامل</label>
              <div className="relative">
                <User className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${errors.fullname ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  id="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="اسمك الثلاثي"
                  className={`w-full pr-11 pl-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all ${errors.fullname ? 'border-red-300 bg-red-50' : 'border-[#E5DBC8] focus:border-[#4A7554]'}`}
                />
              </div>
              {errors.fullname && <p className="text-red-500 text-xs mt-1 mr-1">{errors.fullname}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1.5 font-bold text-sm">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className={`w-full pr-11 pl-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all text-right ${errors.email ? 'border-red-300 bg-red-50' : 'border-[#E5DBC8] focus:border-[#4A7554]'}`}
                  dir="ltr"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 mr-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1.5 font-bold text-sm">رقم الموبايل</label>
              <div className="relative">
                <Smartphone className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  className={`w-full pr-11 pl-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all text-right ${errors.phone ? 'border-red-300 bg-red-50' : 'border-[#E5DBC8] focus:border-[#4A7554]'}`}
                  dir="ltr"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 mr-1">{errors.phone}</p>}
            </div>

            {/* Spacer for grid balancing if needed, but we have 4 standard fields and 1 phone, so 5. Let's adjust order. 
                Left: Fullname, Phone, Password 
                Right: Email, ConfirmPassword
                Actually, email and phone and name is 3. Passwords are 2. 5 fields.
                Let's put Passwords in a row, or just let grid flow naturally.
            */}

            <div>
              <label className="block text-gray-700 mb-1.5 font-bold text-sm">كلمة المرور</label>
              <div className="relative">
                <Lock className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pr-11 pl-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-[#E5DBC8] focus:border-[#4A7554]'}`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 mr-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1.5 font-bold text-sm">تأكيد كلمة المرور</label>
              <div className="relative">
                <CheckCircle2 className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="أعد كتابة كلمة المرور"
                  className={`w-full pr-11 pl-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-[#E5DBC8] focus:border-[#4A7554]'}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 mr-1">{errors.confirmPassword}</p>}
            </div>

            <div className="col-span-1 md:col-span-2 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 rounded border-[#E5DBC8] text-[#4A7554] focus:ring-[#4A7554] transition-all cursor-pointer"
                />
                <span className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800">
                  أنا موافق على{' '}
                  <a href="#" className="text-[#4A7554] font-bold hover:underline">الشروط والأحكام</a>
                  {' '}و{' '}
                  <a href="#" className="text-[#4A7554] font-bold hover:underline">سياسة الخصوصية</a>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
            </div>

            <div className="col-span-1 md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-1/2 mx-auto  px-8 py-4 bg-[#4A7554] text-white rounded-xl hover:bg-[#5F8A61] active:scale-[0.98] transition-all shadow-md hover:shadow-lg font-bold text-lg disabled:opacity-70 flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "إنشاء الحساب"
                )}
              </button>
            </div>
          </form>

          <div className="relative my-8 max-w-lg mx-auto">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5DBC8]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-500 text-sm">أو</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              عندك حساب بالفعل؟{' '}
              <Link to="/login" className="text-[#4A7554] hover:text-[#5F8A61] transition-colors font-bold underline">
                سجل دخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}