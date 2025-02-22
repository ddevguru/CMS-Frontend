import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import Signup from "./Signup"
import Login from "./Login"
import AdminPanel from "./AdminPanel" // Import Admin Panel
import StudentDashboard from "./StudentDashboard"
import UploadCandidate from "./UploadCandidate";
import Candidates from "./Candidates";
import Voters from "./Voters";
import FacilityList from "./FacilityList";
import BookingPage from "./BookingPage";
import UserBookings from "./UserBookings";
import Logout from "./Logout";
import Bookignrequest from "./Bookingrequet"
import BookingHistory from "./Bookinghistory"
import AdminApplicationapproval from "./AdminApplicationapproval"
import ApplicationForm from "./ApplicationForm"
import ApplicationList from "./ApplicationList"
import ComplaintForm from "./ComplaintForm"
import AddCheatingRecord from "./AddCheatingRecord"
import CheatingRecords from "./CheatingRecords"
import BudgetForm from "./BudgetForm"
import BudgetList from "./BudgetList"
import DoctorForm from "./DoctorForm"
import ReportsList from "./ReportsList"
import TeacherPanel from "./TeacherPanel"
import Facilities from "./Facilities"

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
        <Route path="/get_voters" element={<Voters />} />
        <Route path="/facilities" element={<FacilityList />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/my-bookings/:userId" element={<UserBookings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/approve_booking" element={<Bookignrequest />} />
        <Route path="/booking" element={<BookingHistory/>} />
        <Route path="/submit_application" element={<ApplicationForm/>} />
        <Route path="/applications" element={<AdminApplicationapproval/>} />
        <Route path="/application" element={<ApplicationList/>} />
        <Route path="/submit_complaint" element={<ComplaintForm />} />
        <Route path="/add_cheating_record" element={<AddCheatingRecord />} />
        <Route path="/cheating_records" element={<CheatingRecords />} />
        <Route path="/upload" element={<BudgetForm />} />
        <Route path="get_budgets" element={<BudgetList/>} />
        <Route path="/add_report" element={<DoctorForm />} />
        <Route path="/get_reports" element={<ReportsList/>}/>
        <Route path="/faculty-dashboard" element={<TeacherPanel />} />
        <Route path="/facility" element={<Facilities />} />

      </Routes>
    </Router>
  )
}

export default App