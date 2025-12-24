"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";


export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-950 text-gray-100 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
  <FaUniversity className="text-cyan-400 text-3xl group-hover:text-cyan-300 transition-colors" />
  <span className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
    DanielsApp
  </span>
</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
        <Link
            href="/Dashboard"
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md text-sm font-semibold text-white transition-all"
          >
            Dashboard
          </Link>
          <Link
            href="/Login"
            className="hover:text-cyan-400 transition-colors font-medium"
          >
            Login
          </Link>
         
          <Link
            href="/Register"
            className="hover:text-cyan-400 transition-colors font-medium"
          >
            Register
          </Link>
          <Link
            href="/signup"
            className="hover:text-cyan-400 transition-colors font-medium"
          >
            Signup
          </Link>
         
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link
              href="/login"
              className="hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
            <Link
              href="/register"
              className="hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/dashboard"
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md text-sm font-semibold text-white transition-all text-center"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
