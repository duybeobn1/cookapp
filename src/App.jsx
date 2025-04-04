import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Ingredients from "./pages/Ingredients.jsx";
import Recipes from "./pages/Recipes.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EditIngredient from "./pages/EditIngredients.jsx";
import AddIngredient from "./pages/AddIngredient.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css"

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ingredients/add" element={<AddIngredient />} />
          <Route path="/ingredients/edit/:id" element={<EditIngredient />} />
          <Route path="/recipes/add" element={<AddRecipe />} />
          <Route path="/recipes/edit/:id" element={<EditRecipe />} />

        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
