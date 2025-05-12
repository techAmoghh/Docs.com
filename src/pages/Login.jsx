// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // 🧠 Import custom hook

function Login() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use login from context

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

    const success = await login(phone, password); // ✅ Use global login()

    if (success) {
      navigate("/home"); // 🧭 Navigate on success
    }
  };

  return (
    <div className="flex flex-col gap-45 items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div>
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-80">
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
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
