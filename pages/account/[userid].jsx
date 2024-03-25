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
import axios from "axios";
import { Avatar } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";

const ProductModel = dynamic(() => import("../../components/ProductModel"));

const initialValuesForImages = {
  userProfileImage: "",
};
const Account = () => {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.loading);
  const [newProduct, setNewProduct] = useState(false);
  const filePicker = useRef(null);
  const dispatch = useDispatch();

  const [rawFiles, setRawFiles] = useState(initialValuesForImages);

  // for the image preview...
  const [selectedFiles, setSelectedFiles] = useState(initialValuesForImages);
  const router = useRouter();
  const { userid } = router.query;

  // if user trying to access a protected route without proper validation..
  

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
  }, []);

  const [userInfo, setUserInfo] = useState({
    userName: "",
    profasion: "",
    Dod: "",
    email: "",
    address: "",
    number: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profileImage = new FormData();
      profileImage.append("cloud_name", process.env.CLOUD_NAME);
      profileImage.append("upload_preset", process.env.UPLOAD_PRESET);
      if (rawFiles.userProfileImage) {
        dispatch(
          loadingStart({
            message: {
              currentMessage: "genrating the mediaURl for profileImage",
              forWhichPorpose: "ProfileImage",
            },
          })
        );
        profileImage.append("file", rawFiles.userProfileImage);
        const generateURLforProfileImage = await axios.post(
          process.env.MEDIA_TO_MEDIAURL_CONVERTER,
          profileImage
        );
        dispatch(loadingComplete());
        if (generateURLforProfileImage.data?.secure_url) {
          dispatch(
            loadingStart({
              message: {
                currentMessage: "saving the userInfo",
                forWhichPorpose: "Saving userInfo",
              },
            })
          );
          const saveUserInfo = await axios.post(
            `/api/users?uid=${user.userInfo._id}`,
            {
              userInfo,
              mediaUrl: generateURLforProfileImage.data?.secure_url,
            }
          );
          console.log(saveUserInfo.data);
          dispatch(loadingComplete());
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
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
                <Avatar
                  src={
                    selectedFiles.userProfileImage
                      ? selectedFiles.userProfileImage
                      : user.userInfo?.profilePicture
                  }
                  sx={{ width: 68, height: 68 }}
                  alt="userImage"
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
                  {userInfo.profasion
                    ? userInfo.profasion
                    : user.userInfo?.profasion}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <CakeIcon className="text-lg m-1" />{" "}
                  {userInfo.Dod ? userInfo.Dod : user.userInfo?.DOB}
                </h2>
                <h1 className="text-lg capitalize text-[#212a2f] tracking-wider font-light mt-3 mb-1">
                  Contact Info
                </h1>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <AlternateEmailIcon className="text-lg m-1" />
                  {userInfo.email ? userInfo.email : user.userInfo?.email}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <LocationOnIcon className="text-lg m-1" />{" "}
                  {userInfo.address ? userInfo.address : user.userInfo?.address}
                </h2>
                <h2 className="text-xl text-[#212a2f] tracking-wider font-semibold py-1">
                  <PhoneAndroidIcon className="text-lg m-1" />{" "}
                  {userInfo.number ? userInfo.number : user.userInfo?.number}
                </h2>

                <button
                  onClick={() => {
                    Cookies.remove("userToken", {
                      expires: 1,
                      path: "/",
                    });
                    window.location.reload();
                  }}
                  className="self-end text-center mt-5 rounded-md tracking-wide bg-red-500 hover:bg-red-600 transition-all duration-200 ease-out text-white w-[70%] lg:w-[50%] py-1 font-semibold text-2xl"
                >
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
                    <div className="flex justify-center items-center gap-5">
                      <button
                        onClick={() => setNewProduct(true)}
                        className="bg-white border border-[#212a2f] py-2 px-3 font-[800] rounded-lg shadow-lg tracking-wide text-md lg:text-xl text-[#212a2f] hover:bg-[#212a2f] hover:text-white transition-all duration-150 ease-out"
                      >
                        New Product
                      </button>
                      <Link
                        href="/admin/dashboard"
                        className="bg-[#212a2f] border border-[#212a2f] py-2 px-3 font-[800] rounded-lg shadow-lg tracking-wide text-md lg:text-xl text-white hover:bg-white hover:text-[#212a2f] transition-all duration-150 ease-out"
                      >
                        Dashboard
                      </Link>
                    </div>
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
                        profession
                      </label>
                      <input
                        type="text"
                        placeholder=" profession..."
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
                      name="userProfileImage"
                      ref={filePicker}
                    />
                  </div>
                  <button
                    disabled={
                      isLoading.state ||
                      !Object.keys(userInfo).every((key) => {
                        return Boolean(userInfo[key]);
                      }) ||
                      !rawFiles.userProfileImage
                    }
                    onClick={handleSubmit}
                    className="w-[80%] mx-auto mt-3 py-2 bg-[#212a2f] border border-[#212a2f] text-white text-xl font-semibold  rounded-md flex justify-center items-center tracking-wider capitalize disabled:cursor-not-allowed disabled:opacity-50 hover:text-[#212a2f] hover:bg-white transition-all duration-150 ease-in"
                  >
                    {isLoading.state &&
                    isLoading.forWhichPorpose === "ProfileImage" ? (
                      <>
                        <CircularProgress className="text-sm" />{" "}
                        {isLoading.currentMessage}...
                      </>
                    ) : (
                      "save change"
                    )}
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

export default Account;
