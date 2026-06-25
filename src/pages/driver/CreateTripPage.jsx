import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import egyptData from '../../data/egyptData.json';
import { toast } from 'sonner';
import { MapPin, Bus, Users, Clock, DollarSign, FileText } from 'lucide-react';

export function CreateTripPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    governorate: '',
    station: '',
    destination: '',
    route: '',
    vehicleType: 'ميكروباص',
    vehicleNumber: '',
    totalSeats: 14,
    departureTime: '',
    pricePerPassenger: '',
    notes: ''
  });

  const availableStations = egyptData.governorates.find(g => g.name === formData.governorate)?.stations || [];

  const createTripMutation = useMutation({
    mutationFn: (newTrip) => api.createTrip(newTrip),
    onSuccess: () => {
      queryClient.invalidateQueries(['trips']);
      toast.success('تم نشر الرحلة بنجاح!');
      navigate('/driver-dashboard');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء نشر الرحلة');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.governorate || !formData.station || !formData.destination || !formData.departureTime || !formData.pricePerPassenger) {
      toast.error('يرجى تعبئة الحقول الأساسية');
      return;
    }

    createTripMutation.mutate({
      ...formData,
      totalSeats: Number(formData.totalSeats),
      driverId: user?.id,
      driverName: user?.fullname,
      availableSeats: Number(formData.totalSeats)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset station if governorate changes
      ...(name === 'governorate' && { station: '' })
    }));
  };

  return (
    <div className="min-h-screen bg-[#F9F7F1] py-12 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 lg:p-12">
        
        <div className="mb-10 text-center lg:text-right">
          <h1 className="text-3xl lg:text-4xl font-black text-[#3a5a41] mb-2">نشر رحلة جديدة</h1>
          <p className="text-gray-500 font-medium">أدخل تفاصيل رحلتك ليتمكن الركاب من الحجز معك فوراً.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Location Details */}
            <div className="space-y-5 p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 shadow-sm">
              <h2 className="font-bold text-xl text-[#3a5a41] flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#4A7554]/10 flex items-center justify-center">
                  <MapPin className="text-[#4A7554]" size={20} />
                </div>
                مسار الرحلة
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المحافظة (نقطة الانطلاق)</label>
                  <select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#4A7554] focus:ring-1 focus:ring-[#4A7554] outline-none transition-all shadow-sm"
                  >
                    <option value="">اختر المحافظة...</option>
                    {egyptData.governorates.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الموقف / المحطة</label>
                  <select
                    name="station"
                    value={formData.station}
                    onChange={handleChange}
                    disabled={!formData.governorate}
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#4A7554] focus:ring-1 focus:ring-[#4A7554] outline-none disabled:bg-gray-100 disabled:text-gray-400 transition-all shadow-sm"
                  >
                    <option value="">اختر المحطة...</option>
                    {availableStations.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الوجهة (إلى أين؟)</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="مثال: الإسكندرية - العوايد"
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#4A7554] focus:ring-1 focus:ring-[#4A7554] outline-none transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">خط السير (اختياري)</label>
                  <input
                    type="text"
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    placeholder="مثال: زراعي - طنطا"
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#4A7554] focus:ring-1 focus:ring-[#4A7554] outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-5 p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 shadow-sm">
              <h2 className="font-bold text-xl text-[#3a5a41] flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#E09162]/10 flex items-center justify-center">
                  <Bus className="text-[#E09162]" size={20} />
                </div>
                تفاصيل المركبة
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نوع المركبة</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#E09162] focus:ring-1 focus:ring-[#E09162] outline-none transition-all shadow-sm"
                  >
                    <option value="ميكروباص">ميكروباص</option>
                    <option value="ميني باص">ميني باص</option>
                    <option value="سيارة ملاكي">سيارة ملاكي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم اللوحة</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="أ ب ج 123"
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#E09162] focus:ring-1 focus:ring-[#E09162] outline-none transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">إجمالي المقاعد</label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      name="totalSeats"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      min="1"
                      className="w-full p-3.5 pl-10 bg-white border border-gray-200 rounded-xl focus:border-[#E09162] focus:ring-1 focus:ring-[#E09162] outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timing & Pricing */}
            <div className="space-y-5 p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 shadow-sm">
              <h2 className="font-bold text-xl text-[#3a5a41] flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Clock className="text-blue-600" size={20} />
                </div>
                الموعد والسعر
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">موعد التحرك</label>
                  <input
                    type="datetime-local"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">السعر للراكب (ج.م)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      name="pricePerPassenger"
                      value={formData.pricePerPassenger}
                      onChange={handleChange}
                      placeholder="مثال: 50"
                      className="w-full p-3.5 pl-10 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm text-right"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ملاحظات (اختياري)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    placeholder="أي ملاحظات إضافية للركاب..."
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all shadow-sm"
                  ></textarea>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/driver-dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 text-gray-500 font-bold hover:text-gray-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={createTripMutation.isPending}
              className="w-full sm:w-auto px-12 py-4 bg-[#4A7554] text-white font-bold text-lg rounded-2xl hover:bg-[#3d6145] transition-all shadow-lg shadow-[#4A7554]/30 disabled:opacity-70 flex justify-center items-center gap-2 hover:-translate-y-1"
            >
              {createTripMutation.isPending ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="text-xl leading-none -mt-1">+</span>
                  نشر الرحلة الآن
                </>
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
