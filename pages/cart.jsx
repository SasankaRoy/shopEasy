import React from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import Image from "next/image";
import { Icon } from "semantic-ui-react";
import { motion } from "framer-motion";

const Cart = () => {
  return (
    <>
      <NavBar />
      <div className="mt-8 h-fit overflow-x-hidden">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-5xl font-thin tracking-wider"
        >
          Your Cart
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="wrapper md:p-10 p-2"
        >
          <div className="top flex justify-between items-center">
            <motion.button
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-normal md:text-2xl capitalize px-3 py-1 rounded-lg tracking-wider bg-[#F7AB0A]/75  hover:bg-[#F7AB0A]   transition-all duration-100 ease-linear"
            >
              Shop On
            </motion.button>
            <div className="flex justify-center items-center">
              <motion.span
                initial={{ y: -50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="m-2 md:text-xl text-base tracking-wide underline capitalize"
              >
                Your Shopping(1)
              </motion.span>
              <motion.span
                initial={{ y: -50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="m-2 md:text-xl text-base tracking-wide underline capitalize"
              >
                Your Shopping(1)
              </motion.span>
            </div>
            <motion.button
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-normal md:text-2xl capitalize px-3 py-1 rounded-lg tracking-wider border border-[#F7AB0A]/75  hover:bg-[#F7AB0A]/75 transition-all duration-100 ease-linear"
            >
              check out
            </motion.button>
          </div>
          <div className="bottom mt-3 flex flex-col md:flex-row">
            <div className="flex flex-1 flex-col">
              <div className="info flex-1 flex flex-col md:flex-row justify-between items-center ">
                <div className="details flex-1 flex flex-col md:flex-row justify-start items-center">
                  <Image
                    src="/photo4.jpg"
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                  <div className="md:ml-5 flex flex-col justify-around items-start h-full w-full mb-3 md:mb-0">
                    <span className="text-xl mt-3 capitalize  font-normal tracking-wider">
                      <b>Product: </b>cotten Dress
                    </span>
                    <span className="text-xl mt-3 capitalize  font-normal tracking-wider">
                      <b>ID: </b>2514823654s
                    </span>
                    <span className="bg-lime-400 h-7 w-7 mt-3 capitalize  rounded-full" />
                    <span className="text-xl mt-3 capitalize  font-normal tracking-wider">
                      <b>Size: </b>L
                    </span>
                  </div>
                </div>
                <div className="price flex flex-col justify-center items-start md:w-[20%] w-[60%] h-full ">
                  <div className="flex justify-between items-center w-[70%]">
                    <div className=" flex justify-center items-center cursor-pointer hover:border hover:shadow-inner hover:shadow-[#F7AB0A] hover:border-[#F7AB0A] h-10 w-10 rounded-full transition-all duration-200 ease-linear">
                      <Icon name="plus " size="large" className="pl-1" />
                    </div>
                    <span className="text-3xl font-extralight">2</span>
                    <div className=" flex justify-center items-center cursor-pointer hover:border hover:shadow-inner hover:shadow-[#F7AB0A] hover:border-[#F7AB0A] h-10 w-10 rounded-full transition-all duration-200 ease-linear">
                      <Icon name="minus" size="large" className="pl-1" />
                    </div>
                  </div>
                  <span className="text-3xl font-extralight tracking-wider mt-6">
                    <b>Rs: </b>2000
                  </span>
                </div>
              </div>
              <hr className=" bg-gray-300 my-3" />

              <div className="info flex-1 flex flex-col md:flex-row justify-between items-center ">
                <div className="details flex-1 flex flex-col md:flex-row justify-start items-center">
                  <Image
                    src="/photo4.jpg"
                    width={300}
                    height={300}
                    className="rounded-xl"
                  />
                  <div className="md:ml-5 flex flex-col justify-around items-start h-full w-full mb-3 md:mb-0">
                    <span className="text-xl mt-3 capitalize  font-normal tracking-wider">
                      <b>Product: </b>cotten Dress
                    </span>
                    <span className="text-xl mt-3 capitalize  font-normal tracking-wider">
                      <b>ID: </b>2514823654s
                    </span>
                    <span className="bg-lime-400 h-7 w-7 mt-3 capitalize  rounded-full" />
                    <span className="text-xl mt-3 capitalize  font-normal tracking-wider">
                      <b>Size: </b>L
                    </span>
                  </div>
                </div>
                <div className="price flex flex-col justify-center items-start md:w-[20%] w-[60%] h-full ">
                  <div className="flex justify-between items-center w-[70%]">
                    <div className=" flex justify-center items-center cursor-pointer hover:border hover:shadow-inner hover:shadow-[#F7AB0A] hover:border-[#F7AB0A] h-10 w-10 rounded-full transition-all duration-200 ease-linear">
                      <Icon name="plus " size="large" className="pl-1" />
                    </div>
                    <span className="text-3xl font-extralight">2</span>
                    <div className=" flex justify-center items-center cursor-pointer hover:border hover:shadow-inner hover:shadow-[#F7AB0A] hover:border-[#F7AB0A] h-10 w-10 rounded-full transition-all duration-200 ease-linear">
                      <Icon name="minus" size="large" className="pl-1" />
                    </div>
                  </div>
                  <span className="text-3xl font-extralight tracking-wider mt-6">
                    <b>Rs: </b>2000
                  </span>
                </div>
              </div>
              <hr className=" bg-gray-300 my-3" />
            </div>
            <div className="summary md:w-[25%]  py-6">
              <div className="border border-gray-400 h-[50vh] rounded-lg p-2">
                <h1 className="text-center text-3xl font-light tracking-wider capitalize">
                  All Total Amount.
                </h1>
                <div className="flex flex-col space-y-6 justify-start items-center">
                  <div className="flex justify-between items-center w-full">
                    <span className="tracking-wider font-normal capitalize text-xl">
                      subTotal
                    </span>
                    <span className="text-2xl font-light tracking-wider">
                      <b>Rs.</b>2000
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full ">
                    <span className="tracking-wider font-normal capitalize text-xl">
                      GST and Other Taxes
                    </span>
                    <span className="text-2xl font-light tracking-wider">
                      <b>Rs.</b>100
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full ">
                    <span className="tracking-wider font-normal capitalize text-xl">
                      Discount
                    </span>
                    <span className="text-2xl font-light tracking-wider">
                      <b>Rs.</b>100
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full ">
                    <span className="tracking-wider font-normal capitalize text-3xl">
                      Total
                    </span>
                    <span className="text-2xl font-light tracking-wider">
                      <b>Rs.</b>2000
                    </span>
                  </div>
                  <button className="font-medium text-2xl tracking-wider w-[50%] mx-auto py-2 rounded-xl border border-[#F7AB0A] hover:bg-[#F7AB0A] transition-all duration-150 ease-linear">
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
