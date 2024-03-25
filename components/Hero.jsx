// hero or landing page
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export const Hero = () => {
  const router = useRouter();
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  const handleOnClick = (e) => {
    if (e.target.innerHTML === "Shop Women") {
      router.push(`/category/women`);
      return;
    }
    if (e.target.innerHTML === "Shop Men") {
      router.push(`/category/men`);
      return;
    }
  };

  const slider = [
    "/heroSlider1.jpg",
    "/heroSlider2.jpg",
    "/heroSlider3.jpg",
    "/heroSlider4.jpg",
    "/heroSlider5.jpg",
  ];

  const currentSliderImage = slider[currentSliderIndex];

  useEffect(() => {
    const autoSlider = () => {
      if (currentSliderIndex === slider.length - 1) {
        setCurrentSliderIndex(0);
      } else {
        setCurrentSliderIndex(currentSliderIndex + 1);
      }
    };

    const interVal = setInterval(autoSlider, 10000);

    return () => {
      clearInterval(interVal);
    };
  }, [currentSliderIndex]);

  return (
    <>
      <main className="h-[80vh] w-screen z-0 flex flex-row justify-center items-center overflow-x-hidden to-black   ">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "anticipate" }}
          className="w-full h-full  relative z-0 transition-all duration-150 ease-linear"
        >
          <Image
            src={slider[currentSliderIndex]}
            fill
            alt="coverPic"
            priority
            className="object-cover object-right-top z-0 brightness-50 transition-all duration-300 ease-linear"
          />

          <div className="absolute z-50  left-8 bottom-16 px-1 lg:px-5 py-3">
            <h1 className="lg:text-2xl text-[21px] capitalize tracking-wide font-medium text-[#fff]">
              {" "}
              One hood for{" "}
              <span className="lg:text-5xl text-4xl lowercase">
                men,women,kid
              </span>{" "}
              and{" "}
              <span className="lg:text-5xl text-4xl lowercase">assecories</span>
              .
            </h1>
            <p className="lg:text-xl text-sm capitalize my-3 font-semibold tracking-widest text-[#fff]">
              discover exclusive offers on top brand&apos;s products and stay on
              the top of the latest fashions !
            </p>

            <div className="flex justify-evenly items-center w-[95%] lg:w-[50%] mt-4">
              <button
                name="shop-Men"
                onClick={handleOnClick}
                className="uppercase font-semibold tracking-wider text-lg lg:text-xl px-6 py-3 rounded text-[#212a2f] bg-[#ffffff] hover:bg-[#212a2f] hover:text-[#ffffff] transition-all duration-150 ease-in"
              >
                Shop Men
              </button>
              <button
                name="shop-Women"
                onClick={handleOnClick}
                className="uppercase font-semibold tracking-wider text-lg lg:text-xl px-6 py-3 rounded text-[#212a2f] bg-[#ffffff] hover:bg-[#212a2f] hover:text-[#ffffff] transition-all duration-150 ease-in"
              >
                Shop Women
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};
