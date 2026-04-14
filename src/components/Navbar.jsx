import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo11.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const creamyHover = "#F2EEE3";
  return (
    <nav
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-[90px] backdrop-blur-lg border border-white/20 shadow-lg"
      style={{ background: "#FFFFFF" }}
      dir="rtl"
    >
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Micro Masr Logo"
              className="w-16 h-16 rounded-xl object-contain"
            />
            <h1
              className="text-[#4A7554] font-extrabold text-xl tracking-tight"
              style={{ fontFamily: "'Playwrite NZ Basic', serif" }}
            >
              Micro Masr
            </h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 px-5 py-2 bg-white/70 border-2 border-[#4A7554] rounded-full shadow-sm font-bold text-[#4A7554] hover:shadow-md transition-all active:scale-95"
            >
              <span className="text-base font-bold">القائمة</span>
              <div className="text-[#4A7554]">
                {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
              </div>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-3 bg-white backdrop-blur-xl rounded-[40px] shadow-xl border border-black/5">
            <div className="flex flex-col space-y-1 p-6">
              <button
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
                className="text-right px-6 py-4 hover:bg-[#4A7554]/5 rounded-xl font-bold text-[#4A7554]"
              >
                الرئيسية
              </button>
              <button
                onClick={() => {
                  navigate("/about");
                  setIsOpen(false);
                }}
                className="text-right px-6 py-4 hover:bg-[#4A7554]/5 rounded-xl font-bold text-[#4A7554]"
              >
                من نحن
              </button>
              <button
                onClick={() => {
                  navigate("/services");
                  setIsOpen(false);
                }}
                className="text-right px-6 py-4 hover:bg-[#4A7554]/5 rounded-xl font-bold text-[#4A7554]"
              >
                خدماتنا
              </button>
              <button
                onClick={() => {
                  navigate("/contact");
                  setIsOpen(false);
                }}
                className="text-right px-6 py-4 hover:bg-[#4A7554]/5 rounded-xl font-bold text-[#4A7554]"
              >
                تواصل معنا
              </button>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => navigate("/register")}
                  className="flex-1 px-6 py-4 bg-[#4A7554] text-white rounded-[90px] hover:bg-[#3d6145] shadow-md font-bold text-center"
                >
                  إنشاء حساب
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: creamyHover }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => navigate("/login")}
                  className="flex-1 px-6 py-4 text-[#4A7554] border border-[#4A7554] bg-white/50 rounded-[90px] font-bold text-center"
                >
                  تسجيل الدخول
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}