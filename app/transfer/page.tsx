"use client";

import { routeModule } from "next/dist/build/templates/pages";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { FaUser, FaWallet, FaArrowRight } from "react-icons/fa";

export default function Transfer() {
  const router = useRouter();
  const [uid, setUid] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Simulate fetching UID on user login
  useEffect(() => {
    const saveUid = localStorage.getItem("uid");
    if (saveUid) setUid(saveUid);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    alert(`Transfer of $${amount} to ${receiver} initiated!`);
    setReceiver("");
    setAmount("");

    try {
      const res = await fetch("http://localhost:4000/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ uid, receiver, amount })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Transfer Failed");
      }
      localStorage.setItem("balance", data.balance);
      router.push("/Dashboard");

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during transfer");
    } finally {
      setLoading(false);
    }       
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center text-white bg-cover bg-center min-w-dvh"
      style={{
        backgroundImage:
          "url('Cedis.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md p-8 mt-20 bg-blue-800/80 rounded-xl shadow-lg">
        {/* UID */}
        <div className="flex items-center gap-3 mb-6 bg-blue-700/50 p-4 rounded-lg">
          <FaWallet className="text-2xl text-teal-400" />
          <span className="font-semibold text-lg">Your UID: {uid}</span>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-teal-300 flex items-center gap-2">
          <FaArrowRight />
          Transfer Funds
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Receiver */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Receiver Email</label>
            <div className="flex items-center gap-2 bg-blue-700/50 rounded-lg px-3 py-2">
              <FaUser className="text-gray-200" />
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="Enter receiver Email"
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                required
              />
            </div>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">Amount</label>
            <div className="flex items-center gap-2 bg-blue-700/50 rounded-lg px-3 py-2">
              <FaWallet className="text-gray-200" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                required
              />
            </div>
          </div>
           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full bg-teal-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-teal-500 transition-colors"
          >
            {loading ? "Transfering..." : "Send Funds"}
          </button>
        </form>
      </div>
    </div>
  );
}
