"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FaBars,
  FaTimes,
  FaVoteYea,
  FaHeartbeat,
  FaCalendarAlt,
  FaFileAlt,
  FaMapMarkerAlt,
  FaClipboardList,
  FaBullhorn,
  FaMoneyBillWave,
  FaBell,
  FaSun,
  FaMoon,
  FaChartLine,
  FaCog,
  FaUsers,
  FaDatabase,
  FaHome,
} from "react-icons/fa"
import "./AdminPanel.css"
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userData, setUserData] = useState({ username: 'Student', photo: '/placeholder.svg' });
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
  
  
    

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const adminData = {
    user: { name: "Admin", avatar: "https://via.placeholder.com/100" },
    notifications: [
      { id: 1, message: "New user registration", time: "5 minutes ago" },
      { id: 2, message: "Server update completed", time: "1 hour ago" },
      { id: 3, message: "Database backup successful", time: "3 hours ago" },
    ],
    stats: [
      { name: "Total Users", value: 5280, icon: <FaUsers /> },
      { name: "Active Sessions", value: 120, icon: <FaChartLine /> },
      { name: "Server Uptime", value: "99.9%", icon: <FaDatabase /> },
    ],
    recentActivity: [
      { action: "User Profile Updated", user: "John Doe", time: "10 minutes ago" },
      { action: "New Course Added", user: "Jane Smith", time: "1 hour ago" },
      { action: "Complaint Resolved", user: "Admin", time: "2 hours ago" },
    ],
  }

  const menuItems = [
    { icon: <FaHome />, name: "Dashboard", route: "/admin-panel" },
    { icon: <FaVoteYea />, name: "Upload Candidates", route: "/upload-candidate" },
    { icon: <FaUsers />, name: "Selected Candidates", route: "/get_candidates" },
    { icon: <FaHeartbeat />, name: "Health Reports",route:'/get_reports' },
    { icon: <FaCalendarAlt />, name: "Add Facilities" ,route:"/facility"},
    { icon: <FaCalendarAlt />, name: "Bookings" ,route:"/approve_booking"},
    { icon: <FaFileAlt />, name: "Applications", route:"/applications" },
    { icon: <FaMapMarkerAlt />, name: "Tracking" },
    { icon: <FaClipboardList />, name: "Add Cheating Reports", route:"/add_cheating_record" },
    { icon: <FaBullhorn />, name: "Complaints" },
    { icon: <FaMoneyBillWave />, name: "Finances",route:"/upload" },
  ]

  return (
    <div className={`dashboard ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <h2 className="portal-title">Admin Portal</h2>}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-menu-item">
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

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Header */}
        <header className="dashboard-header">
        <h1 className="welcome-message">Welcome, {userData.username}</h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="notification-dropdown">
              <button className="notification-button">
                <FaBell />
                <span className="notification-count">{adminData.notifications.length}</span>
              </button>
              <div className="notification-content">
                {adminData.notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <p>{notification.message}</p>
                    <span>{notification.time}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* <img src={adminData.user.avatar || "/placeholder.svg"} alt={adminData.user.name} className="user-avatar" /> */}
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Stats Cards */}
          {adminData.stats.map((stat, index) => (
            <div key={index} className="card stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-name">{stat.name}</p>
              </div>
            </div>
          ))}

          {/* Recent Activity Card */}
          <div className="card activity-card">
            <div className="card-header">
              <h2 className="card-title">
                <FaChartLine /> Recent Activity
              </h2>
            </div>
            <div className="card-content">
              <ul className="activity-list">
                {adminData.recentActivity.map((activity, index) => (
                  <li key={index} className="activity-item">
                    <div className="activity-info">
                      <strong>{activity.action}</strong>
                      <span>by {activity.user}</span>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card quick-actions-card">
            <div className="card-header">
              <h2 className="card-title">
                <FaCog /> Quick Actions
              </h2>
            </div>
            <div className="card-content">
              <div className="quick-actions-grid">
                <button className="quick-action-btn">Add User</button>
                <button className="quick-action-btn">Create Report</button>
                <button className="quick-action-btn">System Settings</button>
                <button className="quick-action-btn">View Logs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

