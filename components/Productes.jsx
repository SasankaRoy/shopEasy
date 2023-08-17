import { motion } from "framer-motion";
import React from "react";
import { ItemCard } from "./ItemCard";

const Productes = () => {
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
            <ItemCard
              data={{
                productName: "the name of product",
                dec: "the product description here",
              }}
            />
            <ItemCard
              data={{
                productName: "the name of product",
                dec: "the product description here",
              }}
            />
            <ItemCard
              data={{
                productName: "the name of product",
                dec: "the product description here",
              }}
            />
            <ItemCard
              data={{
                productName: "the name of product",
                dec: "the product description here",
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Productes;
