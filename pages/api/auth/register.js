import User from "../../../Models/User";
import Crypto from "crypto-js";
import connectDB from "../../../utils/connectDb";

const registerHandler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: `${req.method} method not allowed` });
  connectDB(); // making the database connection here..

  try {
    const { userName, lastName, email, password } = req.body;
    // if user already has an account...
    const checkUserExists = await User.findOne({ email });
    if (checkUserExists)
      return res.status(404).json({ error: "User already exists" });

    // hashing the password and saving the user info....
    const hashPassword = Crypto.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();

    const newUser = await new User({
      userName,
      // lastName,
      email,
      password: hashPassword,
    });

    const saveUser = await newUser.save();
    res.status(200).json({ success: "register successfull", saveUser });
  } catch (err) {
    res.status(500).json({ error:err });
    console.log(err);
  }
};

export default registerHandler;
