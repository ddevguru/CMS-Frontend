"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {

  FaUpload,
  FaUser,
  FaBriefcase,
  FaImage,
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
  FaHome,
  FaSun,
  FaMoon,
 
  FaUsers,

} from "react-icons/fa"
import "./AdminPanel.css"

const UploadCandidate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("")
  const [photo, setPhoto] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullName || !role || !photo) {
      toast.error("All fields are required!")
      return
    }

    const formData = new FormData()
    formData.append("full_name", fullName)
    formData.append("role", role)
    formData.append("photo", photo)

    try {
      await axios.post("http://localhost:5000/upload_candidate", formData)
      toast.success("Candidate uploaded successfully!")
      setFullName("")
      setRole("")
      setPhoto(null)
      setPreviewUrl(null)
    } catch (error) {
      toast.error("Error uploading candidate")
    }
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
          <h1 className="welcome-message">Upload Candidate</h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </header>

        {/* Upload Candidate Form */}
        <div className="card upload-candidate-card">
          <div className="card-header">
            <h2 className="card-title">
              <FaUpload /> Upload Candidate
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="fullName">
                  <FaUser /> Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">
                  <FaBriefcase /> Role:
                </label>
                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="photo">
                  <FaImage /> Photo:
                </label>
                <input type="file" id="photo" onChange={handlePhotoChange} required className="form-input file-input" />
              </div>

              {previewUrl && (
                <div className="photo-preview">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="preview-image" />
                </div>
              )}

              <button type="submit" className="submit-btn">
                <FaUpload /> Upload Candidate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadCandidate
