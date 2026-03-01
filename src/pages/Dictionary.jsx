import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Modal from "../components/Modal";

import {
  getWords,
  addWord,
  deleteWord,
} from "../api/api";

function Dictionary() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [words, setWords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    english: "",
    garo: "",
  });

  /* ---------- LOAD WORDS ---------- */
  const loadWords = async () => {
    const data = await getWords();
    setWords(data);
  };

  useEffect(() => {
    loadWords();
  }, []);

  /* ---------- ADD WORD ---------- */
  const handleAdd = async () => {
    await addWord(form);
    setShowModal(false);
    setForm({ english: "", garo: "" });
    loadWords();
  };

  /* ---------- DELETE WORD ---------- */
  const handleDelete = async (id) => {
    await deleteWord(id);
    loadWords();
  };

  return (
    <div className="admin-container">
      <Sidebar menuOpen={menuOpen} />

      <div className="main-content">
        <Navbar setMenuOpen={setMenuOpen} />

        <div className="page">
          <h1>Dictionary Manager</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Word
          </button>

          <Table
            columns={["ID", "English", "Garo"]}
            data={words}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          title="Add Dictionary Word"
          close={() => setShowModal(false)}
        >
          <input
            placeholder="English Word"
            value={form.english}
            onChange={(e) =>
              setForm({ ...form, english: e.target.value })
            }
          />

          <input
            placeholder="Garo Word"
            value={form.garo}
            onChange={(e) =>
              setForm({ ...form, garo: e.target.value })
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

export default Dictionary;