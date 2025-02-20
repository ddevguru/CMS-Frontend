import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaVoteYea, FaHeartbeat, FaCalendarAlt, FaFileAlt, FaMapMarkerAlt, FaClipboardList, FaBullhorn, FaMoneyBillWave, FaBell, FaUser, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import './StudentDashboard.css';

function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const studentData = {
    user: { name: 'John Doe', avatar: 'https://via.placeholder.com/100' },
    notices: [
      'Exam Schedule Released',
      'New Scholarship Opportunities',
      'Submit Assignments Before Deadline'
    ],
    courses: [
      { name: 'Mathematics', progress: 75 },
      { name: 'Computer Science', progress: 60 },
      { name: 'Physics', progress: 90 },
    ],
    upcomingEvents: [
      { name: 'Project Presentation', date: '2023-06-15' },
      { name: 'Mid-term Exams', date: '2023-06-20' },
      { name: 'Career Fair', date: '2023-06-25' },
    ]
  };

  const menuItems = [
    { icon: <FaVoteYea />, name: 'Online Voting' },
    { icon: <FaHeartbeat />, name: 'Health Report' },
    { icon: <FaCalendarAlt />, name: 'Booking Section' },
    { icon: <FaFileAlt />, name: 'Submit Application' },
    { icon: <FaMapMarkerAlt />, name: 'Track Application' },
    { icon: <FaClipboardList />, name: 'Track Booking' },
    { icon: <FaBullhorn />, name: 'Complaint Box' },
    { icon: <FaMoneyBillWave />, name: 'Sponsorship & Budget' }
  ];

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <h2 className="portal-title">Student Portal</h2>}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-menu-item">
              <span className="sidebar-icon">{item.icon}</span>
              {isSidebarOpen && <span className="sidebar-label">{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="welcome-message">Welcome, {studentData.user.name}</h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="notification-button">
              <FaBell />
            </button>
            <img src={studentData.user.avatar || "/placeholder.svg"} alt={studentData.user.name} className="user-avatar" />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Notices Card */}
          <div className="card notices-card">
            <div className="card-header">
              <h2 className="card-title"><FaBell /> Notices</h2>
            </div>
            <div className="card-content">
              <ul className="notices-list">
                {studentData.notices.map((notice, index) => (
                  <li key={index} className="notice-item">{notice}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Progress Card */}
          <div className="card progress-card">
            <div className="card-header">
              <h2 className="card-title"><FaFileAlt /> Course Progress</h2>
            </div>
            <div className="card-content">
              <ul className="progress-list">
                {studentData.courses.map((course, index) => (
                  <li key={index} className="progress-item">
                    <div className="progress-header">
                      <span>{course.name}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-indicator" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="card events-card">
            <div className="card-header">
              <h2 className="card-title"><FaCalendarAlt /> Upcoming Events</h2>
            </div>
            <div className="card-content">
              <ul className="events-list">
                {studentData.upcomingEvents.map((event, index) => (
                  <li key={index} className="event-item">
                    <span>{event.name}</span>
                    <span className="event-date">{event.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
