import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import { motion } from "framer-motion";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// bg-[#F7AB0A]/20
export const Product = ({ pData }) => {
  const router = useRouter();
  const [mouseEnter, setMouseEnter] = useState(false);
  const handleOnClick = (productName, pid) => {
    router.push(`/product/${productName}?pid=${pid}`);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileTap={{ scale: 0.8 }}
        transition={{
          duration: 0.4,
        }}
        className="h-[350px] bg-gray-50 rounded-md shadow-md cursor-pointer"
        onClick={() => handleOnClick(pData?.productName, pData?._id)}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <div className="relative h-[65%]  overflow-hidden z-0">
          <Image
            fill
            src={mouseEnter ? pData?.mediaURL[1] : pData?.mediaURL[2]}
            loading="lazy"
            alt="productImg"
            className="object-cover z-50 opacity-100 image rounded-t-md transition-all duration-150 delay-100 ease-linear"
          />
        </div>
        {/* text */}
        <div className="text h-[20%] w-[95%]  mx-auto mt-2 px-1">
          <h2 className="text-lg tracking-wider font-[600] capitalize m-0 p-1 cursor-pointer">
            {pData?.productName}
          </h2>
          <hr className="bg-[#212a2f] " />

          <div className="flex justify-between items-center w-full mt-1">
            <span className="text-md  font-extralight tracking-wider">
              ratings: 2/5 <StarBorderTwoToneIcon className="text-sm" />
            </span>
            <span className="text-lg  font-[800] tracking-wider">
              <CurrencyRupeeIcon className="text-sm" />
              {pData?.price}
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
