import { PostgrestError } from "@supabase/supabase-js";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IPost {
  title: string;
  content: string;
  coverImage?: string | undefined | StaticImport | any;
  slug: string;
  category: string;
  postId: string;
}

export interface Islug {
  slug: string;
}

export interface IFunctionreturn {
  data: IPost[] | null;
  error: PostgrestError | null;
}

export interface IFuntionDefault {
  data?: IPost | null | any;
  error?: Error | any;
}
