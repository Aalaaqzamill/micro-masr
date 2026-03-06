import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo11.png";

export function Navbar() {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const lightBg = "#f9f7f7ff";
const creamyHover = "#F2EEE3";

return (
<nav
className="fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-black/[0.03]"
style={{ backgroundColor: lightBg }}
dir="rtl"
> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    <div className="flex items-center justify-between h-20">

      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Micro Masr Logo"
          className="w-12 h-12 rounded-lg object-contain"
        />
        <h1
          className="text-[#4A7554] font-extrabold text-2xl tracking-tight"
          style={{ fontFamily: "'Cascadia Mono', monospace" }}
        >
          MicroMasr
        </h1>
      </div>

      {/* Menu Button */}
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-5 py-2 bg-white border border-[#4A7554]/10 rounded-full shadow-sm font-bold text-[#4A7554] hover:shadow-md transition-all active:scale-95"
        >
          <span className="text-base font-bold">القائمة</span>

          <div className="text-[#4A7554]">
            {isOpen ? (
              <X size={22} strokeWidth={2.5} />
            ) : (
              <Menu size={22} strokeWidth={2.5} />
            )}
          </div>
        </button>
      </div>
    </div>

    {/* Dropdown Menu */}
    {isOpen && (
      <div
        className="absolute top-full left-0 w-full shadow-xl border-t border-black/5 z-50"
        style={{ backgroundColor: lightBg }}
      >
        <div className="flex flex-col space-y-1 p-6 max-w-7xl mx-auto">

          {/* Menu Items */}
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

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              onClick={() => navigate("/register")}
              className="flex-1 px-6 py-4 bg-[#4A7554] text-white rounded-xl hover:bg-[#3d6145] shadow-md font-bold text-center"
            >
              إنشاء حساب
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: creamyHover }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              onClick={() => navigate("/login")}
              className="flex-1 px-6 py-4 text-[#4A7554] border border-[#4A7554]/20 bg-white/50 rounded-xl font-bold text-center"
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
