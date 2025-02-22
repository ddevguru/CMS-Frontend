"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {
  FaBars,
  FaHome,
  FaTimes,
  FaVoteYea,
  FaHeartbeat,
  FaCalendarAlt,
  FaFileAlt,
  FaMapMarkerAlt,
  FaClipboardList,
  FaBullhorn,
  FaMoneyBillWave,
  FaSun,
  FaMoon,
  FaSearch,
} from "react-icons/fa"
import "./Voters.css"

const Voters = () => {
  const [voters, setVoters] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState({ id: 1, name: "John Doe" }) // Dummy logged-in user
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/api/voters")
      .then((response) => {
        setVoters(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching voters:", error)
        setError("Failed to fetch voters. Please try again later.")
        setLoading(false)
      })
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    // Check if the user has already voted
    axios
      .get(`http://localhost:5000/api/check_vote?user_id=${user.id}`)
      .then((response) => setVoted(response.data.voted))
      .catch((error) => console.error("Error checking vote:", error))
  }, [user.id])

  const handleVote = (candidateId) => {
    if (voted) {
      alert("You have already voted!")
      return
    }

    axios
      .post("http://localhost:5000/api/vote", { user_id: user.id, candidate_id: candidateId })
      .then((response) => {
        if (response.data.success) {
          setVoted(true)
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
      })
      .catch((error) => console.error("Error voting:", error))
  }

  const menuItems = [
    { icon: <FaHome />, name: "Dashboard", route: "/student-dashboard" },
    { icon: <FaVoteYea />, name: "Online Voting", route: "/get_voters" },
    { icon: <FaHeartbeat />, name: "Health Report" },
    { icon: <FaCalendarAlt />, name: "Booking Section" },
    { icon: <FaFileAlt />, name: "Submit Application" },
    { icon: <FaMapMarkerAlt />, name: "Track Application" },
    { icon: <FaClipboardList />, name: "Track Booking" },
    { icon: <FaBullhorn />, name: "Complaint Box" },
    { icon: <FaMoneyBillWave />, name: "Sponsorship & Budget" },
  ]

  const filteredVoters = voters.filter((voter) => voter.full_name.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`dashboard ${theme}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <h2 className="portal-title">Student Portal</h2>}
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
        <div className="header">
          <h1>Voters List</h1>
          <div className="header-actions">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search voters..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading voters...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="voters-grid">
            {filteredVoters.map((voter) => (
              <div key={voter.id} className="voter-card">
                <div className="voter-image">
                  {voter.photo ? (
                    <img src={voter.photo || "/placeholder.svg"} alt={voter.full_name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="voter-info">
                  <h3>{voter.full_name}</h3>
                  <p>Role: {voter.role}</p>
                </div>
                <button
                  className={`vote-button ${voted ? "voted" : ""}`}
                  onClick={() => handleVote(voter.id)}
                  disabled={voted}
                >
                  {voted ? "Voted" : "Vote"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Voters

