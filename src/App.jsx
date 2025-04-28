import React from "react";
import Foreground from "./components/Foreground";
import Background from "./components/background";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTask from "./pages/CreateTask";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Default route for "/" */}
          <Route
            path="/"
            element={
              <div className="relative w-full h-screen bg-zinc-800">
                <Background />
                <Foreground />
              </div>
            }
          />

          {/* Other routes */}
          <Route path="/create-task" element={<CreateTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
