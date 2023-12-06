import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import { singinValidation } from "../../utils/formValidation";
import { handleError } from "../../utils/Error&SuccessHandler";
import { useDispatch, useSelector } from "react-redux";
import { loadingComplete, loadingStart } from "../../Redux/loadingSlice";

import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const { handleSubmit, values, touched, handleChange, errors, handleBlur } =
    useFormik({
      initialValues: {
        userName: "",
        lastName: "",
        email: "",
        password: "",
        ConPassword: "",
      },
      validationSchema: singinValidation,
      onSubmit: async (values) => {
        try {
          dispatch(
            loadingStart({
              message: {
                currentMessage: "Saving...",
                forWhichPorpose: "Register",
              },
            })
          );
          const response = await axios.post("/api/auth/register", values);
          toast.success(response.data.success);
          dispatch(loadingComplete());
          router.push("/auth/login");
        } catch (err) {
          handleError(err);
        }
      },
    });

  return (
    <>
      <Head>
        <title>shopEasee - create account</title>
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl text-white font-normal font-[Satisfy] tracking-wide z-40 opacity-90 m-[7px]"
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
            src="/photo1.jpg"
            fill
            priority
            alt="backgroundImg"
            className="object-cover opacity-40 z-20"
          />
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className=" w-[100%] md:w-[50%] h-[70%]
        flex flex-col justify-end   items-start
        opacity-95 z-50 backdrop-blur-sm p-2"
        >
          <h1 className="capitalize text-3xl tracking-wider font-medium text-white">
            Create an account<span className="text-[#F7AB0A]">.</span>
          </h1>
          <div className="flex justify-evenly items-center w-full mt-5">
            <div className="flex flex-col justify-center items-start relative w-[70%] p-2">
              <label
                htmlFor="name"
                className="text-lg text-white tracking-wider font-light"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="enter name..."
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full  text-white tracking-wider
                p-2 rounded-lg placeholder:font-light 
              bg-[#212a2f]/50 placeholder:text-white placeholder:tracking-wider 
                placeholder:text-xl text-xl font-light border-none outline-none focus:ring-1 focus:ring-[#212a2f]
                ${
                  errors.userName && touched.userName && "ring-1 ring-red-500"
                }`}
              />
            </div>
            <div className="flex flex-col justify-center items-start  w-[70%] p-2">
              <label
                htmlFor="lastname"
                className="text-lg text-white tracking-wider font-light"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="enter lastname..."
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className={`w-full  text-white tracking-wider
                p-2 rounded-lg placeholder:font-light bg-[#212a2f]/50
                 placeholder:text-white placeholder:tracking-wider
                placeholder:text-xl text-xl font-light border-none outline-none
                focus:ring-1 focus:ring-[#212a2f] ${
                  errors.lastName && touched.lastName && "ring-1 ring-red-500"
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start space-y-2 w-full p-2">
            <label
              htmlFor="email"
              className="text-lg text-white tracking-wider font-light"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="enter email..."
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full  text-white bg-[#212a2f]/50 tracking-wider
              p-2 rounded-lg placeholder:font-light 
            placeholder:text-white placeholder:tracking-wider placeholder:text-xl
              text-xl font-light border-none outline-none focus:ring-1 focus:ring-[#212a2f] ${
                errors.email && touched.email && "ring-1 ring-red-500"
              }`}
            />
          </div>
          <div className="flex justify-evenly items-center w-full">
            <div className="flex flex-col justify-center items-start space-y-2 w-[70%] p-2">
              <label
                htmlFor="password"
                className="text-lg text-white tracking-wider font-light"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="enter password..."
                name="password"
                value={values.password}
                onChange={handleChange}
                className={`w-full  text-white bg-[#212a2f]/50 tracking-wider
                p-2 rounded-lg placeholder:font-light 
              placeholder:text-white placeholder:tracking-wider placeholder:text-xl
                text-xl font-light border-none outline-none focus:ring-1 focus:ring-[#212a2f]
                 ${
                   errors.password && touched.password && "ring-1 ring-red-500"
                 }`}
              />
            </div>
            <div className="flex flex-col justify-center items-start space-y-2 w-[70%] p-2">
              <label
                htmlFor="conPassword"
                className="text-lg text-white tracking-wider font-light"
              >
                confirm password
              </label>
              <input
                type="password"
                placeholder=" confirm password..."
                name="ConPassword"
                value={values.ConPassword}
                onChange={handleChange}
                className={`w-full  text-white bg-[#212a2f]/50 tracking-wider
                p-2 rounded-lg placeholder:font-light
              placeholder:text-white placeholder:tracking-wider placeholder:text-xl
               text-xl font-light border-none outline-none focus:ring-1 focus:ring-[#212a2f] ${
                 errors.ConPassword &&
                 touched.ConPassword &&
                 "ring-1 ring-red-500"
               }`}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly space-y-2 mt-2 w-[50%] mx-auto">
            <button
              disabled={
                (isLoading.state && isLoading.forWhichPorpose === "Register") ||
                !Object.keys(values).every((key) => {
                  return Boolean(values[key]);
                })
              }
              type="submit"
              className="bg-[#212a2f] flex justify-evenly items-center border border-[#212a2f] w-full text-white py-2 text-2xl rounded-md font-semibold tracking-wide hover:tracking-wider hover:text-[#212a2f] hover:bg-white transition-all duration-200 ease-linear disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading.state && isLoading.forWhichPorpose === "Register" ? (
                <>
                  <CircularProgress className="text-sm" />
                  <span className="text-2xl font-semibold">
                    {isLoading.currentMessage}
                  </span>
                </>
              ) : (
                "Create"
              )}
            </button>
            <h3 className="m-0 text-white text-xl">Or</h3>

            <Link
              href="/auth/login"
              className="text-white tracking-wider m-2 hover:scale-105
            hover:text-[#f8f7f5] transition-all duration-100 ease-in"
            >
              {" "}
              Already have an account?
            </Link>
          </div>
        </motion.form>
        <span className="text-base z-50 opacity-80 tracking-wide text-white absolute bottom-1">
          shopEasee. <span className="text-[#F7AB0A]">by - sasanka</span> @all
          copyright are reserved @2023.
        </span>
      </div>
    </>
  );
};

export default Register;
