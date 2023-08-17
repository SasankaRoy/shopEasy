import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const Boxes = () => {
  return (
    <div className="flex flex-wrap justify-evenly items-center m-3  px-2">
      <div className="box1 flex-1 p-5 rounded-lg  m-3">
        <h3 className="text-xl text-gray-600 font-semibold tracking-wide">
          Revenue
        </h3>
        <div className="flex justify-start items-center space-x-2 mt-2 mb-2">
          <h1 className="text-2xl font-semibold ">Rs.200000</h1>
          <span className="text-lg"> -11.4</span>
          <span>
            <ArrowDownwardIcon className="text-red-500" />
          </span>
        </div>
        <p className="text-gray-600 text-base tracking-wide">
          Compares to last month
        </p>
      </div>
      <div className="box1 flex-1 p-5 rounded-lg  m-3">
        <h3 className="text-xl text-gray-600 font-semibold tracking-wide">
          Sales
        </h3>
        <div className="flex justify-start items-center space-x-2 mt-2 mb-2">
          <h1 className="text-2xl font-semibold ">Rs.250000</h1>
          <span className="text-lg"> -9.4</span>
          <span>
            <ArrowDownwardIcon className="text-red-500" />
          </span>
        </div>
        <p className="text-gray-600 text-base tracking-wide">
          Compares to last month
        </p>
      </div>
      <div className="box1 flex-1 p-5 rounded-lg  m-3">
        <h3 className="text-xl text-gray-600 font-semibold tracking-wide">
          Cost
        </h3>
        <div className="flex justify-start items-center space-x-2 mt-2 mb-2">
          <h1 className="text-2xl font-semibold ">Rs.300000</h1>
          <span className="text-lg"> +5.4</span>
          <span>
            <ArrowUpwardIcon className="text-green-500" />
          </span>
        </div>
        <p className="text-gray-600 text-base tracking-wide">
          Compares to last month
        </p>
      </div>
    </div>
  );
};
