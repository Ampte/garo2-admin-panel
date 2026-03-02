import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
  return (
    <div className={`sidebar ${open ? "show" : ""}`}>
      <h2>Admin</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/users">Users</Link>
      <Link to="/dictionary">Dictionary</Link>
      <Link to="/chatbot">Chatbot</Link>
    </div>
  );
}