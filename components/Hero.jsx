// hero or landing page
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export const Hero = () => {
  const router = useRouter();

  const handleOnClick = (e) => {
    if (e.target.innerHTML === "Shop Women") {
      router.push(`/category/women`);
      return;
    }
    if (e.target.innerHTML === "Shop Men") {
      router.push(`/category/men`);
      return;
    }
  };

  return (
    <>
      <main className="h-[75vh] w-screen z-0 flex flex-row justify-center items-center overflow-x-hidden to-black   ">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "anticipate" }}
          className="w-full h-full  relative z-0 transition-all duration-150 ease-linear"
        >
          <Image
            src="/hero.jpg"
            fill
            alt="coverPic"
            priority
            className="object-cover z-0"
          />
          <div className="bg-[#212a2f]/60  h-full w-full absolute" />
          <div className="absolute z-50  left-8 bottom-16 px-1 lg:px-5 py-3">
            <h1 className="lg:text-2xl text-[21px] capitalize tracking-wide font-medium text-[#fff]">
              {" "}
              One hood for{" "}
              <span className="lg:text-5xl text-4xl lowercase">
                men,women,kid
              </span>{" "}
              and{" "}
              <span className="lg:text-5xl text-4xl lowercase">assecories</span>
              .
            </h1>
            <p className="lg:text-xl text-sm capitalize my-3 font-semibold tacking-wider text-[#fff]">
              discover exclusive offers on top brand&apos;s products and stay on
              the top of the latest fashions !
            </p>

            <div className="flex justify-evenly items-center w-[95%] lg:w-[50%] mt-4">
              <button
                onClick={handleOnClick}
                className="uppercase font-semibold tracking-wider text-lg lg:text-xl px-6 py-3 rounded text-[#212a2f] bg-[#ffffff] hover:bg-[#212a2f] hover:text-[#ffffff] transition-all duration-150 ease-in"
              >
                Shop Men
              </button>
              <button
                onClick={handleOnClick}
                className="uppercase font-semibold tracking-wider text-lg lg:text-xl px-6 py-3 rounded text-[#212a2f] bg-[#ffffff] hover:bg-[#212a2f] hover:text-[#ffffff] transition-all duration-150 ease-in"
              >
                Shop Women
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};
