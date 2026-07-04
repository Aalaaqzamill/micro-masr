import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Phone, Mail, Camera, Save } from "lucide-react";

export function PassengerProfile() {
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        email: ""
    });
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.fullname || "",
                phone: user.phone || "",
                email: user.email || ""
            });
            setImagePreview(user.avatarUrl || null);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const updatedUserData = { ...user, ...formData, avatarUrl: imagePreview };

        if (typeof setUser === "function") setUser(updatedUserData);
        
        // التحديث في الـ LocalStorage
        const authData = localStorage.getItem("auth_data");
        if (authData) {
            const parsed = JSON.parse(authData);
            parsed.user = { ...parsed.user, ...formData, avatarUrl: imagePreview };
            localStorage.setItem("auth_data", JSON.stringify(parsed));
        }

        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-[#F2EEE3] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#4A7554] mb-2">المعلومات الشخصية</h1>
                    <p className="text-gray-600">بيانات حسابك المسجل في النظام</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
                    
                    {/* قسم الصورة الشخصية */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-32 h-32">
                            <div className="w-full h-full rounded-full bg-gray-100 border-4 border-[#F2EEE3] flex items-center justify-center overflow-hidden shadow-inner">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={64} className="text-gray-400" />
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-1 left-1 bg-[#4A7554] text-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform border-2 border-white"
                            >
                                <Camera size={16} />
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                        </div>
                    </div>

                    {/* الحقول المعدلة (بوردر + خط عادي) */}
                    <div className="space-y-6">
                        {/* الاسم */}
                        <div className="space-y-1.5">
                            <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                                <User size={16} className="text-[#4A7554]" /> الاسم بالكامل
                            </label>
                            <input
                                type="text"
                                value={formData.fullname}
                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] focus:ring-2 focus:ring-[#4A7554]/10 text-gray-700 transition-all bg-gray-50/50"
                            />
                        </div>

                        {/* الهاتف */}
                        <div className="space-y-1.5">
                            <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                                <Phone size={16} className="text-[#4A7554]" /> رقم الهاتف
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] focus:ring-2 focus:ring-[#4A7554]/10 text-gray-700 transition-all bg-gray-50/50"
                            />
                        </div>

                        {/* البريد الإلكتروني */}
                        <div className="space-y-1.5">
                            <label className="text-gray-500 text-sm font-bold flex items-center gap-2">
                                <Mail size={16} className="text-[#4A7554]" /> البريد الإلكتروني
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A7554] focus:ring-2 focus:ring-[#4A7554]/10 text-gray-700 transition-all bg-gray-50/50"
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex justify-center">
                        <button
                            onClick={handleSave}
                            className="bg-[#4A7554] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#3d6145] transition-all shadow-md flex items-center gap-2"
                        >
                            <Save size={18} /> حفظ التغييرات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}