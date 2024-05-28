import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center backdrop-blur-md w-full h-screen">
      <Loader2 className="animate-spin w-[40px] h-[40px]" />
    </div>
  );
};

export default LoadingPage;
