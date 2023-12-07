import { Server } from "socket.io";
import Cors from 'cors';
import socketMiddleware from "../../utils/socketMiddleware";

const CORS = socketMiddleware(
  Cors({
    methods:['GET', 'POST', 'OPTIONS']
  })
) 

// Create a shared io instance outside the handler
const io = new Server();

export default async function handler(req, res) {
  try {
      await CORS(req, res);
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log("Connection");
        socket.on("test__SocketServer", (data) => {
            io.emit("test__SocketServer", data);            
        });
      });


    

    console.log("hello");

    // Continue with your handler logic

    console.log("hello2");

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}



