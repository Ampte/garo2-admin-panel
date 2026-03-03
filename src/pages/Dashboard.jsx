import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [totals, setTotals] = useState({
    users: 0,
    chats: 0,
    words: 0,
  });

  const fetchTotals = async () => {
    try {
      const [usersRes, chatsRes, wordsRes] = await Promise.all([
        fetch(`${API_URL}/getUsers`),
        fetch(`${API_URL}/getChats`),
        fetch(`${API_URL}/getWords`),
      ]);

      const users = await usersRes.json();
      const chats = await chatsRes.json();
      const words = await wordsRes.json();

      setTotals({
        users: users.length,
        chats: chats.length,
        words: words.length,
      });
    } catch (error) {
      console.log("Error fetching totals");
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="card">
          <h1 className="page-title">Dashboard</h1>
          <p className="dashboard-text">
            Welcome to the Garo2 Admin Panel
          </p>
        </div>

        {/* STATS */}
        <div className="dashboard-grid">
          <div className="card stat-card">
            <h3>Total Users</h3>
            <p>{totals.users}</p>
          </div>

          <div className="card stat-card">
            <h3>Total Chats</h3>
            <p>{totals.chats}</p>
          </div>

          <div className="card stat-card">
            <h3>Total Words</h3>
            <p>{totals.words}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;