import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect("mongodb+srv://pc-builder:Xy13wr6b9pji6Lts@cluster0.mordayw.mongodb.net/pc-builder?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default dbConnect;
