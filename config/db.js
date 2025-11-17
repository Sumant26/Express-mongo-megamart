import mongoose from "mongoose";

const connectDB = async (uri) => {
  if (!uri) throw new Error("MongoDB URI is required");
  try {
    await mongoose.connect(uri, {
      // mongoose 7+ doesn't require these flags but safe to keep
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
