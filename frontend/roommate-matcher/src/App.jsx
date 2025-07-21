import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import RoommateForm from "./components/RoommateForm";
import Results from "./components/Results";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home"; // optional homepage if you want
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
         <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
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
      </Routes>
    </Router>
  );
};

export default App;
