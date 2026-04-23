import { useState } from "react";
import { WalletIcon, BanknotesIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  // FUNGSI SUARA BUBBLE
  const playBubble = () => new Audio('/bubble.mp3').play();

  const login = () => {
    playBubble(); // Mainkan suara saat diklik
    if (!user || !pass) { setError("Isi semua yaa"); return; }
    if (user === "alfin" && pass === "123") {
      localStorage.setItem("isLogin", "true");
      onLogin(true);
    } else {
      setError("Hayooo Kamu Siapa");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2ff] p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden relative z-10">

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-10 text-white bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 relative overflow-hidden">
          <WalletIcon className="absolute w-32 h-32 text-white/10 -top-10 -right-10 animate-pulse" />
          <BanknotesIcon className="absolute w-24 h-24 text-white/10 bottom-10 left-10 animate-pulse delay-700" />
          <ChartBarIcon className="absolute w-40 h-40 text-white/5 top-1/2 right-1/4 animate-pulse delay-1000" />
          <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full blur-3xl -bottom-10 -right-10"></div>
          <div className="relative z-10">
            <p className="text-sm md:text-base opacity-80 font-medium tracking-wide">You can easily</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-2 leading-snug">Hi... Alfin <br /> Manage your finances<br className="hidden md:block"/> with organizing your finances</h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Get Started Now</h2>
          <p className="text-sm font-semibold text-gray-500 mb-6 md:mb-8">Login to your account to continue</p>
          {error && <div className="bg-red-50 text-red-500 text-sm font-medium p-3 rounded-xl mb-4 border border-red-100">{error}</div>}

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">Username</label>
            <input value={user} onChange={(e) => { setUser(e.target.value); setError(""); }} className="w-full p-3.5 mt-1.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all" placeholder="Masukkan username" />
          </div>
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input type="password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} className="w-full p-3.5 mt-1.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all" placeholder="Masukkan password" />
          </div>

          {/* EFEK BUBBLE: active:scale-90 active:bg-blue-400 */}
          <button onClick={login} className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3.5 rounded-xl font-bold active:scale-90 active:opacity-80 transition-all duration-200 shadow-lg shadow-blue-500/30">
            Login
          </button>
          <p className="text-xs text-gray-400 mt-6 text-center font-medium">Jangan Lupa Nabung</p>
        </div>
      </div>
    </div>
  );
}