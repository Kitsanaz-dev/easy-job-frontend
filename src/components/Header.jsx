// components/Header.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { getUserInfo } from "../services/auth";
import { useEffect, useState } from "react";

const base =
  "text-3xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125";
const active = "text-blue-400";

export default function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    // TODO: clear tokens/localStorage etc.
    navigate("/"); // back to login
  };

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getUserInfo();
      if (u) {
        setUserName(u.name || u.username || "Guest");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="z-[11] fixed top-0 w-full">
      <header className="flex justify-between items-center bg-[#f8f8f8] py-2 px-5 h-20">
        {/* Left - Profile (icon + username) */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-lg">
          <FaUser className="text-2xl text-gray-700" />
          <span className="font-semibold text-gray-800">
            {userName || "Guest"}
          </span>
        </div>

        {/* Center - Nav Icons */}
        <nav className="flex gap-10 items-center">
          <NavLink
            to="/home"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            aria-label="Home"
          >
            <FaHome />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            aria-label="Profile"
          >
            <FaUser />
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            aria-label="Favorites"
          >
            <FaHeart />
          </NavLink>
        </nav>

        {/* Right - Logout */}
        <button onClick={logout} aria-label="Logout">
          <FaSignOutAlt className="text-red-500 text-3xl transition-transform duration-200 hover:scale-125" />
        </button>
      </header>
    </div>
  );
}
