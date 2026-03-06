import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";


import Dashboard from './pages/Dashboard';
import ChatbotManager from './pages/Chatbot';
import UserManager from './pages/Users';
import DictionaryManager from './pages/Dictionary';
import Login from './pages/Login';

const App = () => {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/chatbot" element={<ChatbotManager/>}/>
      <Route path='/users' element={<UserManager/>}/>
      <Route path='/dictionary' element={<DictionaryManager/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;