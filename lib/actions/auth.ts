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

    if (error) {
      return JSON.stringify({ error });
    }

    const response = await createUserToDatabase(user);

    return JSON.stringify(response);
  } catch (error) {
    console.log("error", error);
  }
};

interface ILoginUser {
  email: string;
  password: string;
}
export const loginUser = async (user: ILoginUser): Promise<string | any> => {
  const supabase = await createClient();
  const { email, password } = user;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(data, error);

    return JSON.stringify({ data, error });
  } catch (error) {
    console.log("error", error);
  }
};

export const handleLogout = async () => {
  const supabase = createClient();

  supabase.auth.signOut();
  redirect("/a");
};

export const createUserToDatabase = async (user: Iuser) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("User")
      .insert([{ email: user?.email, password: user?.password, username: user?.username }]);

    return { data, error };
  } catch (error) {
    console.log(error);
  }
};

export const getUserEmail = async (): Promise<string | undefined | any> => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.email;
  } catch (err: any) {
    return err;
  }
};
