import Image from "next/image";
import React from "react";
import LayoutImage from "../../public/AuthLogin.jpg";

const Layout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <div className="h-screen Layoutgrid w-full">
      <div>{children}</div>
      <div className="h-full w-full">
        <Image className="w-full h-full" src={LayoutImage} alt="Layout Auth Image" />
      </div>
    </div>
  );
};

export default Layout;
