"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

interface Iuser {
  email: string;
  password: string;
  username: string;
}
export const registerUser = async (user: Iuser): Promise<string | any> => {
  const supabase = await createClient();
  const { email, password } = user;
  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(error, data);
    return JSON.stringify({ error, data });
  } catch (error) {
    console.log("error", error);
  }
};

interface ILoginUser {
  email: string;
  password: string;
}
export const loginUser = async (user: ILoginUser) => {
  const supabase = await createClient();
  const { email, password } = user;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error };

    return { data: data };
  } catch (error) {
    console.log("error", error);
  }
};

export const handleLogout = async () => {
  const supabase = createClient();

  supabase.auth.signOut();
  redirect("/a");
};
