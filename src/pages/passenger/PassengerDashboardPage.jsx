import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import egyptData from '../../data/egyptData.json';
import { toast } from 'sonner';
import { MapPin, Search, Bus, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PassengerDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    governorate: '',
    station: '',
    destinationGovernorate: '',
    destinationStation: ''
  });
  const [searchParams, setSearchParams] = useState({ ...filters });
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    pickupLocation: '',
    phoneNumber: '',
    seatsCount: 1,
    notes: ''
  });

  const availableStations = egyptData.governorates.find(g => g.name === filters.governorate)?.stations || [];
  const availableDestinationStations =
    egyptData.governorates.find(
      g => g.name === filters.destinationGovernorate
    )?.stations || [];

  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips', 'search', searchParams],
    queryFn: () => api.getTrips({ ...searchParams, status: 'active' }),
  });

  const bookMutation = useMutation({
    mutationFn: (tripId) => api.createBooking({
      tripId,
      driverId: selectedTrip.driverId,
      passengerId: user?.id,
      passengerName: user?.fullname,
      destination: selectedTrip.destination,
      pickupLocation: bookingForm.pickupLocation,
      phoneNumber: bookingForm.phoneNumber,
      seatsCount: Number(bookingForm.seatsCount),
      notes: bookingForm.notes
    }),
    onSuccess: () => {
      toast.success('تم إرسال طلب الحجز بنجاح!');
      setSelectedTrip(null);
      navigate('/passenger/bookings');
    },
    onError: () => toast.error('حدث خطأ أثناء إرسال الطلب')
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ ...filters });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === "governorate" && { station: "" }),
      ...(name === "destinationGovernorate" && { destinationStation: "" }),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3] py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A7554] mb-2">رحلات ميكرو مصر</h1>
          <p className="text-gray-600">ابحث عن رحلتك واحجز مقعدك بسهولة.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-gray-700 mb-2">من محافظة</label>
              <select
                name="governorate"
                value={filters.governorate}
                onChange={handleFilterChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#4A7554] outline-none bg-gray-50 font-bold"
              >
                <option value="">جميع المحافظات</option>
                {egyptData.governorates.map(g => (
                  <option key={g.id} value={g.name}>{g.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-gray-700 mb-2">الموقف / المحطة</label>
              <select
                name="station"
                value={filters.station}
                onChange={handleFilterChange}
                disabled={!filters.governorate}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#4A7554] outline-none disabled:bg-gray-100 bg-gray-50 font-bold"
              >
                <option value="">جميع المحطات</option>
                {availableStations.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-gray-700 mb-2">
              الواجهه (رايح فين)
              </label>

              <select
                name="destinationGovernorate"
                value={filters.destinationGovernorate}
                onChange={handleFilterChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl"
              >
                <option value="">جميع المحافظات</option>

                {egyptData.governorates.map(g => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الموقف / المحطة
              </label>

              <select
                name="destinationStation"
                value={filters.destinationStation}
                onChange={handleFilterChange}
                disabled={!filters.destinationGovernorate}
                className="w-full p-4 border-2 border-gray-200 rounded-xl"
              >
                <option value="">جميع المحطات</option>

                {availableDestinationStations.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-[#4A7554] text-white font-bold rounded-xl hover:bg-[#3d6145] transition-colors shadow-md flex justify-center items-center gap-2"
            >
              <Search size={20} /> بحث
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[#4A7554] border-t-transparent rounded-full animate-spin"></div></div>
          ) : trips?.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد رحلات متاحة</h3>
              <p className="text-gray-500">جرب البحث في محطة أو محافظة أخرى.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {trips?.map(trip => (
                <div key={trip.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-6">

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="bg-[#4A7554]/10 text-[#4A7554] px-3 py-1 rounded-lg text-sm font-bold block w-fit mb-2">
                          {trip.vehicleType}
                        </span>
                        <h3 className="font-bold text-xl flex items-center gap-2"><MapPin size={20} className="text-[#4A7554]" /> متجه إلى: موقف {trip.destination}</h3>
                      </div>
                      <div className="text-2xl font-bold text-[#4A7554] bg-[#F2EEE3] p-2 rounded-xl text-center min-w-[80px]">
                        {trip.pricePerPassenger} <span className="text-sm block">ج.م</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-700 flex items-center gap-2">
                        <MapPin size={18} className="text-[#4A7554]" />
                        أنا في: <strong>موقف {trip.station}، {trip.governorate}</strong>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Clock size={18} className="text-[#4A7554]" />
                        موعد التحرك: <strong>{new Date(trip.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</strong>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Users size={18} className="text-[#4A7554]" />
                        إجمالي المقاعد: <strong>{trip.totalSeats}</strong> | المتبقي: <strong className="text-green-600">{trip.availableSeats} كرسي</strong>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Bus size={18} className="text-[#4A7554]" />
                        السائق: <strong>{trip.driverName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto md:min-w-[200px] flex items-stretch h-full">
                    <button
                      onClick={() => {
                        setBookingForm({ pickupLocation: '', phoneNumber: '', seatsCount: 1, notes: '' });
                        setSelectedTrip(trip);
                      }}
                      disabled={trip.availableSeats <= 0}
                      className="w-full py-4 px-8 bg-[#4A7554] text-white rounded-xl font-bold hover:bg-[#3d6145] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[80px]"
                    >
                      {trip.availableSeats <= 0 ? 'مكتمل العدد' : 'احجز مقعدك الآن'}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {selectedTrip && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#4A7554] mb-6 border-b pb-4">تأكيد تفاصيل الحجز</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Trip Info Summary */}
                <div className="space-y-4 bg-gray-50 p-5 rounded-2xl text-sm h-fit">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">تفاصيل الرحلة</h3>
                  <p className="flex justify-between text-gray-700"><span>الوجهة:</span> <strong className="text-[#4A7554]">{selectedTrip.destination}</strong></p>
                  <p className="flex justify-between text-gray-700"><span>موعد التحرك:</span> <strong>{new Date(selectedTrip.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</strong></p>
                  <p className="flex justify-between text-gray-700"><span>سعر المقعد:</span> <strong>{selectedTrip.pricePerPassenger} ج.م</strong></p>
                  <p className="flex justify-between text-gray-700"><span>المقاعد المتاحة حالياً:</span> <strong className="text-green-600">{selectedTrip.availableSeats}</strong></p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">موقعك الحالي (أين تنتظر السائق؟) *</label>
                    <input
                      type="text"
                      placeholder="مثال: أمام كافتيريا المحطة"
                      value={bookingForm.pickupLocation}
                      onChange={(e) => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4A7554] outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">رقم هاتفك *</label>
                      <input
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        value={bookingForm.phoneNumber}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
                          })
                        }
                        maxLength={11}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4A7554] outline-none text-left"
                        dir="ltr"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">المقاعد</label>
                      <input
                        type="number"
                        min="1"
                        max={selectedTrip.availableSeats}
                        value={bookingForm.seatsCount}
                        onChange={(e) => setBookingForm({ ...bookingForm, seatsCount: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4A7554] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ملاحظات إضافية</label>
                    <textarea
                      placeholder="أي تفاصيل أخرى؟"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4A7554] outline-none resize-none"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="flex-1 py-4 text-gray-600 font-bold bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    if (!bookingForm.pickupLocation || !bookingForm.phoneNumber) {
                      toast.error("يرجى إدخال موقعك ورقم هاتفك");
                      return;
                    }

                    if (!/^\d{11}$/.test(bookingForm.phoneNumber)) {
                      toast.error("ادخل رقم صحيح");
                      return;
                    }

                    bookMutation.mutate(selectedTrip.id);
                  }}

                  disabled={bookMutation.isPending}
                  className="flex-[2] py-4 bg-[#4A7554] text-white font-bold rounded-xl hover:bg-[#3d6145] transition-colors shadow-md flex justify-center items-center"
                >
                  {
                    bookMutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : "تأكيد الطلب وإرسال للسائق"
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}
