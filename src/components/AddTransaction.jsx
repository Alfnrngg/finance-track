import React from "react";
import Form from "./Form";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default function AddTransaction({ setData, editData, setEditData, setPage }) {
  return (
    // PERBAIKAN UTAMA: pb-40 (Padding Bottom ekstra besar) ditambahkan untuk layar HP
    <div className="lg:ml-64 pt-24 pb-40 px-4 lg:pt-8 lg:pb-8 lg:px-8 w-full min-h-screen bg-slate-50">
      
      {/* Bagian Header Halaman */}
      <div className="mb-6 md:mb-8 flex items-center gap-4">
        <div className="p-2 md:p-3 bg-blue-100 text-blue-600 rounded-xl hidden sm:block">
          <DocumentTextIcon className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {editData ? "Edit Transaksi" : "Catat Transaksi Baru"}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Silakan masukkan detail {editData ? "perubahan" : "pemasukan atau pengeluaran"} dana Kamu di bawah ini.
          </p>
        </div>
      </div>

      {/* Bagian Card Pembungkus Form */}
      {/* Tambahan mb-10 agar ada jarak ekstra antara card dengan dasar halaman */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-8 mb-10">
        <Form
          setData={setData}
          editData={editData}
          setEditData={setEditData}
          setPage={setPage} 
        />
      </div>

    </div>
  );
}