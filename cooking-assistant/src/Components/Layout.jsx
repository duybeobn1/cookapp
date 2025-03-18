import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      {/* Navbar */}
      <header className="flex items-center justify-between p-3 bg-blue-600 shadow-md">
        {/* Logo - Điều chỉnh khoảng cách hợp lý */}
        <div className="flex items-center space-x-1 text-white text-xl font-bold">
          <FaUtensils />
          <span>Cooking</span>
        </div>

        {/* Điều hướng - Giảm khoảng cách giữa các link */}
        <nav className="flex space-x-3">
          <Link 
            to="/" 
            className={`text-lg font-medium transition ${
              location.pathname === "/" ? "border-b-2 border-white text-white" : "text-gray-100 hover:text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/ingredients" 
            className={`text-lg font-medium transition ${
              location.pathname === "/ingredients" ? "border-b-2 border-white text-white" : "text-gray-100 hover:text-gray-300"
            }`}
          >
            Ingredients
          </Link>
          <Link 
            to="/recipes" 
            className={`text-lg font-medium transition ${
              location.pathname === "/recipes" ? "border-b-2 border-white text-white" : "text-gray-100 hover:text-gray-300"
            }`}
          >
            Recipes
          </Link>
        </nav>

        {/* Dark Mode + Đăng nhập/Đăng ký - Điều chỉnh khoảng cách */}
        <div className="flex items-center space-x-1">
          {/* Dark Mode Toggle */}
          <motion.button 
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-3 py-1 text-sm rounded transition border ${
              darkMode 
                ? "bg-yellow-500 text-black hover:bg-yellow-400" 
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </motion.button>

          {/* Nút Đăng nhập / Đăng ký */}
          <Link to="/login" className="px-3 py-3 text-sm bg-white text-blue-600 border rounded hover:bg-gray-200">
            Đăng nhập
          </Link>
          <Link to="/signup" className="px-3 py-3 text-sm bg-green-500 text-white rounded hover:bg-green-600">
            Đăng ký
          </Link>
        </div>
      </header>

      {/* Nội dung trang */}
      <main className="p-10 min-h-screen">{children}</main>
      
      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-400">
        © 2025 Cooking Assistant
      </footer>
    </div>
  );
};

export default Layout;
