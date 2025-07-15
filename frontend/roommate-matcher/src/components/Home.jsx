import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#fefefe",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Match With Your Perfect Roommate
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        No more awkward dorm situations. Find your best fit!
      </Typography>
      <Button
        onClick={handleClick}
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
      >
        Find My Match
      </Button>
    </Box>
  );
};

export default Home;
