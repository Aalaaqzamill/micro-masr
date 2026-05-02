import { Link } from 'react-router-dom';
import { ArrowRight, Car, MapPin, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function DriverBookingPage() {

  const [activeTab, setActiveTab] = useState('requests');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    vehicleType: 'تويوتا هايس - ميكروباص',
    licensePlate: 'ABC 1234',
  });

  const [trips, setTrips] = useState([
    {
      id: 101,
      from: 'القاهرة (رمسيس)',
      to: 'الإسكندرية',
      tripStatus: 'EnRoute',
      availableSeats: 9,
      earnings: 250,
    }
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      tripId: 101,
      name: 'سارة محمد',
      passengers: 2,
      price: 100,
    }
  ]);

  const getOperationalStatusLabel = (status) => {
    switch (status) {
      case 'Pending': return 'في الانتظار';
      case 'EnRoute': return 'جارية';
      default: return '';
    }
  };

  const handleAccept = (request) => {
    setTrips(prev =>
      prev.map(t =>
        t.id === request.tripId
          ? {
              ...t,
              availableSeats: t.availableSeats - request.passengers,
              earnings: t.earnings + request.price
            }
          : t
      )
    );

    setRequests(prev => prev.filter(r => r.id !== request.id));

    toast.success('تم القبول');
  };

  const handleReject = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast.info('تم الرفض');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9]" dir="rtl">

      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#4A7554] font-bold">
          <Car />
          ميكرو مصر
        </Link>
      </div>

      <div className="p-6">

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('requests')}>الطلبات</button>
          <button onClick={() => setActiveTab('trips')}>رحلاتي</button>
          <button onClick={() => setActiveTab('profile')}>بروفايل</button>
        </div>

        {/* Requests */}
        {activeTab === 'requests' && (
          <div>
            {requests.map(req => (
              <div key={req.id} className="border p-4 mb-3 rounded">
                <p>{req.name}</p>
                <button onClick={() => handleAccept(req)}>قبول</button>
                <button onClick={() => handleReject(req.id)}>رفض</button>
              </div>
            ))}
          </div>
        )}

        {/* Trips */}
        {activeTab === 'trips' && (
          <div>
            {trips.map(trip => (
              <div key={trip.id} className="border p-4 mb-3 rounded">
                <p>{trip.from} → {trip.to}</p>
                <p>{getOperationalStatusLabel(trip.tripStatus)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div>
            <p>{profile.vehicleType}</p>
            <p>{profile.licensePlate}</p>
          </div>
        )}

      </div>
    </div>
  );
}