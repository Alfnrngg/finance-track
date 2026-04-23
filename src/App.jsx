import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";
import Login from "./components/Login";


export default function App() {
  const [page, setPage] = useState("home");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    if (login === "true") setIsLogin(true);

    const saved = JSON.parse(localStorage.getItem("transactions")) || [];

    // FIX DATA LAMA
    const fixed = saved.map((item) => ({
      ...item,
      category: item.category || "lainnya",
    }));

    setData(fixed);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  if (!isLogin) return <Login onLogin={setIsLogin} />;

  return (
    <div className="flex">
      <Sidebar setPage={setPage} setIsLogin={setIsLogin} />

      {page === "home" && (
        <Home data={data} setData={setData} setEditData={setEditData} />
      )}

      {page === "add" && (
        <AddTransaction
          setData={setData}
          editData={editData}
          setEditData={setEditData}
        />
      )}
    </div>
  );
}