import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const ChatbotManager = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const [botquestion, setBotquestion] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setBotquestion({
      ...botquestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/addChats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(botquestion),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchChats();
      })
      .catch(() => {
        alert("Fail adding chats");
      });
  };

  const fetchChats = () => {
    fetch(`${API_URL}/getChats`)
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const deleteChat = (id) => {
    fetch(`${API_URL}/deleteChats/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchChats();
      })
      .catch(() => {
        alert("Fail deleting chats");
      });
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="card">
          <h1 className="page-title">Chatbot Manager</h1>

          {/* FORM */}
          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              type="text"
              name="question"
              placeholder="Question"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="answer"
              placeholder="Answer"
              onChange={handleChange}
              required
            />

            <div className="form-actions">
              <button className="btn-primary">Save</button>
              <button type="reset" className="btn-secondary">
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="card">
          {loading ? (
            <h2 className="loading">Loading Chats...</h2>
          ) : (
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {chats.map((chat) => (
                    <tr key={chat.id}>
                      <td>{chat.id}</td>
                      <td>{chat.question}</td>
                      <td>{chat.answer}</td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => deleteChat(chat.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatbotManager;