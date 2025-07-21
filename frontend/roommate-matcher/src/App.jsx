import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Results from "./components/Results";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import RoommateForm from "./components/RoommateForm";
import History from "./components/History";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ mt: 8 }}> {/* Margin top to push below Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/form"
            element={
              <RequireAuth>
                <RoommateForm />
              </RequireAuth>
            }
          />
          <Route
            path="/results"
            element={
              <RequireAuth>
                <Results />
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <History />
              </RequireAuth>
            }
          />
          
          {/* 404 Route */}
          <Route path="*" element={<h2 style={{ padding: "2rem" }}>404 Not Found</h2>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
