const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // const conn = await mongoose.connect("mongodb://localhost/esports-nepal");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (ex) {
    console.log(`Error: ${ex.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
