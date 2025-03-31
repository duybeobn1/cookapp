import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // ✅ Store user info
        navigate("/"); 
        window.location.reload(); // 🔄 Refresh to update navbar
      } else {
        setError(data.message || "Sai email hoặc mật khẩu, vui lòng thử lại!");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (error) {
      setError("Lỗi kết nối! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Đăng Nhập</h2>
      <motion.form 
        className="w-80 bg-white dark:bg-gray-800 p-6 rounded shadow-md border border-gray-300"
        onSubmit={handleLogin}
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.2 }}
      >
        <input 
          type="text" 
          placeholder="Email" 
          className="text-black w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          className="text-black w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <button 
          type="submit" 
          className={`w-full p-3 rounded transition font-semibold ${
            isFormValid && !loading
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isFormValid || loading}
        >
          {loading ? "Đang xử lý..." : "Đăng Nhập"}
        </button>
      </motion.form>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Chưa có tài khoản? 
        <Link to="/signup" className="text-blue-500 hover:underline"> Đăng ký</Link>
      </p>
    </div>
  );
};

export default Login;
