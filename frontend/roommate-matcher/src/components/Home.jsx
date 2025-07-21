import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Match With Your Perfect Roommate!
      </Typography>
      <Button variant="contained" component={Link} to="/signup" sx={{ mr: 2 }}>
        Signup
      </Button>
      <Button variant="outlined" component={Link} to="/login">
        Login
      </Button>
    </Box>
  );
};

export default Home;
