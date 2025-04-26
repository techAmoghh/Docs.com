import React, { useRef, useState } from "react";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);

  const data = [
    {
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque molestias repellendus nostrum corporis.",
      fileSize: "0.4mb",
      close: false,
      tag: {
        isOpen: false,
        tagTitle: "Download Now",
      },
    },
    {
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque molestias repellendus nostrum corporis.",
      fileSize: "0.4mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
      },
    },
    {
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque molestias repellendus nostrum corporis.",
      fileSize: "0.4mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "green",
      },
    },
    {
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque molestias repellendus nostrum corporis.",
      fileSize: "0.4mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
      },
    },
    {
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque molestias repellendus nostrum corporis.",
      fileSize: "0.4mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
      },
    },
    {
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque molestias repellendus nostrum corporis.",
      fileSize: "0.4mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
      },
    },
  ];

  return (
    <>
      <div
        ref={ref}
        className="fixed w-full h-screen z-[3] flex gap-12 flex-wrap p-12"
      >
        {data.map((item, index) => {
          const changeColor = index % 2 === 0 ? "bg-green-600" : "bg-blue-600";
          return (
            <Card
              data={item}
              key={index}
              bgColor={changeColor}
              refernce={ref}
            />
          );
        })}
      </div>
    </>
  );
}

export default Foreground;
