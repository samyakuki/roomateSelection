import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const History= () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!token) return navigate("/login");

  const fetchHistory = async () => {
    try {
      const decoded = jwtDecode(token);
      const email = decoded.email;

      const res = await axios.get(`http://localhost:5000/users/history/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory(res.data.history || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setHistory([]);
    }
  };

  fetchHistory();
}, [token, navigate]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }} component={Paper}>
      <Typography variant="h5" gutterBottom>
        Match History
      </Typography>
      {history.length === 0 ? (
        <Typography>No history present yet.</Typography>
      ) : (
        <List>
          {history.map((entry, index) => (
            <Box key={index}>
              <ListItem>
                <ListItemText
                  primary={`Attempt on ${new Date(entry.timestamp).toLocaleString()}`}
                  secondary={
                    entry.matches.length > 0
                      ? `Top Match: ${entry.matches[0].name} (${entry.matches[0].email})`
                      : "No matches found."
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default History;
