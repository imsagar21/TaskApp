import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import type { AuthContextType } from "../types";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
      <div
        className="font-bold text-lg text-blue-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        TaskApp
      </div>
      <div className="flex gap-3">
        {user ? (
          <button
            onClick={logout}
            className="bg-red-200 text-red-800 rounded px-3 py-1 font-medium hover:bg-red-300 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-700 text-white rounded px-3 py-1 font-medium hover:bg-blue-800 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-gray-200 text-gray-800 rounded px-3 py-1 font-medium hover:bg-gray-300 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
