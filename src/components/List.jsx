import React from "react";
import { PencilSquareIcon, TrashIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/solid";
import { WalletIcon } from "@heroicons/react/24/outline"; 

export default function List({ data, setData, setEditData, setPage }) {
  
  const playBubble = () => new Audio('/bubble.mp3').play();

  const formatIDR = (amount) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleDelete = (id) => {
    playBubble();
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (trx) => {
    playBubble();
    setEditData(trx);
    setPage("add");
  };

  return (
    <div className="w-full mt-4">
      {data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4 animate-bounce"><WalletIcon className="w-12 h-12 text-blue-400" /></div>
          <h3 className="text-slate-700 font-bold text-lg mb-1">JANGAN BOROS</h3>
          <p className="text-slate-500 font-medium text-sm">Belum ada transaksi di periode ini. catat sekarang!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((trx) => (
            <div key={trx.id} className="flex flex-row items-center justify-between p-3 md:p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all gap-2">
              <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                <div className={`p-2.5 md:p-3 rounded-full flex-shrink-0 ${trx.type === 'Pemasukan' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {trx.type === 'Pemasukan' ? <ArrowTrendingUpIcon className="w-5 h-5" /> : <ArrowTrendingDownIcon className="w-5 h-5" />}
                </div>
                <div className="flex flex-col truncate">
                  <h3 className="text-sm md:text-base font-bold text-slate-800 capitalize truncate">{trx.desc}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded-md font-medium text-[9px] md:text-xs text-slate-500">{trx.type}</span>
                    <span className="text-[9px] md:text-xs text-slate-400 font-medium whitespace-nowrap">• {formatDate(trx.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4 flex-shrink-0">
                <p className={`text-xs md:text-base font-bold ${trx.type === 'Pemasukan' ? 'text-green-600' : 'text-slate-800'}`}>{trx.type === 'Pemasukan' ? '+' : '-'}{formatIDR(trx.amount)}</p>
                <div className="flex items-center gap-1 sm:border-l sm:border-slate-200 sm:pl-4 mt-1 sm:mt-0">
                  {/* Efek Bubble di Edit/Hapus */}
                  <button onClick={() => handleEdit(trx)} className="p-1 md:p-2 text-blue-500 rounded-lg active:bg-blue-200 active:scale-75 transition-all duration-200"><PencilSquareIcon className="w-5 h-5 md:w-6 md:h-6" /></button>
                  <button onClick={() => handleDelete(trx.id)} className="p-1 md:p-2 text-red-500 rounded-lg active:bg-red-200 active:scale-75 transition-all duration-200"><TrashIcon className="w-5 h-5 md:w-6 md:h-6" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}