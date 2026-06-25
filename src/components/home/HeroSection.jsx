import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroo from "../../assets/heroo.jpg";
import hero22 from "../../assets/hero22.jpg";
import ScrollIndicator from "../common/ScrollIndicator";

const heroImages = [heroo, hero22];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // السلايدر يلف تلقائي باستمرار
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % heroImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <section
      id="home"
      className="relative h-[70vh] md:h-screen overflow-hidden pt-20"
      dir="rtl"
    >
      {/* الصور */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentImageIndex === index ? 1 : 0,
            zIndex: currentImageIndex === index ? 1 : 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#4A7554]/80 via-[#4A7554]/50 to-transparent z-10" />

      {/* المحتوى */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mr-0 ml-auto text-right">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-5xl sm:text-6xl lg:text-7xl mb-6 font-black leading-tight drop-shadow-lg"
            >
              طريقك أسهل،
              <br />
              <span className="text-[#E09162]">حجزك أسرع</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/95 text-lg sm:text-2xl mb-10 max-w-xl mr-0 ml-auto leading-relaxed drop-shadow-md font-medium"
            >
              سافر لأي مكان في مصر بأمان وراحة. احجز مقعدك في ميكروباص حديث
              ومكيف، أو انشر رحلتك كسائق وزود دخلك.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(224,145,98,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-[#E09162] text-white font-extrabold rounded-full shadow-2xl text-xl hover:bg-[#d07f54] transition-colors"
            >
              ابدأ رحلتك الآن
            </motion.button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center">
        <ScrollIndicator targetId="booking-selection" />
      </div>

      {/* الدوتس */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 flex-row-reverse">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index
                ? "bg-white w-8"
                : "bg-white/50 w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}