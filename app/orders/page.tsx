"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle2, Package, Loader2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Note: userId "test-user-id" wahi hai jo humne seed mein dala tha
    fetch("/api/orders?userId=test-user-id")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={40} /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-white p-6 pt-12 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Orders</h1>
      </div>

      <div className="p-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 opacity-40">
            <Package size={60} className="mx-auto mb-4" />
            <p className="font-bold">No orders yet. Bhook nahi lagi?</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-black text-orange-500 uppercase tracking-widest">Order #{order.id.slice(-5)}</p>
                  <h3 className="text-lg font-black text-gray-900">{order.foodCourt.name}</h3>
                </div>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm font-bold text-gray-500">
                    <span>{item.qty}x {item.name}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={14} />
                  <span className="text-xs font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xl font-black text-gray-900">₹{order.totalAmount}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
