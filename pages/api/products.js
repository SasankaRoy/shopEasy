import Products from "../../Models/Products";
import connectDB from "../../utils/connectDb";

// get route

const handleGetProduct = async (req, res) => {
  try {
    const { pid, category, sub } = req.query;
    let products;

    if (category) {
      // this block filter product based on category or subcategory...
      if (sub) {
        products = await Products.aggregate([
          {
            $match: {
              productFor: category,
              subcategory: sub,
            },
          },
        ]);
      } else {
        products = await Products.find({ productFor: category });
      }
    } else if (pid) {
      // this filter the product by Id..
      products = await Products.findById(pid);
    } else {
      products = await Products.find(); // gives all the products..
    }

    if (!products || (Array.isArray(products) && products.length === 0)) {
      res.status(404).json({ error: "Products not found" });
    } else {
      res.status(200).json({ filteredProducts: products });
    }
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
      subcategory,
      size,
      color,
      price,
      description1,
      description2,
      description3,
      description4,
      heading1,
      heading2,
      heading3,
      heading4,
    } = req.body?.newproductInfo;
    const imageURLs = req.body?.imageURLs;

    const newProduct = new Products({
      brand,
      productName,
      productFor,
      category,
      subcategory,
      price,
      size,
      color,
      describtion: [
        { imageurl: imageURLs[0], description: description1,heading:heading1 },
        { imageurl: imageURLs[1], description: description2,heading:heading2 },
        { imageurl: imageURLs[2], description: description3,heading:heading3 },
        { imageurl: imageURLs[3], description: description4,heading:heading4 },
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
      subcategory,
      size,
      color,
      price,
      description1,
      description2,
      description3,
      description4,
      heading1,
      heading2,
      heading3,
      heading4,
    } = req.body?.newproductInfo;
    const imageURLs = req.body?.imageURLs;

    const update = {
      $set: {
        brand,
        productName,
        productFor,
        category,
        subcategory,
        price,
        size,
        color,
        describtion: [
          { imageurl: imageURLs[0], description: description1,heading:heading1 },
          { imageurl: imageURLs[1], description: description2,heading:heading2 },
          { imageurl: imageURLs[2], description: description3,heading:heading3 },
          { imageurl: imageURLs[3], description: description4,heading:heading4 },
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
