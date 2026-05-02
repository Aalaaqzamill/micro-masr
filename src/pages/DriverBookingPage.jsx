import { Link } from 'react-router-dom';
import { ArrowRight, Car, MapPin, Clock, Users, CheckCircle, XCircle, Edit, Map, Phone, Minus, Plus, Calendar, DollarSign, Save, BarChart2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function DriverBookingPage() {
  const [activeTab, setActiveTab] = useState('requests');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [acceptingRequestId, setAcceptingRequestId] = useState(null);

  // Profile State
  const [profile, setProfile] = useState({
    vehicleType: 'تويوتا هايس - ميكروباص',
    licensePlate: 'ABC 1234',
    totalSeats: 12,
    vehicleColor: 'أبيض',
    licenseExpiration: '31/12/2026',

    startTime: '7:00 صباحًا',
    endTime: '7:00 مساءً',
    availableDays: 'من الأحد إلى الخميس',

    phone: '+20 123 456 7890',
    emergencyContact: '+20 100 000 0000'
  });

  const completedTrips = [
    { id: 1, route: 'القاهرة - الإسكندرية', date: '1 ديسمبر 2025', price: 250 },
    { id: 2, route: 'الجيزة - السويس', date: '28 نوفمبر 2025', price: 180 }
  ];

  // Initial State for Trips
  const [trips, setTrips] = useState([
    {
      id: 101,
      from: 'القاهرة (رمسيس)',
      to: 'الإسكندرية (موقف الجديد)',
      tripStatus: 'EnRoute',
      date: 'اليوم',
      time: '09:00 ص',
      maxSeats: 14,
      availableSeats: 9,
      earnings: 250,
    },
    {
      id: 102,
      from: 'الجيزة (المنيب)',
      to: 'الغردقة',
      tripStatus: 'Pending',
      date: 'غداً',
      time: '06:00 ص',
      maxSeats: 14,
      availableSeats: 11,
      earnings: 0,
    }
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      tripId: 101,
      name: 'سارة محمد',
      passengers: 2,
      price: 100,
      pickup: 'مدينة نصر، القاهرة',
      dropoff: 'وسط البلد، الإسكندرية',
      requestTime: 'منذ 5 دقائق'
    },
    {
      id: 2,
      tripId: 101,
      name: 'محمود علي',
      passengers: 1,
      price: 50,
      pickup: 'ميدان الجيزة',
      dropoff: '6 أكتوبر',
      requestTime: 'منذ 10 دقائق'
    }
  ]);

  // Helper to determine seat status label based on availableSeats
  const getSeatStatus = (trip) => {
    if (trip.availableSeats === 0) return { label: 'مكتمل العدد', color: 'bg-red-500 text-white' };
    if (trip.availableSeats <= 3) return { label: 'مقاعد محدودة', color: 'bg-orange-500 text-white' };
    return { label: 'متاح للحجز', color: 'bg-green-600 text-white' };
  };

  // Helper to get operational status label
  const getOperationalStatusLabel = (status) => {
    switch (status) {
      case 'Pending': return 'في الانتظار';
      case 'EnRoute': return 'الرحلة جارية';
      case 'Arrived': return 'وصلت للوجهة';
      case 'Completed': return 'تمت الرحلة';
      default: return '';
    }
  };

  const handleAccept = (request) => {
    const tripIndex = trips.findIndex(t => t.id === request.tripId);

    if (tripIndex === -1) {
      toast.error('الرحلة غير موجودة');
      return;
    }

    const trip = trips[tripIndex];
    if (trip.availableSeats < request.passengers) {
      toast.error('عذراً، لا توجد مقاعد كافية لهذا الطلب');
      return;
    }

    // Update trip
    const updatedTrips = [...trips];
    updatedTrips[tripIndex] = {
     ...trip,
      availableSeats: trip.availableSeats - request.passengers,
      earnings: trip.earnings + request.price,
      acceptedBookings: [
       ...(trip.acceptedBookings || []),
        {
          id: request.id,
          tripId: request.tripId,
          passengerName: request.name,
          passengers: request.passengers,
          pickup: request.pickup,
          dropoff: request.dropoff,
          price: request.price,
          acceptedAt: new Date().toLocaleString(),
          status: 'قادمة'
        }
      ]
    };
    setTrips(updatedTrips);

    // Remove request
    setRequests(prev => prev.filter(r => r.id!== request.id));

    toast.success('تم قبول الطلب بنجاح');
  };

  const handleReject = (id) => {
    setRequests(prev => prev.filter(r => r.id!== id));
    toast.info('تم رفض الطلب');
  };

  const handleUpdateStatus = (tripId, newStatus) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId) {
        return {...trip, tripStatus: newStatus };
      }
      return trip;
    }));
    toast.success(`تم تحديث حالة الرحلة: ${getOperationalStatusLabel(newStatus)}`);
  };

  const handleIncreaseSeats = (tripId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId && trip.availableSeats < trip.maxSeats) {
        return {...trip, availableSeats: trip.availableSeats + 1 };
      }
      return trip;
    }));
  };

  const handleDecreaseSeats = (tripId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id === tripId && trip.availableSeats > 0) {
        return {...trip, availableSeats: trip.availableSeats - 1 };
      }
      return trip;
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    toast.success('تم حفظ التعديلات بنجاح');
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3]">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#4A7554] hover:text-[#5F8A61] transition-colors font-medium"
            >
              <ArrowRight size={20} className="ml-1" />
              الرئيسية
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-left hidden sm:block">
                <div className="text-[#4A7554] font-bold text-lg">كابتن أحمد</div>
                <div className="text-xs text-gray-500">تويوتا هايس - ABC 1234</div>
              </div>
              <div className="w-10 h-10 bg-[#4A7554] rounded-full flex items-center justify-center shadow-md">
                <Car className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tab Navigation */}
        <div className="flex bg-white p-1 rounded-2xl shadow-sm mb-8 overflow-hidden">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 text-center transition-all font-bold text-sm sm:text-base ${
              activeTab === 'requests'
               ? 'bg-[#4A7554] text-white rounded-xl shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            الطلبات ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('trips')}
            className={`flex-1 py-3 text-center transition-all font-bold text-sm sm:text-base ${
              activeTab === 'trips'
               ? 'bg-[#4A7554] text-white rounded-xl shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            رحلاتي
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center transition-all font-bold text-sm sm:text-base ${
              activeTab === 'profile'
               ? 'bg-[#4A7554] text-white rounded-xl shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            الملف الشخصي
          </button>
        </div>

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[#4A7554] text-xl font-bold">الطلبات الجديدة</h2>
            </div>

            {requests.length === 0? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl shadow-sm border-[#E5DBC8]">
                <div className="w-16 h-16 bg-[#F2EEE3] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-[#4A7554]" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-700">لا توجد طلبات حالياً</h3>
                <p className="text-gray-500">سوف نبلغك عند وصول طلب جديد.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => {
                  const trip = trips.find(t => t.id === req.tripId);
                  return (
                    <div key={req.id} className="bg-white rounded-3xl shadow-sm p-6 border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          {/* Header: Name & Price */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-[#F2EEE3] rounded-full flex items-center justify-center text-[#4A7554] font-bold text-lg">
                                {req.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="text-[#4A7554] text-lg font-bold leading-tight">{req.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                  <Clock size={14} />
                                  <span>{req.requestTime}</span>
                                  {trip && <span className="text-[#E09162] font-medium">• {trip.from} ← {trip.to}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="text-left bg-[#F2EEE3]/50 px-4 py-2 rounded-xl">
                              <div className="text-xl text-[#4A7554] font-bold">{req.price} ج.م</div>
                              <div className="text-xs text-gray-500">الأجرة</div>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-2xl">
                            <div className="flex items-start gap-3">
                              <MapPin className="text-[#4A7554] flex-shrink-0 mt-1" size={18} />
                              <div>
                                <div className="text-gray-400 text-xs mb-1">من</div>
                                <div className="text-gray-800 font-medium text-sm">{req.pickup}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="text-[#E09162] flex-shrink-0 mt-1" size={18} />
                              <div>
                                <div className="text-gray-400 text-xs mb-1">إلى</div>
                                <div className="text-gray-800 font-medium text-sm">{req.dropoff}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 md:col-span-2 border-t border-gray-100 pt-3 mt-1">
                              <Users className="text-gray-400" size={18} />
                              <div className="text-gray-700 font-medium text-sm">عدد المقاعد المطلوبة: <span className="font-bold text-[#4A7554]">{req.passengers}</span></div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAccept(req)}
                              className="flex-1 px-6 py-3.5 bg-[#4A7554] text-white rounded-xl hover:bg-[#5F8A61] active:scale-95 transition-all flex items-center justify-center gap-2 font-bold text-lg shadow-sm"
                            >
                              <CheckCircle size={20} />
                              قبول
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="px-6 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"
                            >
                              <XCircle size={20} />
                              رفض
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TRIPS TAB */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <h2 className="text-[#4A7554] text-xl font-bold">رحلاتي</h2>

            {trips.map((trip) => {
              const seatStatus = getSeatStatus(trip);

              return (
                <div key={trip.id} className={`bg-white rounded-3xl shadow-sm p-6 border-2 transition-all ${trip.tripStatus === 'EnRoute'? 'border-[#9BBF4E] shadow-md' : 'border-transparent'}`}>
                  {/* Trip Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {/* Dynamic Seat Status Badge */}
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${seatStatus.color}`}>
                          {seatStatus.label}
                        </span>

                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                          {getOperationalStatusLabel(trip.tripStatus)}
                        </span>
                      </div>
                      <h3 className="text-[#4A7554] text-xl font-bold flex items-center gap-2 mt-2">
                        {trip.from} <ArrowRight className="text-gray-400" size={20} /> {trip.to}
                      </h3>
                    </div>
                    <div className="text-left bg-[#F2EEE3]/30 px-5 py-3 rounded-2xl border-[#F2EEE3]">
                      <div className="text-sm text-gray-500 mb-1">الأرباح</div>
                      <div className="text-2xl text-[#4A7554] font-bold">{trip.earnings} ج.م</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Clock size={16} />
                        <span className="text-xs">الموعد</span>
                      </div>
                      <div className="font-bold text-gray-800">{trip.time}</div>
                      <div className="text-xs text-gray-500">{trip.date}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Car size={16} />
                        <span className="text-xs">عدد المقاعد المتاحة</span>
                      </div>
                      <div className="font-bold text-gray-800 text-xl">{trip.availableSeats}</div>
                      <div className="text-xs text-[#E09162] font-medium">
                        {trip.availableSeats === 0? 'مكتمل' : 'متاح'}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Map size={16} />
                        <span className="text-xs">الحالة</span>
                      </div>
                      <div className="font-bold text-gray-800">{getOperationalStatusLabel(trip.tripStatus)}</div>
                    </div>
                  </div>

                  {/* Status & Seat Control */}
                  <div className="bg-[#F2EEE3] p-5 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Seat Control */}
                      <div>
                        <label className="block text-[#4A7554] mb-3 font-bold text-sm">تعديل عدد المقاعد المتاحة</label>
                        <div className="flex items-center gap-4 bg-white p-2 rounded-xl w-fit shadow-sm">
                          <button
                            onClick={() => handleDecreaseSeats(trip.id)}
                            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 text-[#4A7554] transition-colors"
                            disabled={trip.availableSeats <= 0}
                          >
                            <Minus size={20} />
                          </button>
                          <span className="text-2xl font-bold text-gray-800 w-8 text-center">{trip.availableSeats}</span>
                          <button
                            onClick={() => handleIncreaseSeats(trip.id)}
                            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 text-[#4A7554] transition-colors"
                            disabled={trip.availableSeats >= trip.maxSeats}
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Status Control */}
                      <div>
                        <label className="block text-[#4A7554] mb-3 font-bold text-sm">تحديث حالة الرحلة</label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleUpdateStatus(trip.id, 'Pending')}
                            className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${trip.tripStatus === 'Pending'? 'bg-white text-[#4A7554] shadow-sm ring-2 ring-[#4A7554]' : 'bg-white/50 text-gray-500 hover:bg-white'}`}
                          >
                            انتظار
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(trip.id, 'EnRoute')}
                            className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${trip.tripStatus === 'EnRoute'? 'bg-white text-[#4A7554] shadow-sm ring-2 ring-[#4A7554]' : 'bg-white/50 text-gray-500 hover:bg-white'}`}
                          >
                            جارية
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(trip.id, 'Arrived')}
                            className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${trip.tripStatus === 'Arrived'? 'bg-white text-[#4A7554] shadow-sm ring-2 ring-[#4A7554]' : 'bg-white/50 text-gray-500 hover:bg-white'}`}
                          >
                            وصول
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(trip.id, 'Completed')}
                            className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${trip.tripStatus === 'Completed'? 'bg-white text-[#4A7554] shadow-sm ring-2 ring-[#4A7554]' : 'bg-white/50 text-gray-500 hover:bg-white'}`}
                          >
                            تمت
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[#4A7554] text-xl font-bold">الملف الشخصي</h2>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-[#4A7554] font-medium hover:underline text-sm flex items-center gap-1"
              >
                {isEditingProfile? (
                  <>
                    <XCircle size={16} />
                    إلغاء
                  </>
                ) : (
                  <>
                    <Edit size={16} />
                    تعديل البيانات
                  </>
                )}
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-8">
              {/* 1. Vehicle Details */}
              <section className="bg-white rounded-3xl shadow-sm p-8 border-gray-100">
                <h3 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
                  <Car className="text-[#E09162]" size={24} />
                  تفاصيل المركبة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Vehicle Type */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">نوع المركبة</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.vehicleType}
                      onChange={(e) => setProfile({...profile, vehicleType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* License Plate */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">لوحة الترخيص</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.licensePlate}
                      onChange={(e) => setProfile({...profile, licensePlate: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* Total Seats */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">إجمالي المقاعد</label>
                    <input
                      type="number"
                      disabled={!isEditingProfile}
                      value={profile.totalSeats}
                      onChange={(e) => setProfile({...profile, totalSeats: parseInt(e.target.value) })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* Vehicle Color */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">لون المركبة</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.vehicleColor}
                      onChange={(e) => setProfile({...profile, vehicleColor: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* License Expiration */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">تاريخ انتهاء الترخيص</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.licenseExpiration}
                      onChange={(e) => setProfile({...profile, licenseExpiration: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
              </section>

              {/* 2. Working Hours */}
              <section className="bg-white rounded-3xl shadow-sm p-8 border-gray-100">
                <h3 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
                  <Clock className="text-[#E09162]" size={24} />
                  ساعات العمل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Start Time */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">وقت البدء المفضل</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.startTime}
                      onChange={(e) => setProfile({...profile, startTime: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">وقت الانتهاء المفضل</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.endTime}
                      onChange={(e) => setProfile({...profile, endTime: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* Available Days */}
                  <div className="lg:col-span-3">
                    <label className="block text-gray-500 text-sm mb-2 font-medium">الأيام المتاحة</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.availableDays}
                      onChange={(e) => setProfile({...profile, availableDays: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
              </section>

              {/* 3. Statistics */}
              <section className="bg-white rounded-3xl shadow-sm p-8 border-gray-100">
                <h3 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
                  <BarChart2 className="text-[#E09162]" size={24} />
                  سجل الرحلات والإحصائيات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl border-gray-100 text-center">
                    <div className="text-gray-500 text-sm mb-1 font-medium">إجمالي الرحلات</div>
                    <div className="text-[#4A7554] font-bold text-2xl">127</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border-gray-100 text-center">
                    <div className="text-gray-500 text-sm mb-1 font-medium">متوسط التقييم</div>
                    <div className="text-[#E09162] font-bold text-2xl flex items-center justify-center gap-1">
                      4.8 <span className="text-sm">⭐</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border-gray-100 text-center">
                    <div className="text-gray-500 text-sm mb-1 font-medium">إجمالي الأرباح</div>
                    <div className="text-[#4A7554] font-bold text-2xl">15,400 ج.م</div>
                  </div>
                </div>
              </section>

              {/* 4. Completed Trips */}
              <section className="bg-white rounded-3xl shadow-sm p-8 border-gray-100">
                <h3 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
                  <CheckCircle className="text-[#E09162]" size={24} />
                  الرحلات المكتملة مؤخرًا
                </h3>
                <div className="space-y-4">
                  {completedTrips.map((trip) => (
                    <div key={trip.id} className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border-gray-100">
                      <div>
                        <div className="font-bold text-[#4A7554] text-lg mb-1">{trip.route}</div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {trip.date}
                        </div>
                      </div>
                      <div className="text-left bg-white px-3 py-1.5 rounded-lg border-gray-200 shadow-sm">
                        <div className="text-[#E09162] font-bold">{trip.price} ج.م</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Contact */}
              <section className="bg-white rounded-3xl shadow-sm p-8 border-gray-100">
                <h3 className="text-gray-800 font-bold text-lg mb-6 flex items-center gap-2">
                  <Phone className="text-[#E09162]" size={24} />
                  الاتصال
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">رقم الهاتف</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value })}
                      dir="ltr"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 text-right ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-gray-500 text-sm mb-2 font-medium">جهة الاتصال في حالات الطوارئ</label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({...profile, emergencyContact: e.target.value })}
                      dir="ltr"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-bold text-gray-800 text-right ${
                        isEditingProfile
                         ? 'border-[#E5DBC8] focus:border-[#4A7554] bg-white'
                          : 'border-transparent bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
              </section>

              {/* Save Button */}
              {isEditingProfile && (
                <div className="flex justify-end sticky bottom-4">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#4A7554] text-white rounded-xl hover:bg-[#5F8A61] transition-all shadow-lg font-bold flex items-center gap-2 text-lg"
                  >
                    <Save size={20} />
                    حفظ التغييرات
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}