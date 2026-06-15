import { useEffect, useState } from "react";
import API from "../api/api";

function StockManagement() {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {

    try {

      const res = await API.get("/products");

      setProducts(res.data);


    } catch(error){

      console.log(error);

    }

  };


  const deleteProduct = async(id)=>{

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if(!confirmDelete) return;


    try{

      const token = localStorage.getItem("token");


      await API.delete(`/products/${id}`,{

        headers:{
          Authorization:`Bearer ${token}`
        }

      });


      alert("Product deleted");


      getProducts();


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };



  return (

    <div style={{padding:"30px"}}>

      <h1>
        Stock Management
      </h1>


      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>
              Product
            </th>

            <th>
              SKU
            </th>

            <th>
              Price
            </th>

            <th>
              Stock
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>



        <tbody>


        {
          products.map(product=>(

          <tr key={product._id}>


            <td>
              {product.name}
            </td>


            <td>
              {product.sku}
            </td>


            <td>
              ₹{product.price}
            </td>


            <td>
              {product.stock}
            </td>


            <td>

            {
              product.stock <= 5
              ?
              "Low Stock"
              :
              "Available"

            }

            </td>


            <td>

              <button

              onClick={()=>deleteProduct(product._id)}

              style={{

                background:"red",
                color:"white",
                border:"none",
                padding:"8px",
                borderRadius:"5px",
                cursor:"pointer"

              }}

              >

              Delete

              </button>


            </td>


          </tr>


          ))

        }


        </tbody>


      </table>


    </div>

  );

}


export default StockManagement;