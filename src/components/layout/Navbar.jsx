import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Bell, LogOut, User, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import logo from "../../assets/logo11.png";
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, logout } = useAuth();
  const creamyHover = "#F2EEE3";

  const { data: notifications } = useQuery({
    queryKey: ['notifications', { userId: user?.id }],
    queryFn: () => api.getNotifications(user?.id),
    enabled: !!user?.id,
    refetchInterval: 10000 // Poll every 10s for new notifications
  });

  const markReadMutation = useMutation({
    mutationFn: () => api.markNotificationsRead(user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleNotifClick = () => {
    setIsNotifOpen(!isNotifOpen);
    setIsProfileOpen(false);
    if (!isNotifOpen && unreadCount > 0) {
      markReadMutation.mutate();
    }
  };
  
  const isActive = (path) => location.pathname === path;

  const dashboardRoute = user?.accountType === 'driver' ? '/driver-dashboard' : '/passenger-dashboard';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg border-b border-[#E5DBC8]/50 shadow-sm"
      style={{ background: "rgba(255, 255, 255, 0.95)" }}
      dir="rtl"
    >
      <div className="px-4 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Micro Masr Logo"
              className="w-16 h-16 rounded-xl object-contain"
            />
            <h1
              className="text-[#4A7554] font-extrabold text-xl lg:text-2xl tracking-tight hidden sm:block"
              style={{ fontFamily: "'Playwrite NZ Basic', serif" }}
            >
              ميكرو مصر 
            </h1>
          </div>

          {/* Desktop Navigation Links (Centered) */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${isActive('/') ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:text-[#4A7554] hover:bg-gray-50'}`}
            >
              الرئيسية
            </button>
            
            {isAuthenticated && (
              <button
                onClick={() => navigate(dashboardRoute)}
                className={`px-4 py-2 rounded-xl font-bold transition-colors ${isActive(dashboardRoute) ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:text-[#4A7554] hover:bg-gray-50'}`}
              >
                الرحلات
              </button>
            )}

            <button
              onClick={() => navigate("/about")}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${isActive('/about') ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:text-[#4A7554] hover:bg-gray-50'}`}
            >
              من نحن
            </button>
            <button
              onClick={() => navigate("/contact")}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${isActive('/contact') ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:text-[#4A7554] hover:bg-gray-50'}`}
            >
              تواصل معنا
            </button>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4">
            
            {isAuthenticated && (
              <button
                onClick={() => navigate(user?.accountType === 'driver' ? '/driver/create-trip' : '/book-passenger')}
                className="px-5 py-2 bg-[#4A7554] text-white rounded-xl font-bold shadow-md shadow-[#4A7554]/20 hover:bg-[#3a5a41] hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                {user?.accountType === 'driver' ? (
                  <>
                    <span className="text-xl leading-none -mt-1">+</span>
                    أضف رحلة
                  </>
                ) : (
                  <>احجز رحلة</>
                )}
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                
                {/* Notifications Bell */}
                <div className="relative">
                  <button 
                    onClick={handleNotifClick}
                    className="relative p-2 text-gray-500 hover:text-[#4A7554] hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <Bell size={24} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50 max-h-96 flex flex-col"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <h3 className="font-bold text-[#4A7554]">الإشعارات</h3>
                        </div>
                        <div className="overflow-y-auto flex-1">
                          {notifications && notifications.length > 0 ? (
                            notifications.map(notif => (
                              <div key={notif.id} className={`p-4 border-b border-gray-50 text-right hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? 'bg-[#4A7554]/5' : ''}`}>
                                <p className={`text-sm ${!notif.read ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</p>
                              </div>
                            ))
                          ) : (
                            <div className="p-6 text-center text-gray-500 text-sm">
                              لا توجد إشعارات حالياً
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <button 
                    onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors"
                >
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[#4A7554] text-sm leading-tight">{user?.fullname || 'حسابي'}</span>
                    <span className="text-xs text-gray-500 leading-tight">{user?.accountType === 'driver' ? 'سائق' : 'راكب'}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#4A7554]/10 text-[#4A7554] flex items-center justify-center font-bold text-lg border border-[#4A7554]/20 shadow-sm">
                    {user?.fullname ? user.fullname.charAt(0) : 'U'}
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2"
                    >
                      <button onClick={() => { setIsProfileOpen(false); navigate(dashboardRoute); }} className="w-full text-right px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-gray-700 font-bold">
                        <User size={18} className="text-[#4A7554]" /> ملفي الشخصي
                      </button>
                      <button onClick={() => { setIsProfileOpen(false); navigate(user?.accountType === 'passenger' ? '/passenger/bookings' : dashboardRoute); }} className="w-full text-right px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-gray-700 font-bold">
                        <MapPin size={18} className="text-[#4A7554]" /> {user?.accountType === 'driver' ? 'رحلاتي وحجوزاتي' : 'حجوزاتي'}
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                          navigate("/");
                        }}
                        className="w-full text-right px-4 py-3 flex items-center gap-3 hover:bg-red-50 text-red-500 font-bold"
                      >
                        <LogOut size={18} /> تسجيل الخروج
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: creamyHover }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 text-[#4A7554] border-2 border-[#4A7554] bg-white rounded-full font-bold transition-colors"
                >
                  تسجيل الدخول
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => navigate("/register")}
                  className="px-6 py-2.5 bg-[#4A7554] text-white rounded-full hover:bg-[#3d6145] shadow-md font-bold transition-colors"
                >
                  إنشاء حساب
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#4A7554] rounded-full shadow-sm font-bold text-[#4A7554] active:scale-95 transition-all"
            >
              <span className="text-sm">القائمة</span>
              <div>
                {isOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white backdrop-blur-xl border-t border-[#E5DBC8]/50 shadow-xl pb-6 rounded-b-3xl">
            <div className="flex flex-col space-y-1 p-6">
              <button
                onClick={() => { navigate("/"); setIsOpen(false); }}
                className={`text-right px-6 py-4 rounded-xl font-bold ${isActive('/') ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                الرئيسية
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => { navigate(dashboardRoute); setIsOpen(false); }}
                  className={`text-right px-6 py-4 rounded-xl font-bold ${isActive(dashboardRoute) ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  الرحلات
                </button>
              )}
              <button
                onClick={() => { navigate("/about"); setIsOpen(false); }}
                className={`text-right px-6 py-4 rounded-xl font-bold ${isActive('/about') ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                من نحن
              </button>
              <button
                onClick={() => { navigate("/contact"); setIsOpen(false); }}
                className={`text-right px-6 py-4 rounded-xl font-bold ${isActive('/contact') ? 'text-[#4A7554] bg-[#4A7554]/10' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                تواصل معنا
              </button>
              
              <div className="pt-4 border-t border-[#E5DBC8]/50 mt-2">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-3 px-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-12 h-12 rounded-full bg-[#4A7554]/10 text-[#4A7554] flex items-center justify-center font-bold text-xl border border-[#4A7554]/20">
                        {user?.fullname ? user.fullname.charAt(0) : 'U'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#4A7554]">{user?.fullname || 'حسابي'}</span>
                        <span className="text-sm text-gray-500">{user?.accountType === 'driver' ? 'سائق' : 'راكب'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        navigate(user?.accountType === 'driver' ? '/driver/create-trip' : '/book-passenger');
                        setIsOpen(false);
                      }}
                      className="w-full mt-4 py-3 bg-[#4A7554] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-[#4A7554]/20"
                    >
                      {user?.accountType === 'driver' ? '+ أضف رحلة' : 'احجز رحلة'}
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                        navigate("/");
                      }}
                      className="w-full px-6 py-3 text-red-500 border border-red-200 bg-red-50 rounded-full font-bold text-center mt-2"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => { navigate("/register"); setIsOpen(false); }}
                      className="flex-1 px-6 py-4 bg-[#4A7554] text-white rounded-full hover:bg-[#3d6145] shadow-md font-bold text-center"
                    >
                      إنشاء حساب
                    </button>
                    <button
                      onClick={() => { navigate("/login"); setIsOpen(false); }}
                      className="flex-1 px-6 py-4 text-[#4A7554] border-2 border-[#4A7554] bg-white rounded-full font-bold text-center"
                    >
                      تسجيل الدخول
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}