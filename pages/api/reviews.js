import Products from "../../Models/Products";
import connectDB from "../../utils/connectDb";

const addAndUpdateReviews = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { question, userName, productID, questionID, answer } = req.body;

      // first find the product from the database
      const findProduct = await Products.findById(productID);
      if (findProduct) {
        // check the question already present or not...
        const checkExisting = findProduct.QA.filter((item) => {
          return item._id == questionID;
        });

        if (checkExisting.length > 0) {
          const updateReveiw = await Products.updateOne(
            {
              _id: productID,
              "QA._id": questionID,
            },
            {
              $set: { "QA.$.answer": answer },
            }
          );
          res.status(200).json(checkExisting);
        } else {
          // new entry ...
          const newEntry = await findProduct.updateOne({
            $push: {
              QA: {
                user: userName,
                question,
              },
            },
          });
          res.status(200).json({ newEntry });
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ error: "method not allowed" });
  }
};
const handlerGet = async (req, res) => {
  try {
    const { pId } = req.query;

    // find the product by the Id...
    const findProduct = await Products.findById(pId);
    if (findProduct) {
      res.status(200).json({ reviews: findProduct.QA });
    } else {
      res.status(404).json({ error: "product not exists!!" });
    }
  } catch (error) {
    console.log(error);
  }
};
export default async function handler(req, res) {
  connectDB();
  switch (req.method) {
    case "GET":
      await handlerGet(req, res);
      break;
    case "POST":
      await addAndUpdateReviews(req, res);
      break;
  }
}
