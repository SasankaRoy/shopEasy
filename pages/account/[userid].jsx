import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loadingComplete, loadingStart } from "../../Redux/loadingSlice";
import { handleChangeForImages } from "../../utils/handleChangeForImages";

import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CakeIcon from "@mui/icons-material/Cake";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CircularProgress from "@mui/material/CircularProgress";
// import { ProductModel } from "../../components/ProductModel";
// import { Todos } from "../components/Todos";

const ProductModel = dynamic(() => import("../../components/ProductModel"));

const initialValuesForImages = {
  userProfileImage: "",
};
const account = () => {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.loading);
  const [newProduct, setNewProduct] = useState(false);
  const filePicker = useRef(null);
  const dispatch = useDispatch();

  const [rawFiles, setRawFiles] = useState(initialValuesForImages);

  // for the image preview...
  const [selectedFiles, setSelectedFiles] = useState(initialValuesForImages);
  const router = useRouter();

  useEffect(() => {
    dispatch(
      loadingStart({
        message: {
          currentMessage: "checking user authoraisation",
          forWhichPorpose: "Authorasied",
        },
      })
    );
    if (user) {
      setTimeout(() => {
        dispatch(loadingComplete());
      }, 2000);
    }
  }, [user]);

  const [userInfo, setUserInfo] = useState({
    userName: "",
    profasion: "",
    Dod: "",
    email: "",
    address: "",
    number: "",
    mediaUrl: "hello",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>
          shopEasee. - account/
          {isLoading.state && isLoading.forWhichPorpose === "Authorasied"
            ? isLoading.forWhichPorpose
            : user.userInfo?.userName}
        </title>
      </Head>
      {isLoading.state && isLoading.forWhichPorpose === "Authorasied" ? (
        <div className="w-screen h-screen fixed top-0 z-50 bg-[#000]/10 flex flex-col justify-center items-center space-y-3 backdrop-blur-md ">
          <CircularProgress className="text-3xl" />
          <h1 className="text-semibold text-2xl capitalize tracking-normal">
            {isLoading.currentMessage}...
          </h1>
        </div>
      ) : (
        <div className=" flex flex-col lg:flex-row justify-center items-start px-5 py-2">
          <div className="flex-1 w-full">
            <h1 className="text-3xl font-semibold my-5 ml-4 text-[#212a2f] capitalize tracking-wider">
              My account.
            </h1>
            <div className="flex-1  w-full flex  flex-col justify-start items-center p-3">
              <div className="relative w-24 h-24 rounded-full">
                <Image
                  src={
                    selectedFiles.userProfileImage
                      ? selectedFiles.userProfileImage
                      : "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
                  }
                  alt="userImage"
                  fill
                  className="object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col  justify-center items-start w-full mt-4 px-3">
                <h1 className="text-lg  capitalize text-[#212a2f] tracking-wider font-light mt-2 mb-1">
                  User Info
                </h1>
                <h2 className="text-xl text-[#212a2f] tracking-wider capitalize font-semibold py-1">
                  <PersonIcon className="text-lg m-1" />{" "}
                  {userInfo.userName
                    ? userInfo.userName
                    : user?.userInfo?.userName}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <WorkOutlineIcon className="text-lg m-1" />{" "}
                  {userInfo.profasion}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <CakeIcon className="text-lg m-1" /> {userInfo.Dod}
                </h2>
                <h1 className="text-lg capitalize text-[#212a2f] tracking-wider font-light mt-3 mb-1">
                  Contact Info
                </h1>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <AlternateEmailIcon className="text-lg m-1" />
                  {userInfo.email}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <LocationOnIcon className="text-lg m-1" /> {userInfo.address}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <PhoneAndroidIcon className="text-lg m-1" /> {userInfo.number}
                </h2>

                <button className="self-end text-center mt-5 rounded-md tracking-wide bg-red-500 hover:bg-red-600 transition-all duration-200 ease-out text-white w-[70%] lg:w-[50%] py-1 font-semibold text-2xl">
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex-1 lg:border-l lg:border-[#212a2f] p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold tracking-wider text-[#212a2f] capitalize">
                  Edit user info.
                </h3>

                <>
                  {user.userInfo?.role === "admin" ||
                  user.userInfo?.role === "manager" ? (
                    <button
                      onClick={() => setNewProduct(true)}
                      className="bg-green-400 py-2 px-3 font-[600] rounded-xl shadow-lg tracking-widest text-md lg:text-xl text-white hover:bg-green-500 transition-all duration-150 ease-out"
                    >
                      New Product
                    </button>
                  ) : (
                    ""
                  )}
                </>
              </div>
              <div className="flex flex-col">
                <form>
                  <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                    <label
                      htmlFor="productTitle"
                      className="text-lg tracking-wider font-semibold capitalize text-[#212a2f]"
                    >
                      userName
                    </label>
                    <input
                      type="text"
                      placeholder=" name..."
                      onChange={handleInputs}
                      name="userName"
                      value={userInfo.userName}
                      className="w-full text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0 "
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                      <label
                        htmlFor="productTitle"
                        className="text-lg tracking-wider font-semibold capitalize text-[#212a2f]"
                      >
                        profasion
                      </label>
                      <input
                        type="text"
                        placeholder=" profasion..."
                        onChange={handleInputs}
                        name="profasion"
                        value={userInfo.profasion}
                        className="w-full text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0 "
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                      <label
                        htmlFor="productTitle"
                        className="text-lg tracking-wider font-semibold capitalize text-[#212a2f]"
                      >
                        dob
                      </label>
                      <input
                        type="text"
                        placeholder=" dob..."
                        onChange={handleInputs}
                        name="Dod"
                        value={userInfo.Dod}
                        className="w-full text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0 "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                    <label
                      htmlFor="productTitle"
                      className="text-lg tracking-wider font-semibold capitalize text-[#212a2f]"
                    >
                      email
                    </label>
                    <input
                      type="text"
                      placeholder=" email..."
                      onChange={handleInputs}
                      name="email"
                      value={userInfo.email}
                      className="w-full text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0 "
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                      <label
                        htmlFor="productTitle"
                        className="text-lg tracking-wider font-semibold capitalize text-[#212a2f]"
                      >
                        address
                      </label>
                      <input
                        type="text"
                        placeholder=" address..."
                        onChange={handleInputs}
                        name="address"
                        value={userInfo.address}
                        className="w-full text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0 "
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                      <label
                        htmlFor="productTitle"
                        className="text-lg tracking-wider font-semibold capitalize text-[#212a2f]"
                      >
                        number
                      </label>
                      <input
                        type="text"
                        placeholder=" number..."
                        onChange={handleInputs}
                        name="number"
                        value={userInfo.number}
                        className="w-full text-xl p-2 bg-white text-[#212a2f] font-semibold tracking-wider border-b-2 border-[#212a2f] outline-none focus:ring-0 "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-1 mt-5 md:w-[85%] w-full">
                    <label
                      htmlFor="productImage"
                      className="text-lg tracking-wider font-semibold text-[#212a2f]"
                    >
                      Image
                    </label>
                    <div
                      onClick={() => filePicker.current.click()}
                      className="flex  cursor-pointer mx-auto mt-3 p-2 rounded-full"
                    >
                      <CameraAltOutlinedIcon className="  text-4xl text-[#F7AB0A]" />
                    </div>
                    <input
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleChangeForImages(
                          e,
                          setRawFiles,
                          setSelectedFiles,
                          rawFiles,
                          selectedFiles,
                          dispatch
                        )
                      }
                      // onChange={handleChangeForImg}
                      name="userProfileImage"
                      ref={filePicker}
                      // value={selectedFiles.userProfileImage}
                    />
                  </div>
                  <button
                    disabled={
                      !Object.keys(userInfo).every((key) => {
                        return Boolean(userInfo[key]);
                      })
                    }
                    onClick={handleSubmit}
                    className="w-[80%] mx-auto mt-3 py-2 bg-[#212a2f] border border-[#212a2f] text-white text-xl font-semibold  rounded-md flex justify-center items-center tracking-wider capitalize disabled:cursor-not-allowed disabled:opacity-50 hover:text-[#212a2f] hover:bg-white transition-all duration-150 ease-in"
                  >
                    save change
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {newProduct && (
        <ProductModel
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          activeFor="New_Product"
        />
      )}
    </>
  );
};

export default account;
