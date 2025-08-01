import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

// ✅ Helper to color score
const getScoreColor = (score) => {
  if (score >= 80) return "green";
  if (score >= 50) return "orange";
  return "red";
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = location.state?.currentUser;
  const matches = location.state?.matches || [];

  // ✅ Optional: Sort by score descending (just in case backend doesn't)
  const sortedMatches = [...matches].sort((a, b) => b.score - a.score);

  const renderPreference = (label, value) => (
    <Typography variant="body2" key={label}>
      {label.charAt(0).toUpperCase() + label.slice(1)}: <strong>{value}</strong>
    </Typography>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 5, p: 2 }} component={Paper}>
      <Typography variant="h5" gutterBottom align="center">
        Roommate Matching Results
      </Typography>

      {/* Current User Card */}
      {currentUser && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Preferences
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: "#f0f8ff" }}>
            <CardContent>
              <Typography variant="h6">{currentUser.name}</Typography>
              <Typography color="textSecondary">{currentUser.email}</Typography>
              <Typography color="textSecondary">
                Gender: {currentUser.gender}
              </Typography>
              <Typography color="textSecondary">
                Degree: {currentUser.degree}, Year: {currentUser.currentYear}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {renderPreference("cleanliness", currentUser.cleanliness)}
                {renderPreference("sleep", currentUser.sleep)}
                {renderPreference("food", currentUser.food)}
                {renderPreference("music", currentUser.music)}
                {renderPreference("study", currentUser.study)}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Match Cards */}
      <Typography variant="h6" gutterBottom>
        Top Matches
      </Typography>
      {sortedMatches.length === 0 ? (
        <Typography>No matches found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {sortedMatches.map((match, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{match.name}</Typography>
                  <Typography color="textSecondary">{match.email}</Typography>
                  <Typography color="textSecondary">
                    Gender: {match.gender}
                  </Typography>
                  <Typography color="textSecondary">
                    Degree: {match.degree}, Year: {match.currentYear}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: getScoreColor(match.score) }}
                  >
                    Match Score: <strong>{match.score}%</strong>
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    {renderPreference("cleanliness", match.cleanliness)}
                    {renderPreference("sleep", match.sleep)}
                    {renderPreference("food", match.food)}
                    {renderPreference("music", match.music)}
                    {renderPreference("study", match.study)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        sx={{ mt: 4, display: "block", mx: "auto" }}
        onClick={() => navigate("/")}
      >
        Go Back to Form
      </Button>
    </Box>
  );
};

export default Results;
