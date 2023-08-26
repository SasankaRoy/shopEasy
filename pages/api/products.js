import Products from "../../Models/Products";
import connectDB from "../../utils/connectDb";

// get route
const handleGetProduct = async (req, res) => {
  try {
    const { pid, category } = req.query;
    // find product on the base on (for) which is "men","women"...
    if (category) {
      const findProductsByCategory = await Products.find({
        productFor: category,
      });

      if (findProductsByCategory.length > 0) {
        res.status(200).json({ filteredProducts: findProductsByCategory });
        return;
      } else {
        res.status(404).json({ error: "Products not found" });
        return;
      }
    }
    // find singleProduct by product _id and the query {pid} = _id.
    if (pid) {
      const singleProductInfo = await Products.findById(pid);

      if (singleProductInfo) {
        res.status(200).json({ productInfo: singleProductInfo });
        return;
      } else {
        res.status(404).json({ error: "Product not found" });
        return;
      }
    }
    // all product.
    const findProduct = await Products.find();
    res.status(200).json({ allProducts: findProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// post or create route
const handlePostProduct = async (req, res) => {
  try {
    const {
      brand,
      productName,
      productFor,
      category,
      size,
      color,
      price,
      description1,
      description2,
      description3,
      description4,
    } = req.body?.newproductInfo;
    const imageURLs = req.body?.imageURLs;

    const newProduct = new Products({
      brand,
      productName,
      productFor,
      category,
      price,
      size,
      color,
      describtion: [
        { imageurl: imageURLs[0], description: description1 },
        { imageurl: imageURLs[1], description: description2 },
        { imageurl: imageURLs[2], description: description3 },
        { imageurl: imageURLs[3], description: description4 },
      ],
      mediaURL: imageURLs,
    });
    const saveProduct = await newProduct.save();
    res.status(201).json({
      message: "product added in the DB successfully !!",
      newProduct: saveProduct,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
// put and patch or update/edite route
const handlePutProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const {
      brand,
      productName,
      productFor,
      category,
      size,
      color,
      price,
      description1,
      description2,
      description3,
      description4,
    } = req.body?.newproductInfo;
    const imageURLs = req.body?.imageURLs;

    const update = {
      $set: {
        brand,
        productName,
        productFor,
        category,
        price,
        size,
        color,
        describtion: [
          { imageurl: imageURLs[0], description: description1 },
          { imageurl: imageURLs[1], description: description2 },
          { imageurl: imageURLs[2], description: description3 },
          { imageurl: imageURLs[3], description: description4 },
        ],
        mediaURL: imageURLs,
      },
    };

    const updateProduct = await Products.findOneAndUpdate({ _id: id }, update, {
      returnOriginal: false,
    });
    if (!updateProduct) {
      return res.status(406).json({ message: "updation failed" });
    } else {
      res.status(202).json({
        message: "updation successfully",
        updatedProduct: updateProduct,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE
const handleDeleteProduct = (req, res) => {
  console.log(req.method, "from the product");
};
export default async function handler(req, res) {
  try {
    connectDB();

    switch (req.method) {
      case "GET":
        await handleGetProduct(req, res);
        break;
      case "POST":
        await handlePostProduct(req, res);
        break;
      case "PUT":
        await handlePutProduct(req, res);
        break;
      case "PATCH":
        await handlePutProduct(req, res);
        break;
      case "DELETE":
        await handleDeleteProduct(req, res);
        break;
      default:
        await handleGetProduct(req, res);
        break;
    }
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
}
