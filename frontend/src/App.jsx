import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App