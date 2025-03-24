import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/signup";
import Login from "./components/login";
// import ChatPage from "./pages/ChatPage";
import "./App.css";
import MentorProfile from "./components/MentorProfile";
import MentorDash from "./components/MentorDash";
import MenteeDash from "./components/MenteeDash";
import MentorshipPlans from "./components/MentorshipPlans";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} /> {/* Fixed path for Login */}
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/chat-page" element={<ChatPage />} /> */}
        <Route path="/profile" element={<MentorProfile />} />
        <Route path="/mentorDash" element={<MentorDash />} />
        <Route path="/menteeDash" element={<MenteeDash />} />
        <Route path="/plan" element={<MentorshipPlans/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about" element={<AboutPage/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
