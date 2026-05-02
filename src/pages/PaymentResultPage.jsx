import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Home, Receipt, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export function PaymentResultPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const resultData = location.state;

    useEffect(() => {
        if (!resultData) {
            navigate('/', { replace: true });
        }
    }, [resultData, navigate]);

    if (!resultData) {
        return null;
    }

    const { success, tripDetails, total, transactionId, errorReason } = resultData;

    return (
        <div className="min-h-screen bg-[#F2EEE3] flex items-center justify-center px-4 py-12" dir="rtl">
            <div className="max-w-2xl w-full">

                {success ? (
                    <div className="bg-white rounded-[2rem] shadow-2xl p-8 sm:p-12 text-center border-4 border-green-500 animate-[fadeIn_0.5s_ease-out]">

                        <div className="relative mb-8">
                            <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl animate-[bounce_1s_ease-in-out]">
                                <CheckCircle className="text-white" size={64} strokeWidth={2.5} />
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-green-500/30 rounded-full animate-ping"></div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
                            تم الدفع بنجاح!
                        </h1>

                        <p className="text-gray-600 text-lg mb-8">
                            شكراً لك، تم تأكيد حجزك وسيتم إرسال رسالة تأكيد قريباً
                        </p>

                        {transactionId && (
                            <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-gray-700 font-medium">رقم العملية</span>
                                    <span className="font-bold text-green-700 font-mono">{transactionId}</span>
                                </div>

                                {tripDetails && total && (
                                    <>
                                        <div className="flex items-center justify-between mb-3 pt-3 border-t border-green-200">
                                            <span className="text-gray-700 font-medium">المسار</span>
                                            <span className="font-bold text-gray-800">
                                                {tripDetails.from} ← {tripDetails.to}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-medium">التاريخ</span>
                                            <span className="font-bold text-gray-800">{tripDetails.date}</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-green-200">
                                            <span className="text-gray-700 font-medium">المبلغ المدفوع</span>
                                            <span className="font-bold text-green-600 text-xl">
                                                {total.toFixed(2)} ج.م
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="mb-8 flex justify-center">
                            <Link
                                to="/track-trip"
                                className="flex-1 px-6 py-4 border-2 border-[#4A7554] text-[#4A7554] rounded-xl bg-transparent hover:bg-[#4A7554] hover:text-white transition-all flex items-center justify-center gap-2 font-bold"
                            >
                                <CheckCircle size={20} />
                                تابع رحلتك
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/"
                                className="flex-1 px-6 py-4 bg-[#4A7554] text-white rounded-xl hover:bg-[#5F8A61] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 font-bold"
                            >
                                <Home size={20} />
                                العودة للرئيسية
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] shadow-2xl p-8 sm:p-12 text-center border-4 border-red-500 animate-[fadeIn_0.5s_ease-out]">

                        <div className="relative mb-8">
                            <div className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl animate-[bounce_1s_ease-in-out]">
                                <XCircle className="text-white" size={64} strokeWidth={2.5} />
                            </div>

                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-red-500/30 rounded-full animate-ping"></div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
                            رفض الدفع!
                        </h1>

                        <p className="text-gray-600 text-lg mb-4">
                            عذراً، لم نتمكن من إتمام عملية الدفع
                        </p>

                        {errorReason && (
                            <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 mb-8">
                                <p className="text-red-700 font-bold">
                                    السبب: {errorReason}
                                </p>
                            </div>
                        )}

                        <div className="bg-red-50 rounded-xl p-6 mb-8 border border-red-200 text-right">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={22} />
                                <div className="text-sm text-gray-700">
                                    <p className="font-bold mb-3">الأسباب المحتملة:</p>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 font-bold">•</span>
                                            <span>رصيد غير كافٍ في المحفظة</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 font-bold">•</span>
                                            <span>خطأ في رقم الهاتف المدخل</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 font-bold">•</span>
                                            <span>مشكلة في الاتصال بالشبكة</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 font-bold">•</span>
                                            <span>تم إلغاء العملية من طرفك</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#F2EEE3] rounded-xl p-5 mb-8 text-right">
                            <p className="text-sm text-gray-700">
                                <span className="font-bold">تحتاج مساعدة؟</span>{' '}
                                <a href="tel:19944" className="text-[#4A7554] font-bold hover:underline">
                                    19944
                                </a>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex-1 px-6 py-4 bg-[#4A7554] text-white rounded-xl hover:bg-[#5F8A61] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 font-bold"
                            >
                                المحاولة مرة أخرى
                            </button>

                            <Link
                                to="/"
                                className="flex-1 px-6 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-bold"
                            >
                                <Home size={20} />
                                العودة للرئيسية
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}