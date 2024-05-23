import { createClient } from "@/utils/supabase/client";

export const uploadImage = async (file: File | null) => {
  if (!file) {
    console.error("No file provided");
    return;
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase.storage
      .from("coverImage")
      .upload(`${file?.name.trim()}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    console.log("File uploaded successfully:", data);
    return {
      path: data.path,
      url: `https://sloxokggewmuqdkoqgat.supabase.co/storage/v1/object/public/coverImage/${data.path}`,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
