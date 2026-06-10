const Product = require("../models/Product");
const redisClient = require("../config/redis");


// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {

    try {

        // Check Redis Cache
        const cachedProducts = await redisClient.get("products");


        if (cachedProducts) {

            console.log("Redis cache hit");

            return res.json(
                JSON.parse(cachedProducts)
            );
        }


        // Fetch from MongoDB
        console.log("MongoDB fetch");


        const products = await Product.find();



        // Store in Redis (5 minutes)
        await redisClient.setEx(
            "products",
            300,
            JSON.stringify(products)
        );


        res.json(products);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch products"
        });

    }

};



// ADD PRODUCT
exports.addProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);


        // Clear old cache
        await redisClient.del("products");


        res.status(201).json(product);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Failed to add product"
        });

    }

};



// UPDATE PRODUCT
exports.updateProduct = async(req,res)=>{

    try{


        const product =
        await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );


        // Remove cache
        await redisClient.del("products");


        res.json(product);



    }
    catch(error){

        res.status(500).json({
            message:"Failed to update product"
        });

    }

};



// DELETE PRODUCT
exports.deleteProduct = async(req,res)=>{


    try{


        await Product.findByIdAndDelete(
            req.params.id
        );


        // Remove cache
        await redisClient.del("products");



        res.json({
            message:"Product deleted"
        });


    }
    catch(error){


        res.status(500).json({
            message:"Failed to delete product"
        });

    }


};