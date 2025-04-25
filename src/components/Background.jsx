import React from "react";

function Background() {
  return (
    <>
      <div className="fixed w-full h-screen z-[2]">
        <div className="text-zinc-600 text-xl font-semibold absolute top-[5%] w-full flex items-center justify-center py-10">
          Documents
        </div>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] font-semibold tracking-tighter leading-none text-zinc-900 ">
          Docs.
        </h1>
      </div>
    </>
  );
}

export default Background;
