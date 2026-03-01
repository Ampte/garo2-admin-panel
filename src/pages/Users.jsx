import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Modal from "../components/Modal";

import {
  getUsers,
  addUser,
  deleteUser,
} from "../api/api";

function Users() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  /* ---------- LOAD USERS ---------- */
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ---------- ADD USER ---------- */
  const handleAdd = async () => {
    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addUser(form);

      // reset form
      setForm({ name: "", email: "" });

      setShowModal(false);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  /* ---------- DELETE USER ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar menuOpen={menuOpen} />

      <div className="main-content">
        <Navbar setMenuOpen={setMenuOpen} />

        <div className="page">
          <h1>Manage Users</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add User
          </button>

          {loading && <p>Loading users...</p>}
          {error && <p className="error">{error}</p>}

          <Table
            columns={["ID", "Name", "Email"]}
            data={users}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <Modal title="Add User" close={() => setShowModal(false)}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <button className="save-btn" onClick={handleAdd}>
            Save
          </button>
        </Modal>
      )}
    </div>
  );
}

export default Users;