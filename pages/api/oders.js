import connectDB from "../../utils/connectDb";
import Oder from "../../Models/oder";
import oder from "../../Models/oder";

const handleGetOders = async (req, res) => {
  try {
      const { uId } = req.query;

      let Oders;
      
      //  This code block hendling the GET request
      //  for retrieving all oders for the single user.
      
    if (uId) {
      const getOderForSingleUser = await Oder.find({ userId: uId }).sort({ createdAt: -1 });
      
      if (getOderForSingleUser.length >= 1) {          
        Oders = getOderForSingleUser;
      } else {
        res
          .status(404)
          .json({
            error: 'Sorry! It"s seem that you don"t have any Oders to track',
          });
          return;
        }
        
    } else {
      // This code is handling the GET request
      // for retrieving all orders for the admin dashbord.

      const getAllOders = await Oder.find().sort({createdAt:-1});      
      if (getAllOders.length >= 1) {
        Oders = getAllOders;
      } else {
        res.status(404).json({ error: "Sorry! there are no orders yet" });
        return
      }
    }
   
    res.status(200).json({ orderList: Oders });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
const handlePostOders = async (req, res) => {
  try {
    const { oder, productIds, userId, subTotal } = req.body;

    

    const newOder =  new Oder({
      userId,
      userName: oder.fullName,
      email: oder.email,
      address: oder.fullAddress,
      phoneNumber: oder.phoneNumber,
      alternativePhoneNumber: oder.alternatePhoneNumber,
      country: oder.country,
      paymentMethod: oder.payMethod,
      totalPrice: subTotal,
      itemList: productIds,
    });

    // save the oder details........

    const oderSaved = await newOder.save();

    console.log(oderSaved, "oderSaved successfuly");

    res.setHeader("Server", "Custom");
    res.status(200).json({ success: oderSaved });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const handlePutOders = async (req, res) => {
  try {
    const { productId, oderStatus } = req.body;
    const updateOderStatus = await oder.findByIdAndUpdate(
      { _id: productId },
      { status: oderStatus }
    );
    res.status(200).json({ message: "Oder status updated" });
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteOders = async (req, res) => {};

export default async function handler(req, res) {
  connectDB();
  switch (req.method) {
    case "GET":
      await handleGetOders(req, res);
      break;
    case "POST":
      await handlePostOders(req, res);
      break;
    case "PUT":
      await handlePutOders(req, res);
      break;
    case "DELETE":
      await handleDeleteOders(req, res);
      break;
    default:
      await handleGetOders(req, res);
      break;
  }
}
