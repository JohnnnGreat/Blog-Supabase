"use client";
import { useGetPostById } from "@/hooks";
import { getPostByPostId } from "@/lib/actions/posts";
import { convertToDate, createHtml } from "@/lib/utils";
import { IPost, Islug } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { message } from "antd";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PostContentDetails from "./PostContentDetails";

const PostContent = () => {
  const pathname = usePathname().split("/")[2];

  const contentTextRef = useRef<HTMLDivElement>(null);

  const { data } = useGetPostById(pathname);

  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    (async function () {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email);
    })();
  }, []);
  return (
    <div className="w-full">
      <Suspense fallback="<p>Loading Content...</p>">
        <PostContentDetails data={data} email={email} />
      </Suspense>
    </div>
  );
};

export default PostContent;
