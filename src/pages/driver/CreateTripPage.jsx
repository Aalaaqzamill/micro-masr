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
    destinationGovernorate: '',
    destinationStation: '',
    route: '',
    vehicleType: 'ميكروباص',
    vehicleNumber: '',
    totalSeats: 14,
    availableSeats: 14,
    departureTime: '',
    pricePerPassenger: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const availableStations = egyptData.governorates.find(g => g.name === formData.governorate)?.stations || [];
  const availableDestinationStations =
    egyptData.governorates.find(
      g => g.name === formData.destinationGovernorate
    )?.stations || [];

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
  const validate = () => {
    let newErrors = {};

    if (!formData.governorate) newErrors.governorate = "هذا الحقل مطلوب";
    if (!formData.station) newErrors.station = "هذا الحقل مطلوب";
    if (!formData.destinationGovernorate)
      newErrors.destinationGovernorate = "هذا الحقل مطلوب";

    if (!formData.destinationStation)
      newErrors.destinationStation = "هذا الحقل مطلوب";
    if (!formData.departureTime) newErrors.departureTime = "هذا الحقل مطلوب";
    if (!formData.vehicleNumber) newErrors.vehicleNumber = "هذا الحقل مطلوب";



    if (formData.pricePerPassenger === "" || Number(formData.pricePerPassenger) < 0) {
      newErrors.pricePerPassenger = "هذا الحقل مطلوب";
    }
    if (Number(formData.totalSeats) > 14) {
      newErrors.totalSeats = "عدد المقاعد لا يمكن أن يزيد عن 14";
    }
    if (Number(formData.availableSeats) > Number(formData.totalSeats)) {
      newErrors.availableSeats =
        "المقاعد المتبقية لا يمكن أن تكون أكبر من إجمالي المقاعد";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("من فضلك أكمل البيانات المطلوبة");
      return;
    }

    createTripMutation.mutate({
      ...formData,
      destinationGovernorate: formData.destinationGovernorate,
      destinationStation: formData.destinationStation,
      destination: `${formData.destinationStation} - ${formData.destinationGovernorate}`,
      totalSeats: Number(formData.totalSeats),
      availableSeats: Number(formData.availableSeats),
      driverId: user?.id,
      driverName: user?.fullname,

    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === "departureTime") {
      e.target.blur();
    }
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
                  {errors.governorate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.governorate}
                    </p>
                  )}
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
                  {errors.station && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.station}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    إلى محافظة
                  </label>

                  <select
                    name="destinationGovernorate"
                    value={formData.destinationGovernorate}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl"
                  >
                    <option value="">اختر المحافظة...</option>

                    {egyptData.governorates.map(g => (
                      <option key={g.id} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.destinationGovernorate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.destinationGovernorate}
                  </p>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    إلى محطة
                  </label>

                  <select
                    name="destinationStation"
                    value={formData.destinationStation}
                    onChange={handleChange}
                    disabled={!formData.destinationGovernorate}
                    className="w-full p-3.5 bg-white border border-gray-200 rounded-xl"
                  >
                    <option value="">اختر المحطة...</option>

                    {availableDestinationStations.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.destinationStation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.destinationStation}
                  </p>
                )}
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
                {/* نوع المركبة */}
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
                  </select>
                </div>

                {/* رقم اللوحة */}
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
                  {errors.vehicleNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.vehicleNumber}</p>
                  )}
                </div>

                {/* إجمالي المقاعد */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">إجمالي المقاعد</label>
                  {/* هذه الحاوية يجب أن تحتوي على الحقل والأيقونة فقط */}
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      name="totalSeats"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      min="1"
                      max="14"
                      className="w-full p-3.5 pl-10 bg-white border border-gray-200 rounded-xl focus:border-[#E09162] focus:ring-1 focus:ring-[#E09162] outline-none transition-all shadow-sm"
                    />
                  </div>
                  {/* نص الخطأ هنا، خارج الـ div parent للأيقونة */}
                  {errors.totalSeats && (
                    <p className="text-red-500 text-sm mt-1">{errors.totalSeats}</p>
                  )}
                </div>

                {/* المقاعد المتبقية */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المقاعد المتبقية</label>
                  {/* نفس الفكرة هنا، الحاوية للحقل والأيقونة فقط */}
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      name="availableSeats"
                      value={formData.availableSeats}
                      onChange={handleChange}
                      min="0"
                      max={formData.totalSeats}
                      className="w-full p-3.5 pl-10 bg-white border border-gray-200 rounded-xl focus:border-[#E09162] focus:ring-1 focus:ring-[#E09162] outline-none transition-all shadow-sm"
                    />
                  </div>
                  {/* نص الخطأ بالخارج */}
                  {errors.availableSeats && (
                    <p className="text-red-500 text-sm mt-1">{errors.availableSeats}</p>
                  )}
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
                  {errors.departureTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.departureTime}
                    </p>
                  )}
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
                      min="1"
                      className="w-full p-3.5 pl-10 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-sm text-right"
                      dir="ltr"
                    />
                    {errors.pricePerPassenger && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pricePerPassenger}
                      </p>
                    )}
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
                  اضف الرحلة الآن
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
