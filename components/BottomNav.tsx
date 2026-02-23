import { Home, ShoppingBag, ClipboardList, User } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex justify-around items-center z-50">
      <div className="flex flex-col items-center text-orange-500">
        <Home size={22} />
        <span className="text-[10px] font-bold">Home</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <ShoppingBag size={22} />
        <span className="text-[10px] font-medium">Cart</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <ClipboardList size={22} />
        <span className="text-[10px] font-medium">Orders</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <User size={22} />
        <span className="text-[10px] font-medium">Profile</span>
      </div>
    </div>
  );
}