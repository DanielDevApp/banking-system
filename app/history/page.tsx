"use client";

import { useState, useEffect } from "react";
import { FaHistory, FaMoneyBillWave, FaWallet, FaExchangeAlt } from "react-icons/fa";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load UID on mount
  useEffect(() => {
    const savedUid = localStorage.getItem("uid");
    if (savedUid) {
      setUid(savedUid);
      fetchHistory(savedUid);
    }
  }, []);

  // Fetch history from backend
  const fetchHistory = async (uid: userId) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ uid: userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch history");
      }

      // Set the transactions returned from backend
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-4xl p-8 mt-12 bg-blue-800/80 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-teal-400">
          <FaHistory />
          Transaction History
        </h1>

        {loading && <p className="text-yellow-300 mb-4">Loading history...</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-300 border-b border-gray-500">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction:any ) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-700 hover:bg-blue-700/40 transition-colors"
                >
                  <td className="px-4 py-3">{transaction.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {transaction.type === "Deposit" && <FaWallet className="text-green-400" />}
                    {transaction.type === "Withdraw" && <FaMoneyBillWave className="text-red-400" />}
                    {transaction.type === "Transfer" && <FaExchangeAlt className="text-yellow-400" />}
                    {transaction.type}
                  </td>
                  <td className="px-4 py-3">${Number(transaction.amount).toFixed(2)}</td>
                  <td className="px-4 py-3">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-gray-300">
          All transactions are displayed for your reference.
        </p>
      </div>
    </div>
  );
}
