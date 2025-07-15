import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoommateForm from "./components/RoommateForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<RoommateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
