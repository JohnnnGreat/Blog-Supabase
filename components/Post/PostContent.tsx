"use client";
import { getPostByPostId } from "@/lib/actions/posts";
import { createHtml } from "@/lib/utils";
import { IPost, Islug } from "@/types";
import { message } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostContent = () => {
  const pathname = usePathname().split("/")[2];
  const [post, setPost] = useState<IPost | null>(null);
  const [content, setContent] = useState<any>([]);
  useEffect(() => {
    const getPosData = async () => {
      const { data, error } = await getPostByPostId(pathname);
      if (error) {
        message.error(error.message);
      }

      return setPost(data);
    };

    getPosData();
  }, []);

  // useEffect(() => {
  //   const h1 = Array.from(document?.getElementsByTagName("h1"));
  //   h1.map((item) => {
  //     item.classList.add("text-[3rem]");
  //     setContent([...content, item]);
  //   });
  // }, []);

  useEffect(() => {
    const contentText = document?.getElementById("body-content");
    const h1 = contentText?.getElementsByTagName("h1");

    console.log(h1);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-[1100px] mx-auto">
        <div className="w-[100% !important] h-[400px] relative flex items-center">
          <div>
            <h1 className="text-[2rem]">{post?.title.toUpperCase()}</h1>
            <p className="text-gray-400">{post?.category.toUpperCase()}</p>
          </div>
          <img className="w-full h-full object-cover top-0 left-0" src={post?.coverImage} />
        </div>
        <div>
          <div
            id="body-content"
            style={{ lineHeight: 2 }}
            dangerouslySetInnerHTML={createHtml(post?.content)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
