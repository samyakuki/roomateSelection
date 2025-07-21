import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" sx={{ mt: { xs: 6, md: 10 } }}>
        <Typography variant="h3" gutterBottom>
          Welcome to RoomMate Matcher
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Find the perfect roommate based on your habits and preferences.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ m: 1 }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="outlined"
          sx={{ m: 1 }}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
