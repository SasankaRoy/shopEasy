import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { Product } from "../../components/Product";
import axios from "axios";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const category = ({ products }) => {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const { query } = router;
  const test = async () => {
    try {
      const getProductList = await axios.get(
        "http://localhost:3000/api/products"
      );
      console.log(getProductList);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <>
      <Head>
        <title>shopEasee - {query.category}</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center w-[90%] mx-auto my-5 space-y-2 lg:space-y-0"
      >
        <h1 className="text-xl m-0 font-semibold tracking-wider text-center capitalize">
          All result of '{query.category}'
        </h1>

        <div className="w-full lg:w-[50%]  flex justify-between items-center space-x-5">
          <div className="flex justify-start items-center w-[30%] p-2 rounded-md bg-gray-50/20 shadow-md">
            <CurrencyRupeeIcon className="text-base" />
            <input
              type="text"
              placeholder="price..."
              className="border-l-2 w-full px-3 outline-none text-lg tracking-wide bg-transparent text-[#212a2f] placeholder:text-[#212a2f]/50"
            />
          </div>
          <button
            // onClick={() => setShowFilters(true)}
            className="w-[25%] md:w-[20%] lg:w-[20%] rounded-lg py-1 text-md lg:text-lg font-semibold capitalize tracking-wider border shadow-md bg-[#212a2f] text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
          >
            Category
          </button>
          <button
            // onClick={() => setShowFilters(true)}
            className="w-[25%] md:w-[15%] lg:w-[20%] rounded-lg py-1 text-md lg:text-lg font-semibold capitalize tracking-wider border shadow-md bg-[#212a2f] text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
          >
            Arrivals
          </button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 w-[95%] mx-auto justify-center items-center px-5 mt-5">
        {products.filteredProducts.map((cur, id) => (
          <Product key={id} pData={cur} />
        ))}
      </div>
      {showFilters && <FilterModel setShowFilters={setShowFilters} />}
    </>
  );
};
export default category;

const FilterModel = ({ setShowFilters }) => {
  return (
    <>
      <div className="fixed flex justify-center items-center z-50 top-0 left-0 bg-black/30 w-screen h-screen">
        <div
          onClick={() => setShowFilters(false)}
          className="absolute top-[5.5rem] right-7 md:right-[4.3rem] md:top-[5.5rem] lg:right-[7.5rem] lg:top-[8.7rem] bg-[#fff]/80 rounded-full p-1"
        >
          <ClearOutlinedIcon className="text-3xl cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out" />
        </div>
        <div className="w-[80%] md:w-[50%] lg:w-[40%] h-[60%] bg-[#ffffff] rounded-md shadow-md p-3">
          <h1 className="capitalize tracking-wider underline decoration-[#212a2f] underline-offset-8 text-2xl font-semibold">
            filters
          </h1>
          <form className="mt-4 flex flex-col space-y-3">
            <div className="flex flex-col justify-start items-start w-[95%] mx-auto p-1 space-y-2">
              <label
                className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                htmlFor="price"
                id="price"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0"
                placeholder="₹ 500..."
              />
            </div>

            <div className="flex flex-col justify-start items-start w-[95%] space-y-3 mx-auto p-1">
              <label
                htmlFor="category"
                className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                id="time"
              >
                Categories
              </label>
              <div className="flex justify-evenly items-center w-full space-x-3">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-evenly  rounded-md items-center w-full cursor-pointer hover:bg-[#212a2f]/20 transition-all duration-100 ease-linear"
                >
                  <input
                    type="checkbox"
                    name="size"
                    // checked={newproductInfo.size.find((s) => s === cur)}
                    value="top wears"
                    className="flex-1 cursor-pointer"
                    // onChange={handleChangeForColorAndSize}
                  />
                  <h3 className="flex-1 text-md font-semibold tracking-wider capitalize">
                    Top wears
                  </h3>
                </motion.div>

                <motion.div
                  // key={id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-evenly rounded-md items-center w-full cursor-pointer hover:bg-[#212a2f]/20 transition-all duration-100 ease-linear"
                >
                  <input
                    type="checkbox"
                    name="size"
                    // checked={newproductInfo.size.find((s) => s === cur)}

                    value="bottom"
                    className="flex-1 cursor-pointer"
                    // onChange={handleChangeForColorAndSize}
                  />
                  <h3 className="flex-1 text-md  font-semibold tracking-wider capitalize">
                    Bottom
                  </h3>
                </motion.div>

                <motion.div
                  // key={id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-evenly rounded-md items-center w-full cursor-pointer hover:bg-[#212a2f]/20 transition-all duration-100 ease-linear"
                >
                  <input
                    type="checkbox"
                    name="size"
                    // checked={newproductInfo.size.find((s) => s === cur)}

                    value="accessories&shoes"
                    className="flex-1 cursor-pointer"
                    // onChange={handleChangeForColorAndSize}
                  />
                  <h3 className="flex-1 text-md  font-semibold tracking-wider capitalize">
                    Accessories
                  </h3>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start w-[95%] space-y-3 mx-auto p-1">
              <label
                htmlFor="bytime"
                className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                id="time"
              >
                Arrival Time
              </label>
              <div className="flex justify-evenly items-center w-full">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-evenly rounded-md items-center w-full cursor-pointer hover:bg-[#212a2f]/20 transition-all duration-100 ease-linear"
                >
                  <input
                    type="checkbox"
                    name="size"
                    // checked={newproductInfo.size.find((s) => s === cur)}
                    value="Newest"
                    className="flex-1 cursor-pointer"
                    // onChange={handleChangeForColorAndSize}
                  />
                  <h3 className="flex-1 text-md font-semibold tracking-wider capitalize">
                    Newest
                  </h3>
                </motion.div>

                <motion.div
                  // key={id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                  className="flex justify-evenly rounded-md items-center w-full cursor-pointer hover:bg-[#212a2f]/20 transition-all duration-100 ease-linear"
                >
                  <input
                    type="checkbox"
                    name="size"
                    // checked={newproductInfo.size.find((s) => s === cur)}

                    value="Old"
                    className="flex-1 cursor-pointer"
                    // onChange={handleChangeForColorAndSize}
                  />
                  <h3 className="flex-1 text-md  font-semibold tracking-wider capitalize">
                    Old
                  </h3>
                </motion.div>
              </div>
            </div>
            <button className="w-[80%] mx-auto my-3 rounded-md py-1 text-md lg:text-lg font-semibold capitalize tracking-wider border shadow-md bg-[#212a2f] text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in">
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.query;
  try {
    const getProductList = await axios.get(
      `http://localhost:3000/api/products?category=${category}`
    );
    console.log(getProductList?.data);
    return {
      props: {
        products: getProductList?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};
