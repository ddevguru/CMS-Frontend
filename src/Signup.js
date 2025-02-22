"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, User, Mail, Lock, Phone, Image, ChevronRight, Users } from "lucide-react"
import { Link } from "react-router-dom"
function SignupPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    photo: null,
  })

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "photo" ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    setLoading(true)

    const formDataToSend = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      })

      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          phone: "",
          role: "",
          photo: null,
        })
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  const inputFields = [
    { name: "name", type: "text", placeholder: "Full Name", icon: <User /> },
    { name: "username", type: "text", placeholder: "Username", icon: <User /> },
    { name: "email", type: "email", placeholder: "Email", icon: <Mail /> },
    { name: "password", type: "password", placeholder: "Password", icon: <Lock /> },
    { name: "phone", type: "text", placeholder: "Phone Number", icon: <Phone /> },
  ]

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
            Signup
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
          {inputFields.map(({ name, type, placeholder, icon }, index) => (
            <motion.div
              key={name}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
              <motion.input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full pl-10 p-2 rounded-lg bg-opacity-50 bg-white backdrop-blur-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>
          ))}

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Users className="absolute left-3 top-3 text-gray-400" size={20} />
            <motion.select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full pl-10 p-2 rounded-lg bg-opacity-50 bg-white backdrop-blur-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
              whileFocus="focus"
              variants={inputVariants}
            >
              <option value="">Select Role</option>
              {/* <option value="user">User</option> */}
              <option value="admin">Admin</option>
              <option value="mentor">Mentor</option>
              <option value="student">Student</option>
              <option value="doct">Doctor</option>
            </motion.select>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Image className="absolute left-3 top-3 text-gray-400" size={20} />
            <motion.input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full pl-10 p-2 rounded-lg bg-opacity-50 bg-white backdrop-blur-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
            transition={{ delay: 0.7 }}
          >
            <span>{loading ? "Signing Up..." : "Sign Up"}</span>
            <ChevronRight size={20} />
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-500 font-semibold hover:underline">
            Login
          </Link>

        </p>
      </motion.div>
    </motion.div>
  )
}

export default SignupPage

