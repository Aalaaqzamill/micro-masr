
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/home/HeroSection";
import { BookingSection } from "./components/home/BookingSection";
import { FeaturesSection } from "./components/home/FeaturesSection";
import { HowItWorksSection } from "./components/home/HowItWorksSection";
import { CTASection } from "./components/home/CTASection";
import { FAQSection } from "./components/home/FAQSection";
import { SplashScreen } from "./components/common/SplashScreen";
import AboutSection from "./components/home/AboutSection";
import ContactUsPage from "./pages/contact/ContactUsPage";
import { LoginPage } from "./pages/auth/LoginPage"; 
import ScrollToTop from "./components/layout/ScrollToTop";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { PassengerBookingPage } from "./pages/passenger/PassengerBookPage";
import { PaymentPage } from "./pages/payment/PaymentPage";
import { DriverBookingPage } from './pages/driver/DriverBookingPage';
import { PaymentResultPage } from './pages/payment/PaymentResultPage';

import { PassengerDashboardPage } from './pages/passenger/PassengerDashboardPage';
import { PassengerBookingsPage } from './pages/passenger/PassengerBookingsPage';
import { DriverDashboardPage } from './pages/driver/DriverDashboardPage';
import { CreateTripPage } from './pages/driver/CreateTripPage';
import { PassengerProfile } from "./pages/passenger/PassengerProfilePage";
import { DriverProfilePage} from "./pages/driver/DriverProfilePage";

function Home() {
  return (
    <>
      <HeroSection />
      <BookingSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

function App() {

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans pt-20">
      <ScrollToTop /> 
      
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book-passenger" element={<PassengerBookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/driver-booking" element={<DriverBookingPage/>}/>
          <Route path="/payment-result" element={<PaymentResultPage />} />
          
          
          {/* Booking System Routes */}
          <Route path="/passenger-dashboard" element={<PassengerDashboardPage />} />
          <Route path="/passenger/bookings" element={<PassengerBookingsPage />} />
          <Route path="/driver-dashboard" element={<DriverDashboardPage />} />
          <Route path="/driver/create-trip" element={<CreateTripPage />} />
          <Route path="/passenger-profile" element={<PassengerProfile />} />
          <Route path="/driver-profile" element={<DriverProfilePage />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;