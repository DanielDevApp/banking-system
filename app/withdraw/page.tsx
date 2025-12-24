"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { FaMoneyBillWave, FaIdBadge } from "react-icons/fa";

export default function Withdraw() {
  const router = useRouter();
  const [uid, setUid] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // Generate UID on page load
  useEffect(() => {
    const savedUid = localStorage.getItem("uid");
    if (savedUid) setUid(savedUid);
  }, []
  );


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
      alert(`GHC${amount} withrawn!`);
      setAmount("");
    
    try {
      const res = await fetch("http://localhost:4000/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ uid, amount })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Withdrawal Failed");
      } 
      localStorage.setItem("balance", data.balance);
    router.push("/Dashboard");


    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred withdrawing funds");
    } finally {
      setLoading(false);
    }
  };



 
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-blue-800/80 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-teal-400">
          <FaMoneyBillWave />
          Withdraw Funds
        </h1>
        <form onSubmit={handleSubmit}  className="space-y-4">
          {/* UID field */}
          <div>
            <label
              htmlFor="uid"
              className="block text-gray-300 mb-2 flex items-center gap-1"
            >
              <FaIdBadge className="text-teal-400" /> User ID
            </label>
            <input
              id="uid"
              type="text"
              value={uid}
              readOnly
              className="w-full px-4 py-3 rounded-lg bg-blue-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Amount field */}
          <div>
            <label htmlFor="amount" className="block text-gray-300 mb-2">
              Amount to Withdraw
            </label>
            <input
              id="amount" 
              type="number" value={amount} onChange={(e)=> setAmount(e.target.value) }
              className="w-full px-4 py-3 rounded-lg bg-blue-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter amount to withdraw"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-lg transition-colors"
          >
            Withdraw Now
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-300">
          Note: Withdrawal may take up to 24 hours to process.
        </p>
      </div>
    </div>
  );
}
