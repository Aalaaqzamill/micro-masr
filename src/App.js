

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { BookingSection } from "./components/BookingSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import { SplashScreen } from "./components/SplashScreen";
import AboutSection from "./components/AboutSection";
import ContactUsPage from "./pages/ContactUsPage";
import { LoginPage } from "./pages/LoginPage"; 
import ScrollToTop from "./components/ScrollToTop";
import { RegisterPage } from "./pages/RegisterPage";
import { PassengerBookingPage } from "./pages/PassengerBookPage";
import { PaymentPage } from "./pages/PaymentPage";
import { DriverBookingPage } from './pages/DriverBookingPage';

function Home() {
  return (
    <>
      <HeroSection />
      <BookingSection />
      <FeaturesSection />
      <HowItWorksSection />
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

  const showNavbarPaths = ["/", "/about", "/contact"];
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);


  const showFooterPaths = ["/", "/about"];
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ScrollToTop /> 
      
      {shouldShowNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
           <Route path="/book-passenger" element={<PassengerBookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;