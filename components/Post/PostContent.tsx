// "use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PostContentDetails from "./PostContentDetails";
import { headers } from "next/headers";
import { getPostByPostId } from "@/lib/actions/posts";
import { getUserEmail } from "@/lib/actions/auth";

const PostContent = async () => {
  const header = headers();

  const headerUrl = header?.get("x-url") || "not found";
  const urlObject = new URL(headerUrl);

  const pathName = urlObject.pathname.split("/")[2];

  const { data, error } = await getPostByPostId(pathName);

  if (error) {
    console.log("Failed to fetch post");
  }

  const email = await getUserEmail();
  return (
    <>
      <title>{data?.title}</title>

      <div className="max-w-[1100px] mx-auto w-full">
        <div className="w-[100% !important]  relative flex flex-wrap md:flex-nowrap bg-[#000 !important] items-center">
          <div>
            <h1 style={{ lineHeight: "1" }} className="text-[2rem] font-bold">
              {data?.title?.toUpperCase()}
            </h1>
            <p className="text-gray-400 text-[.9rem]">{data?.category?.toUpperCase()}</p>
            <div>
              <p className="text-gray-500 text-[.8rem]">Posted By</p>
              <div className="flex gap-[.6rem] items-center mt-[.5rem]">
                <div className="w-[30px] flex items-center justify-center rounded-full bg-orange-500 h-[30px]">
                  {data?.user?.substring(0, 1).toUpperCase()}
                </div>
                <p className="text-[.8rem] text-gray-700">{data?.user}</p>
              </div>
            </div>
            {data?.user === email && (
              <div className="flex gap-2 mt-[.8rem]">
                <Link href={`/edit?id=${data?.postId}`}>Edit</Link>
                <Link className="text-white bg-red-500" href={`/delete?id=${data?.postId}`}>
                  Delete
                </Link>
              </div>
            )}
          </div>
          <img
            className="w-full h-full object-cover top-0 left-0 mt-[1rem]"
            src={data?.coverImage}
          />
        </div>
        <div>
          <div
            id="body-content"
            className="mt-[1rem] text-[1.1rem]"
            style={{ lineHeight: 2 }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PostContent;
