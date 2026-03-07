// src/App.js
import { Routes, Route, useLocation } from "react-router-dom"; // أضفنا useLocation

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { BookingSection } from "./components/BookingSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
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
  const location = useLocation();

  // بنحدد هنا الصفحات اللي عايزين الفوتر يظهر فيها بس
  const showFooterPaths = ["/", "/about"];
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactUsPage />} /> {/* صفحة التواصل */}
          {/* أي صفحة تانية هتضيفيها هنا */}
        </Routes>
      </main>

      {/* الفوتر هيظهر فقط لو إحنا في الهوم أو About */}
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;