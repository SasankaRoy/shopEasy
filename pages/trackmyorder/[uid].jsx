import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
// import { useSelector } from "react-redux";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios, { AxiosError } from "axios";
import { handleError } from "../../utils/Error&SuccessHandler";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

let sockets;

const Trackmyorder = ({ orders }) => {
  console.log(orders);
  const [socket, setSocket] = useState();

  const router = useRouter();

  const { uid } = router.query;

  const connectToSocketServer = () => {
    try {
      sockets = io("http://localhost:5000", {
        query: {
          userId: uid,
        },
      });
      sockets.on("connect", () => {
        console.log("connection established");
        setSocket(sockets);
      });
    } catch (error) {
      console.log(error);
      toast.error(handleError(error));
    }
  };

  useEffect(() => {
    connectToSocketServer();

    return () => {
      sockets.disconnect();
    };
  }, []);

  if (socket) {
    // console.log("socket");
    socket.on("STATUS__CHANGED", (message) => {
      console.log("test message in the [uid].js page to message", message);
    });
  } else {
    console.log("no socket");
  }

  // console.log(orders, "in the trackmyorder client");

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
          {orders?.map((cur, id) => (
            <>
              {cur.itemList.map((cur, ids) => (
                <div
                  key={ids}
                  className="flex flex-col lg:flex-row justify-start items-start lg:space-x-5 space-y-3 lg:space-y-0 w-full p-2 mt-6"
                >
                  <div className="h-[80px] w-[80px] rounded-full relative">
                    <Image
                      fill
                      alt="productImage"
                      className="object-cover rounded-full object-top"
                      src={cur.productImage}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold ">
                      {cur.productName} - {cur.size} , quantity - {cur.quantity}
                    </h2>
                    <h2 className="text-xl font-bold">
                      Price : <CurrencyRupeeIcon /> {cur.price}
                    </h2>
                  </div>
                </div>
              ))}
              <div className="flex justify-end my-2 items-center space-x-3 ">
                <button className="px-3 py-1 font-extrabold text-lg tracking-wider rounded-md border border-red-600 shadow-md bg-red-600 text-white hover:text-red-600 hover:bg-white transition-all duration-150 ease-in">
                  Cancel Order
                </button>
                <button className="px-3 py-1 font-extrabold text-lg tracking-wider rounded-md border border-[#212a2f] shadow-md bg-[#212a2f] text-white hover:text-[#212a2f] hover:bg-white transition-all duration-150 ease-in">
                  Track Status
                </button>
              </div>
              <hr className="my-5 bg-[#212a2f] h-[.85px] w-[95%] mx-auto" />
            </>
          ))}
        </div>
        <div className="lg:h-full h-[30%] w-full lg:w-[30%] py-3 px-2">
          <h1 className="text-xl font-semibold tracking-wider">
            Shipping status.
          </h1>
          <div className="mt-14 relative">
            <span className="w-[87%] h-2 mx-auto absolute bg-[#212a2f]/10 rounded-full left-[6px] z-0 top-[6px]" />
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

    const getAllOrders = await axios.get(
      `http://localhost:3000/api/oders?uId=${uid}`
    );

    console.log(getAllOrders.data.orderList, "the order");

    if (getAllOrders.status === 200) {
      return {
        props: {
          orders: getAllOrders.data?.orderList,
          error: null,
        },
      };
    } else {
      // console.log;
      return {
        props: {
          error: "some thing went wrong",
          orders: null,
        },
      };
    }
  } catch (error) {
    console.log(error);

    return {
      props: {
        error: handleError(error),
        orders: [],
      },
    };
  }
};
