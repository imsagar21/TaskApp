import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { UserResponse, UserRequest, AuthContextType } from "../types";

const BASE_URL = "http://localhost:5050";

const AuthContext = createContext<AuthContextType | null>(null);

const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const res = await axios.get(`${BASE_URL}/auth/checkAuth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const checkedUser = await checkAuth();
      if (checkedUser) {
        setUser(checkedUser);
        localStorage.setItem("user", JSON.stringify(checkedUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    verifyAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    confirm("Are you Sure to logout?");
    setUser(null);
    navigate("/");
  };

  const login = async (userRequest: UserRequest) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email: userRequest.email,
        password: userRequest.password,
      });

      const { token, user: loggedInUser } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      console.log("Logged in user:", loggedInUser);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("An unexpected error occurred during login:", error);
      }
    }
  };

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
