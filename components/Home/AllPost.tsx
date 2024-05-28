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
    <div className="h-[70vh] overflow-hidden flex items-center justify-center">
      <div>
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
      </div>
    </div>
  );
};

export default AllPost;
