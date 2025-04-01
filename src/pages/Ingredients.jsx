import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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
        if (response.status === 401)
          throw new Error("Unauthorized: Invalid token");
        if (!response.ok) throw new Error("Failed to fetch ingredients");
        return response.json();
      })
      .then((data) => {
        const sorted = data.sort((a, b) => {
          const prioA = getExpirationPriority(a.expirationDate);
          const prioB = getExpirationPriority(b.expirationDate);
          return prioA - prioB;
        });
        setIngredients(sorted);
        setFiltered(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this ingredient?")) return;

    fetch(`http://localhost:8080/api/ingredients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete ingredient");
        setIngredients((prev) => prev.filter((i) => i.id !== id));
        setFiltered((prev) => prev.filter((i) => i.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(
      ingredients.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          (item.category && item.category.toLowerCase().includes(keyword))
      )
    );
  };

  const summarizeByStatus = () => {
    const today = new Date();
    let summary = { expired: 0, urgent: 0, upcoming: 0, safe: 0, noDate: 0 };

    ingredients.forEach((ingredient) => {
      if (!ingredient.expirationDate) {
        summary.noDate += 1;
        return;
      }

      const exp = new Date(ingredient.expirationDate);
      const diff = Math.floor((exp - today) / (1000 * 60 * 60 * 24));

      if (diff < 0) summary.expired += 1;
      else if (diff <= 3) summary.urgent += 1;
      else if (diff <= 7) summary.upcoming += 1;
      else summary.safe += 1;
    });

    return summary;
  };

  const getExpirationPriority = (expirationDate) => {
    if (!expirationDate) return 4;
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffInDays = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
    if (diffInDays < 0) return 0;
    if (diffInDays <= 3) return 1;
    if (diffInDays <= 7) return 2;
    return 3;
  };

  const getExpirationColor = (expirationDate) => {
    if (!expirationDate) return "text-gray-400";
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffInDays = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
    if (diffInDays < 0) return "text-red-500";
    if (diffInDays <= 3) return "text-orange-400";
    if (diffInDays <= 7) return "text-yellow-500";
    return "text-green-500";
  };

  const summary = summarizeByStatus();

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-5 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center mb-6">
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

      <div className="mb-2 text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
        <span className="text-red-500 font-semibold">{summary.expired}</span> expired, {" "}
        <span className="text-orange-400 font-semibold">{summary.urgent}</span> urgent, {" "}
        <span className="text-yellow-500 font-semibold">{summary.upcoming}</span> upcoming, {" "}
        <span className="text-green-500 font-semibold">{summary.safe}</span> safe, {" "}
        <span className="text-gray-400 font-semibold">{summary.noDate}</span> without date.
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or category..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No ingredients found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Quantity</th>
                <th className="px-4 py-2 font-semibold">Unit</th>
                <th className="px-4 py-2 font-semibold">Category</th>
                <th className="px-4 py-2 font-semibold">Expiration</th>
                <th className="px-4 py-2 font-semibold">Note</th>
                <th className="px-4 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ingredient) => (
                <tr
                  key={ingredient.id}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 align-middle text-sm">{ingredient.name}</td>
                  <td className="px-4 py-2 align-middle text-sm">{ingredient.quantity}</td>
                  <td className="px-4 py-2 align-middle text-sm">{ingredient.unit || "-"}</td>
                  <td className="px-4 py-2 align-middle text-sm">{ingredient.category || "-"}</td>
                  <td
                    className={`px-4 py-2 align-middle text-sm font-semibold ${getExpirationColor(
                      ingredient.expirationDate
                    )}`}
                  >
                    {formatDate(ingredient.expirationDate)}
                  </td>
                  <td className="px-4 py-2 align-middle text-sm">{ingredient.note || "-"}</td>
                  <td className="px-4 py-2 align-middle text-sm space-x-2">
                    <button
                      onClick={() => navigate(`/ingredients/edit/${ingredient.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ingredient.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <strong>Note:</strong> For ingredients like fruits or vegetables that are counted by piece (e.g., 3 apples), you can specify the unit as "pieces" and optionally mention average weight in grams in the note after expiration.
      </p>
    </div>
  );
};

export default Ingredients;
