"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Mail, Lock, ChevronRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const redirectPath = localStorage.getItem("redirect");
  
    if (userId && redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Login successful!");
  
        // ✅ Store user data in localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("name", data.user.name); // ✅ Store name
        localStorage.setItem("email", data.user.email); // ✅ Store email
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("photo", data.user.photo);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("redirect", data.redirect); // Store redirect path
  
        setTimeout(() => {
          navigate(data.redirect);
        }, 1500);
      } else {
        setError(data.error || "Login failed!");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };
  

  const backgroundVariants = {
    light: {
      background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    },
    dark: {
      background: "linear-gradient(120deg, #2a2a72 0%, #009ffd 100%)",
    },
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const hue = Math.random() * 360
      document.documentElement.style.setProperty("--random-hue", `${hue}deg`)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      animate={darkMode ? "dark" : "light"}
      variants={backgroundVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            animate={{
              x: [0, 100, 0],
              y: [0, 100, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(var(--random-hue), 100%, ${darkMode ? "30%" : "70%"})`,
              height: `${Math.random() * 200 + 50}px`,
              width: `${Math.random() * 200 + 50}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative p-8 rounded-xl shadow-2xl w-96 backdrop-blur-md"
        style={{
          background: darkMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)",
        }}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Login
          </h2>
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-green-400 text-sm mb-4"
            >
              {message}
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-red-400 text-sm mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full pl-10 p-2 rounded-lg bg-opacity-50 bg-white backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              whileFocus="focus"
              variants={inputVariants}
            />
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <motion.input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-10 p-2 rounded-lg bg-opacity-50 bg-white backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              whileFocus="focus"
              variants={inputVariants}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full p-2 text-white rounded-lg shadow-md flex items-center justify-center space-x-2 transition-all ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-violet-500"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span>{loading ? "Logging in..." : "Login"}</span>
            <ChevronRight size={20} />
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-violet-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default LoginPage

