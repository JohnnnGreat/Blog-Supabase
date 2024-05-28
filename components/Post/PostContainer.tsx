import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostContainer = ({ data }: { data: IPost }) => {
  return (
    <div className="w-[250px] h-[300px]">
      <img className="w-full h-[200px] object-cover" src={data?.coverImage} alt="post image" />
      <div className="py-[.8rem]">
        <h1 className="tracking-wider text-gray-400 font-light text-[.9rem] ">
          {data?.category.toUpperCase() || "GENERAL"}
        </h1>
        <p className="text-black mt-[.4rem] font-medium text-[.9rem] ">
          {data?.title.toUpperCase()}
        </p>
        <Link
          className="font-light underline inline-block hover:none text-gray-500 mt-[.66rem]"
          href={`/posts/${data.postId}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostContainer;
