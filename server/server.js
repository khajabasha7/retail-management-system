// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const testRoutes = require("./routes/testRoutes");

// const app = express();

// // Connect DB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/test", testRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Retail Management Backend Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

