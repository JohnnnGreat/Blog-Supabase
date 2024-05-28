import Image from "next/image";
import React from "react";
import LayoutImage from "../../public/AuthLogin.jpg";

const Layout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <div className="h-screen Layoutgrid w-full absolute top-0 overflow-hidden left-0 bg-[#f5f5f5]">
      <div className="bg-[#f5f5f5]">{children}</div>
      <div className="h-full w-full hidden md:inline-block">
        <Image className=" w-full h-full" src={LayoutImage} alt="Layout Auth Image" />
      </div>
    </div>
  );
};

export default Layout;
