// product details page...
import { useState, startTransition, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { addItemsQuantity } from "../../Redux/cartSlice";
import { handleError } from "../../utils/Error&SuccessHandler";
import { colorCodes } from "../../utils/getColorCodes";
import ProductDetails from "../../components/ProductDetails";
import axios from "axios";
import { toast } from "react-toastify";
import FAQ from "../../components/FAQ";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";

const ProductImageView = dynamic(() =>
  import("../../components/ProductImageView")
);
const ProductModel = dynamic(() => import("../../components/ProductModel"));

const Product = ({ product, error }) => {
  console.log(error);
  const [handleImageShowHide, setHandleImageShowHide] = useState({
    state: false,
    curImage: "",
  });
  const [selectedSizeAndColor, setSelectedSizeAndColor] = useState({
    size: "",
    color: "",
  });
  const dispatch = useDispatch();
  const [updateProduct, setUpdateProduct] = useState(false);
  // const productNewAdded = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { query } = router;

  const handleOnClick = (curImage) => {
    setHandleImageShowHide({
      state: true,
      curImage,
    });
  };

  // expecting an array here...
  const hexCodes = colorCodes(product?.productInfo.color);

  // addtoCart function...

  const addToCart = async (productInfo) => {
    try {
      dispatch(addItemsQuantity(productInfo));
      toast.success("Item is added to cart !");
      if (!user.userInfo) {
        toast.warn("Please login before moving ahead!");
        router.push("/auth/login");
        return;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>shopEasee. - {query.product}</title>
        <meta
          name="description"
          content="It is a shopping app that provides best quality products at a affodable price at your door step."
        />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row space-y-3 lg:space-x-3 lg:space-y-0  h-[88vh] w-screen px-2 lg:px-8 py-4"
      >
        <div className="grid lg:grid-cols-2 lg:grid-flow-row grid-flow-col auto-cols-[93.3%] lg:auto-cols-[40%] gap-5 overflow-x-auto h-[40%] lg:flex-1 lg:h-full  px-3 lg:py-3 overscroll-x-contain snap-x  snap-mandatory scroll-smooth">
          {product?.productInfo.mediaURL.map((img, id) => (
            <div
              key={id}
              className="relative snap-center
              h-[90%] my-auto  lg:h-[300px] rounded-md shadow-md main__div "
            >
              <Image
                fill
                src={img}
                className="object-cover rounded-md"
                loading="lazy"
              />
              <div className="w-full h-full absolute flex justify-center items-center z-40 top-0 left-0 bg-black/20 icons transition-all duration-200 ease-in">
                <div
                  onClick={() => handleOnClick(img)}
                  className="h-16 w-16 flex justify-center items-center bg-[#212a2f]/60 rounded-full cursor-pointer"
                >
                  <VisibilityIcon className="text-white text-4xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-[30%] flex-1 py-3 px-1">
          <h2 className="text-lg font-semibold tracking-wider capitalize">
            {product?.productInfo.brand}
          </h2>
          <div className="flex justify-between items-center ">
            <h1 className=" font-normal text-3xl lg:text-4xl tracking-wide m-0">
              {product?.productInfo.productName}
            </h1>
            <h2 className="flex justify-center items-center font-semobold text-2xl lg:text-3xl tracking-wide m-0">
              <CurrencyRupeeIcon />
              {product?.productInfo.price}
            </h2>
          </div>
          <h3 className="text-base tracking-wider uppercase font-medium mt-5">
            Select Color
          </h3>
          <div className="flex flex-wrap justify-start items-start gap-3">
            {hexCodes?.map((cur, id) => (
              <>
                <div
                  key={id}
                  onClick={() => {
                    setSelectedSizeAndColor({
                      ...selectedSizeAndColor,
                      color: cur,
                    });
                  }}
                  style={{ background: cur.code }}
                  className="h-10 w-10 cursor-pointer
                  border-spacing-2 rounded-full border-2
                border-black/60 active:scale-125 hover:scale-105  
                  transition-all duration-200 ease-in"
                />
              </>
            ))}
          </div>
          <h3 className="text-base tracking-wider uppercase font-medium mt-5">
            Select Size
          </h3>
          <div className="flex flex-wrap justify-start items-start gap-3">
            {product?.productInfo.size.map((cur, id) => (
              <div
                key={id}
                onClick={() => {
                  setSelectedSizeAndColor({
                    ...selectedSizeAndColor,
                    size: cur,
                  });
                }}
                className="h-12 w-14 flex justify-center items-center cursor-pointer border-spacing-2  shadow-lg rounded-md border border-black/60 active:scale-125 hover:scale-105  transition-all duration-200 ease-in "
              >
                <span className="font-medium text-xl tracking-wider uppercase">
                  {cur}
                </span>
              </div>
            ))}
          </div>
          <div
            className={`mt-5 flex justify-center items-center ${
              user.userInfo?.role === "admin" ||
              user.userInfo?.role === "manager"
                ? "space-x-3"
                : "space-x-0"
            }`}
          >
            {user.userInfo?.role === "admin" ||
            user.userInfo?.role === "manager" ? (
              <>
                <button
                  disabled={
                    !Object.keys(selectedSizeAndColor).every((key) => {
                      return Boolean(selectedSizeAndColor[key]);
                    })
                  }
                  onClick={() =>
                    addToCart({
                      id: product?.productInfo._id,
                      productName: product?.productInfo.productName,
                      price: product?.productInfo.price,
                      quantity: 1,
                      productImage: product?.productInfo.mediaURL[0],
                      size: selectedSizeAndColor?.size,
                      color: selectedSizeAndColor?.color.code,
                      total: product?.productInfo.price,
                    })
                  }
                  className="w-[95%] rounded-md py-2 text-xl lg:text-2xl font-medium capitalize tracking-wider border shadow-md bg-[#212a2f] disabled:cursor-not-allowed disabled:opacity-40 text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
                >
                  Add To Cart.
                </button>
                <button
                  onClick={() => setUpdateProduct(true)}
                  className="w-[95%] rounded-md py-2 text-xl lg:text-2xl font-medium capitalize tracking-wider border border-[#212a2f] shadow-md text-[#212a2f] bg-[#ffffff] hover:bg-[#212a2f] hover:border-[#212a2f] hover:text-[#ffffff] transition-all duration-150 ease-in"
                >
                  Update Product.
                </button>
              </>
            ) : (
              <button
                disabled={
                  !Object.keys(selectedSizeAndColor).every((key) => {
                    return Boolean(selectedSizeAndColor[key]);
                  })
                }
                onClick={() =>
                  addToCart({
                    id: product?.productInfo._id,
                    productName: product?.productInfo.productName,
                    price: product?.productInfo.price,
                    quantity: 1,
                    productImage: product?.productInfo.mediaURL[0],
                    size: selectedSizeAndColor?.size,
                    color: selectedSizeAndColor?.color.code,
                  })
                }
                className="w-[95%] rounded-md py-2 text-xl lg:text-2xl font-medium capitalize tracking-wider border shadow-md bg-[#212a2f] disabled:cursor-not-allowed disabled:opacity-40 text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
              >
                Add To Cart.
              </button>
            )}
          </div>
          <div className="lg:flex justify-evenly items-start hidden mt-7">
            <div className="relative flex justify-center items-center space-x-2">
              <CircularProgress
                variant="determinate"
                value={85}
                size={"10rem"}
                style={{ color: "#DB2777", borderRadius: "50rem" }}
                thickness={2}
              />
              <h2 className="text-3xl font-extrabold text-[#212a2f] tracking-wide absolute">
                4.5 <span className="text-sm font-medium">rattings</span>
              </h2>
            </div>
            {product.productInfo.price > 1000 && (
              <span className="py-2 px-4 capitalize italic bg-gray-200 rounded text-lg tracking-wider shadow-md font-medium">
                Free shipping
              </span>
            )}
          </div>
        </div>
      </motion.div>
      <ProductDetails pDescribtion={product?.productInfo.describtion} />
      <FAQ />
      {handleImageShowHide.state && (
        <ProductImageView
          productIamge={handleImageShowHide?.curImage}
          setHandleImageShowHide={setHandleImageShowHide}
        />
      )}
      {updateProduct && (
        <ProductModel
          setNewProduct={setUpdateProduct}
          ProductDetails={product}
          activeFor="Update_A_Product"
        />
      )}
    </>
  );
};

export default Product;

export const getServerSideProps = async (context) => {
  const { pid } = context.query;

  try {
    if (context.req.headers.hostname === "localhost:3000") {
      const getProductList = await axios.get(
        `http://localhost:3000/api/products?pid=${pid}`
      );

      return {
        props: {
          product: getProductList?.data,
        },
      };
    } else {
      const getProductList = await axios.get(
        `https://shop-easee.vercel.app/api/products?pid=${pid}`
      );

      return {
        props: {
          product: getProductList?.data,
        },
      };
    }
  } catch (error) {
    const serializedError = {
      message: error.message,
      statusCode: error.response?.status || 500,
    };
    return {
      props: {
        error: serializedError,
      },
    };
  }
};
