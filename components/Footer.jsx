import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
        }}
        className="flex flex-col md:flex-row"
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="left flex-1 py-2 px-5 mt-1 h-full"
        >
          <h1 className="text-4xl lg:text-5xl font-normal font-[Satisfy] text-[#212a2f] cursor-pointer underline">
            .shopEasee
          </h1>
          <p className="text-base lg:text-xl mt-1 tracking-wide">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit,
            eaque doloremque, assumenda aliquid nemo animi unde saepe
            repellendus deleniti quisquam repellat numquam repudiandae iure
            omnis dolore laudantium quam magni odio.
          </p>
          <div className="SocialMedia flex justify-start items-center space-x-5 mt-2">
            <div className="bg-blue-600 text-white cursor-pointer  flex justify-center items-center rounded-full w-[40px] h-[40px] hover:scale-110 transition-all duration-100 ease-linear">
              <FacebookTwoToneIcon />
            </div>
            <div className="bg-red-500 text-white cursor-pointer  flex justify-center items-center rounded-full w-[40px] h-[40px] hover:scale-110 transition-all duration-100 ease-linear">
              <InstagramIcon />
            </div>
            <div className="bg-green-600 text-white cursor-pointer  flex justify-center items-center rounded-full w-[40px] h-[40px] hover:scale-110 transition-all duration-100 ease-linear">
              <WhatsAppIcon />
            </div>
            <div className="bg-blue-500 text-white cursor-pointer  flex justify-center items-center rounded-full w-[40px] h-[40px] hover:scale-110 transition-all duration-100 ease-linear">
              <TwitterIcon />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="middle flex-1 p-5 mt-1 h-full "
        >
          <h1 className="text-4xl capitalize tracking-wide font-extralight">
            Important Links.
          </h1>
          <div className="flex flex-wrap justify-between w-[75%] lg:w-[65%] max-h-[400px] mt-3 lg:mt-0">
            {["Men", "Women", "Kids", "accessories", "Electronic Gadgets"].map(
              (cur, id) => (
                <ul
                  key={id}
                  className="list-none m-1 cursor-pointer hover:scale-110 transition-all duration-150 ease-linear bg-gray-300/30 p-2 rounded-xl"
                >
                  <li className="text-xl lg:text-2xl capitalize tracking-wider ">
                    {cur}
                  </li>
                </ul>
              )
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="right flex-1 p-5 mt-1 h-full flex flex-col justify-center items-center "
        >
          <h1 className="text-4xl  lg:text-5xl capitalize tracking-wider font-extralight">
            Get in touch
          </h1>
          <div className="mt-5">
            <h3 className="text-xl lg:text-2xl mt-2 tracking-wide font-normal cursor-pointer">
              <AlternateEmailIcon className="text-[#F7AB0A]" /> Email us :
              example@gmail.com
            </h3>
            <h3 className="text-xl lg:text-2xl mt-2 tracking-wide font-normal cursor-pointer">
              <LocalPhoneIcon className="rotate-180 text-[#F7AB0A]" /> Call us :
              +180018002012
            </h3>
            <h3 className="text-xl lg:text-2xl mt-2 tracking-wide font-normal cursor-pointer">
              <LocationOnIcon className="text-[#F7AB0A]" /> Find us : New
              York,lane-05,building no-121
            </h3>
          </div>
        </motion.div>
      </motion.div>
      <div className="flex  justify-center items-center w-full py-3">
        <p className="text-lg font-normal tracking-wide">
          all copy@reserved by sasanka 😁😁.
        </p>
      </div>
    </>
  );
};

export default Footer;
