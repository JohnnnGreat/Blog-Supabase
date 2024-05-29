import React from "react";
import CategoryMain from "./CategoryMain";

const Category = () => {
  return (
    <div className="p-[.9rem] h-auto md:h-[100vh] overflow-hidden w-full bg-gray-100 py-[3rem]">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-[1.6rem] md:text-[2.5rem] font-bold">Category</h1>
        <CategoryMain />
      </div>
    </div>
  );
};

export default Category;
