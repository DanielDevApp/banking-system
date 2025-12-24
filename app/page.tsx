"use client";
import Navbar from "@/app/component/navigation";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1620155694360-9bafdbb84e01?auto=format&fit=crop&w=1774&q=80')",
      }}
    >
      {/* Overlay for darker contrast so text pops */}
      <div className="bg-gray-950/70 min-h-screen">
        

        {/* Main Page Content */}
        <main className="flex flex-col items-center justify-center text-center px-6 py-24">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4 drop-shadow-lg">
            Welcome to DanielsApp
          </h1>

          <p className="text-gray-300 max-w-2xl leading-relaxed text-lg">
            Manage your finances easily and securely — deposit, transfer, and withdraw
            money with confidence.
          </p>

          {/* <button className="mt-10 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-cyan-600/40">
            Get Started
          </button> */}
        </main>
      </div>
    </div>
  );
}
