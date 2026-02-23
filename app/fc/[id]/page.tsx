"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Plus, Minus, Loader2, MapPin, ChevronDown, X } from "lucide-react";

export default function FoodCourtMenu() {
  const params = useParams();
  const router = useRouter();
  const [fcData, setFcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch(`/api/fc/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFcData(data);
        setLoading(false);
      });
  }, [params.id]);

  const addToCart = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart(prev => {
    const newCart = { ...prev };
    if (newCart[id] > 1) newCart[id] -= 1; else delete newCart[id];
    return newCart;
  });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = fcData?.menuItems?.reduce((total, item) => total + (item.price * (cart[item.id] || 0)), 0);

  const handleCheckout = () => {
    localStorage.setItem("order_cart", JSON.stringify(cart));
    localStorage.setItem("order_fc", JSON.stringify(fcData));
    router.push('/cart');
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={40} /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-orange-500 p-8 pt-14 text-white rounded-b-[50px] shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => router.back()} className="bg-white/20 p-2 rounded-full backdrop-blur-md">
            <ArrowLeft size={22} />
          </button>
          
          {fcData.campus?.foodCourts?.length > 1 && (
            <button onClick={() => setShowSwitchModal(true)} className="bg-white/20 px-4 py-2 rounded-2xl flex items-center gap-2 backdrop-blur-md text-xs font-bold">
              SWITCH FC <ChevronDown size={14} />
            </button>
          )}
        </div>
        <h1 className="text-4xl font-black mb-1 text-white">Campus {fcData.campus?.campusNumber}</h1>
        <p className="font-bold opacity-90 text-sm flex items-center gap-2"><MapPin size={14}/> {fcData.name}</p>
      </div>

      <div className="p-6 space-y-4">
        {fcData.menuItems?.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-[32px] flex justify-between items-center shadow-sm border border-gray-100 transition-all active:scale-[0.98]">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
              <p className="text-orange-500 font-black text-lg mt-1">₹{item.price}</p>
            </div>
            <div className="flex items-center">
              {cart[item.id] ? (
                <div className="flex items-center bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg">
                  <button onClick={() => removeFromCart(item.id)} className="p-3 hover:bg-gray-800"><Minus size={18} /></button>
                  <span className="px-2 font-black text-lg">{cart[item.id]}</span>
                  <button onClick={() => addToCart(item.id)} className="p-3 hover:bg-gray-800"><Plus size={18} /></button>
                </div>
              ) : (
                <button onClick={() => addToCart(item.id)} className="bg-white border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-2xl font-black hover:bg-orange-50 transition-all">ADD</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showSwitchModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 animate-in slide-in-from-bottom-full duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black">Select FC</h2>
              <button onClick={() => setShowSwitchModal(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {fcData.campus?.foodCourts?.map((fc) => (
                <button key={fc.id} onClick={() => { router.push(`/fc/${fc.id}`); setShowSwitchModal(false); setLoading(true); }} className={`w-full p-5 rounded-3xl text-left font-bold flex justify-between items-center ${fc.id === fcData.id ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-700 border border-gray-100'}`}>
                  {fc.name} {fc.id === fcData.id && <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md">ACTIVE</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {totalItems > 0 && (
        <div className="fixed bottom-8 left-6 right-6 bg-gray-900 text-white p-5 rounded-[30px] flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-10">
          <div className="flex items-center gap-4 pl-2">
            <div className="bg-orange-500 p-2.5 rounded-xl"><ShoppingBag size={20} /></div>
            <div>
              <p className="font-black text-lg leading-tight">{totalItems} Items</p>
              <p className="text-xs text-orange-400 font-bold uppercase tracking-tighter">Total: ₹{totalPrice}</p>
            </div>
          </div>
          <button onClick={handleCheckout} className="bg-orange-500 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-all">Checkout</button>
        </div>
      )}
    </div>
  );
}