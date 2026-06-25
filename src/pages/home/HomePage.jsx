import { Navbar } from '../../components/layout/Navbar';
import { HeroSection } from '../../components/home/HeroSection';
import { BookingSection } from '../../components/home/BookingSection';
import { FeaturesSection } from '../../components/home/FeaturesSection';
import { HowItWorksSection } from '../../components/home/HowItWorksSection';
import { FAQSection } from '../../components/home/FAQSection';
import { CTASection } from '../../components/home/CTASection';
import { Footer } from '../../components/layout/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookingSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}