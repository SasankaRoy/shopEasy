import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
        className="h-[50vh] bg-[#f8f7f5]  flex flex-col text-center items-center justify-center mt-10"
      >
        <h1 className="md:text-6xl text-5xl tracking-widest">NewLetter</h1>
        <p className="md:text-2xl text-xl capitalize font-medium tracking-wider mt-2">
          get timely updates from our top products.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          className="flex justify-center items-center lg:w-[60%] w-[95%] mx-auto min-h-[10%] p-2 bg-white rounded-lg mt-2"
        >
          <input
            type="text"
            placeholder="your email..."
            className=" flex-2 w-[70%]  p-3 text-xl tracking-wider text-center border-none outline-none bg-white focus:ring-1 focus:ring-gray-400 rounded-md placeholder:capitalize placeholder:text-center placeholder:text-gray-500 placeholder:tracking-wider placeholder:text-xl"
          />
          <button className="flex-1 bg-green-400 hover:bg-green-500 transition-all duration-200 ease-linear p-3 ml-2 rounded-lg text-xl border border-collapse">
            <SendIcon className="text-white" />
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NewsLetter;
