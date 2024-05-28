"use client";
import { getAllPost } from "@/lib/actions/actionsClient";
import React from "react";
import PostContainer from "../Post/PostContainer";
import { IPost } from "@/types";
import Link from "next/link";
import { useGetAllPosts } from "@/hooks";

const AllPost = () => {
  const { data, isPending } = useGetAllPosts();

  return (
    <div className="md:h-[90vh] overflow-hidden flex items-center justify-center">
      <div>
        <h1 className="text-[3rem] my-[.7rem]font-bold">Latest Posts</h1>
        <div className="flex gap-4 flex-wrap md:flex-nowrap justify-center ">
          {data?.map((item: IPost, index: number) => {
            return <PostContainer data={item} key={index} />;
          })}
        </div>
        <div className="w-full flex items-center justify-center mt-[1rem]">
          <Link className="inline-block bg-black text-white py-[.7rem] px-[1rem]" href="/post">
            View all Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
