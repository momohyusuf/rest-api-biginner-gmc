const moongoose = require("mongoose");

const connectDB = async () => {
  await moongoose.connect(process.env.MONGO_URI);
  console.log("Connection to database successfull");
};

module.exports = { connectDB };
