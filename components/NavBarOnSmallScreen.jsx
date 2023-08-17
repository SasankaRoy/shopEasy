import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const NavBarOnSmallScreen = ({ setShowNavBar }) => {
  const user = useSelector((state) => state.user);
  return (
    <motion.div
      initial={{
        y: -200,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
        autoReverse: "true",
      }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: "easeInOut",
      }}
      className="w-full h-[95%] fixed bg-[#ffffff] overflow-y-auto scroll-smooth z-40 lg:hidden"
    >
      <ul className="flex flex-col justify-start items-start w-full h-full">
        <Link
          onClick={() => setShowNavBar(false)}
          href="/"
          className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline decoration-[#212a2f]  transition-all duration-150 ease-in px-8 py-5 w-full"
        >
          Men
        </Link>
        <hr className="bg-[#212a2f]  w-full" />
        <Link
          onClick={() => setShowNavBar(false)}
          href="/"
          className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline decoration-[#212a2f]  transition-all duration-150 ease-in px-8 py-5 w-full"
        >
          Women
        </Link>
        <hr className="bg-[#212a2f]  w-full" />
        <Link
          onClick={() => setShowNavBar(false)}
          href="/"
          className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline decoration-[#212a2f]  transition-all duration-150 ease-in px-8 py-5 w-full"
        >
          Kids
        </Link>
        <hr className="bg-[#212a2f]  w-full" />
        <Link
          onClick={() => setShowNavBar(false)}
          href="/"
          className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline decoration-[#212a2f]  transition-all duration-150 ease-in px-8 py-5 w-full"
        >
          Accessories
        </Link>
        <hr className="bg-[#212a2f]  w-full" />
        <Link
          onClick={() => setShowNavBar(false)}
          href="/"
          className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline decoration-[#212a2f]  transition-all duration-150 ease-in px-8 py-5 w-full"
        >
          Electronics Gadgets
        </Link>
        <hr className="bg-[#212a2f]  w-full" />
        <Link
          onClick={() => setShowNavBar(false)}
          href={
            !user.userInfo ? "/auth/login" : `/account/${user.userInfo?._id}`
          }
          prefetch={false}
          className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline decoration-[#212a2f]  transition-all duration-150 ease-in px-8 py-5 w-full"
        >
          {!user.userInfo ? "Log In" : `Hello, ${user.userInfo?.userName}`}
        </Link>
        <hr className="bg-[#212a2f]  w-full " />
      </ul>
    </motion.div>
  );
};

export default NavBarOnSmallScreen;
