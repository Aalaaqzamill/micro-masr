// src/services/api.js
// Mock API Service simulating a backend database using localStorage

const forceSeedData = () => {
  const userStr = localStorage.getItem('currentUser');
  const user = userStr ? JSON.parse(userStr) : null;
  const currentUserId = user?.id || "user-123";
  const currentUserName = user?.fullname || "المستخدم الحالي";

  const driverId = user?.accountType === 'driver' ? currentUserId : "driver-456";
  const passengerId = user?.accountType === 'passenger' ? currentUserId : "passenger-789";

  const initialTrips = [
    {
      id: "mock-trip-1",
      driverId: driverId,
      driverName: user?.accountType === 'driver' ? currentUserName : "أحمد سيد",
      governorate: "القاهرة",
      station: "موقف رمسيس",
      destination: "الإسكندرية (موقف محرم بك)",
      route: "الزراعي",
      vehicleType: "ميكروباص 14 راكب",
      vehicleNumber: "أ ب ج 123",
      totalSeats: 14,
      availableSeats: 10,
      departureTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      pricePerPassenger: 70,
      notes: "التكييف شغال، يرجى الحضور قبل الموعد بـ 15 دقيقة",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-trip-2",
      driverId: "other-driver-1",
      driverName: "محمود حسن",
      governorate: "الدقهلية",
      station: "موقف المنصورة",
      destination: "القاهرة (عبود)",
      route: "طريق بنها الحر",
      vehicleType: "ميني باص",
      vehicleNumber: "د ع ص 456",
      totalSeats: 28,
      availableSeats: 5,
      departureTime: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
      pricePerPassenger: 60,
      notes: "ممنوع التدخين",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-trip-3",
      driverId: driverId,
      driverName: user?.accountType === 'driver' ? currentUserName : "السائق الحالي",
      governorate: "الغربية",
      station: "موقف طنطا",
      destination: "الإسكندرية (الموقف الجديد)",
      route: "الزراعي السريع",
      vehicleType: "ميكروباص",
      vehicleNumber: "س ص ع 789",
      totalSeats: 14,
      availableSeats: 14,
      departureTime: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
      pricePerPassenger: 45,
      notes: "السيارة مجهزة للسفر الطويل",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-trip-4",
      driverId: driverId,
      driverName: user?.accountType === 'driver' ? currentUserName : "أحمد سيد",
      governorate: "الجيزة",
      station: "موقف المنيب",
      destination: "المنيا",
      route: "الصحراوي الغربي",
      vehicleType: "ميكروباص",
      vehicleNumber: "ق م ن 147",
      totalSeats: 14,
      availableSeats: 14,
      departureTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
      pricePerPassenger: 120,
      notes: "رحلة مباشرة بدون توقف كثير",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-trip-5",
      driverId: driverId,
      driverName: user?.accountType === 'driver' ? currentUserName : "السائق الحالي",
      governorate: "الإسكندرية",
      station: "موقف محرم بك",
      destination: "القاهرة (المرج)",
      route: "الصحراوي",
      vehicleType: "ميكروباص 14 راكب",
      vehicleNumber: "ط ك م 951",
      totalSeats: 14,
      availableSeats: 12,
      departureTime: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
      pricePerPassenger: 80,
      notes: "",
      status: "active",
      createdAt: new Date().toISOString()
    }
  ];

  const initialBookings = [
    {
      id: "mock-booking-1",
      tripId: "mock-trip-1",
      driverId: driverId,
      passengerId: passengerId,
      passengerName: user?.accountType === 'passenger' ? currentUserName : "عمر خالد",
      destination: "الإسكندرية (موقف محرم بك)",
      pickupLocation: "بوابة الموقف الرئيسية",
      phoneNumber: "01000000000",
      seatsCount: 2,
      notes: "معايا شنطتين سفر",
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
    },
    {
      id: "mock-booking-2",
      tripId: "mock-trip-1",
      driverId: driverId,
      passengerId: "passenger-999",
      passengerName: "محمود سلامة",
      destination: "الإسكندرية (موقف محرم بك)",
      pickupLocation: "من على الدائري",
      phoneNumber: "01011111111",
      seatsCount: 1,
      notes: "",
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
      id: "mock-booking-3",
      tripId: "mock-trip-3",
      driverId: driverId,
      passengerId: "passenger-888",
      passengerName: "زياد طارق",
      destination: "الإسكندرية (الموقف الجديد)",
      pickupLocation: "موقف طنطا",
      phoneNumber: "01122222222",
      seatsCount: 3,
      notes: "نحتاج كراسي جنب بعض",
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      id: "mock-booking-4",
      tripId: "mock-trip-4",
      driverId: driverId,
      passengerId: "other-passenger-2",
      passengerName: "إبراهيم نصر",
      destination: "المنيا",
      pickupLocation: "موقف المنيب",
      phoneNumber: "01233333333",
      seatsCount: 2,
      notes: "عائلة",
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString()
    }
  ];

  const initialNotifications = [
    {
      id: "notif-1",
      userId: driverId,
      type: 'booking_request',
      message: 'لديك طلب حجز جديد لرحلتك إلى الإسكندرية',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    },
    {
      id: "notif-2",
      userId: passengerId,
      type: 'booking_update',
      message: 'تم قبول طلب الحجز الخاص بك لرحلة المنيا!يم',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    }
  ];

  localStorage.setItem('trips', JSON.stringify(initialTrips));
  localStorage.setItem('bookings', JSON.stringify(initialBookings));
  localStorage.setItem('notifications', JSON.stringify(initialNotifications));
  localStorage.setItem('micro_masr_seeded_v4', 'true');
};

// Seed data on load if not seeded yet with v4
if (!localStorage.getItem('micro_masr_seeded_v4')) {
  forceSeedData();
}

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const api = {
  // --- TRIPS ---
  getTrips: async (filters = {}) => {
    await delay();
    let trips = getStorage('trips');
    trips = trips.filter(
      trip => trip.status === "active" && trip.availableSeats > 0
    );

    // Apply filters
    if (filters.governorate) {
      trips = trips.filter(t => t.governorate === filters.governorate);
    }
    if (filters.station) {
      trips = trips.filter(t => t.station === filters.station);
    }
    if (filters.destinationGovernorate) {
      trips = trips.filter(t =>
        t.destination.includes(filters.destinationGovernorate)
      );
    }

    if (filters.destinationStation) {
      trips = trips.filter(t =>
        t.destination.includes(filters.destinationStation)
      );
    }
    if (filters.driverId) {
      trips = trips.filter(t => t.driverId === filters.driverId);
    }
    if (filters.status) {
      trips = trips.filter(t => t.status === filters.status);
    }


    return trips;
  },

  getTripById: async (id) => {
    await delay();
    const trips = getStorage('trips');
    return trips.find(t => t.id === id);
  },

  createTrip: async (tripData) => {
    await delay();
    const trips = getStorage('trips');
    const newTrip = {
      ...tripData,
      id: generateId(),
      status: 'active',
      createdAt: new Date().toISOString()
    };
    trips.push(newTrip);
    setStorage('trips', trips);
    return newTrip;
  },

  updateTrip: async (tripId, updatedData) => {
    await delay();
    const trips = getStorage('trips');
    const index = trips.findIndex(t => t.id === tripId);
    if (index !== -1) {
      trips[index] = { ...trips[index], ...updatedData };
      setStorage('trips', trips);
      return trips[index];
    }
    throw new Error('Trip not found');
  },

  updateTripSeats: async (tripId, bookedSeats) => {
    await delay();
    const trips = getStorage('trips');
    const index = trips.findIndex(t => t.id === tripId);
    if (index !== -1) {
      trips[index].availableSeats -= bookedSeats;
      if (trips[index].availableSeats <= 0) {
        trips[index].status = 'full';
      }
      setStorage('trips', trips);
      return trips[index];
    }
    throw new Error('Trip not found');
  },

  getBookingsByDriver: async (driverId) => {
    await delay();
    const bookings = getStorage('bookings');
    return bookings.filter(b => b.driverId === driverId);
  },

  getBookingsByPassenger: async (passengerId) => {
    await delay();
    const bookings = getStorage('bookings');
    return bookings.filter(b => b.passengerId === passengerId);
  },

  createBooking: async (bookingData) => {
    await delay();
    const bookings = getStorage('bookings');
    const newBooking = {
      ...bookingData,
      id: generateId(),
      status: 'pending', 
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    setStorage('bookings', bookings);

    await api.createNotification({
      userId: bookingData.driverId,
      type: 'booking_request',
      message: `طلب حجز جديد من ${bookingData.passengerName} لرحلة ${bookingData.destination}`,
      bookingId: newBooking.id,
      tripId: bookingData.tripId
    });

    return newBooking;
  },

  updateBookingStatus: async (bookingId, status) => {
    await delay();
    const bookings = getStorage('bookings');
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      bookings[index].status = status;
      setStorage('bookings', bookings);
      if (status === "paid") {

        await api.createNotification({
          userId: bookings[index].driverId,
          type: "payment_completed",
          message: `تم دفع قيمة الرحلة بواسطة ${bookings[index].passengerName}`,
          bookingId: bookings[index].id,
          tripId: bookings[index].tripId
        });

        return bookings[index];
      }
      const trips = getStorage('trips');
      const trip = trips.find(t => t.id === bookings[index].tripId);
      // Create Notification for Passenger

      await api.createNotification({
        userId: bookings[index].passengerId,

        type: status === "accepted"
          ? "booking_accepted"
          : "booking_rejected",

        message:
          status === "accepted"
            ? "تم قبول طلب الحجز الخاص بك! يمكنك الدفع الآن"
            : "عذراً، تم رفض طلب الحجز.",

        bookingId: bookings[index].id,
        tripId: bookings[index].tripId,

        from: trip.station,
        to: trip.destination,
        price: trip.pricePerPassenger,
        seats: bookings[index].seatsCount,
        date: trip.departureTime,
        paymentMethod: "vodafone"
      });

      if (status === 'accepted') {
        await api.updateTripSeats(bookings[index].tripId, bookings[index].seats || 1);
      }

      return bookings[index];
    }
    throw new Error('Booking not found');
  },

  // --- NOTIFICATIONS ---
  getNotifications: async (userId) => {
    await delay();
    const notifications = getStorage('notifications');
    return notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createNotification: async (notifData) => {
    const notifications = getStorage('notifications');
    const newNotif = {
      ...notifData,
      id: generateId(),
      read: false,
      createdAt: new Date().toISOString()
    };
    notifications.push(newNotif);
    setStorage('notifications', notifications);
    return newNotif;
  },

  markNotificationsRead: async (userId) => {
    const notifications = getStorage('notifications');
    const updated = notifications.map(n => n.userId === userId ? { ...n, read: true } : n);
    setStorage('notifications', updated);
  }
};
