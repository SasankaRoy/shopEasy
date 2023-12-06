import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import axios from "axios";
import { useFormik } from "formik";
import { loginSuccess } from "../../Redux/userSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingComplete,
  loadingStart,
  loadingError,
} from "../../Redux/loadingSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { loginValidation } from "../../utils/formValidation";
import { handleError } from "../../utils/Error&SuccessHandler";

import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.loading);
  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidation,
      onSubmit: async (values) => {
        dispatch(
          loadingStart({
            message: {
              currentMessage: "Verifying...",
              forWhichPorpose: "Login",
            },
          })
        );
        try {
          const res = await axios.post("/api/auth/login", values);
          toast.success(`welcome back ${res?.data.user.userName}`);
          setTimeout(() => {
            //this setTimeOut I have used because the
            // Cookies.set method works only in the client-side and to prevent
            // to achive that I have to delay the code execution, I did useing this

            Cookies.set("userToken", res?.data.userToken, {
              expires: 1,
              path: "/",
            });
          }, 0);

          dispatch(loginSuccess(res?.data.user));
          dispatch(loadingComplete());
          router.push("/");
        } catch (err) {
          console.log(err);

          dispatch(
            loadingError({
              message: {
                currentMessage: err.response.data.error,
                forWhichPorpose: "Login faild",
              },
            })
          );
          handleError(err);
        }
      },
    });

  // useEffect(() => {
  //   if (user.userInfo) {
  //     if (
  //       router.pathname === "/auth/login" ||
  //       router.pathname === "/auth/register"
  //     ) {
  //       router.push("/");
  //       toast.warn("Your are logged in now !");
  //     }
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>shopEasee - login</title>
      </Head>
      <div className="relative h-screen w-screen flex flex-col  justify-center items-center ">
        <div className="absolute w-full h-full bg-black" />
        <motion.span
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="capitalize text-md text-white tracking-wider opacity-80 z-50 font-extralight "
        >
          get better shopping experience with
        </motion.span>

        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl text-white   font-normal font-[Satisfy] tracking-wide z-40 opacity-90 m-[7px]"
        >
          shopEasee
        </motion.h1>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base tracking-wider font-[Satisfy] font-thin z-40 opacity-70 text-white ml-40"
        >
          we provide best quality for better price.
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/photo4.jpg"
            fill
            priority
            alt="backgroundImg"
            className="object-cover opacity-40 z-20"
          />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className=" w-full md:w-[40%] h-[70%]
          flex flex-col justify-center   items-start
          opacity-95 z-50 backdrop-blur-sm p-3"
        >
          <h1
            className="capitalize text-2xl lg:text-3xl
          tracking-wider font-medium text-white"
          >
            welcome back<span className="text-[#F7AB0A]">.</span>
          </h1>

          <div
            className="flex flex-col justify-center items-start
          space-y-2 w-full p-2"
          >
            <label
              htmlFor="email"
              className="text-lg text-white tracking-wider font-light"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter email..."
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              id="email"
              value={values.email}
              className={`w-full  text-white bg-[#212a2f]/50 tracking-wider p-2 rounded-lg placeholder:font-medium
              placeholder:text-white placeholder:tracking-wider placeholder:text-xl text-xl font-medium border-none
              outline-none focus:ring-1 focus:ring-[#212a2f] ${
                errors.email && touched.email && "ring-1 ring-red-500"
              }`}
            />
          </div>

          <div
            className="flex flex-col justify-center
          items-start space-y-2 w-full p-2"
          >
            <label
              htmlFor="password"
              className="text-lg text-white tracking-wider font-light"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password..."
              onChange={handleChange}
              name="password"
              id="password"
              value={values.password}
              onBlur={handleBlur}
              className={`w-full  text-white bg-[#212a2f]/50 tracking-wider p-2 rounded-lg placeholder:font-medium
              placeholder:text-white placeholder:tracking-wider placeholder:text-xl text-xl font-medium border-none
              outline-none focus:ring-1 focus:ring-[#212a2f] ${
                errors.password && touched.password && "ring-1 ring-red-500"
              }`}
            />
          </div>

          <div className="flex items-center justify-evenly w-[50%] mt-3 mx-auto">
            <button
              disabled={
                (isLoading.state && isLoading.forWhichPorpose === "Login") ||
                !Object.keys(values).every((key) => {
                  return Boolean(values[key]);
                })
              }
              type="submit"
              className="bg-[#212a2f] border border-[#212a2f] flex justify-evenly items-center w-full text-white py-2  rounded-md font-semibold tracking-wide hover:tracking-wider hover:text-[#212a2f] hover:bg-white transition-all duration-200 ease-linear disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading.state && isLoading.forWhichPorpose === "Login" ? (
                <>
                  <CircularProgress className="text-sm" />
                  <span className="text-2xl font-semibold">
                    {isLoading.currentMessage}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-semibold">LogIn</span>
                </>
              )}
            </button>
          </div>
          <Link
            href="/auth/register"
            className="text-white tracking-wider m-2 hover:scale-105
            hover:text-[#f8f7f5] transition-all duration-100 ease-in"
          >
            {" "}
            Don&apos;t have an account yet ?
          </Link>
          <Link
            href="/"
            className="text-white tracking-wider m-2 hover:scale-105 hover:text-[#f8f7f5] transition-all duration-100 ease-in"
          >
            {" "}
            Forgot Password ?
          </Link>
        </motion.form>

        <span
          className="text-base z-50 opacity-80 tracking-wide
        text-white absolute bottom-1 px-2"
        >
          shopEasee. <span className="text-[#F7AB0A]">by - sasanka</span> @all
          copyright are reserved @2023.
        </span>
      </div>
    </>
  );
};
export default Login;
