import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { motion } from "motion/react";

function Card({ data, bgColor, refernce }) {
  return (
    <>
      <motion.div
        drag
        dragConstraints={refernce}
        whileDrag={{ scale: 1.05 }}
        dragElastic={0.8}
        className="relative w-50 h-65 rounded-[35px] bg-zinc-900 text-white px-7 py-8 overflow-hidden flex-shrink-0 "
      >
        <FaFileAlt />
        <p className="text-sm font-semibold leading-tight mt-4 mb-1">
          {data.desc}
        </p>
        <div className="footer absolute bottom-0 w-full  left-0  ">
          <div
            className={`px-8 flex justify-between items-center py-2  ${
              data.tag.isOpen ? "mb-1" : "mb-3"
            } `}
          >
            <h6 className="text-sm ">{data.fileSize}</h6>
            <span className="text-white bg-zinc-800 rounded-full p-1 flex items-center justify-center">
              {data.close ? (
                <IoMdClose size={14} />
              ) : (
                <MdOutlineFileDownload size={14} />
              )}
            </span>
          </div>
          {data.tag.isOpen && (
            <div
              className={`tag ${bgColor} w-full py-2 flex items-center justify-center `}
            >
              <h3 className="text-md font-semibold">{data.tag.tagTitle}</h3>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Card;
