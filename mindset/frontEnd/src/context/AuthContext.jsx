import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, role, id }
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Decode token to get role and user info
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // If token has exp (seconds), ensure it's not expired
        if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
          delete axios.defaults.headers.common["Authorization"];
          return;
        }
        setUser({ email: decoded.email, role: decoded.role, id: decoded.id });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        console.error("Invalid JWT token", e);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common["Authorization"];
      }
    } else {
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Use direct backend URL per request
  axios.defaults.baseURL = 'http://localhost:4000/api'

  const login = async (email, password) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });
      const token = res.data.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return null;
    }
  };

  const register = async (firstName, secondName, email, password, role) => {
    try {
      const res = await axios.post("/users/register", {
        firstName,
        secondName, 
        email,
        password,
        role,
      });
      return res.data;
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
