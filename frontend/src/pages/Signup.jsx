import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Software Engineer",
  "UI/UX Developer",
]

const quotes = [
  "At Skynetic, we build tomorrow's solutions today.",
  "Innovation meets excellence. Welcome to the Skynetic family.",
  "Your journey with Skynetic begins now. Let's create the future together.",
  "Join a team where your code shapes the future. Welcome to Skynetic!",
]

const Signup = () => {
  const [done, setDone] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  })
  const [showRoles, setShowRoles] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    console.log(formData)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`,{
      method: "POST",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email
      })
    })
    const data = await res.json();
    console.log(data)
    if (selectedRole && formData.name && formData.email) {
      setDone(true)
    }
  }

  /* -------------------------------- DONE STATE -------------------------------- */

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-gray-700 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Floating background blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [180, 90, 0], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [-20, 20, -20], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-white rounded-full blur-3xl"
        />

        {/* Glass success card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10 max-w-3xl w-full p-8 md:p-16 rounded-3xl
                     bg-white/25 backdrop-blur-2xl
                     border border-white/40 shadow-2xl text-center"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Welcome to Skynetic!
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <p className="text-xl md:text-2xl text-white italic leading-relaxed">
                "{quotes[Math.floor(Math.random() * quotes.length)]}"
              </p>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
            />

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold"
            >
              ✓ Successfully Submitted
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  /* -------------------------------- FORM STATE -------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-gray-700 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl"
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left branding */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Join the
              <br />
              Future
            </h1>

            <div className="h-2 w-32 md:w-48 bg-white rounded-full" />

            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Become part of something extraordinary.
              <br />
              Your journey with Skynetic begins here.
            </p>
          </motion.div>

          {/* Glass Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-6 sm:p-8 space-y-6
                         bg-white/15 backdrop-blur-xl
                         border border-white/25 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Get Started
              </h2>

              <input
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              {/* Role dropdown */}
              <button
                type="button"
                onClick={() => setShowRoles(!showRoles)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-left text-white flex justify-between"
              >
                {selectedRole || "Select Your Role"}
                <span>{showRoles ? "▲" : "▼"}</span>
              </button>

              <AnimatePresence>
                {showRoles && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2"
                  >
                    {roles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role)
                          setShowRoles(false)
                        }}
                        className="w-full bg-white/10 hover:bg-white text-white hover:text-gray-900 py-2 px-4 rounded-lg transition"
                      >
                        {role}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 h-32 text-white placeholder-white/60 focus:outline-none focus:border-white resize-none"
                placeholder="Tell us why you want to join... (optional)"
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
              />

              <button
                type="submit"
                disabled={!selectedRole}
                className="w-full bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
              >
                Join Skynetic →
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
