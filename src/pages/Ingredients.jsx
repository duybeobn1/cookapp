import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) throw new Error("Unauthorized: Invalid token");
        if (!response.ok) throw new Error("Failed to fetch ingredients");
        return response.json();
      })
      .then((data) => {
        setIngredients(data);
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Ingredients</h1>
        {isAuthenticated && (
          <Link
            to="/ingredients/add"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            + Add Ingredient
          </Link>
        )}
      </div>

      {ingredients.length === 0 ? (
        <p className="text-gray-500">No ingredients found.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {ingredients.map((ingredient) =>
            ingredient.name ? (
              <li key={ingredient.id} className="text-lg">
                <span className="font-semibold">{ingredient.name}</span> —{" "}
                {ingredient.quantity} {ingredient.unit || ""}
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
};

export default Ingredients;
