import React, { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get stored token

    fetch("http://localhost:8080/api/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send JWT token
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch recipes");
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
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
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <ul className="list-disc pl-5">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
