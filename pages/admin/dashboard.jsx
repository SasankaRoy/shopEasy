import Head from "next/head";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loadingComplete, loadingStart } from "../../Redux/loadingSlice";
import { Avatar, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

// import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { stringAvatar } from "../../utils/UserProfileIcon";

let socket;

const Dashboard = () => {
  const [oders, setOders] = useState([]);
  const user = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [updater, setUpdater] = useState(0);
  const [showProductList, setShowProductList] = useState({
    status: false,
    productIds: {},
  });
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formateDate = (formateTheDate) => {
    const createdDate = new Date(formateTheDate);
    const readableDate = new Date(createdDate.getTime());
    const formattedDate = readableDate.toLocaleString("en-US", options);
    return formattedDate;
  };

  /* The code below is using the `useEffect` hook in a React component. It is dispatching two actions:
`loadingStart` and `loadingComplete` for showing the loading indicator on the project page. */

  useEffect(() => {
    dispatch(
      loadingStart({
        message: {
          currentMessage: "checking user authoraisation...",
          forWhichPorpose: "Authority",
        },
      })
    );
    setTimeout(() => {
      dispatch(loadingComplete());
    }, 2000);
  }, [user]);

  // making the the socket connection when the page is loaded...

  const makeSocketConnection = () => {
    try {
      // 
      socket = io(
        process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
        , {
          query: {
            userId: user?._id,
            role: user?.role,
          },
        });
      socket.on("connect", () => {
        console.log("connected to the socket server!");
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    makeSocketConnection();

    return () => {
      socket.disconnect();
    }
  }, [user]);

  /* The code below is a JavaScript function that takes a date as input and formats it in the
    "MM/DD/YYYY" format. It uses the `toLocaleString` method with the specified options to format the
    date. */

  const handleChangeSelection = async (e, id, userId) => {
    socket.emit("CHANGE__STATUS", {
      productId: id,
      userId,
      oderStatus: e.target.value,
    });

    const updateOderStatus = await axios.put("/api/oders", {
      productId: id,
      oderStatus: e.target.value,
    });
    toast.success(updateOderStatus.data?.message);
    setUpdater(updater + 1);
  };

  const fetchOders = async () => {
    try {
      const reqOrders = await axios.get("/api/oders");
      setOders(reqOrders.data?.orderList);
    } catch (error) {
      console.log(error);
    }
  };

  const checkOderStatus = (status) => {
    switch (status) {
      case "pending":
        return { bg: "#fca5a533", color: "red" };
      case "shipping":
        return { bg: "#F1E399", color: "#795316" };
      case 'out for delivery':
        return { bg: "#0061ff42", color: "#006dff" };
      case "complete":
        return { bg: "#86efac33", color: "green" };

    }
  };
  useEffect(() => {
    fetchOders();
  }, [updater]);

  if (socket) {
    socket.on("ORDERLIST__UPDATE", (data) => {
      setOders(data.orders ?? oders);
    });

    socket.on('NEW__ORDERLIST', ({ savedOrder }) => {
      setOders([savedOrder, ...oders]);
    })
  }



  return (
    <>
      <Head>
        <title>shopEasee - admin</title>
        <meta
          name="description"
          content="It is a shopping app that provides best quality products at a affodable price at your door step."
        />
        <link rel="shortcut icon" href="/icon2.png" />
      </Head>

      {isLoading.state && isLoading.forWhichPorpose === "Authority" ? (
        <div className="w-screen h-screen fixed top-0 z-50 bg-[#000]/10 flex flex-col justify-center items-center space-y-3 backdrop-blur-md ">
          <CircularProgress className="text-3xl" />
          <h1 className="text-semibold text-2xl capitalize tracking-normal">
            {isLoading.currentMessage}...
          </h1>
        </div>
      ) : (
        <>
          <h2 className="text-center font-semibold text-3xl capitalize underline underline-offset-8 tracking-wider my-2">
            List of Orders
          </h2>
          <div className="lg:w-[90%] mx-auto my-3 p-2 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="font-extraboldbold text-md lg:text-xl p-2 ">
                    Order By :
                  </th>
                  <th className="font-extraboldbold text-md lg:text-xl capitalize p-2 tracking-wider">
                    Status
                  </th>
                  <th className="font-extraboldbold text-md lg:text-xl capitalize p-2 tracking-wider">
                    pay
                  </th>
                  <th className="font-extraboldbold text-md lg:text-xl capitalize p-2 tracking-wider">
                    Total <CurrencyRupeeIcon className="lg:text-base text-sm" />
                  </th>
                </tr>

                {oders?.map((cur, id) => (
                  <tr
                    key={id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProductList({
                        status: true,
                        productIds: cur,
                      });
                    }}
                    className={`${cur.status === 'cancel' ? 'opacity-40 bg-red-100':'bg-gray-50 hover:bg-gray-200'}  py-[10px] relative cursor-pointer hover:rounded-md  transition-all duration-200 ease-in-out`}
                  >
                  {
                    cur.status === 'cancel'&&(
                      <div className="absolute w-full h-full flex justify-center items-center z-40" >
                        <div className="h-[1.5px] bg-black w-full" />
                      </div>
                    )
                  }
                    <td className="font-extrabold lg:text-center text-sm lg:text-lg p-2 flex justify-start items-center lg:space-x-2">
                      <Avatar
                        {...stringAvatar(cur.userName.toUpperCase())}
                        round={true}
                        size={40}
                        className="lg:inline-flex hidden"
                      ></Avatar>
                      <h2>{cur.userName} </h2>
                    </td>
                    <td className="font-semibold lg:text-center text-sm lg:text-lg  p-2">
                      <select
                        onChange={(e) =>
                          handleChangeSelection(e, cur._id, cur.userId)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="w-full px-2 py-1 font-semibold capitalize border-none outline-none rounded-md shadow-sm text-center statusSelect"
                        style={{
                          background: checkOderStatus(cur.status)?.bg,
                          color: checkOderStatus(cur.status)?.color,
                          fontWeight: 700,
                        }}
                      >
                        {
                          cur.status === 'cancel' ? (
                            <option
                              value={cur.status}
                              default
                              className="font-bold capitalize"
                            >
                              {cur.status}
                            </option>
                          ) : (
                            <>
                              <option
                                value={cur.status}
                                default
                                className="font-bold capitalize"
                              >
                                {cur.status}
                              </option>
                              <option value="pending" className="font-bold">
                                Pending
                              </option>
                              <option value="shipping" className="font-bold">
                                Shipping
                              </option>
                              <option value="out for delivery" className="font-bold">
                                Out for delivery
                              </option>
                              <option value="complete" className="font-bold">
                                Complete
                              </option>
                            </>
                          )
                        }

                      </select>
                    </td>
                    <td className="font-semibold lg:text-center text-sm lg:text-lg p-2">
                      {cur.paymentMethod}
                    </td>
                    <td
                      className={`${cur.paymentMethod === "onlinePay" && "text-green-600"
                        }  font-extrabold lg:text-center text-md lg:text-lg p-2`}
                    >
                      {cur.totalPrice}.00
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </>
      )}

      {showProductList.status && (
        <ProductList
          setShowProductList={setShowProductList}
          showProductList={showProductList}
        />
      )}
    </>
  );
};

export default Dashboard;

const ProductList = ({ setShowProductList, showProductList }) => {
  return (
    <>
      <div onClick={(e) => {
        e.stopPropagation();
        setShowProductList({
          status: false,
          productIds: {},
        })
      }
      } className="fixed z-50 w-full h-screen backdrop-blur-sm bg-[#000]/40 top-0 flex justify-center items-center">
        <div className="lg:w-[65%] w-[97%] mx-auto p-3 bg-white rounded-md relative">
          <CancelOutlinedIcon onClick={() =>
            setShowProductList({
              status: false,
              productIds: {},
            })
          }
            className="text-3xl absolute right-3 text-red-500 cursor-pointer hover:scale-90 hover:rotate-180 transition-transform duration-150 ease-in-out" />


          <h2 className="lg:text-xl text-md font-semibold px-2 my-3"><span className="text-lg">Order Id</span> : {showProductList.productIds._id}</h2>
          <h2 className="lg:text-xl text-md font-extrabold px-2 my-3"><span className="text-lg font-bold">Name</span> : {showProductList.productIds.userName}</h2>

          <h2 className="lg:text-xl text-md font-extrabold px-2 my-3"><span className="text-lg font-bold">Email</span> : {showProductList.productIds.email}</h2>
          <h2 className="lg:text-xl text-md font-extrabold px-2 my-3"><span className="text-lg font-bold">Phone Number</span> : {showProductList.productIds.phoneNumber} , {showProductList.productIds.alternativePhoneNumber}</h2>

          <h2 className="lg:text-xl text-md font-extrabold px-2 my-3"><span className="text-lg font-bold">Address</span> : {showProductList.productIds.address} , {showProductList.productIds.country}</h2>

          {showProductList.productIds.itemList?.map((cur, id) => (
            <div key={id} className="flex flex-col lg:flex-row justify-evenly items-center my-5">
              <div className="flex-1 flex justify-start space-x-3 items-center">
                <Avatar
                  src={cur.productImage}
                  round="true"
                  className="object-top"
                  sx={{ width: 56, height: 56 }}
                />
                <h2 className="font-semibold text-xl tracking-wider">
                  {cur.productName} - {cur.size}
                </h2>
              </div>
              <div className="flex-1 flex w-full justify-evenly items-center">
                <div className="flex justify-center items-center space-x-3">
                  <h2 className="text-lg font-bold tracking-wider">
                    Quantity -
                  </h2>
                  <h2 className="text-xl font-extrabold">{cur.quantity}</h2>
                </div>
                <div className="flex justify-center items-center space-x-3">
                  <h2 className="text-lg font-bold tracking-wider">
                    Price <CurrencyRupeeIcon className="text-base" /> -
                  </h2>
                  <h2 className={` text-xl font-extrabold`}>{cur.total}.00</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   try {
//     console.log('running after the useEffect() getServerSideProps()')

//     /* The code below is checking the host of the request and based on that, it makes a GET request to
//    either the development or production domain to fetch a list of orders. If the request is
//    successful, it returns the orders data as props. If the request fails with a status code of 400,
//    it returns an error message as props. */

//     if (context.req.headers.host === "localhost:3000") {
//       const reqAllOders = await axios.get(
//         `${process.env.DEVELOPMENT_DOMAIN}/api/oders`
//       );
//       if (reqAllOders.status === 400) {
//         return {
//           props: {
//             error: "the error which while come form the server side.",
//           },
//         };
//       }

//       return {
//         props: {
//           oders: reqAllOders.data.orderList,
//         },
//       };
//     } else {
//       const reqAllOders = await axios.get(
//         `${process.env.PRODUCTION_DOMAIN}/api/oders`
//       );
//       if (reqAllOders.status === 400) {
//         return {
//           props: {
//             error: "the error which while come form the server side.",
//           },
//         };
//       }

//       return {
//         props: {
//           oders: reqAllOders.data.orderList,
//         },
//       };
//     }
//   } catch (error) {
//     console.log("Error", error);
//     return {
//       props: {
//         error,
//       },
//     };
//   }
// };
