import { NavLink } from "react-router-dom";
import {
  Home,
  Book,
  GraduationCap,
  Users
} from "lucide-react";

function Sidebar({ menuOpen }) {
  return (
    <div className={`sidebar ${menuOpen ? "active" : ""}`}>
      <h2 className="logo">Garo2 Admin</h2>

      <ul>
        <NavLink to="/"><li><Home size={18}/> Dashboard</li></NavLink>
        <NavLink to="/dictionary"><li><Book size={18}/> Dictionary</li></NavLink>
        <NavLink to="/lessons"><li><GraduationCap size={18}/> Lessons</li></NavLink>
        <NavLink to="/users"><li><Users size={18}/> Users</li></NavLink>
        <NavLink to="/chatbot">
  <li>🤖 Chatbot</li>
</NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;