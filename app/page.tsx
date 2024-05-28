import { createClient } from "@/utils/supabase/server";

import AllPost from "@/components/Home/AllPost";
import Category from "@/components/Home/Category";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <AllPost />
      <Category />
    </>
  );
}
