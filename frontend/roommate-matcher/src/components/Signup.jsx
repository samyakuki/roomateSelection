import React, { useState } from "react";
import {
  Box, Button, TextField, Typography, Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={2}>Signup</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Name" name="name" margin="normal"
            value={form.name} onChange={handleChange}
          />
          <TextField
            fullWidth label="Email" name="email" margin="normal"
            value={form.email} onChange={handleChange}
          />
          <TextField
            fullWidth label="Password" name="password" type="password" margin="normal"
            value={form.password} onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
