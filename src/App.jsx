// src/App.jsx
import React from "react";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Wrapper for conditional logic like NavBar visibility
const AppWrapper = () => {
  const location = useLocation();
  const showNavBar = ["/home", "/create-task"].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div className="relative w-full h-screen bg-zinc-800">
                <Home />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return <AppWrapper />; // ✅ no <Router> here
}

export default App;
