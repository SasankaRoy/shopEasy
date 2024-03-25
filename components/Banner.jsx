// this file three banners in the home page....
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Banner = ({ image, title }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "anticipate",
        }}
        className=" w-full h-[550px] mt-10 "
      >
        <div className="h-[70%] w-full relative">
          <Image
            src={image}
            fill
            priority
            className="object-cover object-center brightness-50"
            alt="image"
          />
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center mt-8 px-3">
          <h1 className="m-0 p-0 capitalize tracking-wide text-4xl font-bold">
            {title}
          </h1>
          <p className="capitalize text-lg font-semibold">
            great offers on big brand.
          </p>
          <button className="uppercase  font-semibold tracking-wider text-xl w-[85%] shadow lg:w-[30%] py-3 rounded-md text-[#ffffff] border border-[#ffffff] bg-[#212a2f] hover:bg-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] transition-all duration-150 ease-in">
            get now
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Banner;
