// product card which is use in the
//  our favorites, best seller sections...
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export const ItemCard = ({ data }) => {
  const router = useRouter();
  const [mouseEnter, setMouseEnter] = useState(false);

  const handleOnclick = (id, productName) => {
    router.push(`/product/${productName}?pid=${id}`);
  };
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
        className="h-[400px] lg:h-[450px] snap-center flex-shrink-0  rounded-md hoverEffects shadow-md"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <div className="w-full h-[65%] lg:h-[70%] relative overflow-hidden ImageDiv rounded-t-md">
          <Image
            src={
              data.mediaURL && mouseEnter ? data.mediaURL[0] : data.mediaURL[1]
            }
            fill
            priority
            alt="itemsImg"
            className="object-cover object-center image rounded-t-md transition-all duration-150 delay-100 ease-linear"
          />

          <div className="main__div flex justify-center items-center w-full h-full z-0 absolute top-0 transition-all duration-150 delay-100 ease-linear">
            <button
              onClick={() => handleOnclick(data?._id, data?.productName)}
              className="uppercase icons font-medium tracking-wider text-xl px-6 py-3 rounded text-[#212a2f] bg-[#ffffff] hover:bg-[#212a2f] hover:text-[#ffffff] transition-all duration-150 ease-in"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="p-2 lg:p-3">
          <h1 className="capitalize text-xl font-semibold text-[#212a2f] tracking-wide m-0 p-1">
            {data?.productName}
          </h1>
          <hr className="bg-gray-400 my-2" />
          <p className="text-[#212a2f] font-normal text-lg tracking-wide truncate">
            Price -{" "}
            <span className="font-extrabold text-2xl">
              <CurrencyRupeeIcon />
              {data?.price}.0
            </span>
          </p>
        </div>
      </motion.div>
    </>
  );
};
