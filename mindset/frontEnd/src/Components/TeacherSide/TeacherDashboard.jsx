import React, { useEffect, useState } from "react";
import "./TeacherDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserRooms } from "../../api/apis";

function TeacherDashboard() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

   const fetchRooms = async () => {
    try{
      setLoading(true)
      const roomsData = await getUserRooms()
      console.log(roomsData)
      setRooms(roomsData);
    }catch (err) {
      console.error("Failed to load rooms", err);
    } finally {
      setLoading(false);
    }
   }

   useEffect(() => {
      const fetchData = async () => {
        await fetchRooms();
      };
      fetchData();
    }, []);


   if(loading) return "Loading..."

  return (
    <div className="teacher-dashboard">
      {/* Sticky Navbar */}
      <nav className="teacher-navbar">
        <div className="teacher-navbar-left">
          <h2>Teacher Dashboard</h2>
        </div>
        <div className="teacher-navbar-right">
          <button className="teacher-logout-btn"><Link to="/Login">Logout</Link></button>
        </div>
      </nav>

      {/* Content */}
      <div className="teacher-content">
        <div className="teacher-header">
          <h3>My Rooms</h3>
          <button onClick={() => navigate('/createRoom')} className="teacher-create-btn"><Link to="/CreateRoom">+ Create New Room</Link></button>
        </div>

        <div className="teacher-rooms">
          {rooms.map((room, index) => (
            <div className="teacher-room-card" key={index}>
              <h4>{room.name}</h4>
              <p className="teacher-code">{room.topic}</p>
              <button onClick={() => navigate(`/rooms/${room._id}/teacher`)} className="teacher-analytics-btn">View Analytics</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
