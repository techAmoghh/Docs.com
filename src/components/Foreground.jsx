import React from "react";
import Card from "./Card";

function Foreground() {
  return (
    <>
      <div className="fixed w-full h-screen z-[3]">
        <Card />
      </div>
    </>
  );
}

export default Foreground;
