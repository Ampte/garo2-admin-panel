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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    english: "",
    garo: "",
  });

  /* ---------- LOAD WORDS ---------- */
  const loadWords = async () => {
    try {
      setLoading(true);
      const data = await getWords();
      setWords(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load dictionary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  /* ---------- ADD WORD ---------- */
  const handleAdd = async () => {
    if (!form.english || !form.garo) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addWord(form);

      setShowModal(false);
      setForm({ english: "", garo: "" });

      loadWords();
    } catch (err) {
      console.error(err);
      alert("Failed to add word");
    }
  };

  /* ---------- DELETE WORD ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this word?")) return;

    try {
      await deleteWord(id);
      loadWords();
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
          <h1>Dictionary Manager</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Word
          </button>

          {loading && <p>Loading dictionary...</p>}
          {error && <p className="error">{error}</p>}

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