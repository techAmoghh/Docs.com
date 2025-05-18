import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ username: "", phone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];

    // Username validation
    if (!form.username.trim()) {
      errors.push("Username is required");
    } else if (form.username.length < 3) {
      errors.push("Username must be at least 3 characters long");
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      errors.push("Username can only contain letters, numbers, and underscores");
    }

    // Phone validation
    if (!form.phone.trim()) {
      errors.push("Phone number is required");
    } else if (!/^\+?[1-9]\d{1,14}$/.test(form.phone)) {
      errors.push("Please enter a valid phone number");
    }

    // Password validation
    if (!form.password.trim()) {
      errors.push("Password is required");
    } else if (form.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    setIsLoading(true);
    try {
      await axiosClient.post("/auth/register", form);
      toast.success("Signup successful! 🚀 Please login now.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message?.includes("username")) {
        toast.error("Username already exists. Please choose a different username.");
      } else if (err.response?.data?.message?.includes("phone")) {
        toast.error("Phone number already registered.");
      } else {
        toast.error(err.response?.data?.message || "Signup failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800/90 backdrop-blur-sm rounded-xl p-8 border border-zinc-700/50">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 w-80">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Choose a username"
              required
            />
            <p className="mt-1 text-xs text-gray-400">
              Must be at least 3 characters long and can contain letters, numbers, and underscores
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Enter your phone number"
              required
            />
            <p className="mt-1 text-xs text-gray-400">
              Enter a valid phone number (e.g., 1234567890)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Create a password"
              required
            />
            <p className="mt-1 text-xs text-gray-400">
              Must be at least 6 characters long
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
