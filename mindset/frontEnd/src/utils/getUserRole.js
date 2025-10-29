// utils/getUserRole.js
import jwtDecode from "jwt-decode";

export default function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role; // 👈 depends on your backend payload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
