import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const PaymentCheckout = () => {
    const { itemId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { authUser } = useAuth();

    // Item details passed via state navigation or fetch
    const [item, setItem] = useState<any>(location.state?.item || null);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    useEffect(() => {
        if (!item && itemId) {
            // Fallback fetch if state is missing (e.g. direct link)
            const fetchItem = async () => {
                try {
                    // Try course first then book
                    let res = await api.get(`/course/${itemId}`);
                    if (!res.data) res = await api.get(`/book/${itemId}`);
                    setItem(res.data);
                } catch (err) {
                    toast.error("Item not found");
                    navigate('/courses');
                }
            };
            fetchItem();
        }
    }, [itemId, item, navigate]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            // 1. Create Payment Intent (Get Client Secret)
            // Ideally we use Stripe Elements here. For demo, we simulate the "Success" flow via backend.

            // Call our new backend endpoint to get intent (just to verify connection)
            console.log("Creating Payment Intent for amount:", item.price);
            const intentRes = await api.post("/payment/create-payment-intent", {
                amount: item.price
            });
            console.log("Intent Response:", intentRes.data);

            // Allow Mock or Real Secret
            if (intentRes.data.clientSecret) {
                // 2. Simulate "Confirm Card Payment" delay
                // Since user requested "any data shows success", we skip actual Stripe Confirm call
                setTimeout(async () => {
                    // 3. Call "Buy" endpoint to fulfill order on backend
                    try {
                        console.log("Attempting Purchase Fulfillment:", { userId: authUser?._id, bookId: item._id });
                        const apiRes = await api.post("/purchase/buy", {
                            userId: authUser?._id,
                            bookId: item._id
                        });

                        // Important: Merge the updated enrollment list into our local user state
                        // The backend returns { message: "...", user: updatedUserObject }
                        if (apiRes.data.user) {
                            const updatedUser = { ...authUser, ...apiRes.data.user };
                            localStorage.setItem("Users", JSON.stringify(updatedUser));
                        }

                        setProcessing(false);
                        setSuccess(true);
                        toast.success("Payment Successful!");

                        // Redirect after delay
                        setTimeout(() => {
                            navigate('/mylearning');
                            window.location.reload();
                        }, 2000);
                    } catch (buyError: any) {
                        console.error("Purchase error details:", buyError);
                        const msg = buyError.response?.data?.message || "";

                        // If user already owns it, treat as success!
                        if (buyError.response?.status === 400 && (msg.includes("already") || msg.includes("owned"))) {
                            setProcessing(false);
                            setSuccess(true);
                            toast.success("You already own this item! Redirecting...");
                            setTimeout(() => {
                                navigate('/mylearning');
                                window.location.reload();
                            }, 2000);
                        } else {
                            setProcessing(false);
                            toast.error(msg || "Purchase fulfillment failed");
                        }
                    }
                }, 2000);
            }
        } catch (error: any) {
            console.error(error);
            setProcessing(false);
            toast.error("Payment initiation failed. Please try again.");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="bg-[#18181b] p-8 rounded-2xl border border-gray-800 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                    <p className="text-gray-400 mb-6">You have successfully enrolled in <strong>{item?.name || item?.title}</strong>.</p>
                    <p className="text-sm text-gray-500">Redirecting to My Learning...</p>
                </div>
            </div>
        );
    }

    if (!item) return <div className="min-h-screen bg-black pt-24 text-white text-center">Loading Checkout...</div>;

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Secure Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-[#18181b] p-6 rounded-2xl border border-gray-800 sticky top-24">
                            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                            <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-800">
                                <img src={item.image || item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-white font-medium mb-1">{item.name || item.title}</h4>
                            <p className="text-sm text-gray-400 mb-4">{item.category}</p>

                            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                                <span className="text-gray-400">Total</span>
                                <span className="text-2xl font-bold text-white">${item.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="md:col-span-2">
                        <div className="bg-[#18181b] p-8 rounded-2xl border border-gray-800">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="text-blue-500" />
                                <h3 className="text-xl font-bold text-white">Payment Details</h3>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-6">
                                <div>
                                    <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Cardholder Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={cardName}
                                        onChange={e => setCardName(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-blue-500 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={cardNumber}
                                            onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || '')}
                                            maxLength={19}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-blue-500 outline-none pl-12"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                        <CreditCard className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            required
                                            value={expiry}
                                            onChange={e => setExpiry(e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, ''))}
                                            maxLength={5}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-blue-500 outline-none"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs uppercase font-bold mb-2">CVC</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                value={cvc}
                                                onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
                                                maxLength={3}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-blue-500 outline-none pl-10"
                                                placeholder="123"
                                            />
                                            <Lock className="absolute left-4 top-3.5 text-gray-500 w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${processing ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-1 shadow-blue-900/20'
                                        }`}
                                >
                                    {processing ? (
                                        <>Processing...</>
                                    ) : (
                                        <>PAY ${item.price}</>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                                    <Lock size={12} />
                                    <span>Payments are secure and encrypted.</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckout;
