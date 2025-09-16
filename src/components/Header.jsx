import React from "react";
import { FaHome, FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="flex justify-between items-center bg-[#f8f8f8] py-2 px-5 h-20 shadow">
      {/* Left - Logo */}
      <div className="py-2 px-5 border-none bg-[#e0e0e0] rounded-lg cursor-pointer font-bold">
        <button className="logo-btn">Logo</button>
      </div>

      {/* Center - Nav Icons */}
      <nav className="flex gap-10">
        <FaHome
          onClick={() => setActiveTab("Homepage")}
          className={
            activeTab === "Homepage"
              ? "text-blue-400 text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
              : "text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
          }
        />
        <FaUser
          onClick={() => setActiveTab("Profile")}
          className={
            activeTab === "Profile"
              ? "text-blue-400 text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
              : "text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
          }
        />
        <FaHeart
          onClick={() => setActiveTab("Favorites")}
          className={
            activeTab === "Favorites"
              ? "text-blue-400 text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
              : "text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
          }
        />
      </nav>

      {/* Right - Logout */}
      <div className="flex items-center">
        <FaSignOutAlt className="text-red-500 text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125" />
      </div>
    </header>
  );
}
