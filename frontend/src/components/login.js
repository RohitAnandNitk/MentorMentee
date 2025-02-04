import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mentee"); // New state for userType
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Toggle the dialog
  const handleOpen = () => setOpen(!open);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const path =
      userType === "mentor"
        ? "http://localhost:4000/mentor/signin"
        : "http://localhost:4000/mentee/signin";

    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        handleOpen();
        navigate("/chat-page");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <button className="open-dialog-btn" onClick={handleOpen}>Sign In</button>

      {open && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2 className="dialog-title">Sign In</h2>
            <p className="dialog-subtext">Enter your credentials to sign in.</p>

            <form onSubmit={handleSubmit} className="login-form">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* User Type Selection */}
              <label>User Type</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>

              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="submit-btn">Sign In</button>
            </form>

            <p className="signup-link">
              Don't have an account?{" "}
              <span
                className="signup-btn"
                onClick={() => {
                  handleOpen();
                  navigate("/signup");
                }}
              >
                Sign up
              </span>
            </p>

            <button className="close-dialog-btn" onClick={handleOpen}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
