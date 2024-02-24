import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { handleError } from "../../utils/Error&SuccessHandler";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useSelector } from "react-redux";

let sockets;

const Trackmyorder = ({ orders, error }) => {
  const [order, setOrder] = useState(orders)
  const [socket, setSocket] = useState();
  const [showOrderStatus, setShowOrderStatus] = useState({
    state: false,
    orderStatus: "",
  });

  const router = useRouter();

  const { uid } = router.query;
  const user = useSelector(state => state.user?.userInfo);
  // console.log(user);

  const connectToSocketServer = () => {
    try {
      // 
      sockets = io(
        process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
        , {
          query: {
            userId: uid,
            role: user?.role
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
  }, [user]);

  const TrackOrderStatus = async (status) => {


    setShowOrderStatus({
      state: true,
      orderStatus: status,
    });

    socket.on("STATUS__CHANGED", ({ oderStatus }) => {
      console.log("in the TrackOrderStatus function", oderStatus);
      setShowOrderStatus({
        state: true,
        orderStatus: oderStatus,
      });
    });
  };

  const cancelOrder = (orderId) => {
    socket.emit('CANCEL__ORDER', { userId: uid, orderId });
    socket.on('UPDATED__ORDERLIST', (data) => {
      setOrder(data.orders);
    })
  }


  return (
    <>
      <Head>
        <title>shopEasee - Track order&apos;s</title>
      </Head>
      <div className="h-screen flex flex-col lg:flex-row justify-start items-start space-y-3 lg:space-y-0 lg:space-x-3 p-2">
        <div className="h-[70%] lg:h-full lg:w-[65%] w-full  py-3 px-2 overflow-y-auto scroll-smooth">
          <h1 className="text-xl font-semibold tracking-wider capitalize">
            my order&apos;s
          </h1>
          {order?.map((curr, id) => (
            <div key={id} className="relative">
              {
                curr.status === 'cancel' && (
                  <div className="absolute flex justify-center items-center backdrop-blur-sm bg-black/5 w-full h-full top-0 left-0 z-30 opacity-100">
                    <h2 className="text-5xl font-extrabold uppercase">Canceled</h2>
                  </div>
                )
              }
              {curr.itemList.map((cur, ids) => (
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
              <div key={id} className="flex justify-end my-2 items-center space-x-3 ">
                <button
                  onClick={() => cancelOrder(curr._id)}
                  className="px-3 py-1 font-extrabold text-lg tracking-wider rounded-md border border-red-600 shadow-md bg-red-600 text-white hover:text-red-600 hover:bg-white transition-all duration-150 ease-in">
                  Cancel Order
                </button>
                <button
                  onClick={() => TrackOrderStatus(curr.status)}
                  className="px-3 py-1 font-extrabold text-lg tracking-wider rounded-md border border-[#212a2f] shadow-md bg-[#212a2f] text-white hover:text-[#212a2f] hover:bg-white transition-all duration-150 ease-in"
                >
                  Track Status
                </button>
              </div>
              <hr className="my-5 bg-[#212a2f] h-[.85px] w-[95%] mx-auto" />
            </div>
          ))}
          {
            error && (
              <div className="flex flex-col h-[80%] justify-center items-center space-y-4">
                <Image src='/box.png' width={100} height={100} loading="lazy" alt="emptyBoxImg" />
                <h2 className="text-center font-semibold text-2xl">
                  {error}
                </h2>
              </div>
            )
          }
        </div>
        <div className="lg:h-full h-[30%] w-full lg:w-[35%] py-3 px-2 lg:border-l border-gray-200">
          <h1 className="text-xl font-semibold tracking-wider">
            Shipping status.
          </h1>
          {showOrderStatus.state ? (
            <div className="mt-14 relative">
              <span className="w-[87%] h-2 mx-auto absolute bg-[#212a2f]/10 rounded-full left-[6px] z-0 top-[6px]" />
              <div className="flex justify-around items-center">
                <div className="z-40 flex flex-col justify-center items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${showOrderStatus.orderStatus === "pending" &&
                      "bg-green-500"
                      } bg-gray-500 `}
                  />

                  <PendingActionsIcon
                    className={`${showOrderStatus.orderStatus === "pending" &&
                      "text-green-500"
                      } text-gray-500 my-2`}
                  />
                </div>
                <div className="z-40 flex flex-col justify-center items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${showOrderStatus.orderStatus === "shipping" &&
                      "bg-green-500"
                      } bg-gray-500`}
                  />
                  <LocalShippingIcon
                    className={`${showOrderStatus.orderStatus === "shipping" &&
                      "text-green-500"
                      }
                    } text-gray-500 my-2`}
                  />
                </div>
                <div className="z-40 flex flex-col justify-center items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${showOrderStatus.orderStatus === "out for delivery" &&
                      "bg-green-500"
                      } bg-gray-500`}
                  />

                  <DeliveryDiningIcon
                    className={`my-2 ${showOrderStatus.orderStatus === "out for delivery" &&
                      "text-green-500"
                      } text-gray-500`}
                  />
                </div>
                <div className="z-40 flex flex-col justify-center items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${showOrderStatus.orderStatus === "complete" &&
                      "bg-green-500"
                      } bg-gray-500`}
                  />

                  <HowToRegIcon
                    className={`my-2 ${showOrderStatus.orderStatus === "complete" &&
                      "text-green-500"
                      } text-gray-500`}
                  />
                </div>
              </div>
              <p className="text-xl font-medium mt-7 tracking-wide capitalize">
                The product will be delivered by{" "}
                <span className="text-2xl font-extrabold">06 March 2023.</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-3 h-[80%]">
              <Image width={70} height={70} src='/document.png' loading="lazy" alt="noOrdersToTrackImg" />
              <h2 className="text-xl font-bold">No orders</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Trackmyorder;

export const getServerSideProps = async (ctx) => {
  try {
    const { uid } = ctx.query;

    if (ctx.req.headers.host === "localhost:3000") {
      const getAllOrders = await axios.get(
        `${process.env.DEVELOPMENT_DOMAIN}/api/oders?uId=${uid}`
      );
      if (getAllOrders.status === 200) {
        return {
          props: {
            orders: getAllOrders.data?.orderList,
            error: null,
          },
        };
      } else {
        console.log(getAllOrders)
        return {
          props: {
            error: getAllOrders.data?.error,
            orders: null,
          },
        };
      }
    }

    const getAllOrders = await axios.get(`${process.env.PRODUCTION_DOMAIN}/api/oders?uId=${uid}`);

    if (getAllOrders.status === 200) {
      return {
        props: {
          orders: getAllOrders.data?.orderList,
          error: null,
        }
      }
    } else {
      return {
        props: {
          error: "some thing went wrong",
          orders: null,
        },
      };
    }

  } catch (error) {
    // console.log(error.error.request.data.error);
    return {
      props: {
        error: handleError(error),
        orders: [],
      },
    };
  }
};
