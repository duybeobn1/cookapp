import React, { useEffect, useState } from "react";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get JWT token

    if (!token) {
      setError("Unauthorized: Please log in");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send JWT token
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid token");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch ingredients");
        }
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
      <h1 className="text-3xl font-bold mb-4">Ingredients</h1>
      <ul className="list-disc pl-5">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
