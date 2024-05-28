"use client";
import PostContainer from "@/components/Post/PostContainer";
import { getPostByCategory } from "@/lib/actions/actionsClient";
import React, { useEffect, useState } from "react";

const CategorySecDetails = ({ category }: { category: string }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      const { data, error } = await getPostByCategory(category.toLowerCase());
      console.log(data);
      setData(data);
    })();
  }, [category]);

  return (
    <div>
      <h1>{category}</h1>
      {data.length < 1 ? (
        <div>No post</div>
      ) : (
        <div className="flex flex-wrap">
          {data?.map((item) => (
            <PostContainer data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySecDetails;
