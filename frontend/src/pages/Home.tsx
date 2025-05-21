import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext) as { user: { name: string } | null };

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg p-8 shadow max-w-md w-full">
        <h1 className="text-2xl font-extrabold text-center mb-4 text-blue-700 drop-shadow">
          Hi!
          <span className="text-2xl font-extrabold text-rose-500 drop-shadow-2xl px-2">
            {user ? formatName(user.name) : "Guest"}
          </span>
        </h1>
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Welcome to Task Management App
        </h1>
        <p className="text-gray-700 text-base mb-6 text-center">
          Organize your tasks, set priorities, and never miss a deadline.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to={"/dashboard"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
