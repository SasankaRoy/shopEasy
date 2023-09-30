import mongoose from "mongoose";
const connection = {};
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://babu-E-comm:McHoTA00JN6goxAr@e-comm.ydg5kjg.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    connection.isConnected = mongoose.connections[0].readyState;
    console.log("Db is connected");
  } catch (error) {
    console.log("Error connecting", error);
  }
};
export default connectDB;
