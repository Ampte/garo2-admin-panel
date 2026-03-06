import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="navbar">
        <h1 className="logo">Garo2 Admin</h1>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="navlinks">
        <button className="nv-btn" onClick={() => navigate("/dashboard")}>
          Home
        </button>

        <button className="nv-btn" onClick={() => navigate("/users")}>
          Manage Users
        </button>

        <button className="nv-btn" onClick={() => navigate("/dictionary")}>
          Manage Dictionary
        </button>

        <button className="nv-btn" onClick={() => navigate("/chatbot")}>
          Manage Chatbot
        </button>
      </div>
    </>
  );
};

export default Navbar;