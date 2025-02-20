import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import Signup from "./Signup"
import Login from "./Login"
import AdminPanel from "./AdminPanel" // Import Admin Panel
import StudentDashboard from "./StudentDashboard"
import UploadCandidate from "./UploadCandidate";
import Candidates from "./Candidates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} /> 
        <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Admin Panel Route */}
        <Route path="/upload-candidate" element={<UploadCandidate />} />
        <Route path="/get_candidates" element={<Candidates />} />
      </Routes>
    </Router>
  )
}

export default App
