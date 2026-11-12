
import { useEffect, useState } from "react";
import { X, ShoppingBag } from "lucide-react";

export default function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#faf8f3] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">

        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100"
          aria-label="Close offer"
        >
          <X size={20} />
        </button>

        <div className="bg-[#183b56] text-white text-center py-3">
          <p className="text-xs tracking-[3px] uppercase">
            Special Offer
          </p>
          <h2 className="text-xl font-semibold mt-1">
            A Little Treat for You!
          </h2>
        </div>

        <div className="p-6 text-center">

          <img
            src="/packaging.png"
            alt="6 Suta Premium Makhana"
            className="w-full h-48 object-contain mb-4"
          />

          <p className="text-[#b58a45] text-xs font-semibold tracking-widest uppercase">
            Veenuts Bestseller
          </p>

          <h3 className="text-xl font-bold text-[#183b56] mt-2">
             Premium Makhana 
          </h3>
           <p className=" text-gray-500 mt-1">
            Shaam Ki Bhook Ka Premium Ilaaj!
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Premium Quality · 250g Pack
          </p>

          <div className="flex justify-center items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-[#183b56]">
              ₹220
            </span>
            <span className="text-gray-400 line-through">
              ₹499
            </span>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">
              SAVE 56%
            </span>
          </div>

          <a
            href="/?category=retail"
            className="mt-6 w-full bg-[#b58a45] hover:bg-[#9d7435] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag size={18} />
            Shop Now
          </a>

          <p className="text-xs text-gray-400 mt-4">
            Premium snacking starts with Veenuts.
          </p>

        </div>
      </div>
    </div>
  );
}
