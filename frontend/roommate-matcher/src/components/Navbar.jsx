import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "Home", to: "/" },
    ...(!token
      ? [
          { text: "Login", to: "/login" },
          { text: "Signup", to: "/signup" },
        ]
      : [
          { text: "Form", to: "/form" },
          { text: "History", to: "/history" },
        ]),
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#222" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            RoomMatch
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link, index) => (
              <Button key={index} color="inherit" component={Link} to={link.to}>
                {link.text}
              </Button>
            ))}
            {token && (
              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 220 }}>
          {navLinks.map((link, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={link.to}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
          {token && (
            <ListItem
              button
              onClick={() => {
                handleLogout();
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary="Logout" sx={{ color: "red" }} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
