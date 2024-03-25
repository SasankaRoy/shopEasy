import React, { useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { Product } from "../../components/Product";
import axios from "axios";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { loadingComplete, loadingStart } from "../../Redux/loadingSlice";

const Category = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showFilterModel, setShowFilterModel] = useState(false);

  const router = useRouter();
  const { query } = router;

  return (
    <>
      <Head>
        <title>shopEasee - {query.category}</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex justify-between items-center lg:items-center w-[90%] mx-auto my-5 space-y-2 lg:space-y-0"
      >
        <h1 className="text-xl m-0 font-semibold tracking-wider text-center capitalize">
          All result of &apos;{query.category}&apos;
        </h1>
        <button
          onClick={(e) => setShowFilterModel(true)}
          className="w-[25%] md:w-[15%] lg:w-[20%] rounded-lg py-1 text-md lg:text-xl font-semibold capitalize tracking-widest border shadow-md bg-[#212a2f] text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in"
        >
          Filters
        </button>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-7 w-[95%] mx-auto justify-center items-center px-5 mt-5">
        {filteredProducts.length >= 1 ? (
          filteredProducts.map((cur, id) => <Product key={id} pData={cur} />)
        ) : (
          <>
            {products.filteredProducts.map((cur, id) => (
              <Product key={id} pData={cur} />
            ))}
          </>
        )}
      </div>
      {showFilterModel && (
        <FilterModel
          setShowFilterModel={setShowFilterModel}
          // setFilters={setFilters}
          // filters={filters}
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      )}
    </>
  );
};
export default Category;

const FilterModel = ({
  setShowFilterModel,
  // setFilters,
  // filters,
  products,
  setFilteredProducts,
}) => {
  const [filters, setFilters] = useState({
    price: "",
    category: "",
    ShowProductUnderOrAbove: "",
  });

  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  /* The code is creating an array called `categoriesWhichArePresent` that contains unique categories
  from the `filteredProducts` array. */
  const categoriesWhichArePresent = [
    ...new Set(products.filteredProducts.map((item) => item.category)),
  ];

  /**
   * The function filters products based on category and price filters and updates the filtered
   * products state.
   */
  const filterProduct = () => {
    dispatch(
      loadingStart({
        message: {
          currentMessage: "filtering the database",
          forWhichPorpose: "Filteration",
        },
      })
    );

    const filteredApplyed = products.filteredProducts.filter((item) => {
      const filterCategory = filters.category;
      const filterPrice = filters.price;

      // Check if both filters are empty, return true to include all items
      if (!filterCategory && !filterPrice) {
        return true;
      }

      // Check category filter, if provided
      if (filterCategory && item.category !== filterCategory) {
        return false;
      }

      // Check price filter, if provided
      if (filterPrice && item.price !== parseInt(filterPrice)) {
        return false;
      }

      // If neither filter applies, include the item
      return true;
    });

    setFilteredProducts([...filteredApplyed]);
    setTimeout(() => {
      dispatch(loadingComplete());
      setShowFilterModel(false);
      setFilters({
        price: "",
        category: "",
      });
    }, 2000);
  };

  return (
    <>
      <div className="fixed flex justify-center items-center z-50 top-0 left-0 bg-black/30 w-screen h-screen">
        <div
          onClick={() => setShowFilterModel(false)}
          className="absolute top-[5.5rem] right-7 md:right-[4.3rem] md:top-[5.5rem] lg:right-[7.5rem] lg:top-[8.7rem] bg-[#fff]/80 rounded-full p-1"
        >
          <ClearOutlinedIcon className="text-3xl cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out" />
        </div>

        <div className="bg-[#fffafa] sm:w-[90%] sm:h-[70%] md:w-[65%] md:h-[50%] lg:w-[40%] lg:h-[50%] rounded-md shadow-md py-2 px-4">
          <h1 className="capitalize text-center text-[#212a2f] text-2xl tracking-wider font-semibold my-1 underline underline-offset-8">
            Filters
          </h1>
          <div className="flex flex-col justify-start items-start space-y-3">
            <div className="flex flex-col w-full justify-start items-start">
              <label
                htmlFor="price"
                className="text-lg font-semibold tracking-wider"
              >
                Price
              </label>
              <div className="flex justify-start items-center mx-auto sm:w-[95%] md:w-[90%] lg:w-[80%] p-2 rounded-md bg-gray-50/20 shadow-md">
                <CurrencyRupeeIcon className="text-base" />
                <input
                  type="text"
                  placeholder="price..."
                  onChange={(e) =>
                    setFilters({ ...filters, price: e.target.value })
                  }
                  className="border-l-2 w-full px-3 font-semibold outline-none text-lg tracking-wide bg-transparent text-[#212a2f] placeholder:text-[#212a2f]/50"
                />
              </div>
            </div>

            {/* check box start */}

            {filters.price && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeIn" }}
                className="flex flex-col w-full justify-start items-start"
              >
                <label className="text-lg font-semibold tracking-wider">
                  Show Products <span className="text-red-500 text-2xl">*</span>
                </label>
                <div className="flex justify-between items-center w-[80%] mx-auto my-3">
                  <div className="flex justify-center items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="ShowProductUnderOrAbove"
                      value={filters.price}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          ShowProductUnderOrAbove: e.target.value,
                        });
                      }}
                      id="under"
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor="under"
                      className="font-bold text-lg capitalize cursor-pointer"
                    >
                      under <CurrencyRupeeIcon className="text-sm" />
                      {filters.price}
                    </label>
                  </div>
                  <div className="flex justify-center items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="ShowProductUnderOrAbove"
                      value={filters.price}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          ShowProductUnderOrAbove: e.target.value,
                        });
                      }}
                      id="above"
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor="above"
                      className="font-bold text-lg capitalize cursor-pointer"
                    >
                      above <CurrencyRupeeIcon className="text-sm" />
                      {filters.price}
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
            {/* check box end */}

            <div className="flex flex-col w-full justify-start items-start">
              <label
                htmlFor="category"
                className="text-lg font-semibold tracking-wider"
              >
                Category
              </label>
              <div className="flex justify-start items-center mx-auto  w-[80%] p-2 rounded-md bg-gray-50/20 shadow-md">
                <select
                  className="w-full capitalize font-semibold px-3 outline-none text-lg tracking-wide bg-transparent text-[#212a2f] placeholder:text-[#212a2f]/50"
                  name="category"
                  id="category"
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      category: e.target.value.toLocaleLowerCase(),
                    });
                  }}
                >
                  <option value="all" default>
                    All
                  </option>
                  {categoriesWhichArePresent.map((item, id) => (
                    <option className="capitalize" key={id} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="flex flex-col w-full justify-start items-start">
              <label
                htmlFor="arrivals"
                className="text-lg font-semibold tracking-wider"
              >
                Arrivals
              </label>
              <div className="flex justify-start items-center mx-auto w-[80%] p-2 rounded-md bg-gray-50/20 shadow-md">
                <select
                  className="w-full px-3 outline-none text-lg tracking-wide bg-transparent text-[#212a2f] placeholder:text-[#212a2f]/50"
                  name="arrivals"
                  id="arrivals"
                  onChange={(e) =>
                    setFilters({ ...filters, arrivals: e.target.value })
                  }
                >
                  <option value="all" default>
                    All
                  </option>
                  <option value="oldest">Oldest</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div> */}
            <button
              disabled={isLoading.state}
              onClick={filterProduct}
              className="w-[80%] mx-auto rounded-lg py-1 text-md lg:text-lg font-semibold capitalize tracking-wider border shadow-md bg-[#212a2f] text-[#ffffff] hover:text-[#212a2f] hover:border-[#212a2f] hover:bg-[#ffffff] transition-all duration-150 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading.state || isLoading.forWhichPorpose === "Filteration"
                ? `${isLoading.currentMessage}...`
                : "Apply"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * The function `getServerSideProps` retrieves a list of products based on the specified category from
 * either a local server or a remote server, and returns the products as props.
 * @returns The function `getServerSideProps` returns an object with the following structure:
 */
export const getServerSideProps = async (context) => {
  const { category, sub } = context.query;
  // console.log(sub);

  try {
    if (context.req.headers.host === "localhost:3000") {
      // console.log(process.env.PRODUCTION_DOMAIN, "the categozy");
      const getProductList = await axios.get(
        sub
          ? `${process.env.DEVELOPMENT_DOMAIN}/api/products?category=${category}&sub=${sub}`
          : `${process.env.DEVELOPMENT_DOMAIN}/api/products?category=${category}`
      );

      return {
        props: {
          products: getProductList?.data,
        },
      };
    } else {
      const getProductList = await axios.get(
        sub
          ? `${process.env.PRODUCTION_DOMAIN}/api/products?category=${category}&sub=${sub}`
          : `${process.env.PRODUCTION_DOMAIN}/api/products?category=${category}`
      );

      return {
        props: {
          products: getProductList?.data,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        error,
      },
    };
  }
};
