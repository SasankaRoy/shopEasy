import React from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

const FAQ = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2, ease: "anticipate" }}
      className="h-auto w-full py-2 px-5 mt-10"
    >
      <h1 className="text-3xl font-bold tracking-wider text-center capitalize">
        Reviews & FAQ
      </h1>
      {/* reviews */}
      <div className="flex justify-evenly items-center mt-8 py-3">
        <div className="relative">
          <CircularProgress
            variant="determinate"
            value={85}
            size={"7rem"}
            thickness={2}
            style={{ color: "orange" }}
          />
          <h2 className="absolute top-[27%] left-[36%] text-lg lg:text-xl font-bold tracking-wide text-orange-400">
            85%
          </h2>
          <h1 className="text-center mt-2 capitalize tracking-wider text-lg lg:text-xl font-semibold">
            product
          </h1>
        </div>
        <div className="relative">
          <CircularProgress
            variant="determinate"
            value={70}
            size={"7rem"}
            thickness={2}
            style={{ color: "#DB2777" }}
          />
          <h2 className="absolute top-[27%] left-[36%] text-lg lg:text-xl font-bold tracking-wide text-pink-600">
            70%
          </h2>
          <h1 className="text-center mt-2 capitalize tracking-wider text-lg lg:text-xl font-semibold">
            Quality
          </h1>
        </div>
        <div className="relative">
          <CircularProgress
            variant="determinate"
            value={60}
            size={"7rem"}
            thickness={2}
            style={{ color: "green" }}
          />
          <h2 className="absolute top-[27%] left-[36%] text-lg lg:text-xl font-bold tracking-wide text-green-700">
            60%
          </h2>
          <h1 className="text-center mt-2 capitalize tracking-wider text-lg lg:text-xl font-semibold">
            Satisfaction
          </h1>
        </div>
      </div>
      {/* FAQ */}
      <div className="flex flex-col justify-start items-center py-3   mt-5">
        <div className="flex-1 flex flex-col justify-start items-center space-y-8 overflow-y-auto scroll-smooth w-full lg:w-[80%] mx-auto py-1 lg:p-4">
          <div className="flex flex-col justify-start items-start space-y-2 ">
            <div className="flex justify-start items-center space-x-4">
              <span className="text-base text-[#212a2f] font-bold tracking-wide capitalize">
                xyz user
              </span>
              <span className="text-[12px] font-semibold tracking-wide text-[212a2f]">
                3 days ago
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-wider capitalize text-[#212a2f]">
              <span className="text-lg text-[#212a2f]/60">Q :</span> What is the
              question ?
            </h1>
            <p className="text-md text-[#212a2f]/80 font-semibold capitalize tracking-wider">
              <span className="text-base text-[#212a2f]/60">A : </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, odio. Dolorum, maiores, aperiam ratione dolorem ullam
              omnis itaque accusantium ab et voluptates quos aut sapiente
              numquam iusto, temporibus a vel.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 ">
            <div className="flex justify-start items-center space-x-4">
              <span className="text-base text-[#212a2f] font-bold tracking-wide capitalize">
                xyz user
              </span>
              <span className="text-[12px] font-semibold tracking-wide text-[212a2f]">
                3 days ago
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-wider capitalize text-[#212a2f]">
              <span className="text-lg text-[#212a2f]/60">Q :</span> What is the
              question ?
            </h1>
            <p className="text-md text-[#212a2f]/80 font-semibold capitalize tracking-wider">
              <span className="text-base text-[#212a2f]/60">A : </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, odio. Dolorum, maiores, aperiam ratione dolorem ullam
              omnis itaque accusantium ab et voluptates quos aut sapiente
              numquam iusto, temporibus a vel.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-5 lg:w-[50%] w-full mx-auto shadow-md py-2 rounded-md mt-2">
          <input
            type="text"
            placeholder="Clear your doubt ?..."
            className="w-[70%] text-lg font-semibold tracking-wider
          text-[#212a2f]  p-2 border-none outline-none
            focus:ring-1 focus:ring-gray-400 bg-transparent rounded-md"
          />
          <button
            className="text-xl font-bold tracking-wider
          w-[20%] text-white  py-2 bg-green-400 hover:bg-green-500
          rounded-md transition-all duration-150 ease-in-out"
          >
            Ask
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
