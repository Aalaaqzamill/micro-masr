import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, MapPin, Users, Check, X, Clock, Edit3, Save, MessageSquare, CheckCircle2 } from 'lucide-react';

export function DriverDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState(
    location.state?.bookingId ? "requests" : (location.state?.activeTab || "trips")
  );
  const [selectedTripForEdit, setSelectedTripForEdit] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: ['trips', { driverId: user?.id }],
    queryFn: () => api.getTrips({ driverId: user?.id }),
    enabled: !!user?.id
  });

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['bookings', { driverId: user?.id }],
    queryFn: () => api.getBookingsByDriver(user?.id),
    enabled: !!user?.id
  });

  // تأثير تتبع الإشعارات للانتقال إلى مربع الحجز المحدد تلقائياً (Scroll to Booking)
  useEffect(() => {
    if (location.state?.bookingId && !isLoadingBookings) {
      // ننتظر جزءاً من الثانية حتى تتأكد React من رندر عناصر الصفحة بالكامل
      setTimeout(() => {
        const element = document.getElementById(`booking-card-${location.state.bookingId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // إضافة تأثير وميض مؤقت ليميز السائق الكارت المطلوب بسهولة
          element.classList.add('ring-4', 'ring-[#4A7554]', 'scale-[1.01]');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-[#4A7554]', 'scale-[1.01]');
          }, 3000);
        }
      }, 300);
    }
  }, [location.state?.bookingId, isLoadingBookings]);

  const updateBookingMutation = useMutation({
    mutationFn: ({ bookingId, status }) => api.updateBookingStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['trips']);
      toast.success('تم تحديث حالة الطلب!');
    },
    onError: () => toast.error('حدث خطأ أثناء التحديث')
  });

  const updateTripMutation = useMutation({
    mutationFn: (updatedData) => api.updateTrip(updatedData.id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(['trips']);
      toast.success('تم تحديث بيانات الرحلة بنجاح!');
      setSelectedTripForEdit(null);
    },
    onError: () => toast.error('حدث خطأ أثناء تحديث الرحلة')
  });

  const handleEditClick = (trip) => {
    setSelectedTripForEdit(trip);
    setEditForm({
      id: trip.id,
      pricePerPassenger: trip.pricePerPassenger,
      availableSeats: trip.availableSeats,
      departureTime: new Date(trip.departureTime).toISOString().slice(0, 16),
      notes: trip.notes || ''
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTripMutation.mutate(editForm);
  };

  const pendingBookings = bookings?.filter(b => b.status === 'pending') || [];
  const paidBookings = bookings?.filter(b => b.status === 'paid') || [];

  return (
    <div className="min-h-screen bg-[#F2EEE3] py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#4A7554] mb-2">لوحة تحكم السائق</h1>
            <p className="text-gray-600">أهلاً بك يا {user?.fullname}، هنا يمكنك إدارة رحلاتك وطلبات الحجز.</p>
          </div>
          <button
            onClick={() => navigate('/driver/create-trip')}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-[#4A7554] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3d6145] transition-colors shadow-md"
          >
            <Plus size={20} /> إضافة رحلة جديدة
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('trips')}
              className={`flex-1 py-4 font-bold text-lg transition-colors ${activeTab === 'trips' ? 'text-[#4A7554] border-b-2 border-[#4A7554] bg-[#4A7554]/5' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              رحلاتي النشطة ({trips?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-4 font-bold text-lg transition-colors relative ${activeTab === 'requests' ? 'text-[#4A7554] border-b-2 border-[#4A7554] bg-[#4A7554]/5' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              طلبات الحجز ومتابعة الركاب
              {pendingBookings.length > 0 && (
                <span className="absolute top-1/2 -translate-y-1/2 mr-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {pendingBookings.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'trips' && (
              <div className="space-y-6">
                {isLoadingTrips ? (
                  <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-[#4A7554] border-t-transparent rounded-full animate-spin"></div></div>
                ) : trips?.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">لا توجد رحلات نشطة حالياً. ابدأ بنشر رحلة جديدة!</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips?.map(trip => (
                      <div key={trip.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-[#4A7554]/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-[#4A7554]/10 text-[#4A7554] px-3 py-1 rounded-lg text-sm font-bold">
                            {trip.status === 'active' ? 'متاح' : 'مكتمل'}
                          </div>
                          <div className="text-xl font-bold text-[#4A7554]">{trip.pricePerPassenger} ج.م</div>
                        </div>
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><MapPin size={18} className="text-gray-400" /> {trip.governorate} ({trip.station})</h3>
                        <p className="text-gray-600 mb-4 pr-6">إلى: <span className="font-bold">{trip.destination}</span></p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-xl">
                          <div className="flex items-center gap-1"><Users size={16} /> المقاعد: {trip.availableSeats}/{trip.totalSeats}</div>
                          <div className="flex items-center gap-1"><Clock size={16} /> {new Date(trip.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div className="flex items-center justify-between mt-4 border-t pt-4">
                          <button
                            onClick={() => handleEditClick(trip)}
                            className="text-[#4A7554] font-bold hover:text-[#3d6145] transition-colors flex items-center gap-2 bg-[#4A7554]/10 px-4 py-2 rounded-xl"
                          >
                            <Edit3 size={18} /> التفاصيل والتعديل
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-8">
                {isLoadingBookings ? (
                  <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-[#4A7554] border-t-transparent rounded-full animate-spin"></div></div>
                ) : pendingBookings.length === 0 && paidBookings.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">لا توجد طلبات حجز حالياً.</div>
                ) : (
                  <>
                    {/* قسم الطلبات المعلقة الجديدة */}
                    {pendingBookings.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2"> طلبات معلقة بانتظار موافقتك</h3>
                        <div className="space-y-4">
                          {pendingBookings.slice().reverse().map(booking => {
                            const trip = trips?.find(t => t.id === booking.tripId);
                            return (
                              <div
                                key={booking.id}
                                id={`booking-card-${booking.id}`}
                                className="flex flex-col md:flex-row justify-between border-2 border-yellow-100 p-5 rounded-2xl gap-6 bg-yellow-50/20 transition-all duration-500"
                              >
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg text-[#4A7554] mb-3 flex items-center gap-2">
                                    <Users size={20} /> طلب حجز من: {booking.passengerName}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 bg-white/80 p-4 rounded-xl shadow-sm">
                                    <p><strong>الوجهة المطلوبة:</strong> {trip?.destination} ({trip ? new Date(trip.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : ''})</p>
                                    <p><strong>مكان الانتظار:</strong> {booking.pickupLocation || 'لم يحدد'}</p>
                                    <p><strong>رقم الهاتف:</strong> <a href={`tel:${booking.phoneNumber}`} className="text-blue-600 hover:underline font-bold" dir="ltr">{booking.phoneNumber || 'غير متوفر'}</a></p>
                                    <p><strong>المقاعد المطلوبة:</strong> {booking.seatsCount || 1}</p>
                                    {booking.notes && <p className="md:col-span-2"><strong>ملاحظات الراكب:</strong> {booking.notes}</p>}
                                  </div>
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 justify-center min-w-[140px]">
                                  <button
                                    onClick={() => updateBookingMutation.mutate({ bookingId: booking.id, status: 'accepted' })}
                                    className="w-full px-6 py-3 bg-[#4A7554] text-white rounded-xl font-bold hover:bg-[#3d6145] transition-colors flex items-center justify-center gap-2 shadow-sm"
                                    disabled={updateBookingMutation.isPending}
                                  >
                                    <Check size={18} /> قبول الطلب
                                  </button>
                                  <button
                                    onClick={() => updateBookingMutation.mutate({ bookingId: booking.id, status: 'rejected' })}
                                    className="w-full px-4 py-3 border-2 border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                                    disabled={updateBookingMutation.isPending}
                                  >
                                    <X size={18} /> رفض
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}


                    {paidBookings.length > 0 && (
                      <div className="pt-4">
                        <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                          <CheckCircle2 size={24} className="text-green-600" /> ركاب تم تأكيد حجزهم ودفعوا التذكرة
                        </h3>
                        <div className="space-y-4">
                          {paidBookings.slice().reverse().map(booking => {
                            const trip = trips?.find(t => t.id === booking.tripId);
                            return (
                              <div
                                key={booking.id}
                                id={`booking-card-${booking.id}`}
                                className="flex flex-col md:flex-row justify-between border-2 border-green-200 p-5 rounded-2xl gap-6 bg-green-50/20 transition-all duration-500"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                      <Users size={20} className="text-[#4A7554]" /> الراكب: {booking.passengerName}
                                    </h4>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">تم تأكيد الدفع</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 bg-white p-4 rounded-xl shadow-sm">
                                    <p><strong>الوجهة:</strong> {trip?.destination}</p>
                                    <p><strong>مكان المقابلة:</strong> {booking.pickupLocation || 'لم يحدد'}</p>
                                    <p><strong>المقاعد المحجوزة:</strong> {booking.seatsCount || 1}</p>
                                    <p><strong>رقم الهاتف للضرورة:</strong> <span className="font-bold" dir="ltr">{booking.phoneNumber || 'غير متوفر'}</span></p>
                                  </div>
                                </div>
                                <div className="mt-4 w-12 h-12 bg-[#5F8A61] text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center shadow-md cursor-pointer aspect-square">
                                  <MessageSquare size={20} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Trip Modal */}
      {selectedTripForEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedTripForEdit(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-[#4A7554] mb-6 flex items-center gap-2">
              <Edit3 size={24} /> تفاصيل وتعديل الرحلة
            </h2>

            <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="font-bold text-gray-700 mb-1">مسار الرحلة الأساسي (لا يمكن تعديله):</p>
              <p className="text-sm text-gray-600">من {selectedTripForEdit.governorate} ({selectedTripForEdit.station}) إلى {selectedTripForEdit.destination}</p>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 font-bold text-sm">سعر التذكرة (جنيه)</label>
                <input
                  type="number"
                  value={editForm.pricePerPassenger}
                  onChange={(e) => setEditForm({ ...editForm, pricePerPassenger: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-[#E5DBC8] rounded-xl focus:outline-none focus:border-[#4A7554] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-bold text-sm">المقاعد المتاحة</label>
                <input
                  type="number"
                  value={editForm.availableSeats}
                  onChange={(e) => setEditForm({ ...editForm, availableSeats: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-[#E5DBC8] rounded-xl focus:outline-none focus:border-[#4A7554] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-bold text-sm">موعد التحرك</label>
                <input
                  type="datetime-local"
                  value={editForm.departureTime}
                  onChange={(e) => setEditForm({ ...editForm, departureTime: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#E5DBC8] rounded-xl focus:outline-none focus:border-[#4A7554] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-bold text-sm">ملاحظات إضافية للركاب</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#E5DBC8] rounded-xl focus:outline-none focus:border-[#4A7554] transition-colors min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedTripForEdit(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={updateTripMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#4A7554] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3d6145] transition-colors disabled:opacity-70"
                >
                  {updateTripMutation.isPending ? 'جاري الحفظ...' : <><Save size={18} /> حفظ التعديلات</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}