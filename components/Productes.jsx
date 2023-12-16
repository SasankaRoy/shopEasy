import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";
import axios from "axios";

const Productes = ({ category }) => {
  const [showCaseProduct, setShowCaseProduct] = useState([]);
  const fetchProductsByCategory = async () => {
    
    const getDataByCategory = await axios.get(
      `/api/products?category=${category}`
    );
    setShowCaseProduct([...getDataByCategory.data.filteredProducts]);
    
  };
  useEffect(() => {
    fetchProductsByCategory();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.3,
        }}
        className="mt-14 relative p-3"
      >
        <div className="w-full relative lg:w-[80%]  mx-auto h-full  items-center  mt-5 ">
          <h1 className="text-start text-2xl text-black uppercase font-medium opacity-95 z-50 pl-7 m-0">
            Best Seller
          </h1>
          <div className="grid  grid-flow-col gap-5 px-7 py-5 auto-cols-[96.5%] lg:auto-cols-[35%] w-full overflow-x-auto overscroll-x-contain snap-x  snap-mandatory scroll-smooth">
            {showCaseProduct.slice(7,15).map((cur, id) => (
              <ItemCard data={cur} key={id} />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Productes;
