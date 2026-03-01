import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Dictionary from "./pages/Dictionary";
import Lessons from "./pages/Lessons";
import ChatbotManager from "./pages/Chatbot";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/chatbot" element={<ChatbotManager/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;