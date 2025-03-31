import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen px-6 dark:bg-gray-900"
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Tiêu đề */}
      <motion.h1 
        className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Cooking Assistant
      </motion.h1>

      {/* Mô tả */}
      <motion.p 
        className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl mb-8"
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        Theo dõi nguyên liệu, lập kế hoạch bữa ăn & khám phá công thức nấu ăn.
      </motion.p>

      {/* Nút điều hướng */}
      <motion.div className="mt-8 space-x-6 flex">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
          <Link 
            to="/ingredients" 
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md transition hover:bg-red-600"
          >
            Quản lý Nguyên Liệu
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
          <Link 
            to="/recipes" 
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transition hover:bg-green-600"
          >
            Xem Công Thức
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
