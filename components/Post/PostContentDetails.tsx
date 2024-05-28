import { useGetEmail } from "@/hooks";
import { getUserEmail } from "@/lib/actions/auth";
import { getPostByPostId } from "@/lib/actions/posts";
import { createHtml } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const PostContentDetails = async ({ data, email }: { data: any; email: string }) => {
  return (
    <>
      <title>{data?.title}</title>
      <div className="max-w-[1100px] mx-auto">
        <div className="w-[100% !important] h-[400px] relative flex items-center">
          <div>
            <h1 className="text-[2rem]">{data?.title.toUpperCase()}</h1>
            <p className="text-gray-400">{data?.category.toUpperCase()}</p>
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
            id="body-content"
            style={{ lineHeight: 2 }}
            dangerouslySetInnerHTML={createHtml(data?.content)}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PostContentDetails;
