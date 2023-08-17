import connectDB from "../../utils/connectDb";
import Cart from "../../Models/Cart";

const handleGetUserCart = async (req, res) => {
  const { userId } = req.query;
  if (!userId)
    return res
      .status(400)
      .json({ error: "userId is expected to get the cart data!" });
  try {
    const getCartDataOfUser = await Cart.find({ userId });

    res.status(200).json({ cart: getCartDataOfUser });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};
const handlePostUserCart = async (req, res) => {
  try {
    const { id, productName, productId, price, size, color, quantity } =
      req.body.productInfo;
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is expected to get the cart data!" });
    }
    // find all the cart items of the user if it already exists
    const getAllItemsOfUser = await Cart.find({ userId });

    // if the user has no cart items or the user is new
    if (getAllItemsOfUser.length === 0) {
      const newItem = await new Cart({
        userId,
        productName,
        productId,
        price,
        size,
        color,
        quantity,
      });
      await newItem.save();
      return res
        .status(200)
        .json({ success: "new item added to user cart!", cart: newItem });
    } else {
      // if the item already present and update the item with the new values...
      const findOneItem = await Cart.findOne({ productId });

      console.log(productId);
      if (findOneItem) {
        const updateTheItem = await Cart.findByIdAndUpdate(
          { _id: id },
          {
            color: color,
            quantity: quantity,
          },
          { new: true }
        );
        res.status(200).json({
          success: "cart updated successfully",
          cart: updateTheItem,
        });
        console.log(updateTheItem);
      } else {
        // if the item not present in the cart of the user...
        console.log("the item is not present in the cart of the user");
        const newItem = await new Cart({
          userId,
          productName,
          productId,
          price,
          size,
          color,
          quantity,
        });
        await newItem.save();
        return res
          .status(200)
          .json({ success: "new item added to user cart!", cart: newItem });
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error });
  }
};

const handlePutUserCart = async (req, res) => {};

const handleUserCart = async (req, res) => {
  try {
    connectDB();
    switch (req.method) {
      case "GET":
        await handleGetUserCart(req, res);
        break;
      case "POST":
        await handlePostUserCart(req, res);
        break;
      case "PUT":
        await handlePutUserCart(req, res);
      default:
        await handleGetUserCart(req, res);
        break;
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default handleUserCart;
