import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "" && password === confirmPassword;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ Store JWT token
        navigate("/"); // ✅ Redirect to home
      } else {
        setError(data.error || "Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      setError("Lỗi kết nối! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Đăng Ký</h2>
      <form 
        className="w-80 bg-white dark:bg-gray-800 p-6 rounded shadow-md border border-gray-300"
        onSubmit={handleSignup}
      >
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          className="w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Xác nhận mật khẩu" 
          className="w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        <button 
          type="submit" 
          className={`w-full p-3 rounded transition font-semibold ${
            isFormValid && !loading
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isFormValid || loading}
        >
          {loading ? "Đang xử lý..." : "Đăng Ký"}
        </button>
      </form>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Đã có tài khoản? 
        <Link to="/login" className="text-blue-500 hover:underline"> Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Signup;
