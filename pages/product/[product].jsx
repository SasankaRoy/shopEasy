// product details page...
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { addItemsQuantity } from "../../Redux/cartSlice";
import { handleError } from "../../utils/Error&SuccessHandler";
import { colorCodes } from "../../utils/getColorCodes";

import ProductDetails from '../../components/ProductDetails';

import axios from "axios";
import { toast } from "react-toastify";
import FAQ from "../../components/FAQ";

import DeleteIcon from "@mui/icons-material/Delete";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import VisibilityIcon from "@mui/icons-material/Visibility";



const ProductImageView = dynamic(() =>
  import("../../components/ProductImageView")
);
const ProductModel = dynamic(() => import("../../components/ProductModel"));

const Product = ({ product, error }) => {
  const [handleImageShowHide, setHandleImageShowHide] = useState({
    state: false,
    curImage: "",
  });
  // delete state................................
  const [Delete, setDelete] = useState(false);

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

  const hexCodes = colorCodes(product?.color);

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
        className="flex flex-col lg:flex-row space-y-3 lg:space-x-3 lg:space-y-0  h-[88vh] w-screen px-2 lg:px-8 py-4"
      >
        <div className="grid lg:grid-cols-2 lg:grid-flow-row grid-flow-col auto-cols-[93.3%] lg:auto-cols-[40%] gap-5 overflow-x-auto h-[40%] lg:flex-1 lg:h-full  px-3 lg:py-3 overscroll-x-contain snap-x  snap-mandatory scroll-smooth">
          {product?.mediaURL.map((img, id) => (
            <div
              key={id}
              className="relative snap-center h-[90%] my-auto  lg:h-[300px] rounded-md shadow-md main__div "
            >
              <Image
                fill
                src={img}
                className="object-cover rounded-md"
                loading="lazy"
                alt="productImgs"
              />
              <div className="w-full h-full absolute flex justify-center items-center z-30 top-0 left-0 bg-black/20 icons transition-all duration-200 ease-in">
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
          <div className="flex w-full justify-between items-center py-2">
            <h2 className="text-lg font-semibold tracking-wider capitalize">
              {product?.brand}
            </h2>
            {user.userInfo?.role === "admin" ||
            user.userInfo?.role === "manager" ? (
              <div
                onClick={() => setDelete(true)}
                className="h-10 w-10 flex justify-center items-center shadow-md rounded-full cursor-pointer"
              >
                <DeleteIcon className="text-red-400" />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between items-center ">
            <h1 className="text-3xl lg:text-4xl tracking-wide m-0 font-[600]">
              {product?.productName}
            </h1>
            <h2 className="flex justify-center items-center font-[800] text-2xl lg:text-3xl tracking-wide m-0">
              <CurrencyRupeeIcon />
              {product?.price}
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
                  className="h-10 w-10 cursor-pointer border-spacing-2 rounded-full border-2 border-black/60 active:scale-125 hover:scale-105 transition-all duration-200 ease-in"
                />
              </>
            ))}
          </div>
          <h3 className="text-base tracking-wider uppercase font-medium mt-5">
            Select Size
          </h3>
          <div className="flex flex-wrap justify-start items-start gap-3">
            {product?.size.map((cur, id) => (
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
                      id: product?._id,
                      productName: product?.productName,
                      price: product?.price,
                      quantity: 1,
                      productImage: product?.mediaURL[0],
                      size: selectedSizeAndColor?.size,
                      color: selectedSizeAndColor?.color.code,
                      total: product?.price,
                    })
                  }
                  className="w-[95%] rounded-md py-2 text-xl lg:text-2xl font-medium capitalize tracking-wider border shadow-md bg-[#212a2f] disabled:cursor-not-allowed disabled:opacity-40 text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
                >
                  Add To Cart.
                </button>
                <button
                  onClick={() => {
                    setUpdateProduct(true);
                  }}
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
                    id: product?._id,
                    productName: product?.productName,
                    price: product?.price,
                    quantity: 1,
                    productImage: product?.mediaURL[0],
                    size: selectedSizeAndColor?.size,
                    color: selectedSizeAndColor?.color.code,
                    total: product?.price,
                  })
                }
                className="w-[95%] rounded-md py-2 text-xl lg:text-2xl font-medium capitalize tracking-wider border shadow-md bg-[#212a2f] disabled:cursor-not-allowed disabled:opacity-40 text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
              >
                Add To Cart.
              </button>
            )}
          </div>
          <div className="lg:flex justify-evenly items-start hidden mt-10">
            <div className="relative flex  justify-center items-center space-x-2">              
              <ol className="flex flex-col justify-start items-start space-y-3 px-4">
                {product?.describtion.map((cur, id) => (
                  <li key={id} className="list-decimal font-semibold text-lg">
                    {cur?.heading}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
      <ProductDetails pDescribtion={product?.describtion} />
      <FAQ productID={product?._id} />
    
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
      {Delete && (
        <DeleteConfirmationModal
          productName={product?.productName}
          setDelete={setDelete}
          productID={product?._id}
        />
      )}
    </>
  );
};

export default Product;

export const getServerSideProps = async (context) => {
  const { pid } = context.query;
  try {
    if (context.req.headers.host === "localhost:3000") {
      const getProductList = await axios.get(
        `${process.env.DEVELOPMENT_DOMAIN}/api/products?pid=${pid}`
      );
      return {
        props: {
          product: getProductList?.data.filteredProducts,
        },
      };
    } else {
      const getProductList = await axios.get(
        `${process.env.PRODUCTION_DOMAIN}/api/products?pid=${pid}`
      );

      return {
        props: {
          product: getProductList?.data.filteredProducts,
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

// DeleteConfirmationModal................................

const DeleteConfirmationModal = ({ productName, setDelete, productID }) => {
  const router = useRouter();
  const deleteRequest = async () => {
    try {
      const response = await axios.delete(`/api/products?pID=${productID}`);
      console.log(response.data);
      toast.success(response.data.message);
      if (response.status === 200) {
        setDelete(false);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed flex justify-center items-center bg-[#212a2f]/30 top-0 h-screen w-screen z-50">
        <div className="bg-white w-[90%] lg:w-[50%] rounded-md shadow-md py-3 px-4">
          <p className="font-semibold text-lg tracking-wide">
            Sure! You Want to Delete{" "}
            <span className="font-bold text-xl text-red-400 underline underline-offset-4">
              <q> {productName} </q>
            </span>{" "}
            Product
          </p>
          <div className="mt-4 flex justify-evenly p-2 items-center w-[40%] ml-auto">
            <button
              onClick={deleteRequest}
              className="bg-red-400 text-white font-semibold text-lg py-1 px-4 rounded-md shadow-md "
            >
              Yes
            </button>
            <button
              onClick={() => setDelete(false)}
              className="font-semibold text-lg py-1 px-4 rounded-md shadow-md"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
