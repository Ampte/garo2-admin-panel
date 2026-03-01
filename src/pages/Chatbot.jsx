import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Modal from "../components/Modal";

import {
  getChats,
  addChat,
  deleteChat
} from "../api/api";

function ChatbotManager() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    question: "",
    answer: ""
  });

  /* ---------- LOAD DATA ---------- */
  const loadChats = async () => {
    try {
      setLoading(true);
      const data = await getChats();
      setChats(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load chatbot data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  /* ---------- ADD ---------- */
  const handleAdd = async () => {
    if (!form.question || !form.answer) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addChat(form);

      setShowModal(false);
      setForm({ question: "", answer: "" });

      loadChats();
    } catch (err) {
      console.error(err);
      alert("Failed to add response");
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this chatbot response?")) return;

    try {
      await deleteChat(id);
      loadChats();
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
          <h1>Chatbot Manager</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Response
          </button>

          {loading && <p>Loading chatbot responses...</p>}
          {error && <p className="error">{error}</p>}

          <Table
            columns={["ID","Question","Answer"]}
            data={chats}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          title="Add Chatbot Response"
          close={() => setShowModal(false)}
        >
          <input
            placeholder="User Question"
            value={form.question}
            onChange={(e)=>
              setForm({...form, question:e.target.value})
            }
          />

          <textarea
            placeholder="Bot Answer"
            value={form.answer}
            onChange={(e)=>
              setForm({...form, answer:e.target.value})
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

export default ChatbotManager;