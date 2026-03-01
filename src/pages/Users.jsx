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

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  /* ---------- LOAD USERS ---------- */
  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ---------- ADD USER ---------- */
  const handleAdd = async () => {
    await addUser(form);
    setShowModal(false);
    loadUsers();
  };

  /* ---------- DELETE USER ---------- */
  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
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
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
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