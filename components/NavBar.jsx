import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { userHasCart } from "../Redux/cartSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import { loginSuccess } from "../Redux/userSlice";
import { handleError } from "../utils/Error&SuccessHandler";
import {
  loadingComplete,
  loadingError,
  loadingStart,
} from "../Redux/loadingSlice";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../utils/UserProfileIcon";



const Cart = dynamic(() => import("./Cart"), { ssr: false });
const NavBarOnSmallScreen = dynamic(() => import("./NavBarOnSmallScreen"));
const FilterModel = dynamic(() => import("./FilterModel"));

const NavBar = ({ user }) => {
  const [showCart, setShowCart] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [showFilters, setShowFilters] = useState({
    status: false,
    type: "",
  });

  const cart = useSelector((state) => state.cart);
  const User = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchUserCart = () => {
    if (User.userInfo || user) {
      const userCart = localStorage.getItem("userCart");
      const cartData = JSON.parse(userCart);
      if (userCart) {
        dispatch(userHasCart(cartData));
      }
      return;
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [router.pathname]);

  useEffect(() => {
    setTimeout(() => fetchUserCart(), 3000);
    const isProtectedRoute = router.pathname === "/account/[userid]";
    const adminDashbord = router.pathname === "/admin/dashboard";

    if (!user) {
      // user is not logged in .....
      if (isProtectedRoute || adminDashbord) {
        router.push("/");
        toast.warn("session expired! Please login again");
      }
      return;
    }




    // when user is loggin but user does not have the authority to visit dashboard page....

    if (adminDashbord) {
      if (user.role !== "admin" && user.role !== "manager") {
        router.push("/");
        toast.error('You are not authorised to visit "dashboard" page !');
      }
    }
  }, []);

  const handleShowCart = () => {
    setShowCart(true);
  };

  return (
    <>
      <nav className="sticky z-40 top-0 flex lg:justify-around justify-between items-center w-full mx-auto lg:px-0 px-6 py-4 shadow bg-[#ffffff]">
        <div className="flex-1 hidden md:hidden lg:flex justify-evenly items-center">
          <button
            onClick={(e) => {
              setShowFilters({
                status: !showFilters.status,
                type: e.target.innerHTML,
              });
            }}
            className="list-none   text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline hover:underline-offset-8 decoration-pink-600  transition-all duration-150 ease-in"
          >
            Men
          </button>
          <button
            onClick={(e) => {
              setShowFilters({
                status: !showFilters.status,
                type: e.target.innerHTML,
              });
            }}
            className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline hover:underline-offset-8 decoration-pink-600  transition-all duration-150 ease-in"
          >
            Women
          </button>
          <button
            onClick={(e) => {
              setShowFilters({
                status: !showFilters.status,
                type: e.target.innerHTML,
              });
            }}
            className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f]  hover:underline hover:underline-offset-8 decoration-pink-600  transition-all duration-150 ease-in"
          >
            Kid
          </button>
          <button
            onClick={(e) => {
              setShowFilters({
                status: !showFilters.status,
                type: e.target.innerHTML,
              });
            }}
            className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f] hover:underline hover:underline-offset-8 decoration-pink-600  transition-all duration-150 ease-in"
          >
            Accessories
          </button>
          <button
            onClick={(e) => {
              setShowFilters({
                status: !showFilters.status,
                type: e.target.innerHTML,
              });
            }}
            className="list-none text-lg tracking-wide font-semibold text-[#212a2f] hover:text-[#212a2f] hover:underline hover:underline-offset-8 decoration-pink-600 transition-all duration-150 ease-in"
          >
            Electronic Gadgets
          </button>
        </div>
        {showNavBar ? (
          <ClearOutlinedIcon
            onClick={() => setShowNavBar(false)}
            className="text-4xl lg:hidden cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out"
          />
        ) : (
          <div className="inline-flex lg:hidden">
            <MenuIcon
              onClick={() => setShowNavBar(true)}
              className="text-4xl cursor-pointer inline-flex lg:hidden"
            />
          </div>
        )}
        {/* logo */}
        <Link href="/" prefetch={false} className="px-3">
          <h1 className="text-4xl lg:text-5xl font-normal font-[Satisfy] text-[#212a2f] cursor-pointer">
            .shopEasee
          </h1>
        </Link>
        <div className="flex-1 hidden md:hidden lg:flex justify-evenly items-center text-right">
          <div className="p-2 rounded-md  bg-gray-50/20">
            <SearchOutlinedIcon className="mr-1 text-[#212a2f]" />
            <input
              type="text"
              placeholder="search..."
              className="border-l-2 px-3 outline-none text-lg tracking-wide bg-transparent text-[#212a2f] placeholder:text-[#212a2f]/50"
            />
          </div>
          {/* {user.userInfo ? ( */}
          <Link
            href={
              !User.userInfo ? "/auth/login" : `/account/${User.userInfo?._id}`
            }
            prefetch={false}
            className=" flex justify-center items-center list-none text-[#212a2f] hover:text-[#212a2f] transition-all duration-150 ease-in"
          >
            <Person2OutlinedIcon className="text-4xl " />
            
            <span className="text-2xl capitalize font-bold tracking-wide">
              {!User.userInfo ? "Log In" : User.userInfo?.userName.split(" ")[0]}
            </span>
          </Link>
        
          <button
            onClick={handleShowCart}
            className="flex justify-end items-end"
          >
            <div className="relative">
              <ShoppingCartOutlinedIcon className="text-4xl" />
              <span className="absolute text-[14px] h-5 w-5 font-extrabold rounded-full bg-pink-600 text-[#fff] flex justify-center items-center -top-3 -right-2">
                {cart.cart.length}
              </span>
            </div>
            {cart.subTotal > 0 && (
              <div className="flex justify-center items-center">
                <CurrencyRupeeIcon />
                <span className="text-xl  font-bold tracking-wide">
                  {cart.subTotal}.0
                </span>
              </div>
            )}
          </button>
        </div>
        <div className="relative lg:hidden">
          <span className=" absolute h-5 w-5 text-[13px] font-extrabold bg-pink-600 text-[#ffffff] flex justify-center items-center rounded-full -top-3 -right-2">
            {cart.cart.length}
          </span>
          <ShoppingCartOutlinedIcon
            onClick={handleShowCart}
            className="text-4xl cursor-pointer"
          />
        </div>
        {showFilters.status && (
          <FilterModel
            showFilter={showFilters}
            setShowFilter={setShowFilters}
          />
        )}
      </nav>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showNavBar && <NavBarOnSmallScreen setShowNavBar={setShowNavBar} />}
    </>
  );
};
export default NavBar;
