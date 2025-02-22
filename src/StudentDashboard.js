import React, { useState, useEffect } from 'react';
import { FaBars, FaHome, FaTimes, FaVoteYea, FaHeartbeat, FaCalendarAlt, FaFileAlt, FaMapMarkerAlt, FaClipboardList, FaBullhorn, FaMoneyBillWave, FaBell, FaUser, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function StudentDashboard() {
  
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [userData, setUserData] = useState({ username: 'Student', photo: '/placeholder.svg' });
  const [notices, setNotices] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate("/login"); // Redirect if not logged in
    }
    const username = localStorage.getItem('username') || 'Student';
    const photo = localStorage.getItem('photo') || '/placeholder.svg';
  
    console.log("User Data:", { userId, username, photo }); // Debugging output
  
    if (userId) {
      setUserData({ username, photo });
    }
  }, [navigate]);
  
  
    

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const menuItems = [
    { icon: <FaHome />, name: 'Dashboard', route: '/student-dashboard' },
    { icon: <FaVoteYea />, name: 'Online Voting', route: '/get_voters' },
    { icon: <FaHeartbeat />, name: 'Health Report', disabled: true },
    { icon: <FaCalendarAlt />, name: 'Booking Section', route: '/book' },
    { icon: <FaFileAlt />, name: 'Submit Application', disabled: true ,route:'/submit_application'},
    { icon: <FaMapMarkerAlt />, name: 'Track Application', disabled: true , route: '/application'},
    { icon: <FaClipboardList />, name: 'Track Booking', route: `/booking` },
    { icon: <FaBullhorn />, name: 'Complaint Box', disabled: true ,route: '/submit_complaint'},
    { icon: <FaBullhorn />, name: 'Cheating Records', disabled: true ,route: '/cheating_records'},
    { icon: <FaMoneyBillWave />, name: 'Sponsorship & Budget', disabled: true , route :'/get_budgets'},
    { icon: <FaMoneyBillWave />, name: 'Logout', disabled: true, route: '/logout' },
  ];

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : ''}`}>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <h2 className="portal-title">Student Portal</h2>}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`sidebar-menu-item ${item.disabled ? 'disabled' : ''}`}>
              {item.route ? (
                <Link to={item.route} className="sidebar-item">
                  {item.icon}
                  {isSidebarOpen && <span className="sidebar-label">{item.name}</span>}
                </Link>
              ) : (
                <span className="sidebar-item">
                  {item.icon}
                  {isSidebarOpen && <span className="sidebar-label">{item.name}</span>}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="dashboard-header">
        <h1 className="welcome-message">Welcome, {userData.username}</h1>


          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="notification-button">
              <FaBell />
            </button>
            {/* <img src={userData.photo} alt={userData.username} className="user-avatar" /> */}
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="card notices-card">
            <div className="card-header">
              <h2 className="card-title"><FaBell /> Notices</h2>
            </div>
            <div className="card-content">
              <ul className="notices-list">
                {notices.length > 0 ? notices.map((notice, index) => (
                  <li key={index} className="notice-item">{notice}</li>
                )) : <p>No new notices.</p>}
              </ul>
            </div>
          </div>

          <div className="card progress-card">
            <div className="card-header">
              <h2 className="card-title"><FaFileAlt /> Course Progress</h2>
            </div>
            <div className="card-content">
              <ul className="progress-list">
                {courses.length > 0 ? courses.map((course, index) => (
                  <li key={index} className="progress-item">
                    <div className="progress-header">
                      <span>{course.name}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-indicator" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </li>
                )) : <p>No courses found.</p>}
              </ul>
            </div>
          </div>

          <div className="card events-card">
            <div className="card-header">
              <h2 className="card-title"><FaCalendarAlt /> Upcoming Events</h2>
            </div>
            <div className="card-content">
              <ul className="events-list">
                {events.length > 0 ? events.map((event, index) => (
                  <li key={index} className="event-item">
                    <span>{event.name}</span>
                    <span className="event-date">{event.date}</span>
                  </li>
                )) : <p>No upcoming events.</p>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
