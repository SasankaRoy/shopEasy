import Head from "next/head";
// import Todos from "../../components/Todos";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loadingComplete, loadingStart } from "../../Redux/loadingSlice";
import { CircularProgress } from "@mui/material";

let socket;

const Dashboard = ({ oders, error }) => {
  const user = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

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
    // console.log(user)
    setTimeout(() => {
      dispatch(loadingComplete());
    }, 2000);
  }, [user]);

  

  const [message, setMessage] = useState("");
  const [allSMS, setAllSMS] = useState([]);
  const [selectBg, setSelectBg] = useState({
    bg: "#fca5a533",
    color: "red",
  });

  const [showProductList, setShowProductList] = useState({
    status: false,
    productIds: [],
  });

  // making the the socket connection when the page is loaded...

  const makeSocketConnection = async () => {
    try {
      socket = io("http://localhost:5000/");

      socket.on("connect", () => {
        console.log("connected to the socket server!");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {
    socket.emit("test__SocketServer", message);
    socket.on("test__messageSendBack", (data) => {
      setAllSMS([...allSMS, data.message]);
      console.log(data.message, "from the server");
    });
  };
  useEffect(() => {
    // makeSocketConnection();
  }, []);

  /* The code below is a JavaScript function that takes a date as input and formats it in the
    "MM/DD/YYYY" format. It uses the `toLocaleString` method with the specified options to format the
    date. */
  
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

  const handleChangeSelection = (e) => {
    console.log(e);
    // setMessage(e.target.value);
    switch (e.target.value) {
      case "processing":
        setSelectBg({ bg: "#fde04733", color: "#5b4c0099" });
        socket.emit("test__SocketServer", e.target.value);
        socket.on("test__messageSendBack", (data) => {
          setAllSMS([...allSMS, data.message]);
          console.log(data.message, "from the server");
        });
        break;

      case "shipping":
        setSelectBg({ bg: "#fdba7433", color: "#88460099" });
        // setSelectBg('yellow')
        break;

      case "complete":
        setSelectBg({ bg: "#86efac33", color: "green" });
        // setSelectBg('orange')
        break;

      default:
        setSelectBg({ bg: "#fca5a533", color: "red" });
        break;
    }
  };
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
            List of Orders {allSMS}
          </h2>
          <div class="w-[90%] mx-auto my-3 p-2 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="font-extraboldbold text-xl p-2 tracking-wider">
                    Ordered By :
                  </th>
                  <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">
                    address
                  </th>
                  <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">
                    date
                  </th>
                  <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">
                    Status
                  </th>
                  <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">
                    payment Mode
                  </th>
                  <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">
                    Total amount (<CurrencyRupeeIcon className="text-base" />)
                  </th>
                </tr>

                {oders?.map((cur, id) => (
                  <tr
                    key={id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProductList({
                        status: true,
                        productIds: [...cur.itemList],
                      });
                    }}
                    className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out"
                  >
                    <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                      <img
                        className="object-cover h-[40px] w-[40px] object-top rounded-full"
                        src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702447524/ofchr5yy87ogbyfnfipu.jpg"
                        alt="productImg"
                      />
                      <h2>{cur.userName}</h2>
                    </td>
                    <td className="font-semibold text-center text-md tracking-wider p-2">
                      {cur.address} , {cur.country}
                    </td>
                    <td className="font-semibold text-center text-md tracking-wider p-2">
                      {cur.createdAt && formateDate(cur.createdAt)}
                    </td>
                    <td className="font-semibold text-center text-md tracking-wider p-2">
                      <select
                        onChange={handleChangeSelection}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                        style={{
                          background: selectBg.bg,
                          color: selectBg.color,
                          fontWeight: 700,
                        }}
                      >
                        <option
                          value={cur.status}
                          default
                          className="font-bold capitalize"
                        >
                          {cur.status}
                        </option>
                        <option value="shipping" className="font-bold">
                          Shipping
                        </option>
                        <option value="complete" className="font-bold">
                          Complete
                        </option>
                      </select>
                    </td>
                    <td className="font-semibold text-center text-md tracking-wider p-2">
                      {cur.paymentMethod}
                    </td>
                    <td
                      className={`${
                        cur.paymentMethod === "onlinePay" && "text-green-600"
                      }  font-extrabold text-center text-lg tracking-wider p-2`}
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
      <div className="fixed z-50 w-full h-screen backdrop-blur-sm bg-[#000]/40 top-0 flex justify-center items-center">
        <div className="w-[65%] mx-auto p-3 bg-white rounded-md relative">
          <h2
            className="absolute right-3 font-semibold text-red-500 text-xl top-3 capitalize cursor-pointer tracking-wider"
            onClick={() =>
              setShowProductList({
                status: false,
                productIds: [],
              })
            }
          >
            Close
          </h2>
          {/* loop here */}
          {showProductList.productIds?.map((cur, id) => (
            <div key={id} className="flex justify-evenly items-center my-5">
              <div className="flex-1 flex justify-start space-x-3 items-center">
                <img
                  src={cur.productImage}
                  alt="product Image"
                  className="w-[70px] h-[60px] rounded-full object-cover object-top"
                />
                <h2 className="font-semibold text-xl tracking-wider">
                  {cur.productName} - {cur.size}
                </h2>
              </div>
              <div className="flex-1 flex justify-evenly items-center">
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

export const getServerSideProps = async (context) => {
  try {
    /* The code below is checking the host of the request and based on that, it makes a GET request to
   either the development or production domain to fetch a list of orders. If the request is
   successful, it returns the orders data as props. If the request fails with a status code of 400,
   it returns an error message as props. */

    if (context.req.headers.host === "localhost:3000") {
      const reqAllOders = await axios.get(
        `${process.env.DEVELOPMENT_DOMAIN}/api/oders`
      );
      if (reqAllOders.status === 400) {
        return {
          props: {
            error: "the error which while come form the server side.",
          },
        };
      }

      return {
        props: {
          oders: reqAllOders.data.orderList,
        },
      };
    } else {
      const reqAllOders = await axios.get(
        `${process.env.PRODUCTION_DOMAIN}/api/oders`
      );
      if (reqAllOders.status === 400) {
        return {
          props: {
            error: "the error which while come form the server side.",
          },
        };
      }

      return {
        props: {
          oders: reqAllOders.data.orderList,
        },
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      props: {
        error,
      },
    };
  }
};
