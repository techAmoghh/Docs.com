import React from "react";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Custom wrapper to use hooks like useLocation outside <Router>
const AppWrapper = () => {
  const location = useLocation();
  const showNavBar = ["/home", "/create-task"].includes(location.pathname);

  return (
    <>
      <ToastContainer />

      {/* Conditionally render NavBar */}
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
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
