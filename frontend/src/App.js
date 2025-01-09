import React from "react";
import LandingPage from "./components/Home/LandingPage";
import Signup from "./components/login-signup/signup";
import Login from "./components/login-signup/login";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />  
          <Route path="/signup" element={<Signup />} />  
        </Routes>
    </Router>
  );
}

export default App;
