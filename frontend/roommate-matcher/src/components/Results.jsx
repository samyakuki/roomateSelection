import React from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box
} from "@mui/material";

const Results = () => {
  const location = useLocation();
  const matches = location.state?.matches || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Top Matches
      </Typography>

      {matches.length === 0 ? (
        <Typography>No matches found. Please submit your form first.</Typography>
      ) : (
        <Grid container spacing={2}>
          {matches.map((match) => (
            <Grid item xs={12} sm={6} md={4} key={match._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{match.name}</Typography>
                  <Typography>Cleanliness: {match.cleanliness}</Typography>
                  <Typography>Sleep: {match.sleep}</Typography>
                  <Typography>Food: {match.food}</Typography>
                  <Typography>Music: {match.music}</Typography>
                  <Typography>Study: {match.study}</Typography>
                  <Typography color="text.secondary">
                    Match Score: {match.score}/5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Results;
