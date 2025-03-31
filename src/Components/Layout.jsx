import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✨ Helper function for nav link styling
  const navLinkClass = (path) =>
    `h-10 px-4 flex items-center justify-center rounded text-sm font-medium transition ${
      location.pathname === path
        ? "bg-white text-blue-600"
        : "text-white hover:bg-blue-700"
    }`;

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }
    >
      {/* Navbar */}
      <header className="flex items-center justify-between p-3 bg-blue-600 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-white text-xl font-bold">
          <FaUtensils />
          <span>Cooking</span>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-2">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/ingredients" className={navLinkClass("/ingredients")}>
            Ingredients
          </Link>
          <Link to="/recipes" className={navLinkClass("/recipes")}>
            Recipes
          </Link>
        </nav>

        {/* Dark mode toggle + auth buttons */}
        <div className="flex items-center space-x-3">
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

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-red-600 border border-red-500 rounded hover:bg-red-100"
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 border rounded hover:bg-gray-200"
              >
                Đăng nhập
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10 min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-400">
        © 2025 Cooking Assistant
      </footer>
    </div>
  );
};

export default Layout;
