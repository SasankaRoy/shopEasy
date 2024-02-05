import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";

const Trackmyorder = ({ orders }) => {
  console.log(orders, "in the trackmyorder client");

  // const userInfo = useSelector((state) => state.user.userInfo);
  // const fetchOders = async () => {
  //   try {
  //     if (userInfo._id) {
  //       console.log(userInfo._id);
  //       const getAllOders = await axios.get(`/api/oders?uId=${userInfo._id}`);
  //       console.log(userInfo._id);
  //       console.log(getAllOders.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchOders();
  // }, [userInfo]);

  // if (typeof window !== "undefined") {
  //   if (window.location.reload) {
  //     console.log("Reloading");
  //     console.log(userInfo);
  //   }
  // }
  return (
    <>
      <Head>
        <title>shopEasee - Track order&apos;s</title>
      </Head>
      <div className="h-screen flex flex-col lg:flex-row justify-start items-start space-y-3 lg:space-y-0 lg:space-x-3 p-2">
        <div className="h-[70%] lg:h-full lg:w-[70%] w-full  py-3 px-2 overflow-y-auto scroll-smooth">
          <h1 className="text-xl font-semibold tracking-wider capitalize">
            my order&apos;s
          </h1>
          {orders.itemList?.map((cur, id) => (
            <div
              key={id}
              className="flex flex-col lg:flex-row justify-start items-start space-y-3 lg:space-y-0 w-full h-full lg:h-[30%]  p-1 mt-6"
            >
              <div className="relative w-[90%] mx-auto lg:w-[40%] h-[40%] lg:h-full">
                <Image
                  src={cur.productImage}
                  alt="productImage"
                  fill
                  loading="lazy"
                  className="object-cover rounded-md shadow-lg"
                />
              </div>
              <div className="w-full h-[50%] lg:w-[50%]">
                <div>
                  <h1 className="font-bold text-2xl capitalize tracking-wider">
                    product name
                  </h1>
                  <p className="text-sm my-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet suscipit inventore at nulla eos commodi nesciunt
                    omnis, sapiente nemo in illum vel dolorum, reiciendis
                    exercitationem vitae ipsum est voluptatibus perferendis?
                  </p>
                  <h2 className="font-extrabold text-xl">
                    <CurrencyRupeeIcon /> 2000.0
                  </h2>
                </div>
                <div className="flex justify-around items-center space-x-5 mt-3">
                  <button
                    className="text-lg font-bold tracking-wider
                 px-5 py-2 rounded-md border-pink-600 bg-pink-600 text-white
                 shadow-lg hover:text-pink-600 hover:bg-white
                 transition-all duration-150 ease-linear"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-lg font-bold tracking-wider
               px-5 py-2 rounded-md bg-[#212a2f] text-white
               shadow-lg  hover:text-[#212a2f] hover:bg-white
               transition-all duration-150 ease-linear"
                  >
                    Track status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:h-full h-[30%]  w-full lg:w-[30%] py-3 px-2">
          <h1 className="text-xl font-semibold tracking-wider">
            Shipping status.
          </h1>
          <div className="mt-14 relative">
            <span className="w-[87%] h-2 mx-auto absolute  bg-[#212a2f]/10 rounded-full left-[6px] z-0 top-[6px]" />
            <div className="flex justify-around items-center">
              <div className="z-40 flex flex-col justify-center items-center">
                <div className="h-5 w-5 rounded-full bg-green-500" />
                <h2 className="font-extrabold tracking-wide capitalize">
                  shipping soon
                </h2>
              </div>
              <div className="z-40 flex flex-col justify-center items-center">
                <div className="h-5 w-5 rounded-full bg-green-500" />
                <h2 className="font-extrabold tracking-wide capitalize">
                  shipped
                </h2>
              </div>
              <div className="z-40 flex flex-col justify-center items-center">
                <div className="h-5 w-5 rounded-full bg-green-500" />
                <h2 className="font-extrabold tracking-wide capitalize">
                  out for delivery
                </h2>
              </div>
              <div className="z-40 flex flex-col justify-center items-center">
                <div className="h-5 w-5 rounded-full bg-green-500" />
                <h2 className="font-extrabold tracking-wide capitalize">
                  delivered
                </h2>
              </div>
            </div>
            <p className="text-xl font-medium mt-7 tracking-wide capitalize">
              The product will be delivered by{" "}
              <span className="text-2xl font-extrabold">06 March 2023.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Trackmyorder;






export const getServerSideProps = async (ctx) => {
  try {
    const { uid } = ctx.query;    

    const getAllOrders = await axios.get(`http://localhost:3000/api/oders?uId=${uid}`);    

    if (getAllOrders.status === 200) {
      return {
        props: {
          orders: getAllOrders.data?.orderList,
        },
      };
    } else {
      return {
        props: {
          error: "some thing went wrong",
        },
      };
    }
     
  } catch (error) {  
    console.log(error);
  }
};
