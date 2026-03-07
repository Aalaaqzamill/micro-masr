import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { BookingSection } from "./components/BookingSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import AboutSection from "./components/AboutSection";
import ContactUsPage from "./pages/ContactUsPage";
import { LoginPage } from "./pages/LoginPage"; // الربط الصحيح ✅
import ScrollToTop from "./components/ScrollToTop";
import { RegisterPage } from "./pages/RegisterPage";

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
  const location = useLocation();

  // 1. تحديد هل يظهر الناف بار؟ (يظهر في الرئيسية، عن الشركة، والتواصل)
  const showNavbarPaths = ["/", "/about", "/contact"];
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  // 2. تحديد هل يظهر الفوتر؟ (يظهر في الكل ما عدا التواصل والصفحات الخارجية)
  const showFooterPaths = ["/", "/about"];
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ScrollToTop /> 
      
      {/* هيظهر في التواصل عادي */}
      {shouldShowNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {/* مش هيظهر في صفحة التواصل خالص */}
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;