"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Clock, Loader2, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [fc, setFc] = useState(null);
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("order_cart") || "{}");
    const savedFc = JSON.parse(localStorage.getItem("order_fc") || "null");
    if (!savedFc) router.push('/');
    setCart(savedCart);
    setFc(savedFc);
  }, []);

  if (!cart || !fc) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>;

  const itemsToDisplay = fc.menuItems.filter(item => cart[item.id] > 0);
  const subtotal = itemsToDisplay.reduce((acc, item) => acc + (item.price * cart[item.id]), 0);
  const total = subtotal + 15;

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    
    // Yahan API call ho rahi hai orders table mein entry ke liye
    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        userId: "test-user-id", 
        fcId: fc.id,
        totalAmount: total,
        items: itemsToDisplay.map(item => ({ 
          name: item.name, 
          qty: cart[item.id], 
          price: item.price 
        }))
      }),
    });

    if (res.ok) {
      // Step 1: Local Storage saaf karo
      localStorage.removeItem("order_cart");
      // Step 2: Mast Success Page par bhej do!
      router.push("/success");
    } else {
      alert("Locha ho gaya! Check if API route exists or Database is connected.");
      setIsPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-6 pt-12 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Final Step</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Delivery Time Card */}
        <div className="bg-white p-5 rounded-[32px] shadow-sm flex items-center gap-4 border border-orange-100">
          <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-500/20">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              KIIT Campus {fc.campus?.campusNumber || "Select"}
            </p>
            <p className="text-lg font-black text-gray-900">Est. Time: 20 Mins</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Summary</h2>
          <div className="space-y-6">
            {itemsToDisplay.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-orange-100 text-orange-600 font-black flex items-center justify-center rounded-xl">
                    {cart[item.id]}x
                  </span>
                  <p className="font-bold text-gray-800 text-lg">{item.name}</p>
                </div>
                <p className="font-black text-gray-900 text-lg">₹{item.price * cart[item.id]}</p>
              </div>
            ))}
          </div>
          
          <div className="h-[1px] bg-gray-100 my-8"></div>
          
          <div className="flex justify-between items-center text-gray-400 font-bold mb-2">
            <span>Platform Fee</span>
            <span>₹15</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-xl font-black text-gray-900">Total Amount</span>
            <span className="text-4xl font-black text-orange-500 tracking-tighter">₹{total}</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          disabled={isPlacing || itemsToDisplay.length === 0}
          onClick={handlePlaceOrder}
          className="w-full bg-gray-900 text-white py-6 rounded-[30px] font-black text-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transition-all shadow-2xl"
        >
          {isPlacing ? <Loader2 className="animate-spin" /> : <>Confirm & Pay <CheckCircle2 size={24} /></>}
        </button>
      </div>
    </div>
  );
}