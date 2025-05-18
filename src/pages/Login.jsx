// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // 

function Login() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone, password } = form;

    if (!phone || !password) {
      toast.error("Please enter both phone and password.");
      return;
    }

    const success = await login(phone, password); // 

    if (success) {
      navigate("/home"); // 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800/90 backdrop-blur-sm rounded-xl p-8 border border-zinc-700/50">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 w-80">
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
