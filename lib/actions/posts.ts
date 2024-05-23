"use server";
import { IFunctionreturn, Islug, IFuntionDefault } from "@/types";
// {
//   title: string;
//   content: string;
//   category: string;
//   coverImage: string;
// }
import { createClient } from "@/utils/supabase/client";

export const addPost = async (jsonPayload: any) => {
  const post = await JSON.parse(jsonPayload);

  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Posts").insert([post]);

    return { data, error };
  } catch (error) {}
};

export const getAllPost = async (): Promise<IFunctionreturn | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    return { data, error };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const getPostByPostId = async (postId: Islug): Promise<IFuntionDefault | null> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Posts").select("*").eq("postId", postId).single();

    // if (error) {
    //   return error;
    // }

    return { error, data };
  } catch (error) {
    return null;
  }
};
