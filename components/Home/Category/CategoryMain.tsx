"use client";
import { category } from "@/constant";
import Link from "next/link";
import React, { useState } from "react";
import CategorySecDetails from "./CategorySecDetails";

const CategoryMain = () => {
  const [currentCategory, setCurrentCategory] = useState("Technology");
  return (
    <div className="w-full">
      <div className="flex gap-2 w-full overflow-x-auto pb-[.6rem]">
        {category?.map((item, index) => (
          <button
            className={`border-1 border-blue-500 rounded-full py-[.6rem] px-[1rem] transition-all ${
              currentCategory === item && "border-none bg-blue-500 text-white transition-all"
            }`}
            onClick={() => {
              setCurrentCategory(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        <CategorySecDetails category={currentCategory} />
      </div>
    </div>
  );
};

export default CategoryMain;
