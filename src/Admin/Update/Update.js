import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateProduct = () => {
  const [prodDet, setProdDet] = useState([]);
  const [stockDet, setStockDet] = useState([]);
//   const [postRequest, getRequest] = useRequest();
  const { id } = useParams();
  console.log('id',id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch (`http://localhost:5000/product/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setProdDet(json.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };
    
    fetchData();
  }, []);
  console.log('dataaaUpdate',stockDet);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch (`http://localhost:5000/stock/bypid/${id}`);
        console.log(response,'response');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setStockDet(json.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };
    
    fetchData();
  }, []);
  console.log('stock',stockDet);
  

  const handleUpdateData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const uptProductName = form.uptProductName.value;
    const uptStockQuantity = form.uptProductQuantity.value;
    const uptDescription = form.uptProductDescription.value;
    const uptBuyingPrice = form.uptProductBuyingPrice.value;
    const uptProductImage = form.uptProductImageUrl.value;

    if (
        uptProductName !== prodDet.productName ||
        uptDescription !== prodDet.description ||
        uptBuyingPrice !== prodDet.price ||
        uptProductImage !== prodDet.image
      ) {
        const uptProductDetails = {
          productName: uptProductName,
          description: uptDescription,
          price: uptBuyingPrice,
          image: uptProductImage,
        };
      
        try {
          const response = await axios.post(`http://localhost:5000/product/update/${id}`, uptProductDetails);
          console.log(response.data); 
      
          if (response) {
            Swal.fire("Product Details Updated");
            navigate("/table-list");
          }
        } catch (error) {
          console.error(error); // Log any errors if the request fails
        }
      }

      if (uptStockQuantity !== stockDet.stockQuantity) {
        const uptProdStockDetails = {
          stockQuantity: uptStockQuantity,
        };
      
        try {
          const response = await axios.post(`http://localhost:5000/stock/updateStock/${id}/${uptProdStockDetails.stockQuantity}`);
          console.log(response.data); // Assuming you want to log the response data

          setLoading(false)
      
          if (response) {
            Swal.fire("Product Stocks Updated");
            // navigate("/all-products");
          }
        } catch (error) {
          console.error(error); // Log any errors if the request fails
        }
      }
      
  };

  return (
    <>
    {loading?(<div class="text-center">
    <div role="status">
    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
</div>):(<div className="">
        <h2 className="text-purple-500 font-bold text-3xl text-center">Super Shop | Update Product</h2>
        <div className="px-4 py-2">
          <div className="py-2 relative ">
          <div className=" md:none none lg:absolute  top-0 right-32 ">
              <Link to="/table-list ">
                <button className="duration-700 px-10 py-2 rounded-lg border-2 border-transparent text-lg bg-[#4f81ed] font-extrabold tracking-widest hover:bg-transparent text-slate-100 hover:text-[#4f81ed] hover:border-[#4f81ed] hover:duration-700 hover:cursor-pointer">
                  See All Products
                </button>
              </Link>
            </div>
          </div>
          <div className="w-10/12 mx-auto mt-5 p-4 ">
            <form onSubmit={handleUpdateData}>
              <div className=" flex gap-2 ">
                <div className="w-full">

                <label className="font-bold  font">Product Name:</label>
                <input
                  className="mb-4 w-full py-2 px-4 text-sm font-semibold tracking-widest rounded-lg bg-transparent text-slate-900 border-2 border-[#3000C0] placeholder:text-sm"
                  type="text"
                  name="uptProductName"
                  placeholder="Product Name"
                  defaultValue={prodDet.productName}
                />
                </div>
                <div className="w-full ">

              <label className="font-bold font">Product Quantity:</label>

                <input
                  className="mb-4 w-full py-2 px-4 text-sm font-semibold tracking-widest rounded-lg bg-transparent text-slate-900 border-2 border-[#3000C0] placeholder:text-sm"
                  type="number"
                  name="uptProductQuantity"
                  placeholder="Product Quantity"
                  defaultValue={stockDet.stockQuantity}
                />
                </div>
              </div>
              <label className="font-bold font">Product Description:</label>

              <textarea
                className="h-[150px] mb-4 w-full py-2 px-4 text-sm font-semibold tracking-widest rounded-lg bg-transparent text-slate-900 border-2 border-[#3000C0] placeholder:text-sm"
                type="text"
                name="uptProductDescription"
                placeholder="Product Description"
                defaultValue={prodDet.description}
              />
              <div className="flex gap-2">
                <div className="w-full">

              <label className="font-bold font">Product Price:</label>

                <input
                  className="mb-4 w-full py-2 px-4 text-sm font-semibold tracking-widest rounded-lg bg-transparent text-slate-900 border-2 border-[#3000C0] placeholder:text-sm"
                  type="number"
                  name="uptProductBuyingPrice"
                  placeholder="Product Buying Price"
                  defaultValue={prodDet.price}
                />
                </div>
                <div className="w-full">

                  <label className="font-bold font">Product Image:</label>

                <input
                  className="mb-4 w-full py-2 px-4 text-sm font-semibold tracking-widest rounded-lg bg-transparent text-slate-900 border-2 border-[#3000C0] placeholder:text-sm"
                  type="text"
                  name="uptProductImageUrl"
                  placeholder="Image URL"
                  defaultValue={prodDet.image}
                />
                </div>
              </div>
              <div className="w-48 mt-5   ">
                <input
                  className="duration-700 w-full py-2 text-center border border-transparent bg-[#4f81ed] text-sm rounded-lg text-[#ffffff] font-extrabold tracking-widest hover:bg-transparent hover:border-[#4f81ed] hover:text-[#4f81ed] hover:cursor-pointer hover:duration-700 "
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
           
          </div>
        </div>
      </div>)}
    </>
    
  );
};

export default UpdateProduct;