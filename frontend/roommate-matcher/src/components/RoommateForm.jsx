import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Slider,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const criteria = ["cleanliness", "sleep", "food", "music", "study"];

const RoommateForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    cleanliness: 5,
    sleep: 5,
    food: 5,
    music: 5,
    study: 5,
    currentYear: "",
    degree: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setFormData((prev) => ({ ...prev, email: decoded.email }));
    } catch (err) {
      console.error("Token error:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlider = (name) => (_, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:5000/users/form",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const matches = res.data.matches;

    navigate("/results", {
      state: {
        currentUser: formData,
        matches: matches,
      },
    });
  } catch (err) {
    console.error("Form submission failed:", err?.response || err);
    alert("Could not fetch matches. Please try again.");
  }
};


  return (
    <Box component={Paper} elevation={3} sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Fill Your Preferences
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          disabled
          sx={{ mb: 2 }}
        />
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>

        {criteria.map((item) => (
          <Box key={item} sx={{ my: 2 }}>
            <Typography gutterBottom>
              {item.charAt(0).toUpperCase() + item.slice(1)} Preference: {formData[item]}
            </Typography>
            <Slider
              value={formData[item]}
              onChange={handleSlider(item)}
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />
          </Box>
        ))}

        <FormControl fullWidth margin="normal">
          <InputLabel>Current Year</InputLabel>
          <Select
            name="currentYear"
            value={formData.currentYear}
            onChange={handleChange}
            required
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Degree</InputLabel>
          <Select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          >
            <MenuItem value="BTech">BTech</MenuItem>
            <MenuItem value="MTech">MTech</MenuItem>
            <MenuItem value="PhD">PhD</MenuItem>
          </Select>
        </FormControl>

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
          Find Matches
        </Button>
      </form>
    </Box>
  );
};

export default RoommateForm;
