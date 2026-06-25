import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, Search, Smartphone, CreditCard } from 'lucide-react';
import { useState } from 'react';

export function PassengerBookingPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('vodafone');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', {
      state: {
        from: formData.from || 'القاهرة',
        to: formData.to || 'الإسكندرية',
        date: formData.date || 'اليوم',
        passengers: parseInt(formData.passengers) || 1,
        price: 65,
        paymentMethod: paymentMethod
      }
    });
  };
  return (
    <div className="min-h-screen bg-[#F2EEE3]">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#4A7554] hover:text-[#5F8A61] transition-colors font-medium"
          >
            <ArrowRight size={20} className="ml-1" />
            الرئيسية
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#E09162] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg rotate-3 hover:rotate-6 transition-transform">
            <Users className="text-white" size={36} />
          </div>
          <h1 className="text-[#4A7554] text-3xl font-bold mb-3">حجز رحلة جديدة</h1>
          <p className="text-gray-600 text-lg">سافر لأي مكان في مصر بسهولة وأمان</p>
        </div>
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(224,145,98,0.1)] p-8 md:p-10 mb-10 border border-[#E5DBC8]/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor="from" className="block text-gray-700 mb-2 font-bold text-sm">
                  هتتحرك منين؟
                </label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A7554]" size={20} />
                  <input
                    type="text"
                    id="from"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    placeholder="المحافظة أو المنطقة"
                    className="w-full pr-12 pl-4 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#E09162] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="to" className="block text-gray-700 mb-2 font-bold text-sm">
                  رايح فين؟
                </label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E09162]" size={20} />
                  <input
                    type="text"
                    id="to"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder="وجهتك النهائية"
                    className="w-full pr-12 pl-4 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#E09162] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="travelDate" className="block text-gray-700 mb-2 font-bold text-sm">
                  ميعاد السفر
                </label>
                <div className="relative">
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    id="travelDate"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pr-12 pl-4 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#E09162] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="passengers" className="block text-gray-700 mb-2 font-bold text-sm">
                  عدد الأفراد
                </label>
                <div className="relative">
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    id="passengers"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    placeholder="كام فرد؟"
                    min="1"
                    max="14"
                    className="w-full pr-12 pl-4 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#E09162] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-3 font-bold text-sm">
                طريقة الدفع المناسبة ليك
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('vodafone')}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'vodafone'
                      ? 'border-[#E60000] bg-white shadow-md'
                      : 'border-[#E5DBC8] bg-gray-50 hover:bg-white hover:border-[#E60000]/50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === 'vodafone' ? 'bg-[#E60000] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                    <Smartphone size={24} />
                  </div>
                  <div className="text-right flex-1">
                    <div className="text-gray-800 font-bold">فودافون كاش</div>
                    <div className="text-xs text-gray-500 mt-1">الدفع الإلكتروني الأسرع</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'vodafone' ? 'border-[#E60000]' : 'border-gray-300'}`}>
                    {paymentMethod === 'vodafone' && <div className="w-2.5 h-2.5 rounded-full bg-[#E60000]" />}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('instapay')}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'instapay'
                      ? 'border-[#4A148C] bg-white shadow-md'
                      : 'border-[#E5DBC8] bg-gray-50 hover:bg-white hover:border-[#4A148C]/50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === 'instapay' ? 'bg-[#4A148C] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                    <CreditCard size={24} />
                  </div>
                  <div className="text-right flex-1">
                    <div className="text-gray-800 font-bold">إنستا باي</div>
                    <div className="text-xs text-gray-500 mt-1">تحويل بنكي فوري</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'instapay' ? 'border-[#4A148C]' : 'border-gray-300'}`}>
                    {paymentMethod === 'instapay' && <div className="w-2.5 h-2.5 rounded-full bg-[#4A148C]" />}
                  </div>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#E09162] text-white rounded-xl hover:bg-[#d07f54] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 font-bold text-lg"
            >
              <CreditCard size={22} />
              متابعة للدفع
            </button>
          </form>
        </div>
        <div className="space-y-6">
          <h3 className="text-[#4A7554] text-xl font-bold pr-2 border-r-4 border-[#E09162]">رحلات مقترحة ليك</h3>
          <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#4A7554]/10 text-[#4A7554] px-3 py-1 rounded-lg text-sm font-bold">سوبر جيت</span>
                  <span className="bg-[#E09162]/10 text-[#E09162] px-3 py-1 rounded-lg text-sm font-bold">مكيف</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-lg font-bold text-gray-800">القاهرة</div>
                  <div className="flex-1 h-0.5 bg-gray-200 relative mx-2">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-full">
                      <ArrowRight size={14} className="text-gray-500 rotate-180" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">الإسكندرية</div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>اليوم، 3:00 عصراً</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} />
                    <span className="text-[#4A7554] font-medium">متبقي 4 مقاعد فقط</span>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col items-center justify-between md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-right">
                  <div className="text-2xl text-[#4A7554] font-bold">65 ج.م</div>
                  <div className="text-xs text-gray-400">سعر الفرد</div>
                </div>
                <button className="px-8 py-3 bg-[#E09162] text-white rounded-xl hover:bg-[#d07f54] transition-colors whitespace-nowrap font-bold shadow-sm">
                  احجز الآن
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#4A7554]/10 text-[#4A7554] px-3 py-1 rounded-lg text-sm font-bold">ميكروباص حديث</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-lg font-bold text-gray-800">الجيزة</div>
                  <div className="flex-1 h-0.5 bg-gray-200 relative mx-2">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-full">
                      <ArrowRight size={14} className="text-gray-500 rotate-180" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">الفيوم</div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>غداً، 7:00 صباحاً</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} />
                    <span className="text-[#4A7554] font-medium">متبقي 9 مقاع��</span>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col items-center justify-between md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-right">
                  <div className="text-2xl text-[#4A7554] font-bold">40 ج.م</div>
                  <div className="text-xs text-gray-400">سعر الفرد</div>
                </div>
                <button className="px-8 py-3 bg-[#E09162] text-white rounded-xl hover:bg-[#d07f54] transition-colors whitespace-nowrap font-bold shadow-sm">
                  احجز الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
