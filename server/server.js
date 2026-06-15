// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();




// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const productRoutes = require("./routes/productRoutes");

// app.use("/api/products", productRoutes);

// const saleRoutes = require("./routes/saleRoutes");

// app.use("/api/sales", saleRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// app.use("/api/auth", authRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");



const app = express();


// middleware

// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-real-vercel-url.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());



// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);



// Routes

app.use(
  "/api/products",
  productRoutes
);


app.use(
  "/api/sales",
  saleRoutes
);


app.use(
  "/api/auth",
  authRoutes
);



// MongoDB

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log("MongoDB Connected");

})

.catch(err=>{

console.log(err);

});




// Server

app.listen(5000,()=>{

console.log(
"Server running on port 5000"
);

});