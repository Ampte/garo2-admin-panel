import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  return(
    <>
    <div className='navbar'>
      <h1>Garo2 Admin</h1>
    </div>
    <div className='navlinks'>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate('/users')}>Manage Users</button>
      <button onClick={() => navigate('/dictionary')}>Manage Dictionary</button>
      <button onClick={() => navigate("/chatbot")}>Manage Chatbot</button>
    </div>
    </>
  )
}

export default Navbar;