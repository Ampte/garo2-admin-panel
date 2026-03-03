import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const UserManager = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/addUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchUsers();
      })
      .catch(() => {
        alert("Fail adding user");
      });
  };

  const fetchUsers = () => {
    fetch(`${API_URL}/getUsers`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id) => {
    fetch(`${API_URL}/deleteUsers/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchUsers();
      })
      .catch(() => {
        alert("Fail deleting user");
      });
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        {/* FORM CARD */}
        <div className="card">
          <h1 className="page-title">Manage Users</h1>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <h2 className="loading">Loading Users...</h2>
          ) : (
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {userData.map((usr) => (
                    <tr key={usr.id}>
                      <td>{usr.id}</td>
                      <td>{usr.name}</td>
                      <td>{usr.email}</td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => deleteUser(usr.id)}
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

export default UserManager;