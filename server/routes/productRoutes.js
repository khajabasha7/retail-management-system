const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



// CREATE PRODUCT

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     tags:
 *       - Products
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Product created
 */

router.post("/", authMiddleware, async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.json(product);


  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});





// GET PRODUCTS


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products with search and pagination
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search product name
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Product list
 */


// router.get("/", async (req,res)=>{

// try{

// const {
// search=""
// }=req.query;


// const query = search
// ?
// {
// name:{
// $regex:search,
// $options:"i"
// }
// }
// :
// {};


// const products = await Product.find(query)
// .sort({createdAt:-1});


// console.log("Products sent:",products);


// res.json(products);


// }
// catch(err){

// res.status(500).json({
// error:err.message
// });

// }

// });

router.get("/", async (req,res)=>{

try{


const products = await Product.find();


res.json(products);


}
catch(err){


console.log(err);


res.status(500).json({
error:err.message
});


}

});





// ADD STOCK


/**
 * @swagger
 * /api/products/add-stock/{id}:
 *   put:
 *     summary: Add product stock
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Stock updated
 */


router.put(
"/add-stock/:id",
authMiddleware,
async(req,res)=>{


try{


const {quantity}=req.body;


const product =
await Product.findById(req.params.id);



if(!product){

return res.status(404).json({
message:"Product not found"
});

}



product.stock += Number(quantity);


await product.save();



res.json({

message:"Stock updated successfully",

product

});


}
catch(err){

res.status(500).json({
error:err.message
});


}


});








// UPDATE PRICE


/**
 * @swagger
 * /api/products/update-price/{id}:
 *   put:
 *     summary: Update product price
 *     tags:
 *       - Products
 */


router.put(
"/update-price/:id",
authMiddleware,
async(req,res)=>{


try{


const {price}=req.body;



const product =
await Product.findById(
req.params.id
);



if(!product){

return res.status(404).json({
message:"Product not found"
});

}



product.price =
Number(price);



await product.save();



res.json({

message:"Price updated successfully",

product

});


}
catch(err){

res.status(500).json({
error:err.message
});


}


});







// UPDATE PRODUCT


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product details
 *     tags:
 *       - Products
 */


router.put("/:id",
authMiddleware,
async(req,res)=>{


try{


const product =
await Product.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);



res.json(product);



}
catch(err){

res.status(500).json({
error:err.message
});


}


});







// DELETE PRODUCT


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 */


router.delete("/:id",
authMiddleware,
async(req,res)=>{


try{


await Product.findByIdAndDelete(
req.params.id
);



res.json({

message:"Product deleted successfully"

});


}
catch(err){

res.status(500).json({
error:err.message
});


}


});




module.exports = router;