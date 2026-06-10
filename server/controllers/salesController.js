const mongoose = require("mongoose");

const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Ledger = require("../models/Ledger");


// CREATE SALE WITH TRANSACTION
const createSale = async (req, res) => {

  const session = await mongoose.startSession();

  try {

    session.startTransaction();


    const {
      items,
      subtotal,
      discount,
      gst,
      totalAmount
    } = req.body;



    if (!items || items.length === 0) {
      throw new Error("Cart is empty");
    }



    // 1. CHECK STOCK + UPDATE INVENTORY

    for (const item of items) {


      const product = await Product.findById(
        item.productId
      ).session(session);



      if (!product) {
        throw new Error(
          "Product not found"
        );
      }



      if(product.stock < item.quantity){

        throw new Error(
          `${product.name} stock not available`
        );

      }



      // reduce stock

      product.stock -= item.quantity;


      await product.save({
        session
      });


    }



    // 2. CREATE SALE ORDER


    const sale = await Sale.create(
      [
        {
          items,
          subtotal,
          discount,
          gst,
          totalAmount,
          date:new Date()
        }
      ],
      {
        session
      }
    );




    // 3. CREATE LEDGER ENTRY


    await Ledger.create(
      [
        {
          saleId:sale[0]._id,
          amount:totalAmount,
          type:"SALE",
          date:new Date()
        }
      ],
      {
        session
      }
    );




    // COMMIT TRANSACTION

    await session.commitTransaction();



    res.status(201).json({

      message:"Sale completed successfully",

      sale:sale[0]

    });



  }

  catch(error){


    await session.abortTransaction();


    res.status(500).json({

      message:error.message

    });


  }

  finally{

    session.endSession();

  }

};



module.exports = {
  createSale
};