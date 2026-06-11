import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./NewSale.css";


function NewSale() {


  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState("");
  const [quantity,setQuantity] = useState("");
  const [selectedProduct,setSelectedProduct] = useState(null);
  const [cart,setCart] = useState([]);


  const navigate = useNavigate();



  useEffect(()=>{

    fetchProducts();

  },[]);



  // Keyboard shortcuts
  useEffect(()=>{


    const handleKeyboard=(event)=>{


      // Enter = Add To Cart
      if(event.key === "Enter"){

        event.preventDefault();

        addToCart();

      }



      // F2 = Complete Sale
      if(event.key === "F2"){

        event.preventDefault();

        completeSale();

      }


    };



    window.addEventListener(
      "keydown",
      handleKeyboard
    );



    return ()=>{


      window.removeEventListener(
        "keydown",
        handleKeyboard
      );


    };


  },[
    selectedProduct,
    quantity,
    cart
  ]);





  const fetchProducts = async()=>{


    try{


      const res = await API.get("/products");

      setProducts(res.data || []);


    }
    catch(err){


      console.log(err);

      alert("Failed to load products");


    }


  };





  const filteredProducts = products.filter(product=>


    product.name
    .toLowerCase()
    .startsWith(search.toLowerCase())


  );






  const addToCart = ()=>{


    if(!selectedProduct || !quantity){


      alert("Select product and quantity");

      return;


    }



    const item={


      productId:selectedProduct._id,

      name:selectedProduct.name,

      price:selectedProduct.price,

      quantity:Number(quantity),

      total:selectedProduct.price * Number(quantity)


    };



    setCart([
      ...cart,
      item
    ]);



    setSearch("");

    setQuantity("");

    setSelectedProduct(null);


  };





  const removeItem=(index)=>{


    setCart(

      cart.filter(
        (_,i)=>i!==index
      )

    );


  };






  const subtotal = cart.reduce(

    (sum,item)=>

    sum + item.total,

    0

  );



  const discount =

  subtotal > 1000

  ?

  subtotal * 0.1

  :

  0;





  const gst =

  (subtotal-discount)*0.18;





  const finalAmount =

  subtotal-discount+gst;








  const completeSale = async()=>{


    try{


      if(cart.length===0){


        alert("Cart is empty");

        return;


      }





      await API.post("/sales",{


        items:cart,

        subtotal,

        discount,

        gst,

        totalAmount:finalAmount


      });





      alert("Sale Completed Successfully");



      setCart([]);


      fetchProducts();


    }
    catch(err){


      console.log(err);



      alert(

        err.response?.data?.message ||

        "Failed to complete sale"

      );


    }


  };







return(


<div className="container">


<div className="newsale-card">



<div className="newsale-header">


<button

className="back-btn"

onClick={()=>navigate(-1)}

>

⬅ Back

</button>



<h1>

New Sale

</h1>



</div>






<input

className="newsale-input"

placeholder="Search Product"

value={search}


onChange={(e)=>{


setSearch(e.target.value);


setSelectedProduct(null);


}}


/>







{

search && !selectedProduct &&


<div className="suggestion-box">


{

filteredProducts.length ?


filteredProducts.map(product=>(


<div


key={product._id}


className="suggestion-item"



onClick={()=>{


setSelectedProduct(product);


setSearch(product.name);



}}



>


{product.name}


</div>



))


:


<div className="no-data">


No product found

</div>


}


</div>


}








<input


className="newsale-input"


type="number"


placeholder="Quantity"


value={quantity}



onChange={(e)=>

setQuantity(e.target.value)

}


/>







{

selectedProduct &&


<div className="details-box">


<h3>

Product Details

</h3>



<p>

Name : {selectedProduct.name}

</p>



<p>

Price : ₹{selectedProduct.price}

</p>



<p>

Stock : {selectedProduct.stock}

</p>




<p>

Amount : ₹

{

selectedProduct.price *

(Number(quantity)||0)

}

</p>


</div>



}







<button


className="add-btn"


onClick={addToCart}


>

Add To Cart

</button>






<div className="cart-section">


<h2>

Cart

</h2>




{

cart.length===0 &&

<p>

No products added

</p>

}





{


cart.map((item,index)=>(



<div

className="cart-item"

key={index}

>


<div>


<strong>

{item.name}

</strong>


<p>

₹{item.price} × {item.quantity}

</p>



<p>

Total : ₹{item.total}

</p>



</div>





<button


className="remove-btn"


onClick={()=>removeItem(index)}


>


Remove


</button>



</div>




))


}



</div>







<div className="bill-box">


<h3>

Bill Summary

</h3>



<p>

Subtotal : ₹{subtotal.toFixed(2)}

</p>


<p>

Discount : ₹{discount.toFixed(2)}

</p>



<p>

GST : ₹{gst.toFixed(2)}

</p>




<hr/>




<h2>

Final Amount : ₹{finalAmount.toFixed(2)}

</h2>




</div>








<button


className="sale-btn"


onClick={completeSale}


>


Complete Sale

</button>




<p className="shortcut">

Press ENTER = Add Cart | Press F2 = Complete Sale

</p>




</div>


</div>



);


}


export default NewSale;