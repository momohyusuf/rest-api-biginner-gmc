const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./config/dbConnect");

// custom middlewares
const { routeNotFound } = require("./middleware/routeNotFoundMiddleware");
// external middleware imports
const morgan = require("morgan");
const cors = require("cors");
// routes imports
const authRoutes = require("./routes/userRoutes");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/api/v1", authRoutes);
app.use(routeNotFound);

const startApp = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`server starting on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
