import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL;

const UserManager = () => {


    const [user, setUser] = useState({
        name: '',
        email: ''
    });


    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/addUsers`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetchUsers();
        })
        .catch((error) => {
            alert("Fail adding user");
        });
    };

    const fetchUsers = () => {
         fetch(`${API_URL}/getUsers`,)
        .then((response) => response.json())
        .then((data) => {
            setUserData(data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(true);
        });
    };


    useEffect(() => {
       fetchUsers();
    },[])

    const deleteUser = (id) => {
        fetch(`${API_URL}/deleteUsers/${id}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetchUsers();
        })
        .catch((error) => {
            alert("Fail deleting user");
        });
    };

    return(
        <>
        <Navbar/>
        <div className='usermanager'>
            <h1>Manage User</h1>

            <form onSubmit={handleSubmit}>
                <input type='text' name='name' onChange={handleChange} placeholder='Name'/>
                <input type='email' name='email' onChange={handleChange} placeholder='Email'/>
                <button>Save</button>
                <button type='reset'>Reset</button>
            </form>
            <div className='userData'>
                {loading ? (
                    <h2>Loading Users...</h2>
                ) : (
                    <table>
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
                                    <td><button onClick={() => deleteUser(usr.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </>
    );
};

export default UserManager;