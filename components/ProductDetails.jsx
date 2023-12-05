import Image from "next/image";
import { motion } from "framer-motion";

const ProductDetails = ({ pDescribtion }) => {

  return (
    <>
      <div className="mt-5 h-[92vh] overflow-y-auto scroll-smooth snap-y snap-mandatory">
        <h1 className="text-3xl tracking-wide font-semibold text-center">
          Product Details
        </h1>
        {pDescribtion.map((cur, id) => (
          <div
            key={id}
            className="w-[90%] lg:w-[80%] h-[52%] my-20  mx-auto snap-center"
          >
            <div className="h-full  flex lg:flex-row flex-col justify-between items-start space-y-5 lg:space-y-0 lg:space-x-7">
              {pDescribtion.indexOf(cur) % 2 === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "backIn" }}
                  className="w-full h-[60%] lg:h-full relative flex justify-center items-center"
                >
                  <Image
                    src={cur?.imageurl}
                    fill
                    className="object-cover rounded shadow-xl"
                    alt="productImage"
                    loading="lazy"
                  />
                </motion.div>
              )}
              <div className="w-full h-[40%] lg:h-full overflow-y-auto">
                <h2 className="text-xl lg:text-2xl tracking-wider font-semibold capitalize">
                  {cur?.heading}
                </h2>
                <p className="text-md lg:text-lg mt-5 font-normal tracking-wide capitalize">
                  {cur?.description}
                </p>
              </div>
              {pDescribtion.indexOf(cur) % 2 !== 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "backIn" }}
                  className="w-full h-[60%] lg:h-full relative flex justify-center items-center"
                >
                  <Image
                    src={cur?.imageurl}
                    fill
                    className="object-cover rounded shadow-xl"
                    alt="productImage"
                    loading="lazy"
                  />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductDetails;
