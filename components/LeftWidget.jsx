import Image from "next/image";
import { Visibility } from "@mui/icons-material";

export const LeftWidget = () => {
  return (
    <div className="md:w-[40%] p-5 rounded-lg m-1 LeftWidget">
      <h3 className="capitalize text-xl font-normal tracking-wide text-gray-400">
        new join members.
      </h3>
      <ul className="mt-3">
        <li className="flex justify-between items-center list-none">
          <div className="relative h-12 w-12 rounded-full mt-4">
            <Image
              src={
                "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
              }
              alt="userPic"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-600 capitalize">
              userName
            </h2>
            <p className="text-base font-normal tracking-wide text-gray-500 lowercase">
              user Description
            </p>
          </div>

          <button className="border-none outline-none  flex justify-between items-center px-3 py-1 rounded-lg text-lg tracking-wider hover:bg-[#5550bd]/20 transition-all duration-200 ease-in">
            <Visibility className="mr-1 text-[#5550bd]/60" />
            Display
          </button>
        </li>
        <li className="flex justify-between items-center list-none">
          <div className="relative h-12 w-12 rounded-full mt-4">
            <Image
              src={
                "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
              }
              alt="userPic"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-600 capitalize">
              userName
            </h2>
            <p className="text-base font-normal tracking-wide text-gray-500 lowercase">
              user Description
            </p>
          </div>

          <button className="border-none outline-none  flex justify-between items-center px-3 py-1 rounded-lg text-lg tracking-wider hover:bg-[#5550bd]/20 transition-all duration-200 ease-in">
            <Visibility className="mr-1 text-[#5550bd]/60" />
            Display
          </button>
        </li>
        <li className="flex justify-between items-center list-none">
          <div className="relative h-12 w-12 rounded-full mt-4">
            <Image
              src={
                "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
              }
              alt="userPic"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-600 capitalize">
              userName
            </h2>
            <p className="text-base font-normal tracking-wide text-gray-500 lowercase">
              user Description
            </p>
          </div>

          <button className="border-none outline-none  flex justify-between items-center px-3 py-1 rounded-lg text-lg tracking-wider hover:bg-[#5550bd]/20 transition-all duration-200 ease-in">
            <Visibility className="mr-1 text-[#5550bd]/60" />
            Display
          </button>
        </li>
        <li className="flex justify-between items-center list-none">
          <div className="relative h-12 w-12 rounded-full mt-4">
            <Image
              src={
                "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
              }
              alt="userPic"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-600 capitalize">
              userName
            </h2>
            <p className="text-base font-normal tracking-wide text-gray-500 lowercase">
              user Description
            </p>
          </div>

          <button className="border-none outline-none  flex justify-between items-center px-3 py-1 rounded-lg text-lg tracking-wider hover:bg-[#5550bd]/20 transition-all duration-200 ease-in">
            <Visibility className="mr-1 text-[#5550bd]/60" />
            Display
          </button>
        </li>
        <li className="flex justify-between items-center list-none">
          <div className="relative h-12 w-12 rounded-full mt-4">
            <Image
              src={
                "http://res.cloudinary.com/dcgmbgmyk/image/upload/v1675519945/hbzpauvy42df2xcuill7.jpg"
              }
              alt="userPic"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-gray-600 capitalize">
              userName
            </h2>
            <p className="text-base font-normal tracking-wide text-gray-500 lowercase">
              user Description
            </p>
          </div>

          <button className="border-none outline-none  flex justify-between items-center px-3 py-1 rounded-lg text-lg tracking-wider hover:bg-[#5550bd]/20 transition-all duration-200 ease-in">
            <Visibility className="mr-1 text-[#5550bd]/60" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
};
