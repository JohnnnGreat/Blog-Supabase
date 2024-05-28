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
  console.log(post);
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Posts").insert([post]);
    console.log(data, error);
    return { data, error };
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  console.log("welcome");
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);
    console.log("reached");
    console.log(data, error);
    return { data, error };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const getPostByCategory = async (category: string): Promise<any> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("Posts").select("*").eq("category", category);

    return { data, error };
  } catch (error) {
    return error;
  }
};

export const getPostByPostId = async (postId: string): Promise<IFuntionDefault | null | any> => {
  console.log(postId);
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Posts").select("*").eq("postId", postId).single();

    return { data, error };
  } catch (error) {
    return null;
  }
};

export const getPostByUserEmail = async (userEmail: string) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("Posts").select("*").eq("user", userEmail);
    return { data, error };
  } catch (error) {
    return error;
  }
};
