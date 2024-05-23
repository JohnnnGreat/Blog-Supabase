import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
export const getAllPostsSlug = () => {
  const postsPath = readdirSync("blog").filter((path: string) => /\.mdx?$/.test(path));
  return postsPath.map((path) => {
    const slug = path.replace(/\.mdx?$/, "");
    return slug;
  });
};

export const getPostBySlug = (slug: string): { content: any; data: any } => {
  const markDownDetails = readFileSync(`blog/${slug}.mdx`);

  const { content, data } = matter(markDownDetails);
  return {
    content,
    data,
  };
};
