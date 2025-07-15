import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const RoommateForm = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    cleanliness: "",
    sleep: "",
    food: "",
    music: "",
    study: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", form);
    alert("Form submitted! Check the console.");
    // Later: send this data to backend
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Roommate Preferences
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Cleanliness Level"
            name="cleanliness"
            value={form.cleanliness}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="neat">Neat</MenuItem>
            <MenuItem value="average">Average</MenuItem>
            <MenuItem value="messy">Messy</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Sleep Schedule"
            name="sleep"
            value={form.sleep}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="early">Early Bird</MenuItem>
            <MenuItem value="night">Night Owl</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Food Preference"
            name="food"
            value={form.food}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="veg">Vegetarian</MenuItem>
            <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Music Taste"
            name="music"
            value={form.music}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="pop">Pop</MenuItem>
            <MenuItem value="rock">Rock</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Study Preference"
            name="study"
            value={form.study}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="alone">Alone</MenuItem>
            <MenuItem value="group">Group</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RoommateForm;
