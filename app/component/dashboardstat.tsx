"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaWallet, FaMoneyBillWave, FaExchangeAlt, FaDatabase, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function DashboardStats() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [username, setUserName] = useState("");
  const [balance, setBalance] = useState("");

useEffect(() => {
  const storedName = localStorage.getItem("username");
  if (storedName) setUserName(storedName);

  const token = localStorage.getItem("token");

  fetch("http://localhost:4000/walletBalance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.balance !== undefined) {
        setBalance(data.balance);
        localStorage.setItem("balance", data.balance);
      }
    })
    .catch((err) => console.error(err));
}, []);


  const navLinks = [
    { href: "/deposit", label: "Deposit", color: "from-blue-500 to-teal-400", icon: <FaWallet /> },
    { href: "/withdraw", label: "Withdraw", color: "from-green-500 to-emerald-400", icon: <FaMoneyBillWave /> },
    { href: "/transfer", label: "Transfer", color: "from-yellow-500 to-orange-400", icon: <FaExchangeAlt /> },
    { href: "/history", label: "History", color: "from-purple-500 to-pink-500", icon: <FaDatabase /> },
  ];

  const handleLogout = () => alert("Logged out!");

  return (
    <div
      className="relative min-h-screen flex flex-col text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')", 
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaWallet className="text-3xl text-blue-400" />
            <h1 className="text-2xl font-bold tracking-wide">MyBank</h1>
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group flex items-center gap-2 rounded-lg cursor-pointer"
                >
                  {/* Hover Color Box */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{ zIndex: -1 }}
                  />
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-200 hover:text-white"
                    }`}
                  >
                    {/* Icon */}
                    <span className="text-lg">{link.icon}</span>
                    {/* Label */}
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-lg border border-white/20">
           <div className="text-left flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-3xl text-blue-300" />
                <p className="text-lg text-gray-300">{username}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-3xl text-green-400" />
                <p className="text-lg font-semibold text-green-400">
                  Balance: GHC{balance ? Number(balance).toLocaleString() : "0"} 
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="ml-3 flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold transition-colors"
            >
              <FaSignOutAlt />
              {loading ? "Loging Out" : "Logout"} 
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-3xl text-gray-200 mt-20">Welcome to your Dashboard</h2>
        </div>
      </div>
    </div>
  );
}
