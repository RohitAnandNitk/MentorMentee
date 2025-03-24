import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ResponsiveAppBar = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  // Load login state from localStorage when the component mounts
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");

    if (storedLoginState === "true") {
      setIsLoggedIn(true);
      setUserName(storedUserName || "User");
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorElUser(null);
    navigate(`/${userType}-profile`);
  };

  const handleClose = () => {
    setAnchorElUser(null);
  };

  // Decode token to get userId and userType
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleDashboard = () => {
    setAnchorElUser(null);
    console.log("user type is :", userType);
    if (userType === "mentee") {
      navigate("/menteeDash");
    } else {
      navigate("/mentorDash");
    }
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#f8fafc", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#1f2937",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              MentorConnect
            </Link>
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "#1f2937" }}
            >
              <Typography variant="button" sx={{ fontWeight: "500" }}>
                About
              </Typography>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "#1f2937" }}
            >
              <Typography variant="button" sx={{ fontWeight: "500" }}>
                Contact
              </Typography>
            </Link>

            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={userName}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: 25, height: 25 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "50px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDashboard}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#1f2937" }}
                >
                  <Typography variant="button" sx={{ fontWeight: "500" }}>
                    Login
                  </Typography>
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#ffffff" }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      fontWeight: "500",
                      backgroundColor: "#2F3437",
                      padding: "8px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    Sign Up
                  </Typography>
                </Link>
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none", color: "#000" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/about"
                  style={{ textDecoration: "none", color: "#1f2937" }}
                >
                  <Typography textAlign="center">About</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "#1f2937" }}
                >
                  <Typography textAlign="center">Contact</Typography>
                </Link>
              </MenuItem>

              {isLoggedIn
                ? [
                    <MenuItem key="profile" onClick={handleProfile}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>,
                    <MenuItem key="dashboard" onClick={handleDashboard}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogoutClick}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login" onClick={handleCloseNavMenu}>
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "#1f2937" }}
                      >
                        <Typography textAlign="center">Login</Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key="signup" onClick={handleCloseNavMenu}>
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "#1f2937" }}
                      >
                        <Typography textAlign="center">Sign Up</Typography>
                      </Link>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
