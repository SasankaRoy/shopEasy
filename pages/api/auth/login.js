import { loginMiddleware } from "../../../Middlewares";
import User from "../../../Models/User";
import connectDB from "../../../utils/connectDb";
import Crypto from "crypto-js";
import Jwt from "jsonwebtoken";

const loginHandler = loginMiddleware(async (req, res) => {
  connectDB(); // making the database connection here..

  if (req.method !== "POST")
    return res.status(405).json({ error: `${req.method} method not allowed` });
  try {
    if (req.user) {
      return res.status(201).json({ user: req.user });
    }

    const { email, password } = req.body;

    // check user exists or not

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // then decrypted the hasded password in the db

    const handedPassword = Crypto.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const realPassword = handedPassword.toString(Crypto.enc.Utf8);

    // then match the hasded password with the password provided by the user

    if (realPassword !== password)
      return res.status(403).json({ error: "Password mismatch" });

    // send back res according to the client-side respective to the login above

    const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1day",
    });
    res.status(201).json({ user: user, userToken: token });
  } catch (error) {
    res.status(404).json({ error });
  }
});
export default loginHandler;

// try {
//   console.log(req.body);
//   if (req.method === "POST") {
//     connectDB();
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       console.log("user Not found");
//       res.status(404).json({ error: "User not found" });
//     } else {
//       const checkedPassword = Crypto.AES.decrypt(
//         user.password,
//         process.env.SECRET_KEY
//       );
//       const realPassword = checkedPassword.toString(Crypto.enc.Utf8);
//       if (req.body.password === realPassword) {
//         const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//           expiresIn: "1day",
//         });
//         res.status(201).json({ user: user, userToken: token });
//       } else {
//         console.log("password not valid");
//         res.status(404).json({ error: "password not valid" });
//       }
//     }
//   } else {
//     res.status(405).json({ error: `${req.method} method not allowed` });
//   }
// } catch (error) {
//   console.log(error);
// }
