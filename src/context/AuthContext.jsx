// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient.js"; // 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]); // 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(" Found token?", token);
    if (token) {
      setUser({ token });
      fetchTasks(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

const fetchTasks = async (token = user?.token) => {
  try {
    console.log("Fetching tasks with token:", token || 'using existing token');
    const res = await axiosClient.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token || user?.token}`,
      },
    });
    console.log("Fetched tasks response:", res.data);
    // The response is already the tasks array, no need for .tasks
    const tasksData = Array.isArray(res.data) ? res.data : [];
    console.log("Setting tasks in context:", tasksData);
    setTasks(tasksData);
    return tasksData;
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    toast.error("Couldn't load tasks.");
    return [];
  }
};

  const login = async (phone, password) => {
    try {
      const res = await axiosClient.post("/auth/login", { phone, password });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setUser({ token: res.data.token });
        toast.success("Login successful!");
        await fetchTasks(res.data.token); // fetch tasks on login
        navigate("/home");
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Check phone or password.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    setTasks([]); // reset tasks
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, tasks, fetchTasks }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//  Custom hook for consuming auth context
export const useAuth = () => useContext(AuthContext);
