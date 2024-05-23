import { getAllPost } from "@/lib/actions/posts";
import React from "react";
import PostContainer from "../Post/PostContainer";
import { IPost } from "@/types";
import Link from "next/link";

const AllPost = async () => {
  const { data, error } = await getAllPost();

  return (
    <>
      <div className="flex gap-4">
        {data?.map((item: IPost, index: number) => {
          return <PostContainer data={item} key={index} />;
        })}
      </div>
      <div className="w-full flex items-center justify-center mt-[1rem]">
        <Link className="inline-block bg-black text-white py-[.7rem] px-[1rem]" href="/post">
          View all Post
        </Link>
      </div>
    </>
  );
};

export default AllPost;
