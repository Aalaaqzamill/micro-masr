import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Phone,
  Mail,
  Car,
  MapPin,
  Palette,
  Calendar,
  CreditCard,
  Camera,
  Save
} from "lucide-react";

export function DriverProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // حالة لتخزين الصورة الشخصية (تقبل العرض الافتراضي أو المرفوع)
  const [profileImage, setProfileImage] = useState(null);

  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    phone: user?.phone || "",
    email: user?.email || "",
    carType: user?.carType || "",
    carModel: user?.carModel || "",
    carColor: user?.carColor || "",
    carSeats: user?.carSeats || "",
    carNumber: user?.carNumber || "",
    driverLicense: user?.driverLicense || "",
    licenseExpiry: user?.licenseExpiry || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 👤 قسم الصورة الشخصية والهيدر (تم إزالة الخط الأخضر العلوي) */}
          <div className="bg-white rounded-3xl shadow-sm border border-[#E5DBC8]/60 p-8 text-center relative overflow-hidden">
            
            <div className="relative w-32 h-32 mx-auto mt-4 group">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-full h-full bg-[#4A7554]/10 text-[#4A7554] rounded-full flex items-center justify-center text-4xl font-extrabold border-4 border-white shadow-sm">
                  {form.fullname?.charAt(0) || "U"}
                </div>
              )}
              
              {/* زر رفع الصورة عند الهوفر */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 left-1 bg-[#4A7554] text-white p-2.5 rounded-full shadow-lg hover:bg-[#3d6145] transition-all transform hover:scale-105"
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <h1 className="mt-4 text-2xl font-black text-gray-800">
              {form.fullname || "حساب السائق"}
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">إدارة وتعديل بيانات ملفك الشخصي ككابتن</p>
          </div>

          {/* 🗂️ شبكة البيانات (Grid) */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* 📝 المعلومات الشخصية */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5DBC8]/40 shadow-sm space-y-5">
              <h2 className="font-bold text-[#4A7554] text-lg border-b border-gray-100 pb-2">
                المعلومات الشخصية
              </h2>

              {/* الاسم */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <User size={16} className="text-[#4A7554]" /> الاسم بالكامل
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] focus:ring-2 focus:ring-[#4A7554]/10 font-medium text-gray-700 transition-all bg-gray-50/50"
                  placeholder="أدخل الاسم بالكامل"
                />
              </div>

              {/* الهاتف */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <Phone size={16} className="text-[#4A7554]" /> رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] focus:ring-2 focus:ring-[#4A7554]/10 font-medium text-gray-700 transition-all bg-gray-50/50"
                  placeholder="أدخل رقم الهاتف"
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <Mail size={16} className="text-[#4A7554]" /> البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] focus:ring-2 focus:ring-[#4A7554]/10 font-medium text-gray-700 transition-all bg-gray-50/50"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
            </div>

            {/* 🚐 بيانات المركبة */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5DBC8]/40 shadow-sm space-y-5">
              <h2 className="font-bold text-[#4A7554] text-lg border-b border-gray-100 pb-2">
                بيانات المركبة
              </h2>

              {/* نوع المركبة */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <Car size={16} className="text-[#4A7554]" /> نوع المركبة
                </label>
                <select
                  name="carType"
                  value={form.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] font-medium text-gray-700 transition-all bg-gray-50/50"
                >
                  <option value="">اختر نوع المركبة</option>
                  <option value="microbus">ميكروباص</option>
                  <option value="car">سيارة ملاكي</option>
                  <option value="bus">أتوبيس</option>
                </select>
              </div>

              {/* موديل المركبة */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <Car size={16} className="text-[#4A7554]" /> موديل المركبة (السنة)
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={form.carModel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] font-medium text-gray-700 transition-all bg-gray-50/50"
                  placeholder="مثال: 2024"
                />
              </div>

              {/* لون المركبة */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <Palette size={16} className="text-[#4A7554]" /> لون المركبة
                </label>
                <select
                  name="carColor"
                  value={form.carColor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] font-medium text-gray-700 transition-all bg-gray-50/50"
                >
                  <option value="">اختر لون المركبة</option>
                  <option value="white">أبيض</option>
                  <option value="black">أسود</option>
                  <option value="gray">رمادي</option>
                  <option value="blue">أزرق</option>
                </select>
              </div>

              {/* رقم اللوحة */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                  <MapPin size={16} className="text-[#4A7554]" /> رقم اللوحة المعدنية
                </label>
                <input
                  type="text"
                  name="carNumber"
                  value={form.carNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] font-medium text-gray-700 transition-all bg-gray-50/50"
                  placeholder="أ ج ق 1234"
                />
              </div>
            </div>

            {/* 🪪 البيانات القانونية */}
            <div className="bg-white p-6 rounded-3xl border border-[#E5DBC8]/40 shadow-sm space-y-5 md:col-span-2">
              <h2 className="font-bold text-[#4A7554] text-lg border-b border-gray-100 pb-2">
                البيانات القانونية والترخيص
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* رقم الرخصة */}
                <div className="space-y-1.5">
                  <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                    <CreditCard size={16} className="text-[#4A7554]" /> رقم رخصة القيادة
                  </label>
                  <input
                    type="text"
                    name="driverLicense"
                    value={form.driverLicense}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] font-medium text-gray-700 transition-all bg-gray-50/50"
                    placeholder="أدخل رقم الرخصة"
                  />
                </div>

                {/* تاريخ انتهاء الرخصة */}
                <div className="space-y-1.5">
                  <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                    <Calendar size={16} className="text-[#4A7554]" /> تاريخ انتهاء الرخصة
                  </label>
                  <select
                    name="licenseExpiry"
                    value={form.licenseExpiry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] font-medium text-gray-700 transition-all bg-gray-50/50"
                  >
                    <option value="">اختر سنة الانتهاء</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* 💾 زر حفظ التغييرات */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-[#4A7554] text-white font-bold rounded-2xl hover:bg-[#3d6145] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg active:scale-[0.99]"
            >
              <Save size={20} />
              حفظ كل التغييرات
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}