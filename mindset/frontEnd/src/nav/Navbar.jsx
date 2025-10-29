import React from "react";
import './navbar.css'
import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
    <header className="room-navbar">
        <h1 className="room-logo">Student Dashboard</h1>
        <nav className="room-menu">
          <Link to={'/rooms'}>All Rooms</Link>
          <Link to={'/my-rooms'} className="room-active">My Rooms</Link>
          <Link to={'/login'} className="room-active">Logout</Link>
        </nav>
        <div className="room-avatar"></div>
      </header>
    )
}