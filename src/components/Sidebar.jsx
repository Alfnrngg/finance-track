import { 
  HomeIcon, 
  PlusIcon, 
  ArrowLeftOnRectangleIcon, 
  WalletIcon 
} from "@heroicons/react/24/solid";

export default function Sidebar({ setPage, setIsLogin }) {
  
  const playBubble = () => {
    const audio = new Audio('/bubble.mp3');
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Audio santai aja:", err));
  };

  const handleNav = (page) => {
    playBubble();
    setPage(page); 
  };

  const handleLogout = () => {
    playBubble();
    localStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  return (
    <>
      {/* =========================================
          1. SIDEBAR DESKTOP
      ========================================= */}
      <div className="
        hidden lg:flex w-56 h-[95vh] m-3 rounded-2xl p-5 text-white fixed 
        bg-gradient-to-b from-blue-500 to-blue-800
        shadow-xl flex-col z-50 overflow-hidden
      ">
        {/* INI IKON BACKGROUND TRANSPARAN (Sesuai Gambar Contoh) */}
        <WalletIcon className="absolute -right-6 -top-6 w-40 h-40 text-white/10 -rotate-12 pointer-events-none" />
        <WalletIcon className="absolute -left-10 bottom-20 w-48 h-48 text-white/5 rotate-12 pointer-events-none" />

        {/* LOGO DENGAN ANIMASI MELAYANG OTOMATIS */}
        <div className="flex items-center gap-3 mb-10 px-1 group cursor-default relative z-10">
          <div className="bg-white/20 p-2 rounded-xl shadow-inner transition-transform group-hover:scale-110">
            <WalletIcon className="w-7 text-white flex-shrink-0 animate-float" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide text-white truncate">
              Finance Alfin
            </h1>
            <p className="text-[10px] text-blue-200/60 font-medium">Money Tracker</p>
          </div>
        </div>

        {/* MENU UTAMA */}
        <div className="flex flex-col gap-1.5 relative z-10">
          <p className="px-3 mb-1 text-[10px] font-bold tracking-widest text-blue-200/60 uppercase">Menu Utama</p>
          
          <button 
            onClick={() => handleNav("home")} 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 font-medium active:scale-95 transition-all text-blue-100 hover:text-white"
          >
            <HomeIcon className="w-5 flex-shrink-0" /> 
            <span className="truncate">Dashboard</span>
          </button>

          <div className="my-3 border-t border-white/20"></div>

          <p className="px-3 mb-1 text-[10px] font-bold tracking-widest text-blue-200/60 uppercase">Operasional</p>

          <button 
            onClick={() => handleNav("add")} 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 font-medium active:scale-95 transition-all text-blue-100 hover:text-white"
          >
            <PlusIcon className="w-5 flex-shrink-0" /> 
            <span className="truncate">Tambah & Edit</span>
          </button>
        </div>

        {/* BAGIAN LOGOUT (BAWAH) */}
        <div className="mt-auto flex flex-col gap-4 relative z-10">
          <div className="my-3 border-t border-white/20"></div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/25 active:scale-95 transition-all text-blue-100 hover:text-red-500 font-medium"
          >
            <ArrowLeftOnRectangleIcon className="w-5 flex-shrink-0" /> 
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>

      {/* =========================================
          2. TOP NAV MOBILE
      ========================================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-100 flex justify-center items-center p-4 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <WalletIcon className="w-6 h-6 text-blue-600 animate-float" />
          <h1 className="text-lg font-semibold text-slate-800">Finance Alfin</h1>
        </div>
      </div>

      {/* =========================================
          3. BOTTOM NAV MOBILE
      ========================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between items-center px-10 pb-2 pt-2 z-50 h-[68px]">
        <button onClick={() => handleNav("home")} className="flex flex-col items-center p-2 text-slate-400 active:text-blue-600 active:scale-90 transition-all w-16">
          <HomeIcon className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={() => handleNav("add")} 
          className="absolute left-1/2 -translate-x-1/2 -top-6 flex flex-col items-center"
        >
          <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 border-4 border-slate-50 active:scale-75 transition-all duration-200">
            <PlusIcon className="w-6 h-6" />
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center p-2 text-slate-400 active:text-red-500 active:scale-90 transition-all w-16"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </div>
    </>
  );
}