// "use client";
import { useGetPostById } from "@/hooks";
import { convertToDate, createHtml } from "@/lib/utils";
import { IPost, Islug } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { message } from "antd";
import { usePathname } from "next/navigation";
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
  console.log(data);
  const email = await getUserEmail();
  return (
    <>
      <title>{data?.title}</title>

      <div className="max-w-[1100px] mx-auto">
        <div className="w-[100% !important] h-[400px] relative flex items-center">
          <div>
            <h1 className="text-[2rem]">{data?.title?.toUpperCase()}</h1>
            <p className="text-gray-400">{data?.category?.toUpperCase()}</p>
            <div>
              <p className="text-gray-500 text-[.8rem]">Posted By</p>
              <div className="flex gap-[.6rem] items-center mt-[.8rem]">
                <div className="w-[40px] flex items-center justify-center rounded-full bg-orange-500 h-[40px]">
                  {data?.user?.substring(0, 1).toUpperCase()}
                </div>
                <p>{data?.user}</p>
              </div>
            </div>
            {data?.user === email && (
              <div className="flex gap-2">
                <Link href={`/edit?id=${data?.postId}`}>Edit</Link>
                <Link href={`/delete?id=${data?.postId}`}>Delete</Link>
              </div>
            )}
          </div>
          <img className="w-full h-full object-cover top-0 left-0" src={data?.coverImage} />
        </div>
        <div>
          <div
            id="body-content "
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
