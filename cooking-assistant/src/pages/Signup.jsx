import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormValid = email && password && confirmPassword && password === confirmPassword;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Đăng Ký</h2>
      <form className="w-80 bg-white dark:bg-gray-800 p-6 rounded shadow-md border border-gray-300">
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
        <button 
          type="submit" 
          className={`w-full p-3 rounded transition ${
            isFormValid 
              ? "bg-green-500 text-black hover:bg-green-600" 
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Đăng Ký
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
