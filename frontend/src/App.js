import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/signup";
import Login from "./components/login";
import ChatPage from "./pages/ChatPage";
import "./App.css";
import MentorProfile from "./components/MentorProfile";
import MentorDash from "./components/MentorDash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />  {/* Fixed path for Login */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat-page" element={<ChatPage />} />
        <Route path="/profile" element={<MentorProfile/>} />
        <Route path="/MentorDash" element={<MentorDash/>} />
      </Routes>
    </Router>
  );
}

export default App;
