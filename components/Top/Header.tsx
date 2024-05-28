"use client";
import React from "react";
import { Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import { category } from "@/constant";
import { Button } from "../ui/button";
import { handleLogout } from "@/lib/actions/auth";

const Header = ({ user }: { user: any }) => {
  return (
    <div className=" w-[1300px] mx-auto p-[1rem] h-[200px] py-[1rem]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Facebook size={20} strokeWidth={0.75} />
          <Twitter size={20} strokeWidth={0.75} />
        </div>

        <h1 className="font-bold text-[1.7rem]">TechGist</h1>
        {user ? (
          <div className="flex gap-x-2">
            <Link className="bg-black inline-block text-gray-100 rounded p-3" href="/add">
              Add Post
            </Link>
            <Button
              onClick={() => {
                handleLogout();
              }}
              className="border inline-block rounded p-3"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/a">Register</Link>
        )}
      </div>

      <div className="w-full flex justify-center mt-[1.6rem]">
        <ul className="flex items-center justify-center gap-2">
          {category.map((item, index) => (
            <li key={index}>
              <Link
                className="text-[.9rem] inline-block bg-gray-200 rounded p-3 text-gray-500"
                href={`${item}`}
              >
                {item.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="mt-[1rem]" />
    </div>
  );
};

export default Header;
