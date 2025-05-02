// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        phone: form.phone,
        password: form.password, // assuming backend expects 'password', not 'otp'
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please check your phone or password.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-45 items-center justify-center min-h-screen bg-zinc-900 text-white">
        <div>
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-80">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="phone"
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
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
