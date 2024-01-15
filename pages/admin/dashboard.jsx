import Head from "next/head";
// import Todos from "../../components/Todos";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";


let socket;

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [allSMS, setAllSMS] = useState([]);
  const [selectBg, setSelectBg] = useState({
    bg: '#fca5a533',
    color: 'red',
  });

  const [showProductList, setShowProductList] = useState(false);


  // making the the socket connection when the page is loaded...

  const makeSocketConnection = async () => {
    try {

      socket = io("http://localhost:5000/");

      socket.on("connect", () => {
        console.log("connected to the server!");
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {

    socket.emit("test__SocketServer", message);
    socket.on("test__messageSendBack", (data) => {
      setAllSMS([...allSMS, data.message]);
      console.log(data.message, "from the server");
    });

  };
  useEffect(() => {
    makeSocketConnection();

  }, []);


  const handleChangeSelection = (e) => {
    e.isPropagationStopped();
    console.log(e)
    // setMessage(e.target.value);
    switch (e.target.value) {
      case 'processing':
        setSelectBg({ bg: '#fde04733', color: '#5b4c0099' });
        socket.emit("test__SocketServer", e.target.value);
        socket.on("test__messageSendBack", (data) => {
          setAllSMS([...allSMS, data.message]);
          console.log(data.message, "from the server");
        });
        break;

      case 'shipping':
        setSelectBg({ bg: '#fdba7433', color: '#88460099' });
        // setSelectBg('yellow')
        break;

      case 'complete':
        setSelectBg({ bg: '#86efac33', color: 'green' });
        // setSelectBg('orange')
        break;

      default:
        setSelectBg({ bg: '#fca5a533', color: 'red' });
        break;
    }
  }
  return (
    <>
      <Head>
        <title>shopEasee - admin</title>
        <meta
          name="description"
          content="It is a shopping app that provides best quality products at a affodable price at your door step."
        />
        <link rel="shortcut icon" href="/icon2.png" />
      </Head>



      <h2 className="text-center font-semibold text-3xl capitalize underline underline-offset-8 tracking-wider my-2">
        List of Orders {allSMS}
      </h2>
      <div class="w-[90%] mx-auto my-3 p-2 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="font-extraboldbold text-xl p-2 tracking-wider">Ordered By :</th>
              <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">address</th>
              <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">date</th>
              <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">Status</th>
              <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">payment Mode</th>
              <th className="font-extraboldbold text-xl capitalize p-2 tracking-wider">Total amount (<CurrencyRupeeIcon className="text-base" />)</th>
            </tr>
            <tr onClick={(e) => {              
              setShowProductList(true)
              }} className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702447524/ofchr5yy87ogbyfnfipu.jpg" alt="productImg" />
                <h2>Roadster Black Cotton</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                03/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                1000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg" alt="productImg" />
                <h2>Roadster Blue and White</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                01/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                5000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702447524/ofchr5yy87ogbyfnfipu.jpg" alt="productImg" />
                <h2>Roadster Black Cotton</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                03/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                1000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg" alt="productImg" />
                <h2>Roadster Blue and White</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                01/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                5000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702447524/ofchr5yy87ogbyfnfipu.jpg" alt="productImg" />
                <h2>Roadster Black Cotton</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                03/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                1000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg" alt="productImg" />
                <h2>Roadster Blue and White</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                01/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                5000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702447524/ofchr5yy87ogbyfnfipu.jpg" alt="productImg" />
                <h2>Roadster Black Cotton</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                03/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                1000
              </td>
            </tr>

            <tr className="bg-gray-50 py-[10px] rounded cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
              <td className="font-semibold text-center text-md tracking-wider p-2 flex justify-start items-center space-x-2">
                <img className="object-cover h-[40px] w-[40px] object-top rounded-full" src="https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg" alt="productImg" />
                <h2>Roadster Blue and White</h2>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                180018002012unyfbfgn5824
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                01/01/2024
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                <select onChange={handleChangeSelection} className="w-full px-2 py-1 font-bold border-none outline-none  tracking-wider rounded-md  shadow-sm text-center statusSelect"
                  style={{ background: selectBg.bg, color: selectBg.color, fontWeight: 700 }}
                >
                  <option value="pending" default className="font-bold">Pending</option>
                  <option value="shipping" className="font-bold">Shipping</option>
                  <option value="complete" className="font-bold">Complete</option>
                </select>
              </td>
              <td className="font-semibold text-center text-md tracking-wider p-2">
                COD
              </td>
              <td className="font-extrabold text-center text-lg tracking-wider p-2">
                5000
              </td>
            </tr>
          </thead>
        </table>
      </div>
      {
        showProductList && (
          <ProductList setShowProductList={setShowProductList}/>
        )
      }
    </>
  );
};

export default Dashboard;



const ProductList = ({setShowProductList}) => {
  return (
    <>
      <div className="fixed z-50 w-full h-screen backdrop-blur-sm bg-[#000]/40 top-0 flex justify-center items-center">
        <div className="w-[65%] mx-auto p-3 bg-white rounded-md relative">
        <h2 className="absolute right-3 font-semibold text-red-500 text-xl top-3 capitalize cursor-pointer tracking-wider" onClick={()=>setShowProductList(false)}>
          Close
        </h2>
        {/* loop here */}
          <div className="flex justify-evenly items-center my-5">
            <div className="flex-1 flex justify-evenly items-center">
              <img src='https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg' alt="product Image" className="w-[60px] h-[60px] rounded-full object-cover object-top" />
              <h2 className="font-semibold text-xl tracking-wider">
                The product Name
              </h2>
            </div>
            <div className="flex-1 flex justify-evenly items-center">
              <div className="flex justify-center items-center space-x-3">
                <h2 className="text-lg font-bold tracking-wider">Quantity -</h2>
                <h2 className="text-xl font-extrabold">5</h2>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h2 className="text-lg font-bold tracking-wider">Price <CurrencyRupeeIcon className="text-base" /> -</h2>
                <h2 className="text-xl font-extrabold">2000</h2>
              </div>
            </div>
          </div>

          <div className="flex justify-evenly items-center my-5">
            <div className="flex-1 flex justify-evenly items-center">
              <img src='https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg' alt="product Image" className="w-[60px] h-[60px] rounded-full object-cover object-top" />
              <h2 className="font-semibold text-xl tracking-wider">
                The product Name
              </h2>
            </div>
            <div className="flex-1 flex justify-evenly items-center">
              <div className="flex justify-center items-center space-x-3">
                <h2 className="text-lg font-bold tracking-wider">Quantity -</h2>
                <h2 className="text-xl font-extrabold">5</h2>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h2 className="text-lg font-bold tracking-wider">Price <CurrencyRupeeIcon className="text-base" /> -</h2>
                <h2 className="text-xl font-extrabold">2000</h2>
              </div>
            </div>
          </div>

          <div className="flex justify-evenly items-center my-5">
            <div className="flex-1 flex justify-evenly items-center">
              <img src='https://res.cloudinary.com/dcgmbgmyk/image/upload/v1702224261/yepkj0spq935vctlzdyj.jpg' alt="product Image" className="w-[60px] h-[60px] rounded-full object-cover object-top" />
              <h2 className="font-semibold text-xl tracking-wider">
                The product Name
              </h2>
            </div>
            <div className="flex-1 flex justify-evenly items-center">
              <div className="flex justify-center items-center space-x-3">
                <h2 className="text-lg font-bold tracking-wider">Quantity -</h2>
                <h2 className="text-xl font-extrabold">5</h2>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h2 className="text-lg font-bold tracking-wider">Price <CurrencyRupeeIcon className="text-base" /> -</h2>
                <h2 className="text-xl font-extrabold">2000</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
