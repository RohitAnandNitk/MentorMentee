import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/signup";
import Login from "./components/login";
import ChatPage from "./pages/ChatPage";
import "./App.css";
import MentorProfile from "./components/MentorProfile";
import MentorDash from "./components/MentorDash";
import MenteeDash from "./components/MenteeDash";
import MentorshipPlans from "./components/MentorshipPlans";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";

import MenteeProfile from "./components/menteeProfile";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/footer";
import { AuthProvider } from "../src/components/AuthContext";
import AllMentor from "./components/AllMentor";
import AllMentee from "./components/AllMentee";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentee-profile/:userId" element={<MenteeProfile />} />
          <Route path="/login" element={<Login />} />{" "}
          {/* Fixed path for Login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat-page" element={<ChatPage />} />
          <Route path="/profile/:userId" element={<MentorProfile />} />
          <Route path="/mentorDash" element={<MentorDash />} />
          <Route path="/menteeDash" element={<MenteeDash />} />
          <Route path="/plan" element={<MentorshipPlans />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/all-mentors" element={<AllMentor />} />
          <Route path="/all-mentees" element={<AllMentee />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
