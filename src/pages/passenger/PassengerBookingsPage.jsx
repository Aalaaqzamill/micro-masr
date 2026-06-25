import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle2, XCircle, MapPin, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PassengerBookingsPage() {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['passenger-bookings', { passengerId: user?.id }],
    queryFn: () => api.getBookingsByPassenger(user?.id),
    enabled: !!user?.id
  });

  const { data: trips } = useQuery({
    queryKey: ['trips'],
    queryFn: () => api.getTrips()
  });

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'accepted':
        return { text: 'تم القبول', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: <CheckCircle2 size={24} /> };
      case 'rejected':
        return { text: 'مرفوض', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: <XCircle size={24} /> };
      case 'pending':
      default:
        return { text: 'قيد الانتظار', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: <Clock size={24} /> };
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3] py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A7554] mb-2">حجوزاتي</h1>
          <p className="text-gray-600">هنا يمكنك متابعة حالة طلبات الحجز الخاصة بك.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[#4A7554] border-t-transparent rounded-full animate-spin"></div></div>
        ) : !bookings || bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">ليس لديك أي حجوزات بعد</h3>
            <p className="text-gray-500 mb-6">قم بالبحث عن رحلة واحجز مقعدك الآن.</p>
            <Link to="/passenger-dashboard" className="px-8 py-3 bg-[#4A7554] text-white rounded-xl font-bold hover:bg-[#3d6145] transition-colors inline-block">
              ابحث عن رحلات
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(booking => {
              const trip = trips?.find(t => t.id === booking.tripId);
              const statusDisplay = getStatusDisplay(booking.status);

              return (
                <div key={booking.id} className={`bg-white rounded-3xl p-6 shadow-sm border-2 ${statusDisplay.border} transition-shadow`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`${statusDisplay.bg} ${statusDisplay.color} p-3 rounded-full`}>
                        {statusDisplay.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${statusDisplay.color}`}>حالة الطلب: {statusDisplay.text}</h3>
                        <p className="text-gray-500 text-sm">تم الطلب: {new Date(booking.createdAt).toLocaleString('ar-EG')}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-xl text-center min-w-[120px]">
                      <span className="text-gray-500 text-sm block">المقاعد المطلوبة</span>
                      <strong className="text-xl text-[#4A7554]">{booking.seatsCount}</strong>
                    </div>
                  </div>

                  {trip ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl">
                      <p className="text-gray-700 flex items-center gap-2">
                        <MapPin size={18} className="text-[#4A7554]" />
                        من: <strong>{trip.governorate} ({trip.station})</strong>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <MapPin size={18} className="text-[#4A7554]" />
                        إلى: <strong>{trip.destination}</strong>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Clock size={18} className="text-[#4A7554]" />
                        موعد التحرك: <strong>{new Date(trip.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</strong>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <Bus size={18} className="text-[#4A7554]" />
                        السائق: <strong>{trip.driverName}</strong>
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 p-4 bg-gray-50 rounded-xl">جاري تحميل تفاصيل الرحلة...</p>
                  )}
                  
                  {booking.status === 'accepted' && (
                    <div className="mt-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-start gap-3">
                      <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        <strong>تهانينا!</strong> لقد قبل السائق طلبك. يرجى التواجد في المكان المتفق عليه (<strong>{booking.pickupLocation}</strong>) قبل موعد التحرك. 
                        سعر التذكرة للراكب الواحد: {trip?.pricePerPassenger} ج.م.
                      </p>
                    </div>
                  )}
                  
                  {booking.status === 'rejected' && (
                    <div className="mt-4 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-3">
                      <XCircle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        عذراً، لم يتمكن السائق من قبول طلبك في هذا الوقت. يمكنك البحث عن رحلة أخرى تناسبك.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
