// src/App.js

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { BookingSection } from "./components/BookingSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { SplashScreen } from "./components/SplashScreen";
import AboutSection from "./components/AboutSection";
import ContactUsPage from "./pages/ContactUsPage";

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

  // إظهار Splash Screen أول ما الموقع يفتح
  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />;
  }

  // الصفحات اللي يظهر فيها الفوتر
  const showFooterPaths = ["/", "/about"];
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
      </main>

      {shouldShowFooter && <Footer />}

    </div>
  );
}

export default App;