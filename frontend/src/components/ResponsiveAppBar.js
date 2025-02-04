import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const ResponsiveAppBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#f8fafc', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#1f2937', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              MentorConnect
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Link to="/about" style={{ textDecoration: 'none', color: '#1f2937' }}>
              <Typography variant="button" sx={{ fontWeight: '500' }}>
                About
              </Typography>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#1f2937' }}>
              <Typography variant="button" sx={{ fontWeight: '500' }}>
                Contact
              </Typography>
            </Link>
          

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Link to="/login" style={{ textDecoration: 'none', color: '#1f2937' }}>
                <Typography variant="button" sx={{ fontWeight: '500' }}>
                  Login
                </Typography>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none', color: '#ffffff' }}>
                <Typography
                  variant="button"
                  sx={{
                    fontWeight: '500',
                    backgroundColor: '#2F3437',
                    padding: '8px 16px',
                    borderRadius: '4px',
                  }}
                >
                  Sign Up
                </Typography>
              </Link>
            </Box>
            
          )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}>
            <IconButton size="large" aria-label="menu" color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
