import React from "react";
import Foreground from "./components/Foreground";
import Background from "./components/background";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Custom wrapper to use hooks like useLocation outside <Router>
const AppWrapper = () => {
  const location = useLocation();
  const showNavBar = ["/", "/create-task"].includes(location.pathname);

  return (
    <>
      <ToastContainer />

      {/* Conditionally render NavBar */}
      {showNavBar && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={
            <div className="relative w-full h-screen bg-zinc-800">
              <Background />
              <Foreground />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-task" element={<CreateTask />} />
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
