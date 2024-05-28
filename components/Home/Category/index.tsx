import React from "react";
import CategoryMain from "./CategoryMain";

const Category = () => {
  return (
    <div className="h-[100vh] overflow-hidden w-full bg-gray-100">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-[3rem] font-bold">Category</h1>
        <CategoryMain />
      </div>
    </div>
  );
};

export default Category;
