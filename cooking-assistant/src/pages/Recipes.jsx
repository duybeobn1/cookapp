import React from "react";

const Recipes = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Công thức nấu ăn</h1>
      <p className="text-gray-600">Danh sách công thức gợi ý dựa trên nguyên liệu.</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Phở Bò</h2>
          <p className="text-gray-600">Nguyên liệu: Bò, bánh phở, hành lá</p>
        </div>
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Canh Chua Cá</h2>
          <p className="text-gray-600">Nguyên liệu: Cá, cà chua, me</p>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
