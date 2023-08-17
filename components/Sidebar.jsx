import React from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import Settings from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import PersonIcon from "@mui/icons-material/Person";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
export const Sidebar = () => {
  return (
    <>
      <div className="w-full p-4 ">
        <div className=" mb-1">
          <h3 className="text-lg tracking-widest text-gray-400 text-start">
            Dashboard
          </h3>
          <ul className="p-2">
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <LineStyleIcon className="text-md mr-1" />
              Home
            </li>
            <li className="list-none flex justify-start items-center   text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <TimelineIcon className="text-md mr-1" />
              Anlitics
            </li>
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <TrendingDownIcon className="text-md mr-1" />
              Sales
            </li>
          </ul>
        </div>
        <div className=" mb-1">
          <h3 className="text-lg tracking-widest text-gray-400 text-start">
            Quick Menus
          </h3>
          <ul className="p-2">
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <PersonIcon className="text-md mr-1" />
              Users
            </li>
            <li className="list-none flex justify-start items-center   text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <InventorySharpIcon className="text-md mr-1" />
              Product
            </li>
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <NotificationsActive className="text-md mr-1" />
              Transactions
            </li>
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <NotificationsActive className="text-md mr-1" />
              Reports
            </li>
          </ul>
        </div>

        <div className=" mb-1">
          <h3 className="text-lg tracking-widest text-gray-400 text-start">
            Notifications
          </h3>
          <ul className="p-2">
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <Settings className="text-md mr-1" />
              Mail
            </li>
            <li className="list-none flex justify-start items-center   text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <TimelineIcon className="text-md mr-1" />
              Feedbacks
            </li>
            <li className="list-none flex justify-start items-center  text-xl tracking-wider m-2 p-2 cursor-pointer rounded-lg hover:bg-[#F7AB0A]/20 active:bg-blue-200 transition-all duration-300 ease-out">
              <ReportIcon className="text-md mr-1" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
