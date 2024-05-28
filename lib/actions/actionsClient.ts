import { IFuntionDefault } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const getAllPost = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    console.log(data, error);
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

export const getPostByPostId = async (postId: string): Promise<IFuntionDefault | null | any> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Posts").select("*").eq("postId", postId).single();

    if (error) {
      throw Error;
      return;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const addPost = async (jsonPayload: any): Promise<any> => {
  const post = await JSON.parse(jsonPayload);
 
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Posts").insert([post]);

    return { data, error };
  } catch (error) {
    console.log(error);
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
