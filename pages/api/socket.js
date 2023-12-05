// import { Server } from "socket.io";
// export default async function handler(req, res) {
//   try {
//     console.log('hello')
//     const io = new Server(res.socket.server);
//     res.socket.server.io = io;
//     console.log('hello2')
//     io.on("connection", (socket) => {
//       console.log("connection", socket);
//       socket.on("test__SocketServer", (data) => {
//         console.log(data, "in the server");
//         socket.broadcast.emit("test__SocketServer2", data);
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
import { Server } from "socket.io";

// Create a shared io instance outside the handler
// const io = new Server();

export default async function handler(req, res) {
  try {
    // Attach io to the socket server
    // if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log("Connection");
        socket.on("test__SocketServer", (data) => {
            // console.log(data, "in the server");
            io.emit("test__SocketServer", data);            
        });
      });


    // }

    // console.log("hello");

    // Continue with your handler logic

    // console.log("hello2");

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}



