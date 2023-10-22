import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const ProductImageView = ({ productIamge, setHandleImageShowHide }) => {
  return (
    <>
      <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-black/20 z-50">
        <div className="w-[95%] lg:w-[60%] h-[80%] flex justify-center items-center bg-white  rounded-lg shadow-md">
          <div className="relative lg:w-[80%] w-[97%] h-[90%]">
            <img
              src={productIamge}
              alt="productIamge"
              className="object-container h-full w-auto mx-auto"
            />
          </div>
          <div className="absolute flex justify-center items-center h-9 w-9 rounded-full top-5 right-7 bg-white">
            <ClearOutlinedIcon
              onClick={() => {
                setHandleImageShowHide({
                  state: false,
                  curImage: "",
                });
              }}
              className="text-3xl cursor-pointer hover:rotate-90 transition-all duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductImageView;
