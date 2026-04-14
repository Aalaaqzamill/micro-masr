import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BookingSection } from '../components/BookingSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen">

      <Navbar />
      <HeroSection />
      <BookingSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}