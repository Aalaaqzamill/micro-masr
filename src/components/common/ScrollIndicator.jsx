import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator({ targetId }) {
  const scrollToNextSection = () => {
    // بيبحث عن السكشن من خلال الـ ID
    const nextSection = document.getElementById(targetId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        onClick={scrollToNextSection}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex flex-col items-center cursor-pointer group"
      >
        <span className="text-white/70 text-sm mb-2 font-medium group-hover:text-white transition-colors">
          اسحب للأسفل
        </span>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-10 h-10 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full flex items-center justify-center shadow-lg group-hover:border-white/80 transition-all"
        >
          <ChevronDown className="text-white" size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
}