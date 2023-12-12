import React, { useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { handleError } from "../utils/Error&SuccessHandler";
import axios from "axios";
import { toast } from "react-toastify";
import { handleChangeForImages } from "../utils/handleChangeForImages";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { loadingComplete, loadingStart } from "../Redux/loadingSlice";
import { useRouter } from "next/router";
// import events, { Events } from "../utils/events";

const initialValuesForImages = {
  image1: "",
  image2: "",
  image3: "",
  image4: "",
};

const ProductModel = ({ setNewProduct, ProductDetails, activeFor }) => {
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const router = useRouter();

 

  // for getting the media URL of the images...
  const [rawFiles, setRawFiles] = useState(initialValuesForImages);

  // for the image preview...
  const [selectedFiles, setSelectedFiles] = useState(initialValuesForImages);

  //for form or the entire product info object...
  const [newproductInfo, setNewProductInfo] = useState({
    brand: ProductDetails?.brand,
    productName: ProductDetails?.productName,
    productFor: ProductDetails?.productFor,
    subcategory: ProductDetails?.subcategory,
    category: ProductDetails?.category,
    size: ProductDetails?.size ? ProductDetails?.size : [],
    color: ProductDetails?.color ? ProductDetails?.color : [],
    price: ProductDetails?.price,
    description1: ProductDetails?.describtion[0].description,
    description2: ProductDetails?.describtion[1].description,
    description3: ProductDetails?.describtion[2].description,
    description4: ProductDetails?.describtion[3].description,
    heading1: ProductDetails?.describtion[0].heading,
    heading2: ProductDetails?.describtion[1].heading,
    heading3: ProductDetails?.describtion[2].heading,
    heading4: ProductDetails?.describtion[3].heading,
  });

  const imageRef1 = useRef(null); // for product image1...
  const imageRef2 = useRef(null); // for product image2...
  const imageRef3 = useRef(null); // for product image3...
  const imageRef4 = useRef(null); // for product image4...

  // this handleChange handles the color and size inputs data...
  const handleChangeForColorAndSize = (e) => {
    const { name, value, checked } = e.target;
    // size input fields...
    if (name === "size") {
      if (checked) {
        const checkSizeExistence = newproductInfo.size.find((s) => s === value);
        if (!checkSizeExistence) {
          setNewProductInfo({
            ...newproductInfo,
            size: [...newproductInfo.size, value],
          });
        }
      } else {
        setNewProductInfo({
          ...newproductInfo,
          size: newproductInfo.size.filter((s) => s !== value),
        });
      }
    }
    // color input fields...
    if (name === "color") {
      if (checked) {
        const checkColorExistence = newproductInfo.color.find(
          (c) => c === value
        );
        if (!checkColorExistence) {
          //   if (colorCode.hex) {
          setNewProductInfo({
            ...newproductInfo,
            color: [...newproductInfo.color, value],
          });
          //   }
        }
      } else {
        setNewProductInfo({
          ...newproductInfo,
          color: newproductInfo.color.filter((c) => c !== value),
        });
      }
    }
  };

  // this handleChange handles all the other product info data...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductInfo({ ...newproductInfo, [name]: value });
  };

  // in this func genrating the mediaUrl of the images and
  // sending the newproductInfo object to the server...

  const handleSubmit = async (e, methodChecker) => {
    e.preventDefault();

    const imgData = new FormData();
    imgData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
    imgData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
    try {
      let allUrl = [];

      // img one...
      if (rawFiles.image1) {
        dispatch(
          loadingStart({
            message: {
              currentMessage: "genrating the mediaURl for image1",
              forWhichPorpose: "Url1",
            },
          })
        );
        imgData.append("file", rawFiles.image1);
        try {
          console.log(process.env.NEXT_PUBLIC_MEDIA_TO_MEDIAURL_CONVERTER,'the url')
        const GetMediaUrlForImg1 = await axios.post(
          `${process.env.NEXT_PUBLIC_MEDIA_TO_MEDIAURL_CONVERTER}`,
          imgData
        );
        allUrl.push(GetMediaUrlForImg1.data?.secure_url);
        dispatch(loadingComplete());
        console.log(GetMediaUrlForImg1,'the img 1');          
        } catch (error) {
          console.log(error);
        }
      } else {
        if (ProductDetails.mediaURL[0]) {
          allUrl.push(ProductDetails.mediaURL[0]);
        }
      }

      // img two...
      if (rawFiles.image2) {
        console.log("GetMediaUrlForImg1 started!");
        dispatch(
          loadingStart({
            message: {
              currentMessage: "genrating the mediaURl for image2",
              forWhichPorpose: "Url2",
            },
          })
        );
        imgData.append("file", rawFiles.image2);
        try {
        const GetMediaUrlForImg2 = await axios.post(
          process.env.NEXT_PUBLIC_MEDIA_TO_MEDIAURL_CONVERTER,
          imgData
        );
        console.log("the second img", GetMediaUrlForImg2);
        allUrl.push(GetMediaUrlForImg2.data?.secure_url);
        dispatch(loadingComplete());          
        } catch (error) {
          console.log(error);
        }
      } else {
        if (ProductDetails.mediaURL[1]) {
          allUrl.push(ProductDetails.mediaURL[1]);
        }
      }

      // img 3...
      if (rawFiles.image3) {
        dispatch(
          loadingStart({
            message: {
              currentMessage: "genrating the mediaURl for image3",
              forWhichPorpose: "Url3",
            },
          })
        );
        imgData.append("file", rawFiles.image3);
        try {
        const GetMediaUrlForImg3 = await axios.post(
          `${process.env.NEXT_PUBLIC_MEDIA_TO_MEDIAURL_CONVERTER}`,
          imgData
        );
        allUrl.push(GetMediaUrlForImg3.data?.secure_url);
        dispatch(loadingComplete());          
        } catch (error) {
          console.log(error);
        }
      } else {
        if (ProductDetails.mediaURL[2]) {
          allUrl.push(ProductDetails.mediaURL[2]);
        }
      }

      // img four...
      if (rawFiles.image4) {
        dispatch(
          loadingStart({
            message: {
              currentMessage: "genrating the mediaURl for image4",
              forWhichPorpose: "Url4",
            },
          })
        );
        imgData.append("file", rawFiles.image4);
        try {
        const GetMediaUrlForImg4 = await axios.post(
          `${process.env.NEXT_PUBLIC_MEDIA_TO_MEDIAURL_CONVERTER}`,
          imgData
        );
        allUrl.push(GetMediaUrlForImg4.data?.secure_url);
        dispatch(loadingComplete());
          
        } catch (error) {
          console.log(error);
        }
      } else {
        if (ProductDetails.mediaURL[3]) {
          allUrl.push(ProductDetails.mediaURL[3]);
        }
      }

      // requesting for saving the product into the database...
      dispatch(
        loadingStart({
          message: {
            currentMessage: "saving the product information into DataBase",
            forWhichPorpose: "Saving",
          },
        })
      );

      if (methodChecker === "new_Product") {
        const reqToServerForSaveData = await axios.post("/api/products", {
          newproductInfo,
          imageURLs: allUrl,
        });

        if (reqToServerForSaveData.status === 201) {
          dispatch(loadingComplete());
          toast.success("product added to the DB 🎊😊🎊!");
          setNewProduct(false);
        }
      } else if (methodChecker === "update_Product") {
        try {
          const update_Product = await axios.put("/api/products", {
            id: ProductDetails?._id,
            newproductInfo,
            imageURLs: allUrl,
          });
          if (update_Product.status === 202) {
            setNewProduct(false);
            toast.success(update_Product.data.message);
            dispatch(loadingComplete());
            if (update_Product.data.updatedProduct) {
              router.push(
                `/product/${update_Product.data.updatedProduct.productName}?pid=${update_Product.data.updatedProduct._id}`
              );
            }
          } else {
            toast.success(update_Product.data.message);
            dispatch(loadingComplete());
          }
        } catch (err) {
          console.log(err);
          handleError(err);
        }
      }
    } catch (error) {
      console.log(error);
      // handleError(error);
    }
  };

  return (
    <div className="fixed flex justify-center items-center bg-[#212a2f]/30 top-0 h-screen w-screen z-50">
      <div
        onClick={() => setNewProduct(false)}
        className="absolute right-10 top-5 bg-[#fff]/80 rounded-full p-1"
      >
        <ClearOutlinedIcon className="text-3xl cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out" />
      </div>

      <div
        className="bg-[#ffffff] w-[99%] lg:w-[90%]
      h-[83%] lg:h-[80%] shadow-xl rounded-lg p-1
      overflow-y-auto scroll-smooth"
      >
        <div className="flex flex-col md:flex-col lg:flex-row justify-center items-center space-y-3 lg:space-y-0 lg:space-x-3 w-full h-full p-1">
          {/* the image */}
          <div className="w-full md:w-full lg:w-[40%] grid grid-cols-2 gap-4 h-full">
            <div className=" rounded-md  relative">
              {selectedFiles.image1 || ProductDetails?.mediaURL[0] ? (
                <>
                  {isLoading.state && isLoading.forWhichPorpose === "image1" ? (
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                      <CircularProgress className="text-md" />
                      <h1 className="text-base font-normal tracking-wide capitalize">
                        {isLoading.currentMessage}...
                      </h1>
                    </div>
                  ) : (
                    <div className="relative w-full h-full main__div ">
                      <Image
                        src={
                          selectedFiles.image1
                            ? selectedFiles.image1
                            : ProductDetails?.mediaURL[0]
                        }
                        alt="productImage"
                        fill
                        className="object-cover rounded-md shadow-lg"
                        loading="lazy"
                      />
                      <div className="w-full h-full absolute flex justify-center items-center z-40 top-0 left-0 bg-black/20 icons transition-all duration-100 ease-in">
                        <div
                          onClick={() => {
                            imageRef1.current.click();
                          }}
                          className="h-14 w-14 flex justify-center items-center bg-[#212a2f]/60 rounded-full cursor-pointer shadow-md"
                        >
                          <input
                            type="file"
                            name="image1"
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
                            hidden
                            ref={imageRef1}
                          />
                          <CameraAltOutlinedIcon className="text-white text-3xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  onClick={() => imageRef1.current.click()}
                  className="w-full h-full cursor-pointer flex justify-center items-center bg-[#212a2f]/30"
                >
                  <CameraAltOutlinedIcon className="text-white text-3xl" />
                  <input
                    type="file"
                    name="image1"
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
                    hidden
                    ref={imageRef1}
                  />
                </div>
              )}
            </div>
            <div className=" rounded-md  relative">
              {selectedFiles.image2 || ProductDetails?.mediaURL[1] ? (
                <>
                  {isLoading.state && isLoading.forWhichPorpose === "image2" ? (
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                      <CircularProgress className="text-md" />
                      <h1 className="text-base font-normal tracking-wide capitalize">
                        {isLoading.currentMessage}..
                      </h1>
                    </div>
                  ) : (
                    <div className="relative w-full h-full main__div ">
                      <Image
                        src={
                          selectedFiles.image2
                            ? selectedFiles.image2
                            : ProductDetails?.mediaURL[1]
                        }
                        alt="productImage"
                        fill
                        className="object-cover rounded-md shadow-lg"
                        loading="lazy"
                      />
                      <div className="w-full h-full absolute flex justify-center items-center z-40 top-0 left-0 bg-black/20 icons transition-all duration-100 ease-in">
                        <div
                          onClick={() => {
                            imageRef2.current.click();
                          }}
                          className="h-14 w-14 flex justify-center items-center bg-[#212a2f]/60 rounded-full cursor-pointer shadow-md"
                        >
                          <input
                            type="file"
                            name="image2"
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
                            hidden
                            ref={imageRef2}
                          />
                          <CameraAltOutlinedIcon className="text-white text-3xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  onClick={() => imageRef2.current.click()}
                  className="w-full h-full cursor-pointer flex justify-center items-center bg-[#212a2f]/30"
                >
                  <CameraAltOutlinedIcon className="text-white text-3xl" />
                  <input
                    type="file"
                    name="image2"
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
                    hidden
                    ref={imageRef2}
                  />
                </div>
              )}
            </div>
            <div className=" rounded-md  relative">
              {selectedFiles.image3 || ProductDetails?.mediaURL[2] ? (
                <>
                  {isLoading.state && isLoading.forWhichPorpose === "image3" ? (
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                      <CircularProgress className="text-md" />
                      <h1 className="text-base font-normal tracking-wide capitalize">
                        {isLoading.currentMessage}...
                      </h1>
                    </div>
                  ) : (
                    <div className="relative w-full h-full main__div ">
                      <Image
                        src={
                          selectedFiles.image3
                            ? selectedFiles.image3
                            : ProductDetails?.mediaURL[2]
                        }
                        alt="productImage"
                        fill
                        className="object-cover rounded-md shadow-lg"
                        loading="lazy"
                      />
                      <div className="w-full h-full absolute flex justify-center items-center z-40 top-0 left-0 bg-black/20 icons transition-all duration-100 ease-in">
                        <div
                          onClick={() => {
                            imageRef3.current.click();
                          }}
                          className="h-14 w-14 flex justify-center items-center bg-[#212a2f]/60 rounded-full cursor-pointer shadow-md"
                        >
                          <input
                            type="file"
                            name="image3"
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
                            hidden
                            ref={imageRef3}
                          />
                          <CameraAltOutlinedIcon className="text-white text-3xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  onClick={() => imageRef3.current.click()}
                  className="w-full h-full cursor-pointer flex justify-center items-center bg-[#212a2f]/30"
                >
                  <CameraAltOutlinedIcon className="text-white text-3xl" />
                  <input
                    type="file"
                    name="image3"
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
                    hidden
                    ref={imageRef3}
                  />
                </div>
              )}
            </div>
            <div className=" rounded-md  relative">
              {selectedFiles.image4 || ProductDetails?.mediaURL[3] ? (
                <>
                  {isLoading.state && isLoading.forWhichPorpose === "image4" ? (
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                      <CircularProgress className="text-md" />
                      <h1 className="text-base font-normal tracking-wide capitalize">
                        {isLoading.currentMessage}...
                      </h1>
                    </div>
                  ) : (
                    <div className="relative w-full h-full main__div ">
                      <Image
                        src={
                          selectedFiles.image4
                            ? selectedFiles.image4
                            : ProductDetails?.mediaURL[3]
                        }
                        alt="productImage"
                        fill
                        className="object-cover rounded-md shadow-lg"
                        loading="lazy"
                      />
                      <div className="w-full h-full absolute flex justify-center items-center z-40 top-0 left-0 bg-black/20 icons transition-all duration-100 ease-in">
                        <div
                          onClick={() => {
                            imageRef4.current.click();
                          }}
                          className="h-14 w-14 flex justify-center items-center bg-[#212a2f]/60 rounded-full cursor-pointer shadow-md"
                        >
                          <input
                            type="file"
                            name="image4"
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
                            hidden
                            ref={imageRef4}
                          />
                          <CameraAltOutlinedIcon className="text-white text-3xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  onClick={() => imageRef4.current.click()}
                  className="w-full h-full cursor-pointer flex justify-center items-center bg-[#212a2f]/30"
                >
                  <CameraAltOutlinedIcon className="text-white text-3xl" />
                  <input
                    type="file"
                    name="image4"
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
                    hidden
                    ref={imageRef4}
                  />
                </div>
              )}
            </div>
          </div>
          {/* the form */}
          <div className="w-full md:w-full lg:w-[60%] h-full overflow-y-auto scroll-smooth">
            <h2 className="text-xl font-semibold tracking-wider m-1">
              Product information
            </h2>
            <form>
              <div className="w-[90%] mx-auto my-2 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="brand"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  onChange={handleChange}
                  value={newproductInfo.brand}
                  placeholder="brand..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className="w-[90%] mx-auto my-2 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="productName"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  onChange={handleChange}
                  value={newproductInfo.productName}
                  placeholder="product name..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div
                className="flex flex-col md:flex-col lg:flex-row
               w-[90%] mx-auto my-5 justify-center space-y-3
               lg:space-y-0 lg:space-x-5 items-center  "
              >
                <div className="w-full lg:w-[90%] mx-auto flex flex-col justify-start items-start space-y-2">
                  <label
                    htmlFor="for"
                    className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  >
                    For (men,women or kids)
                  </label>
                  <input
                    type="text"
                    name="productFor"
                    onChange={handleChange}
                    value={newproductInfo.productFor}
                    placeholder="product for..."
                    className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                  />
                </div>
                <div className="w-full lg:w-[90%] mx-auto flex flex-col justify-start items-start space-y-2">
                  <label
                    htmlFor="category"
                    className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  >
                    Product Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                    value={newproductInfo.category}
                    placeholder="product category..."
                    className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                  />
                </div>
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="subcategory"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  subcategory
                </label>
                <input
                  type="text"
                  name="subcategory"
                  onChange={handleChange}
                  value={newproductInfo.subcategory}
                  placeholder="shirts / t-shirts..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className="flex w-[90%] mx-auto my-5 justify-center space-x-5 items-center  ">
                <div className=" w-[90%] mx-auto flex flex-col justify-start items-start space-y-2">
                  <label
                    htmlFor="size"
                    className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  >
                    Size
                  </label>
                  {["sm", "m", "l", "xl", "xxl", "xxxl"].map((cur, id) => (
                    <motion.div
                      key={id}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, ease: "easeIn" }}
                      className="flex justify-evenly rounded-md
                      items-center w-full cursor-pointer hover:bg-[#212a2f]/20
                      transition-all duration-100 ease-linear"
                    >
                      <input
                        type="checkbox"
                        name="size"
                        checked={newproductInfo.size.find((s) => s === cur)}
                        value={cur}
                        className="flex-1 cursor-pointer"
                        onChange={handleChangeForColorAndSize}
                      />
                      <h3 className="flex-1 text-md lg:text-xl font-semibold tracking-wider capitalize">
                        {cur}
                      </h3>
                    </motion.div>
                  ))}
                </div>
                <div className=" w-[90%] mx-auto flex flex-col justify-start items-start space-y-2">
                  <label
                    htmlFor="color"
                    className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  >
                    Color
                  </label>
                  {["Red", "Pink", "Yellow", "Teal", "Cyan", "Green"].map(
                    (cur, id) => (
                      <motion.div
                        key={id}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2, ease: "easeIn" }}
                        className="flex justify-evenly items-center
                        w-full cursor-pointer hover:bg-[#212a2f]/20
                        transition-all duration-100 ease-linear"
                      >
                        <input
                          type="checkbox"
                          name="color"
                          checked={newproductInfo.color.find((c) => c === cur)}
                          value={cur}
                          onChange={handleChangeForColorAndSize}
                          className="flex-1 cursor-pointer h-full"
                        />
                        <h3 className="flex-1 text-md lg:text-xl font-semibold tracking-wider capitalize">
                          {cur}
                        </h3>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="price"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={newproductInfo.price}
                  placeholder="product price..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="heading1"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  heanding
                </label>
                <input
                  name="heading1"
                  onChange={handleChange}
                  value={newproductInfo.heading1}
                  placeholder="heading..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="describtion1"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  Describtion 1
                </label>
                <textarea
                  type="text"
                  name="description1"
                  onChange={handleChange}
                  value={newproductInfo.description1}
                  placeholder="describtion 1..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                  rows="5"
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="heading1"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  heanding
                </label>
                <input
                  onChange={handleChange}
                  value={newproductInfo.heading2}
                  name="heading2"
                  placeholder="heading..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  htmlFor="describtion2"
                >
                  Describtion 2
                </label>
                <textarea
                  type="text"
                  name="description2"
                  onChange={handleChange}
                  value={newproductInfo.description2}
                  placeholder="describtion 2..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                  rows="5"
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="heading1"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  heanding
                </label>
                <input
                  onChange={handleChange}
                  value={newproductInfo.heading3}
                  name="heading3"
                  placeholder="heading..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  htmlFor="describtion3"
                >
                  describtion
                </label>
                <textarea
                  type="text"
                  name="description3"
                  onChange={handleChange}
                  value={newproductInfo.description3}
                  placeholder="describtion 3..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                  rows="5"
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  htmlFor="heading1"
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                >
                  heanding
                </label>
                <input
                  onChange={handleChange}
                  value={newproductInfo.heading4}
                  name="heading4"
                  placeholder="heading..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                />
              </div>
              <div className=" w-[90%] mx-auto my-5 flex flex-col justify-start items-start space-y-2">
                <label
                  className="text-base lg:text-lg font-semibold tracking-wide capitalize"
                  htmlFor="describtion"
                >
                  describtion
                </label>
                <textarea
                  type="text"
                  name="description4"
                  onChange={handleChange}
                  value={newproductInfo.description4}
                  placeholder="describtion 4..."
                  className="w-full text-lg lg:text-xl p-2 bg-white text-[#212a2f]
                  font-semibold tracking-wider border-b-2 border-[#212a2f]
                  outline-none focus:ring-0 "
                  rows="5"
                />
              </div>
              <div className="w-[90%] mx-auto">
                {/* for new one */}
                {activeFor === "New_Product" && (
                  <button
                    onClick={(e) => handleSubmit(e, "new_Product")}
                    disabled={
                      isLoading.state ||
                      !Object.keys(selectedFiles).every((key) => {
                        return Boolean(selectedFiles[key]);
                      }) ||
                      !Object.keys(newproductInfo).every((key) => {
                        return Boolean(newproductInfo[key]);
                      })
                    }
                    className="w-full text-lg lg:text-2xl
                  font-semibold tracking-wider
                  capitalize bg-green-400 text-white
                  my-3 rounded-lg shadow-lg py-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {(isLoading.state &&
                      isLoading.forWhichPorpose === "Url1") ||
                    isLoading.forWhichPorpose === "Url2" ||
                    isLoading.forWhichPorpose === "Url3" ||
                    isLoading.forWhichPorpose === "Url3" ||
                    isLoading.forWhichPorpose === "Saving" ? (
                      <>
                        <div className="w-full h-full flex  justify-center items-center space-x-4">
                          <CircularProgress className="text-sm text-white" />
                          <h1 className="text-base font-semibold tracking-wide capitalize">
                            {isLoading.currentMessage}...
                          </h1>
                        </div>
                      </>
                    ) : (
                      "create"
                    )}
                  </button>
                )}
                {/* for update */}
                {activeFor === "Update_A_Product" && (
                  <button
                    onClick={(e) => handleSubmit(e, "update_Product")}
                    disabled={
                      isLoading.state ||
                      !Object.keys(newproductInfo).every((key) => {
                        return Boolean(newproductInfo[key]);
                      })
                    }
                    className="w-full text-lg lg:text-2xl
                  font-semibold tracking-wider
                  capitalize bg-green-400 text-white
                  my-3 rounded-lg shadow-lg py-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {(isLoading.state &&
                      isLoading.forWhichPorpose === "Url1") ||
                    isLoading.forWhichPorpose === "Url2" ||
                    isLoading.forWhichPorpose === "Url3" ||
                    isLoading.forWhichPorpose === "Url3" ||
                    isLoading.forWhichPorpose === "Saving" ? (
                      <>
                        <div className="w-full h-full flex  justify-center items-center space-x-4">
                          <CircularProgress className="text-sm text-white" />
                          <h1 className="text-base font-semibold tracking-wide capitalize">
                            {isLoading.currentMessage}...
                          </h1>
                        </div>
                      </>
                    ) : (
                      "Update"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
