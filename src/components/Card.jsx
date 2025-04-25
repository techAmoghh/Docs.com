import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoMdCloudDownload } from "react-icons/io";

function Card() {
  return (
    <>
      <div className="relative w-55 h-70 rounded-[35px] bg-zinc-900 text-white px-7 py-10 overflow-hidden ">
        <FaFileAlt />
        <p className="text-sm font-semibold leading-tight mt-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
          molestias repellendus nostrum corporis.
        </p>
        <div className="footer absolute bottom-0 w-full  left-0  ">
          <div className="px-8 flex justify-between items-center py-2 my-2">
            0.4
            <IoMdCloudDownload size={20} />
          </div>
          <div className="tag bg-green-600 w-full py-4 flex items-center justify-center ">
            <h3 className="text-md font-semibold">Download Now</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
