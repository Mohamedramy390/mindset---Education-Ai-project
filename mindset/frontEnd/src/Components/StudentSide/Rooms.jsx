import React, { useEffect, useState } from "react";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import { enrollRoom, getAllRooms, getUserRooms } from "../../api/apis";
import { useRooms } from "../../context/RoomsContext";
import { Navbar } from "../../nav/Navbar";

const Rooms = () => {
  const { rooms, enrolledRooms, handleEnroll, loading, error } = useRooms();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const notEnrolledRooms = rooms.filter((r) => !enrolledRooms.includes(r._id));

  return (
    <div className="rooms-page">
      <Navbar />
      {/* Main content */}
      <main className="rooms-container">
        <h1 className="rooms-title">Rooms</h1>
        <p className="rooms-subtitle">
          Explore available rooms and join a study session.
        </p>

        {/* Search */}
        <div className="search-bar">
          <input type="text" placeholder="Search for rooms" />
        </div>

        {/* Rooms Grid */}
        <div className="rooms-grid">
          {notEnrolledRooms.map((room) => (
            <div className="room-card" key={room._id}>  
              <div className="room-info">
                <h2 className="room-title">{room.name}</h2>
                <p className="room-description">{room.topic}</p>
                <button className="join-button" onClick={() => handleEnroll(room._id)}>Join</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Rooms;
