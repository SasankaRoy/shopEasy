import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  addItemsQuantity,
  removeItem,
  removeItemsQuantity,
} from "../Redux/cartSlice";
// import { handleError } from "../utils/Error&SuccessHandler";
// import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ setShowCart }) => {
  const cart = useSelector((state) => state.cart);
  const User = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user);
  const [orderExist, setOrderExist] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();

  const addQuantity = (productInfo) => {
    dispatch(addItemsQuantity(productInfo));
  };
  const removeItems = (productInfo) => {
    dispatch(removeItemsQuantity(productInfo));
  };
  let widthCal = () => {
    let widthInPer = (cart.subTotal / 1000) * 100;
    if (widthInPer > 100) {
      return (widthInPer = 100);
    }
    return widthInPer;
  };
  const productIds = cart.cart?.map((cur, id) => cur.id);


  const checkOrders = async () => {
    try {
      const isOrderExists = await axios.get(`/api/oders?uId=${User._id}`);
      setOrderExist(true)
    } catch (error) {
      console.log(error.response.data.error);
    }

  }


  useEffect(() => {
    if (User) checkOrders();
  }, [])


  return (
    <div className="h-screen w-screen flex justify-end items-end fixed z-50 bg-black/20 top-0">
      <motion.div
        initial={{
          x: 350,
          opacity: [0, 1],
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "linear",
        }}
        className="w-full lg:w-[40%] h-full bg-[#ffffff] p-3"
      >
        <div className="flex justify-start items-start ">
          <ClearOutlinedIcon
            onClick={() => setShowCart(false)}
            className="text-5xl cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out"
          />
          <div className="relative flex flex-col justify-center items-center flex-1">
            <ShoppingCartOutlinedIcon className="text-5xl z-50" />
            <p className="mt-2 tracking-wider text-sm font-normal">
              You are <CurrencyRupeeIcon className="text-[16px] mb-1" />
              <span className="font-semibold text-md tracking-wider">
                {cart.subTotal <= 1000 ? 1000 - cart.subTotal : 0}
              </span>{" "}
              away from free shipping!
            </p>
          </div>
        </div>
        {/* bg-[#b8d1dc]  */}
        <div className="h-2 w-[95%] mt-2 mx-auto bg-[#f5f5f5] ">
          <div
            className={
              "bg-[#b8d1dc] h-full transition-all duration-200 ease-linear"
            }
            style={{
              width: `${widthCal()}%`,
            }}
          ></div>
        </div>
        {user.userInfo ? (
          <>
            {cart.cart.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-center space-y-4 w-[50%] mt-3 mx-auto">
                  <span className=" border-none outline-none bg-transparent">
                    <span className="text-3xl shadow-sm">🥺🥺🥺</span>
                  </span>
                  <h1 className="text-2xl font-semibold tracking-wider">
                    Your cart is emply
                  </h1>
                  <button name="Shop-Now" className="bg-[#212a2f] border border-[#212a2f] w-full text-white py-2 text-2xl rounded-md font-semibold tracking-wide hover:tracking-wider hover:text-[#212a2f] hover:bg-white transition-all duration-200 ease-linear">
                    Shop Now
                  </button>
                </div>
              </div>
            ) : (
              <>
                {
                  orderExist && (                    
                      <Link className="px-4 py-2 bg-[#212a2f] text-white font-bold" onClick={()=>setShowCart(false)} href={`/trackmyorder/${User._id}`}>
                        Track Order
                      </Link>                    
                  )}
                    <>
                      <div className="h-[67%]  overflow-y-auto scroll-smooth">
                        {cart.cart.map((cur, id) => (
                          <>
                            <div
                              key={id}
                              className="w-full relative h-48 flex justify-start items-start space-x-4 mt-5"
                            >
                              {/* image div */}
                              <div className="img relative w-[20%] h-[75%] my-auto rounded-lg">
                                <Image
                                  src={cur.productImage}
                                  fill
                                  priority
                                  alt="productImage"
                                  className="object-cover object-top rounded-lg"
                                />
                              </div>
                              {/* informations div */}
                              <div className="flex-1 mt-3 px-1">
                                <Link
                                  href={`/product/${cur.productName}?pid=${cur.id}`}
                                  prefetch={false}
                                >
                                  <h1
                                    onClick={() => {
                                      setShowCart(false);
                                    }}
                                    className="text-xl font-semibold tracking-wide cursor-pointer p-0 m-0 hover:underline transition-all duration-150 ease-linear"
                                  >
                                    {cur.productName}
                                  </h1>
                                </Link>

                                <h2 className="text-lg font-semibold tracking-wide p-0 mx-0 my-1">
                                  {cur.brandName}
                                </h2>
                                <div className="flex justify-start items-center space-x-6">
                                  <h2 className="text-lg font-semibold tracking-wide p-0 m-0 capitalize">
                                    <span className="font-normal">Size : </span>
                                    {cur.size}
                                  </h2>
                                  <div
                                    style={{ background: cur.color }}
                                    className="h-6 w-6 rounded-full"
                                  />
                                </div>
                                <div className="w-full mt-3 flex justify-between items-center">
                                  <div className="flex justify-around py-2 shadow items-center rounded-md border-2 w-[25%]">
                                    <RemoveIcon
                                      onClick={() =>
                                        removeItems({
                                          id: cur.id,
                                          price: cur.price,
                                        })
                                      }
                                      className="cursor-pointer text-2xl opacity-50 hover:opacity-100 transition duration-150 ease-out"
                                    />
                                    <span className="font-semibold text-lg">
                                      {cur.quantity}
                                    </span>
                                    <AddIcon
                                      onClick={() =>
                                        addQuantity({
                                          id: cur.id,
                                          price: cur.price,
                                        })
                                      }
                                      className="cursor-pointer text-2xl opacity-50 hover:opacity-100 transition duration-150 ease-out"
                                    />
                                  </div>

                                  <div className="flex justify-center items-center space-x-3">
                                    <span className="text-lg font-semibold line-through text-red-500">
                                      <CurrencyRupeeIcon className="text-[16px]" />
                                      200.00
                                    </span>
                                    <span className="text-lg font-semibold tracking-wider">
                                      <CurrencyRupeeIcon className="text-[16px]" />
                                      {cur.price * cur.quantity}.00
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <ClearOutlinedIcon
                                onClick={() =>
                                  dispatch(
                                    removeItem({
                                      id: cur.id,
                                    })
                                  )
                                }
                                className="text-md right-3 top-3 absolute cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out"
                              />
                            </div>
                            <hr className="bg-[#f5f5f5] mt-2" />
                          </>
                        ))}
                      </div>

                      <div className="w-[90%]  mx-auto mt-2">
                        <hr className="bg-[#f5f5f5] mt-1" />
                        <div className="flex justify-between items-center w-full my-2">
                          <h2 className="text-xl font-semibold tracking-wide m-0 p-0">
                            SubTotal
                          </h2>
                          <span className="font-semibold text-xl tracking-wide">
                            <CurrencyRupeeIcon />
                            {cart.subTotal}
                          </span>
                        </div>
                        <div className="flex justify-between items-center w-full my-2">
                          <h2 className="text-xl font-semibold tracking-wide m-0 p-0">
                            Shipping & Taxes
                          </h2>
                          <span className="font-semibold text-lg tracking-wide">
                            <CurrencyRupeeIcon />
                            {cart.subTotal < 1000 ? 300 : "Free"}
                          </span>
                        </div>
                        <button
                          name="proceed-to-checkout"
                          onClick={() => {
                            router.push(`/checkout/${User?._id}&o=${productIds[0]}&n=${productIds[1]}`);
                            setShowCart(false);
                          }}
                          className="w-full py-2 rounded-md uppercase text-xl
                    bg-[#212a2f] text-[#ffffff] font-semibold tracking-wider
                    hover:text-[#212a2f] hover:bg-[#ffffff] hover:border
                    hover:border-[#212a2f] transition-all duration-150 ease-out mt-2"
                        >
                          proceed to checkout
                        </button>
                      </div>
                    </>
                  
                

              </>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center space-y-4 w-[50%] mt-3 mx-auto">
              <span className=" border-none outline-none bg-transparent">
                <span className="text-3xl shadow-sm">🥺🥺🥺</span>
              </span>
              <h1 className="text-2xl text-center font-semibold tracking-wider">
                Your session is expired ! Please
              </h1>
              <button
                onClick={() => router.push("/auth/login")}
                className="bg-[#212a2f] border border-[#212a2f]
                w-full text-white py-2 text-2xl rounded-md font-semibold
                tracking-wide hover:tracking-wider hover:text-[#212a2f]
              hover:bg-white transition-all duration-200 ease-linear"
              >
                Log in
              </button>
            </div>
          </div>
        )}


      </motion.div>
    </div>
  );
};

export default Cart;
