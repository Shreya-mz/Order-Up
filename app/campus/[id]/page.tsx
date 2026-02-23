"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Plus, Minus, Loader2, Utensils } from "lucide-react";

// Dhyan se dekho: "export default" hona zaroori hai
export default function MenuPage() {
  const params = useParams();
  const id = params?.id; // URL se [id] nikalne ke liye
  const router = useRouter();
  
  const [fc, setFc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/fc/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFc(data);
      } catch (error) {
        console.error("Menu error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const updateCart = (itemId, delta) => {
    setCart((prev) => {
      const newQty = (prev[itemId] || 0) + delta;
      if (newQty <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + (b as number), 0);

  const goToCart = () => {
    localStorage.setItem("order_cart", JSON.stringify(cart));
    localStorage.setItem("order_fc", JSON.stringify(fc));
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
        <p className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Loading KIIT Menu...</p>
      </div>
    );
  }

  if (!fc) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-2xl font-black text-gray-900 mb-2">Menu Not Found!</h1>
        <button onClick={() => router.push('/')} className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white p-6 pt-12 border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <button onClick={() => router.back()} className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1">KIIT Campus {fc.campus?.campusNumber}</p>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{fc.name}</h1>
          </div>
          <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
            <Utensils size={24} />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-4">
        {fc.menuItems?.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex justify-between items-center group">
            <div className="flex-1">
              <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{item.name}</h3>
              <p className="text-xl font-black text-gray-900">₹{item.price}</p>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100">
              {cart[item.id] ? (
                <>
                  <button onClick={() => updateCart(item.id, -1)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 font-black">
                    <Minus size={18} />
                  </button>
                  <span className="font-black w-6 text-center text-gray-900">{cart[item.id]}</span>
                  <button onClick={() => updateCart(item.id, 1)} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 font-black">
                    <Plus size={18} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => updateCart(item.id, 1)} 
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 left-6 right-6 z-50">
          <button 
            onClick={goToCart} 
            className="w-full bg-orange-500 text-white p-5 rounded-[32px] shadow-2xl flex justify-between items-center animate-in slide-in-from-bottom-10"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShoppingCart size={22} />
              </div>
              <div>
                <span className="block font-black uppercase tracking-widest text-[10px] opacity-80 leading-none mb-1">{cartCount} Items</span>
                <span className="font-black text-lg leading-none">View Cart</span>
              </div>
            </div>
            <ArrowLeft size={24} className="rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}