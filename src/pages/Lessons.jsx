import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Modal from "../components/Modal";

import {
  getLessons,
  addLesson,
  deleteLesson,
} from "../api/api";

function Lessons() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    level: "",
  });

  /* ---------- LOAD LESSONS ---------- */
  const loadLessons = async () => {
    const data = await getLessons();
    setLessons(data);
  };

  useEffect(() => {
    loadLessons();
  }, []);

  /* ---------- ADD LESSON ---------- */
  const handleAdd = async () => {
    await addLesson(form);
    setShowModal(false);
    setForm({ title: "", level: "" });
    loadLessons();
  };

  /* ---------- DELETE LESSON ---------- */
  const handleDelete = async (id) => {
    await deleteLesson(id);
    loadLessons();
  };

  return (
    <div className="admin-container">
      <Sidebar menuOpen={menuOpen} />

      <div className="main-content">
        <Navbar setMenuOpen={setMenuOpen} />

        <div className="page">
          <h1>Lessons Manager</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Lesson
          </button>

          <Table
            columns={["ID", "Title", "Level"]}
            data={lessons}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          title="Add Lesson"
          close={() => setShowModal(false)}
        >
          <input
            placeholder="Lesson Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Level (Beginner / Intermediate)"
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
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

export default Lessons;