import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-container">
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="main-content">
        <Navbar setMenuOpen={setMenuOpen} />
        <DashboardCards />
      </div>
    </div>
  );
}

export default Dashboard;