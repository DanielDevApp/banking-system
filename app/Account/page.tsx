"use client";
import { useState } from "react";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWallet, FaCreditCard, FaCalendarAlt,
  FaShieldAlt, FaEdit, FaCheck, FaTimes
} 
from "react-icons/fa";

export default function Account() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Daniel Johnson",
    email: "daniel.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    accountNumber: "**** **** **** 4521",
    accountType: "Premium Savings",
    balance: "$12,450.75",
    memberSince: "January 2020",
    status: "Active",
  });

  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => {
    setEditedData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-cyan-950 to-gray-900 relative overflow-hidden py-12 px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500 rounded-full blur-[150px] opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-[180px] opacity-25 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
            My Account
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your profile and account information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-800 rounded-2xl shadow-2xl p-8">
              {/* Profile Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 ring-4 ring-gray-800">
                  <FaUser className="text-5xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="bg-gray-800 text-white text-center px-3 py-1 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  ) : (
                    userData.fullName
                  )}
                </h2>
                <p className="text-cyan-400 font-medium">{userData.accountType}</p>
                <span className="mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {userData.status}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 border-t border-gray-800 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2">
                    <FaWallet className="text-cyan-400" />
                    Balance
                  </span>
                  <span className="text-white font-bold text-xl">
                    {userData.balance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2">
                    <FaCreditCard className="text-cyan-400" />
                    Account
                  </span>
                  <span className="text-white font-mono text-sm">
                    {userData.accountNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2">
                    <FaCalendarAlt className="text-cyan-400" />
                    Member Since
                  </span>
                  <span className="text-white">{userData.memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Card - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-800 rounded-2xl shadow-2xl p-8">
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all"
                    >
                      <FaCheck /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Information Fields */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-600/10 p-3 rounded-lg">
                    <FaEnvelope className="text-cyan-400 text-xl" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm mb-1 block">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    ) : (
                      <p className="text-white text-lg">{userData.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-600/10 p-3 rounded-lg">
                    <FaPhone className="text-cyan-400 text-xl" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm mb-1 block">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    ) : (
                      <p className="text-white text-lg">{userData.phone}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-600/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm mb-1 block">Address</label>
                    {isEditing ? (
                      <textarea
                        value={editedData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={2}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                      />
                    ) : (
                      <p className="text-white text-lg">{userData.address}</p>
                    )}
                  </div>
                </div>

                {/* Account Security */}
                <div className="border-t border-gray-800 pt-6 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaShieldAlt className="text-green-400 text-xl" />
                    <h4 className="text-xl font-semibold text-white">Account Security</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-300">Two-Factor Authentication</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                        Enabled
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-300">Login Alerts</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-300">Transaction Notifications</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                        On
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <button className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl p-4 hover:border-cyan-500 transition-all text-left group">
                <FaWallet className="text-cyan-400 text-2xl mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-semibold mb-1">Deposit Funds</h4>
                <p className="text-gray-400 text-sm">Add money to your account</p>
              </button>
              <button className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl p-4 hover:border-blue-500 transition-all text-left group">
                <FaCreditCard className="text-blue-400 text-2xl mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-semibold mb-1">Transfer Money</h4>
                <p className="text-gray-400 text-sm">Send money to others</p>
              </button>
              <button className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition-all text-left group">
                <FaShieldAlt className="text-purple-400 text-2xl mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-semibold mb-1">Security Settings</h4>
                <p className="text-gray-400 text-sm">Manage security options</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} DanielsApp — Secure Banking
        </div>
      </div>
    </div>
  );
}
