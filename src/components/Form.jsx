import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Form({ setData, editData, setEditData, setPage }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(""); 
  const [type, setType] = useState("Pengeluaran");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showToast, setShowToast] = useState(false);

  // FUNGSI SUARA BUBBLE YANG LEBIH STABIL
  const playBubble = () => {
    const audio = new Audio('/bubble.mp3');
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Audio santai aja:", err));
  };

  useEffect(() => {
    if (editData) {
      setDesc(editData.desc);
      setType(editData.type);
      setAmount(new Intl.NumberFormat("id-ID").format(editData.amount));
      setDate(editData.date || new Date().toISOString().split("T")[0]);
    }
  }, [editData]);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (!rawValue) {
      setAmount("");
      return;
    }
    setAmount(new Intl.NumberFormat("id-ID").format(rawValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playBubble(); // Bunyi bubble saat simpan

    const pureAmount = parseInt(amount.replace(/\./g, ""), 10);
    const newData = { id: editData ? editData.id : Date.now(), desc, amount: pureAmount, type, date };

    if (editData) {
      setData((prev) => prev.map((item) => (item.id === editData.id ? newData : item)));
      setEditData(null); 
    } else {
      setData((prev) => [...prev, newData]);
    }

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      if (setPage) setPage("home");
    }, 1500);
  };

  return (
    <div className="relative">
      {/* NOTIFIKASI SUKSES */}
      {showToast && (
        <div className="fixed top-20 md:top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-2xl z-[99] flex items-center gap-3 animate-bounce">
          <CheckCircleIcon className="w-6 h-6 text-green-400" />
          <span className="font-semibold text-sm md:text-base whitespace-nowrap">Berhasil Disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* INPUT TANGGAL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700" 
            required 
          />
        </div>

        {/* INPUT KETERANGAN */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Keterangan</label>
          <input 
            type="text" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            placeholder="Contoh: Makan Siang, Shopping dll" 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700" 
            required 
          />
        </div>

        {/* INPUT NOMINAL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Nominal</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
            <input 
              type="text" 
              value={amount} 
              onChange={handleAmountChange} 
              placeholder="1.000.000" 
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700 font-medium" 
              required 
            />
          </div>
        </div>

        {/* PILIHAN TIPE */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe Transaksi</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="type" 
                value="Pengeluaran" 
                checked={type === "Pengeluaran"} 
                onChange={(e) => { playBubble(); setType(e.target.value); }} 
                className="w-4 h-4 text-blue-600 cursor-pointer" 
              />
              <span className="text-slate-700 group-hover:text-blue-600 transition-colors">Pengeluaran</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="type" 
                value="Pemasukan" 
                checked={type === "Pemasukan"} 
                onChange={(e) => { playBubble(); setType(e.target.value); }} 
                className="w-4 h-4 text-blue-600 cursor-pointer" 
              />
              <span className="text-slate-700 group-hover:text-blue-600 transition-colors">Pemasukan</span>
            </label>
          </div>
        </div>

        {/* TOMBOL SIMPAN DENGAN TEKS & EFEK BUBBLE */}
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-90 active:opacity-80"
          >
            {editData ? "Simpan Perubahan" : "Simpan Transaksi"}
          </button>

          {editData && (
            <button 
              type="button" 
              onClick={() => { playBubble(); setEditData(null); if(setPage) setPage("home"); }} 
              className="w-full bg-slate-100 text-slate-700 font-bold py-3.5 rounded-xl mt-3 active:scale-95 transition-all"
            >
              Batal Edit
            </button>
          )}
        </div>

      </form>
    </div>
  );
}