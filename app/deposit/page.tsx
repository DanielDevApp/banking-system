"use client";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState, useEffect, FormEvent } from "react";
import { FaWallet, FaLock } from "react-icons/fa";

export default function Deposit() {
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
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate API call or async operation
    try {
      const response = await fetch("http://localhost:4000/Deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`

          
        },
        body: JSON.stringify({ uid, amount, otp })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Deposit Failed");
      }
      localStorage.setItem("balance", data.balance);

       alert(`Deposited GHC${amount}!`);
      setAmount("");
      setOtp("");
    router.push("/Dashboard");

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while Depositing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('cash-deposits.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-8 mt-20 bg-blue-800/50 rounded-xl shadow-lg backdrop-blur-md">
        {/* UID */}
        <div className="flex items-center gap-3 mb-6 bg-blue-700/40 p-4 rounded-lg">
          <FaWallet className="text-2xl text-teal-400" />
          <span className="font-semibold text-lg">UserID: {uid}</span>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-teal-300">
          Deposit Funds
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Amount */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Amount</label>
            <input type="number" value= {amount} onChange={(e)=>setAmount(e.target.value)}
              placeholder="Enter amount to deposit"
              className="bg-blue-700/40 text-white placeholder-gray-300 rounded-lg px-3 py-2 outline-none"
              required
            />
          </div>

          {/* OTP */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">OTP</label>
            <div className="flex items-center gap-2 bg-blue-700/40 rounded-lg px-3 py-2">
              <FaLock className="text-gray-200" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
               
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-teal-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-teal-500 transition-colors"
          >
            {loading ? "Processing..." : "Deposit"}
           
          </button>
        </form>
      </div>
    </div>
  );
}
