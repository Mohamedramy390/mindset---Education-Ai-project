import React from "react";
import { useRooms } from "../context/RoomsContext";
import { useNavigate } from "react-router-dom";
import "./StudentSide/Rooms.css" ;
import { useAuth } from "../context/AuthContext";
import EnrolledRooms from "./StudentSide/EnrolledRooms";
import TeacherDashboard from "./TeacherSide/TeacherDashboard";

export default function MyRooms() {
  
 const { user, loading } = useAuth(); // if your context has a loading flag
  // Still loading auth state
  if (loading) return <p>Loading...</p>;

  // If no user found (not logged in)
  if (!user) return <p>Please log in first.</p>;

  // Now safe to access role
  if (user.role === "student") return <EnrolledRooms />;
  if (user.role === "teacher") return <TeacherDashboard />;
  
}
