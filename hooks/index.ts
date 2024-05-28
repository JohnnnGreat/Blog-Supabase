"use client";
import { getAllPost, getPostByCategory, getPostByPostId } from "@/lib/actions/actionsClient";
import { addPost } from "@/lib/actions/actionsClient";
import { getUserEmail } from "@/lib/actions/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => addPost(data),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: ["getAllPosts", "getPostsByCategory"],
      });
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({ queryKey: ["getAllPosts"], queryFn: getAllPost });
};

export const useGetPostById = (id: string) => {
  return useQuery({ queryKey: ["getPostById"], queryFn: () => getPostByPostId(id) });
};

export const useGetEmail = () => {
  return useQuery({ queryKey: ["getEmail"], queryFn: () => getUserEmail });
};

export const useGetPostsByCategory = (category: string) => {
  return useQuery({ queryKey: ["getPostByCategory"], queryFn: () => getPostByCategory(category) });
};
