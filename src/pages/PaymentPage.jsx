import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, Smartphone, CreditCard, CheckCircle, Shield } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const tripDetails = location.state;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // If no trip details, redirect back
  if (!tripDetails) {
    return (
      <div className="min-h-screen bg-[#F2EEE3] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">لا توجد بيانات حجز</p>
          <Link to="/passenger-booking" className="text-[#4A7554] hover:underline">
            العودة لصفحة الحجز
          </Link>
        </div>
      </div>
    );
  }

  const serviceFee = tripDetails.price * 0.05; // 5% service fee
  const total = tripDetails.price + serviceFee;

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 11) {
      toast.error('من فضلك أدخل رقم هاتف صحيح');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('تم الدفع بنجاح! ستصلك رسالة تأكيد قريباً');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  const getPaymentMethodInfo = () => {
    if (tripDetails.paymentMethod === 'vodafone') {
      return {
        name: 'فودافون كاش',
        icon: <Smartphone size={24} />,
        color: '#E60000',
        bgColor: 'bg-[#E60000]',
        instructions: 'سيتم إرسال طلب دفع على رقمك'
      };
    }
    return {
      name: 'إنستا باي',
      icon: <CreditCard size={24} />,
      color: '#4A148C',
      bgColor: 'bg-[#4A148C]',
      instructions: 'سيتم تحويل المبلغ من حسابك البنكي'
    };
  };

  const paymentMethod = getPaymentMethodInfo();

  return (
    <div className="min-h-screen bg-[#F2EEE3]" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/passenger-booking" 
            className="inline-flex items-center gap-2 text-[#4A7554] hover:text-[#5F8A61] transition-colors font-medium"
          >
            <ArrowRight size={20} className="ml-1" />
            رجوع
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#4A7554] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
            <Shield className="text-white" size={36} />
          </div>
          <h1 className="text-[#4A7554] text-3xl font-bold mb-3">تأكيد الدفع</h1>
          <p className="text-gray-600 text-lg">راجع تفاصيل رحلتك وأكمل عملية الدفع</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Payment Form - Left Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-[#E5DBC8]/50">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className={`w-10 h-10 ${paymentMethod.bgColor} rounded-xl flex items-center justify-center text-white`}>
                  {paymentMethod.icon}
                </div>
                {paymentMethod.name}
              </h2>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2 font-bold text-sm">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="01X XXXX XXXX"
                      className="w-full pr-12 pl-4 py-4 border-2 border-[#E5DBC8] rounded-xl focus:border-[#4A7554] focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{paymentMethod.instructions}</p>
                </div>

                {/* Security Notice */}
                <div className="bg-[#F2EEE3] p-4 rounded-xl flex items-start gap-3">
                  <Shield className="text-[#4A7554] flex-shrink-0 mt-1" size={20} />
                  <div className="text-sm text-gray-700">
                    <p className="font-bold mb-1">معاملة آمنة ومحمية</p>
                    <p className="text-xs">جميع بياناتك محمية ومشفرة. لن نشارك معلوماتك مع أي طرف ثالث.</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full px-8 py-4 ${paymentMethod.bgColor} text-white rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={22} />
                      تأكيد الدفع - {total.toFixed(2)} ج.م
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Trip Summary - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-lg p-6 border border-[#E5DBC8]/50 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-6">ملخص الرحلة</h3>

              <div className="space-y-4 mb-6">
                {/* Route */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="text-lg font-bold text-gray-800">{tripDetails.from}</div>
                  <div className="flex-1 h-0.5 bg-gray-200 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-full">
                      <ArrowRight size={12} className="text-gray-500 rotate-180" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{tripDetails.to}</div>
                </div>

                {/* Date */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>التاريخ</span>
                  </div>
                  <span className="font-medium text-gray-800">{tripDetails.date}</span>
                </div>

                {/* Passengers */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users size={16} />
                    <span>عدد الأفراد</span>
                  </div>
                  <span className="font-medium text-gray-800">{tripDetails.passengers} فرد</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">سعر الرحلة</span>
                  <span className="font-medium text-gray-800">{tripDetails.price.toFixed(2)} ج.م</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">رسوم الخدمة</span>
                  <span className="font-medium text-gray-800">{serviceFee.toFixed(2)} ج.م</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-800">الإجمالي</span>
                  <span className="font-bold text-[#4A7554] text-xl">{total.toFixed(2)} ج.م</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}