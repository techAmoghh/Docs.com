// src/pages/Signup.jsx
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ username: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/register", form);
      toast.success("Signup successful! 🚀 Please login now.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="p-2 w-full bg-zinc-800 border border-zinc-700 rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-2 w-full bg-zinc-800 border border-zinc-700 rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 w-full bg-zinc-800 border border-zinc-700 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
