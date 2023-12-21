import Head from "next/head";
// import Todos from "../../components/Todos";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

let socket;

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [allSMS, setAllSMS] = useState([]);


  // making the the socket connection when the page is loaded...
  const makeSocketConnection = async () => {
    try {
      await axios.get("/api/socket");
      console.log('the url is fetched');
      socket = io();
      socket.on("connect", () => {
        console.log("connected !");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = () => {
    console.log("Submit");
    socket.emit("test__SocketServer", message);
    socket.on("test__SocketServer", (data) => {
      setAllSMS([...allSMS,data])
      console.log(data, "from the server");
    });
  };
  useEffect(() => {
    makeSocketConnection();
  }, []);
  return (
    <>
      <Head>
        <title>E-comm. - Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-[50vh] w-full  flex flex-col justify-center items-center">
        {allSMS.map((cur, id) => (
          <li className="" key={id}>
            {cur}
          </li>
        ))}
        <div className="h-auto flex justify-evenly items-center w-[90vh]">
          <input
            onChange={handleChange}
            name="message"
            placeholder="the message"
            className="p-1 font-semibold bg-red-50"
          />
          <button
            onClick={handleSubmit}
            className="bg-red-400 text-white px-3 py-1 font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Dashboard;
