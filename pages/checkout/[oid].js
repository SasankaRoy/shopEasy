import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useFormik } from "formik";
import { shippingValidation } from "../../utils/formValidation";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const OrderId = () => {
  const [coupon, setCoupon] = useState("");
  const [Socket, setSocket] = useState();
  const cart = useSelector((state) => state.cart.cart);
  const User = useSelector((state) => state.user.userInfo);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const router = useRouter();
  let socket;

  // const productIds = cart?.map((cur, id) => cur.id); // sperating the product id's from the cart. 


  // connect to the socket server here....
  useEffect(() => {
    try {
      socket = io(
        process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
        , {
          query: {
            userId: User?._id,
            role: User?.role
          }
        })
      socket.on("connect", () => {
        console.log("connected to the socket server!");
        setSocket(socket);
      });
    } catch (error) {
      throw new Error(error)
    }

    // disconnect when the user leaves the page or the component get unMounted...
    return () => {
      socket.disconnect();
    }
  }, [User]);


  // form validation and placing the order...
  const { values, handleBlur, handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        country: "",
        fullAddress: "",
        payMethod: "",
      },
      validationSchema: shippingValidation,
      onSubmit: async (values) => {
        try {
          // const placeOrder = await axios.post("/api/oders", {
          //   oder: values,
          //   productIds:cart,
          //   userId: User._id,
          //   subTotal,
          // });

          // if (placeOrder.status === 500) {
          //   // notify the error to the user.....
          //   toast.error('sometime went wrong while placing order. Please try again');
          //   router.push(`/trackmyorder/${User._id}`)
          //   return;
          // }

          // emitting an even for updating the admin on real-time......

          Socket.emit('NEW__ORDER', {
            oder: values,
            productIds: cart,
            userId: User._id,
            subTotal,
          });


          // notify the user if every thing go's right...
          Socket.on('ORDER__PLACED', ({ success }) => {
            toast.success(success);
          })

          // redirect the user to the oder page  ....          
          router.push(`/trackmyorder/${User._id}`);



        } catch (error) {
          console.log(error);
          toast.error(
            "sometime went wrong while placing order. Please try again"
          );
        }

      },
    });








  return (
    <>
      <Head>
        <title>shopEasee - checkout form</title>
        <meta
          name="description"
          content="It is a shopping app that provides best quality products at a affodable price at your door step."
        />
        <link rel="shortcut icon" href="/icon2.png" />
      </Head>
      <div className="w-[80%] mx-auto p-2 mt-3">
        <h2 className="font-bold text-3xl tracking-wider my-3">Check Out</h2>
        <div className="flex justify-between items-start space-x-5">
          <form className="flex-1 p-2">
            <h2 className="font-semibold text-2xl tracking-wider capitalize text-gray-500 my-2">
              Billing details
            </h2>
            <div className="flex justify-between items-center space-x-3">
              <div className="flex flex-col justify-start items-start space-y-2 flex-1">
                <label
                  className="font-bold text-gray-600 text-md tracking-wider"
                  htmlFor="fullName"
                >
                  Full Name{" "}
                  <span className="text-red-500 text-xl font-bold">*</span>
                </label>
                <input
                  placeholder="Full Name..."
                  className={`border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider tracking-wider ${errors.fullName && touched.fullName && "ring-1 ring-red-400"
                    }`}
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start space-y-2 my-2">
              <label
                className="font-bold text-gray-600 text-md tracking-wider"
                htmlFor="email"
              >
                Email <span className="text-red-500 text-xl font-bold">*</span>
              </label>
              <input
                placeholder="Enter Your Email..."
                className={`border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider tracking-wider ${errors.email && touched.email && "right-1 ring-red-400"
                  }`}
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2 my-2">
              <label
                className="font-bold text-gray-600 text-md tracking-wider"
                htmlFor="phoneNumber"
              >
                Phone Number{" "}
                <span className="text-red-500 text-xl font-bold">*</span>
              </label>
              <input
                placeholder="Enter Phone Number..."
                className={`border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider  tracking-wider ${errors.phoneNumber &&
                  touched.phoneNumber &&
                  "ring-1 ring-red-400"
                  }`}
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2 my-2">
              <label
                className="font-bold text-gray-600 text-md tracking-wider"
                htmlFor="alterNumber"
              >
                Alternate Number{" "}
                <span className="text-red-500 text-xl font-bold">*</span>
              </label>
              <input
                placeholder="Enter Alternate Number..."
                className={`border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider  tracking-wider ${errors.alternatePhoneNumber &&
                  touched.alternatePhoneNumber &&
                  "ring-1 ring-red-400"
                  }`}
                type="text"
                id="alterNumber"
                name="alternatePhoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.alternatePhoneNumber}
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2 my-2">
              <label
                className="font-bold text-gray-600 text-md tracking-wider"
                htmlFor="country"
              >
                Country{" "}
                <span className="text-red-500 text-xl font-bold">*</span>
              </label>
              <input
                placeholder="Enter Your Country..."
                className={`border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider  tracking-wider ${errors.country && touched.country && "ring-1 ring-red-400"
                  }`}
                type="text"
                id="country"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2 my-2">
              <label
                className="font-bold text-gray-600 text-md tracking-wider"
                htmlFor="fullAddress"
              >
                Full Adress{" "}
                <span className="text-red-500 text-xl font-bold">*</span>
              </label>
              <input
                placeholder="Enter Full Address..."
                className={`border border-gray-400 py-1 px-2 rounded-md outline-none w-full font-semibold text-black placeholder:font-semibold placeholder:text-gray-600 placeholder:tracking-wider  tracking-wider ${errors.fullAddress &&
                  touched.fullAddress &&
                  "ring-1 ring-red-400"
                  }`}
                type="text"
                id="fullAddress"
                name="fullAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullAddress}
              />
            </div>
          </form>
          <div className="flex-1  p-2">
            <h2 className="font-semibold text-2xl tracking-wider capitalize text-gray-500 my-2">
              Payment details
            </h2>
            {/* heading start */}
            <div className="flex justify-between items-center">
              <div className="bg-gray-100 p-2 flex-1">
                <h3 className="text-2xl text-center font-bold tracking-wider">
                  Product
                </h3>
              </div>
              <div className="flex-1 bg-gray-200 p-2">
                <h3 className="text-2xl font-bold tracking-wider text-center">
                  Subtotal
                </h3>
              </div>
            </div>
            {/* heading end */}

            <div className="my-2">
              {/* loop here start */}
              {cart?.map((cur, id) => (
                <div key={id} className="flex justify-between items-center">
                  <div className="flex-1 p-2">
                    <h2 className="text-lg font-semibold tracking-wider">
                      {cur.productName}
                    </h2>
                  </div>

                  <div className="flex-1 p-2">
                    <h2 className="text-2xl font-semibold tracking-wider text-center">
                      <CurrencyRupeeIcon className="text-base" />
                      {cur.total}.00
                    </h2>
                  </div>
                </div>
              ))}



              {/* ^^^^^loop here end */}

              <div className="flex justify-between items-center">
                <div className="flex-1 p-2 bg-gray-100">
                  <h2 className="text-lg font-semibold tracking-wider">
                    Subtotal
                  </h2>
                </div>
                <div className="flex-1 p-2">
                  <h2 className="text-2xl font-semibold tracking-wider text-center">
                    <CurrencyRupeeIcon className="text-base" />
                    {subTotal}.00
                  </h2>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex-1 p-2 bg-gray-200">
                  <h2 className="text-lg font-semibold tracking-wider">
                    Total
                  </h2>
                </div>
                <div className="flex-1 p-2">
                  <h2 className="text-2xl font-semibold tracking-wider text-center">
                    <CurrencyRupeeIcon className="text-base" />
                    {subTotal}.00
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-2">
              <h3 className="text-2xl font-semibold tracking-wider">
                Coupon Code
              </h3>
              <div className="flex justify-center items-center w-[80%] mx-auto mt-3 shadow-md space-x-1">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full py-1 px-3 outline-gray-400 text-lg font-semibold tracking-wider rounded-s-md"
                    placeholder="Enter Code..."
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <div className="">
                  <button
                    disabled={!coupon}
                    className="font-extrabold text-md tracking-wider text-white px-3 py-2 rounded-e-md bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Apply Discount
                  </button>
                </div>
              </div>
            </div>

            <div className="my-2 p-2">
              <h2 className="text-2xl font-semibold tracking-wider">
                Payment Methods
              </h2>
              <div className="flex justify-evenly items-center">
                <div className="flex justify-center items-center space-x-5 my-2">
                  <input
                    id="COD"
                    type="radio"
                    className={
                      errors.payMethod &&
                      touched.payMethod &&
                      "ring-1 ring-red-400"
                    }
                    name="payMethod"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value="COD"
                  />
                  <label className="text-xl font-semibold" htmlFor="COD">
                    Case on Delivery
                  </label>
                </div>
                <div className="flex justify-center items-center space-x-5 my-2">
                  <input
                    id="onlinePay"
                    type="radio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="payMethod"
                    value="onlinePay"
                  />
                  <label className="text-xl font-semibold" htmlFor="onlinePay">
                    paytm
                  </label>
                </div>
              </div>
            </div>

            <div className="my-3 flex justify-center items-center">
              <button
                onClick={() => handleSubmit()}
                disabled={
                  !Object.keys(values).every((key) => Boolean(values[key]))
                }
                type="submit"
                className="w-[40%] bg-[#212a2f] border border-[#212a2f] shadow-md text-white font-bold py-2 text-xl tracking-wider rounded-md hover:text-[#212a2f] hover:bg-white transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Place An Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderId;
