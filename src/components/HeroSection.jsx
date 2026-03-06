import { useEffect, useState } from "react";
import hero2 from "../assets/hero2.jpg";

const heroImages = [hero2 ];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-[70vh] md:h-screen overflow-hidden pt-20"
      dir="rtl"
    >
      {/* Background Image Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentImageIndex === index ? 1 : 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay أخف */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#4A7554]/60 via-[#4A7554]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mr-0 ml-auto text-right">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl mb-6 font-bold leading-tight">
              أأمن وأسرع وسيلة مواصلات في مصر
            </h1>

            <p className="text-white/95 text-lg sm:text-xl mb-8 max-w-xl mr-0 ml-auto">
              سافر لأي مكان في مصر بأمان وراحة. احجز كرسيك في ميكروباص حديث
              ومكيف، أو اطلب ميكروباص مخصوص ليك ولعيلتك.
            </p>

            <button className="px-6 py-4 bg-[#E09162] text-white rounded-3xl hover:bg-[#d07f54] transition-all shadow-[0_10px_30px_rgba(224,145,98,0.4)] hover:shadow-[0_15px_40px_rgba(224,145,98,0.5)] hover:scale-105 font-bold text-lg">
              حمل التطبيق دلوقتي
            </button>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 flex-row-reverse">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentImageIndex === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}