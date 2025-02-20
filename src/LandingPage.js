"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Sun, Moon, ChevronRight, Layers, Users, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom";

const features = [
  { title: "🗳 Student Election System", description: "Secure voting & live tracking of elections.", icon: Users },
  {
    title: "🏥 Health & Leave Notifications",
    description: "Automatic notifications to parents and faculty.",
    icon: Shield,
  },
  {
    title: "🏛 Campus Facility Booking",
    description: "Online booking for auditoriums & sports facilities.",
    icon: Layers,
  },
  {
    title: "📄 Application & Approval System",
    description: "Transparent tracking for all approvals & requests.",
    icon: Users,
  },
  {
    title: "🎓 Academic Integrity System",
    description: "Public cheating records to maintain integrity.",
    icon: Shield,
  },
  { title: "🔒 Anonymous Complaint System", description: "Submit anonymous complaints securely.", icon: Layers },
  { title: "💰 Budget & Sponsorship Tracking", description: "Transparent display of financial records.", icon: Users },
  {
    title: "🔐 Role-Based Access Control",
    description: "Different dashboards for students, faculty, & admin.",
    icon: Shield,
  },
]

function LandingPage() {
  const [darkMode, setDarkMode] = useState(true)
  const controls = useAnimation()
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } })
  }, [controls])

  const parallaxY = scrollY * 0.5

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 p-4 text-xl font-bold flex justify-between items-center shadow-lg transition-all duration-500 ${
          darkMode
            ? "bg-gray-800/50 shadow-blue-500/30 backdrop-blur-md"
            : "bg-white/70 shadow-indigo-500/30 backdrop-blur-md"
        }`}
      >
        <motion.h1
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          whileHover={{ scale: 1.05 }}
        >
          College Management System
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <header
        className={`relative overflow-hidden text-center py-32 transition-all duration-500 ${
          darkMode ? "bg-blue-900/30" : "bg-indigo-100/50"
        }`}
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl font-extrabold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              A Smart College Management Solution
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`mt-3 text-2xl ${darkMode ? "text-blue-200" : "text-indigo-800"}`}
          >
            Secure, Transparent & Role-Based Access for All
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center mx-auto"
          >
            Get Started <ChevronRight className="ml-2" />
          </motion.button>
        </motion.div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-multiply" />
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
              opacity: [0.1, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "url('https://imgs.search.brave.com/_i_qmY7TyaJBmAFq48ODRhBUPQ6qwpbr8LoJIa0jEUw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cubWFnb2ZvZy5jb20vYXNzZXRzL2ltZy9tb2NrdXAvY21zLmpwZWc?height=1080&width=1920')",

              backgroundSize: "cover",
            }}
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className={`text-4xl font-bold text-center mb-12 ${darkMode ? "text-blue-300" : "text-indigo-800"}`}
        >
          Key Features
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={`p-6 rounded-xl transition transform hover:scale-105 border-2 text-center duration-300 ease-in-out ${
                darkMode
                  ? "bg-gray-800/50 shadow-blue-500/30 border-blue-500/50 backdrop-blur-sm"
                  : "bg-white/70 shadow-indigo-500/30 border-indigo-200 backdrop-blur-sm"
              }`}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mb-4">
                <feature.icon className={`w-12 h-12 mx-auto ${darkMode ? "text-blue-400" : "text-indigo-600"}`} />
              </motion.div>
              <h3 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-blue-300" : "text-indigo-700"}`}>
                {feature.title}
              </h3>
              <p className={darkMode ? "text-blue-100" : "text-indigo-600"}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div
        className={`text-center py-16 transition-all duration-500 ${darkMode ? "bg-blue-900/30" : "bg-indigo-100/50"}`}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className={`text-4xl font-bold mb-4 ${darkMode ? "text-blue-300" : "text-indigo-800"}`}
        >
          Get Started Today!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.2 }}
          className={`mt-2 text-xl ${darkMode ? "text-blue-200" : "text-indigo-700"}`}
        >
          Sign up to access the college management system.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center mx-auto"
        >
          Sign Up Now <ChevronRight className="ml-2" />
        </motion.button>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center transition-all duration-500 ${darkMode ? "bg-gray-900/50" : "bg-white/70"}`}>
        <p className={darkMode ? "text-blue-200" : "text-indigo-700"}>
          © 2025 College Management System. All rights reserved.
        </p>
      </footer>

      {/* Floating 3D Elements */}
      <AnimatePresence>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="hidden md:block fixed w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mix-blend-multiply filter blur-xl opacity-50"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [1, 1.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default LandingPage

