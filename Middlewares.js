import User from "./Models/User";
import connectDB from "./utils/connectDb";
import Jwt from "jsonwebtoken";
export const loginMiddleware = (handler) => async (req, res) => {
  connectDB(); // making the database connection here..

  if (req.body.userToken) {
    const decoded = Jwt.verify(req.body.userToken, process.env.SECRET_KEY);
    const findUser = await User.findById(decoded.id);

    req.user = findUser;
    return handler(req, res);
  } else {
    return handler(req, res);
  }
};
