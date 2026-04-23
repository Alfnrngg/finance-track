import { BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, WalletIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import List from "./List";

const format = (num) => "Rp " + new Intl.NumberFormat("id-ID").format(num);

export default function Home({ data, setData, setEditData, setPage }) {
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("");

  const dataBulanIni = filterMonth === "" 
    ? data 
    : data.filter((d) => d.date && d.date.startsWith(filterMonth));

  const finalFilteredData = filterType === "all" 
    ? dataBulanIni 
    : dataBulanIni.filter((d) => d.type === filterType);

  const income = dataBulanIni.filter((d) => d.type === "Pemasukan").reduce((a, b) => a + b.amount, 0);
  const expense = dataBulanIni.filter((d) => d.type === "Pengeluaran").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  return (
    /* overflow-hidden penting agar ikon yang melayang keluar layar tidak membuat scrollbar */
    <div className="lg:ml-64 pt-24 pb-32 px-4 lg:pt-8 lg:pb-8 lg:px-8 w-full bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* =========================================
          BACKGROUND ICONS DINAMIS (Watermark)
      ========================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <WalletIcon className="absolute top-20 right-[10%] w-64 h-64 text-slate-200/40 -rotate-12 animate-float" style={{ animationDelay: '5s' }} />
        <WalletIcon className="absolute bottom-40 left-[5%] w-80 h-80 text-slate-200/30 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
        <WalletIcon className="absolute top-[40%] left-[30%] w-40 h-40 text-slate-200/20 -rotate-45 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Konten Utama dibungkus relative z-10 agar selalu di atas ikon background */}
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Welcome to financial management, Alfin!
          </h1>
          <p className="text-sm md:text-base text-slate-400 mt-1 font-medium italic">
            Monitor and manage your finances smarter today.
          </p>
        </div>

        {/* Grid Card Saldo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 md:gap-4 border-l-4 border-l-blue-500 transition-all hover:-translate-y-4">
            <div className="p-2 md:p-3 bg-blue-50 rounded-full">
              <BanknotesIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-[11px] md:text-sm font-semibold text-slate-500">Saldo {filterMonth ? 'Bulan Ini' : 'Total'}</p>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800">{format(balance)}</h2>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 md:gap-4 border-l-4 border-l-green-400 transition-all hover:-translate-y-4">
            <div className="p-2 md:p-3 bg-green-50 rounded-full">
              <ArrowTrendingUpIcon className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
            <div>
              <p className="text-[11px] md:text-sm font-semibold text-slate-500">Pemasukan</p>
              <h2 className="text-lg md:text-2xl font-bold text-green-600">{format(income)}</h2>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 md:gap-4 border-l-4 border-l-red-400 transition-all hover:-translate-y-4">
            <div className="p-2 md:p-3 bg-red-50 rounded-full">
              <ArrowTrendingDownIcon className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
            </div>
            <div>
              <p className="text-[11px] md:text-sm font-semibold text-slate-500">Pengeluaran</p>
              <h2 className="text-lg md:text-2xl font-bold text-red-600">{format(expense)}</h2>
            </div>
          </div>
        </div>

        <div className="w-full bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-800">Histori Transaksi</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-start sm:items-center">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input 
                  type="month" 
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full sm:w-auto flex-1 sm:flex-none p-2 border border-slate-200 bg-slate-50 text-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                />
                {filterMonth && (
                  <button onClick={() => setFilterMonth("")} className="text-xs text-red-500 font-bold hover:underline whitespace-nowrap bg-red-50 px-3 py-2 rounded-lg transition-colors">
                    Reset
                  </button>
                )}
              </div>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full sm:w-auto p-2 border border-slate-200 bg-white text-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium">
                <option value="all">Semua kategori</option>
                <option value="Pemasukan">Pemasukan</option>
                <option value="Pengeluaran">Pengeluaran</option>
              </select>
            </div>
          </div>
          <List data={finalFilteredData} setData={setData} setEditData={setEditData} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}