import { Bell, Menu } from "lucide-react";

function Navbar({ setMenuOpen }) {
  return (
    <div className="navbar">

      <Menu
        className="menu-icon"
        onClick={() => setMenuOpen(prev => !prev)}
      />

      <div className="nav-right">
        <div className="admin">
          <img src="https://i.pravatar.cc/40" />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;