import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const DictionaryManager = () => {
  const [totalWords, setTotalWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [words, setWords] = useState({
    english: "",
    garo: "",
  });

  const handleChange = (e) => {
    setWords({ ...words, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/addWords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(words),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch(() => {
        alert("Fail adding words");
      });
  };

  const fetchWords = () => {
    fetch(`${API_URL}/getWords`)
      .then((response) => response.json())
      .then((data) => {
        setTotalWords(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const deleteWord = (id) => {
    fetch(`${API_URL}/deleteWord/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchWords();
      })
      .catch(() => {
        alert("Fail deleting word");
      });
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        {/* FORM CARD */}
        <div className="card">
          <h1 className="page-title">Dictionary Manager</h1>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              type="text"
              name="english"
              placeholder="English"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="garo"
              placeholder="Garo"
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

        {/* TABLE CARD */}
        <div className="card">
          {loading ? (
            <h2 className="loading">Loading words...</h2>
          ) : (
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>English</th>
                    <th>Garo</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {totalWords.map((tword) => (
                    <tr key={tword.id}>
                      <td>{tword.id}</td>
                      <td>{tword.english}</td>
                      <td>{tword.garo}</td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => deleteWord(tword.id)}
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

export default DictionaryManager;