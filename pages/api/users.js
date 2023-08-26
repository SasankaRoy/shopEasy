import connectDB from "../../utils/connectDb";
import User from "../../Models/User";

// get user router or get method..
const handleGetUser = async (req, res) => {
  try {
    const { id, username } = req.query;

    if (!id && !username)
      return res.status(404).json({ error: "username or userId is expected" });

    if (id) {
      const findUserById = await User.findById({ _id: id });

      if (!findUserById) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user: findUserById });
    } else {
      const findUserByName = await User.findOne({ userName: username });
      if (!findUserByName) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user: findUserByName });
    }
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// post user router or post methhod...

const handlePostUser = async (req, res) => {
  try {
    const { uid } = req.query;

    const { userName, profasion, Dod, email, address, number } =
      req.body.userInfo;
    const mediaUrl = req.body.mediaUrl;
    if (uid) {
      const updationToBeDone = {
        $set: {
          userName,
          profasion,
          DOB: Dod,
          email,
          address,
          number,
          profilePicture: mediaUrl,
        },
      };
      const checkUserExistence = await User.findByIdAndUpdate(
        { _id: uid },
        updationToBeDone,
        {
          returnOriginal: false,
        }
      );

      if (checkUserExistence) {
        return res.status(200).json({ message: checkUserExistence });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

// here I am check the req method and assigning the respective function to them
// or we can say that is the main router "api/users"
// handling the comeing req from the client by checking the req method

const handleUser = async (req, res) => {
  try {
    connectDB();
    switch (req.method) {
      case "GET":
        await handleGetUser(req, res);
        break;
      case "POST":
        await handlePostUser(req, res);
        break;
      default:
        await handleGetUser(req, res);
        break;
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
export default handleUser;
