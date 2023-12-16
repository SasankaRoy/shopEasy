// our favorities section..
import { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";
import { motion } from "framer-motion";
import { loadingComplete, loadingStart } from "../Redux/loadingSlice";
import axios from "axios";
import { SkeletonLoading } from "./SkeletonLoading";
import { useDispatch, useSelector } from "react-redux";

// bg-[#003459]
const Favorites = () => {
  const [filters, setFilters] = useState("Men");
  const [filterArr, setFilterArr] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  const handleClick = (e) => {
    setFilters(e.target.innerHTML);
  };
  const fetchProducts = async () => {
    try {
      dispatch(
        loadingStart({
          message: {
            currentMessage: "RetrevingData...",
            forWhichPorpose: "Favorites",
          },
        })
      );
      const products = await axios.get(
        `api/products?category=${filters.toLocaleLowerCase()}`
      );

      setFilterArr(products.data.filteredProducts);

       dispatch(loadingComplete())
    } catch (error) {
      console.log(error, "the error");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mt-8  p-3 "
      >
        <h1 className="text-center text-3xl black uppercase tracking-wide font-semibold">
          Our Favorites
        </h1>
        <div className=" w-full lg:w-[80%] mx-auto mt-6 ">
          <div className="relative flex justify-center items-center py-2  space-x-5">
            {["Men", "Women", "Kid"].map((cur, id) => (
              <button
                key={id}
                onClick={handleClick}
                className="lg:px-5 px-3 py-3 uppercase tracking-wider text-lg font-medium focus:font-semibold focus:text-xl  focus:text-[#212a2f]  transition-all duration-150 ease-linear"
              >
                {cur}
              </button>
            ))}

            <div className="absolute right-0 bottom-0 border-b-2 border-gray-300 w-full h-2" />
          </div>
        </div>
        <div className="w-full relative lg:w-[84%]  mx-auto h-full  items-center  mt-5 ">
          <div className="grid  grid-flow-col gap-5 px-4 py-5 auto-cols-[96.5%] lg:auto-cols-[35%] w-full overflow-x-auto overscroll-x-contain snap-x  snap-mandatory scroll-smooth">
            {isLoading.state && isLoading.forWhichPorpose === "Favorites" ? (
              <SkeletonLoading />
            ) : (
              <>
                {filterArr.slice(0,6).map((data, id) => (
                  <ItemCard data={data} key={id} />
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Favorites;
