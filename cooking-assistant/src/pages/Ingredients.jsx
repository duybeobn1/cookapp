import React from "react";

const Ingredients = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Danh sách nguyên liệu</h1>
      <p className="text-gray-600">Hiển thị nguyên liệu người dùng có.</p>

      <div className="mt-4 border p-4 rounded-lg shadow-md">
        <p className="text-gray-800">🍚 Gạo - 2kg</p>
        <p className="text-gray-800">🥕 Cà rốt - 500g</p>
        <p className="text-gray-800">🥩 Thịt bò - 300g</p>
      </div>
    </div>
  );
};

export default Ingredients;
