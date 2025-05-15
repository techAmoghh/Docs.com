// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient.js"; // 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]); // 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async (token = user?.token) => {
    if (!token) return [];
    
    try {
      console.log("Fetching tasks with token:", token);
      const res = await axiosClient.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Fetched tasks response:", res.data);
      const tasksData = Array.isArray(res.data) ? res.data : [];
      console.log("Setting tasks in context:", tasksData);
      setTasks(tasksData);
      return tasksData;
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      toast.error("Couldn't load tasks.");
      return [];
    }
  }, [user?.token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(" Found token?", token);
    if (token) {
      setUser({ token });
      fetchTasks(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchTasks]);

  const login = async (phone, password) => {
    try {
      const res = await axiosClient.post("/auth/login", { phone, password });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        const userData = { token: res.data.token };
        setUser(userData);
        await fetchTasks(res.data.token);
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed. Check phone or password.");
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
      value={{ 
        user, 
        login, 
        logout, 
        loading, 
        tasks, 
        fetchTasks 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//  Custom hook for consuming auth context
export const useAuth = () => useContext(AuthContext);
