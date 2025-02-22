"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FaSearch,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaVoteYea,
  FaUsers,
  FaHeartbeat,
  FaCalendarAlt,
  FaFileAlt,
  FaMapMarkerAlt,
  FaClipboardList,
  FaBullhorn,
  FaMoneyBillWave,
  FaTimes,
  FaBars,
  FaSun,
  FaMoon,
  FaBell,
  FaHome,
} from "react-icons/fa"

const Candidates = () => {
  const [candidates, setCandidates] = useState([])
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const adminData = {
    user: { name: "Admin User", avatar: "/placeholder.svg" },
    notifications: [
      { id: 1, message: "New candidate application", time: "5 minutes ago" },
      { id: 2, message: "Voting results updated", time: "1 hour ago" },
    ],
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  useEffect(() => {
    const filtered = candidates.filter(
      (candidate) =>
        candidate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterRole === "All" || candidate.role === filterRole),
    )
    setFilteredCandidates(filtered)
  }, [searchTerm, filterRole, candidates])

  const fetchCandidates = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:5000/get_candidates")
      setCandidates(response.data)
    } catch (error) {
      console.error("Error fetching candidates:", error)
      alert("Failed to fetch candidates. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await axios.delete(`http://localhost:5000/delete_candidate/${id}`)
        setCandidates(candidates.filter((candidate) => candidate.id !== id))
        alert("Candidate deleted successfully.")
      } catch (error) {
        console.error("Error deleting candidate:", error)
        alert("Failed to delete candidate. Please try again.")
      }
    }
  }

  const handleEdit = (candidate) => {
    // Implement edit functionality
    console.log("Edit candidate:", candidate)
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const menuItems = [
    { icon: <FaHome />, name: "Dashboard", route: "/admin-panel" },
    { icon: <FaVoteYea />, name: "Upload Candidates", route: "/upload-candidate" },
    { icon: <FaUsers />, name: "Selected Candidates", route: "/get_candidates" },
    { icon: <FaHeartbeat />, name: "Health Reports" },
    { icon: <FaCalendarAlt />, name: "Bookings" },
    { icon: <FaFileAlt />, name: "Applications" },
    { icon: <FaMapMarkerAlt />, name: "Tracking" },
    { icon: <FaClipboardList />, name: "Reports" },
    { icon: <FaBullhorn />, name: "Complaints" },
    { icon: <FaMoneyBillWave />, name: "Finances" },
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
          <h1 className="welcome-message">Welcome, {adminData.user.name}</h1>
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
            <img src={adminData.user.avatar || "/placeholder.svg"} alt={adminData.user.name} className="user-avatar" />
          </div>
        </header>

        {/* Candidates Management Content */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Candidate Management</h2>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Secretary">Secretary</option>
              </select>
              <button
                onClick={() => alert("Add new candidate functionality to be implemented")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaUserPlus className="inline-block mr-2" />
                Add Candidate
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredCandidates.map((candidate) => (
                  <motion.div key={candidate.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.8 }}>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105">
                      <div className="relative">
                        <img
                          src={candidate.photo || "https://via.placeholder.com/300"}
                          alt={candidate.full_name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-0 right-0 p-2">
                          <button className="text-white hover:text-gray-200 focus:outline-none">
                            <FaEllipsisV />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                            <button
                              onClick={() => handleEdit(candidate)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <FaEdit className="inline-block mr-2" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(candidate.id)}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <FaTrash className="inline-block mr-2" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{candidate.full_name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Role: {candidate.role}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-blue-500">View Profile</span>
                          <span className="text-sm text-gray-500">{candidate.votes || 0} votes</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!isLoading && filteredCandidates.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No candidates found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Candidates

