import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    address: {
      type: String,
    },
    profasion: {
      type: String,
    },
    DOB: {
      type: String,
    },
    number: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "manager", "user"],
    },
  },
  {
    timestamps: true,
  }
);



export default mongoose.models.User || mongoose.model("User", UserSchema);
