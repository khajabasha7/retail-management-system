
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();


// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");


// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const saleRoutes = require("./routes/saleRoutes");



// const app = express();


// // middleware

// app.use(cors());
// // app.use(cors({
// //   origin: [
// //     "http://localhost:5173",
// //     "https://your-real-vercel-url.vercel.app"
// //   ],
// //   credentials: true
// // }));

// app.use(express.json());



// // Swagger
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );



// // Routes

// app.use(
//   "/api/products",
//   productRoutes
// );


// app.use(
//   "/api/sales",
//   saleRoutes
// );


// app.use(
//   "/api/auth",
//   authRoutes
// );



// // MongoDB

// mongoose.connect(process.env.MONGO_URI)

// .then(()=>{

// console.log("MongoDB Connected");

// })

// .catch(err=>{

// console.log(err);

// });




// // Server

// app.listen(5000,()=>{

// console.log(
// "Server running on port 5000"
// );

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


// Middleware

app.use(
  cors({
    origin: "*"
  })
);


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

// mongoose.connect(process.env.MONGO_URI)

// .then(()=>{

//  console.log("MongoDB Connected");

// })

// .catch((err)=>{

//  console.log("MongoDB Error:",err);

// });

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log("MongoDB Connected");


app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});


})
.catch(err=>{

console.log(err);

});


// Test route

app.get("/",(req,res)=>{

 res.send("Retail Management Backend Running");

});
app.get("/test",(req,res)=>{
 res.json({
  message:"Render working"
 });
});


// Server

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

 console.log(
  `Server running on port ${PORT}`
 );

});