import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link, useSearchParams } from 'react-router-dom';
import { Swal } from 'sweetalert2';

const ProductList = ({cart,setCart}) => {

  
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('category');

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 4;
  

  const paginate=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }

  

  const [options] = useState([
    { value: 't-shirt', label: 'T-shirt' },
    { value: 'hoodie', label: 'Hoodie' },
    { value: 'jacket', label: 'Jacket' },
    { value: 'shoe', label: 'Shoe' },

  ]);

  const filterData = (selectedOption) => {
    if (!selectedOption) return data; // If no option selected, return all data
    return data.filter(product => product.category && product.category.toLowerCase() === selectedOption.
    toLowerCase());
    
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/all?page=1&pageSize=100');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
    
  const indexOfLastProduct = currentPage * productPerPage;
const indexOfFirstProduct = indexOfLastProduct - productPerPage;
const currentProducts = filterData(typeFilter).slice(indexOfFirstProduct, indexOfLastProduct);


  useEffect(() => {
    try {
      const storedData = localStorage.getItem('cart');
      if (storedData) {
        setCart(JSON.parse(storedData));
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      setCart([]);
    }
  }, [])


  

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSearchParams({ category: selectedOption });
  };
   

  //add to cart button
  const addToCart = (product) => {
    // Prompt user to enter quantity
    const quantity = prompt('Enter the Quantity:', '1');
    
    // Check if quantity is valid
    if (quantity === null || quantity === "") {
      Swal.fire('Invalid Quantity');
      return;
    }
    const parseQuantity = parseInt(quantity);
    if (isNaN(parseQuantity) || parseQuantity <= 0) {
      Swal.fire("Invalid Quantity Amount");
      return;
    }
  
    // Prompt user to enter selling price
    const sellingPrice = prompt("Enter the selling price", `${product.price}`);
    if (sellingPrice === null || sellingPrice === '') {
      Swal.fire('Invalid Price');
      return;
    }
    const parseSellingPrice = parseInt(sellingPrice);
    if (isNaN(parseSellingPrice)) {
      Swal.fire("Invalid Price Amount");
      return;
    }
  
    // Retrieve cart from localStorage or initialize an empty array
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product is already in the cart
    const existingProductIndex = carts.findIndex(item => item._id === product._id);
  
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity and total selling price
      carts[existingProductIndex].quantity += parseQuantity;

      carts[existingProductIndex].totalSellingPrice += parseSellingPrice * parseQuantity;
    } else {
      // If the product is not in the cart, add it
      carts.push({
        ...product,
        quantity: parseQuantity,
        sellingPrice: parseSellingPrice,
        totalSellingPrice: parseSellingPrice * parseQuantity
      });
    }
  
    // Update cart in localStorage
    setCart(carts)
    localStorage.setItem("cart", JSON.stringify(carts));
  
    // Optionally, you can provide feedback to the user that the product has been added to the cart
    // Swal.fire("Product added to cart!");
  }
  

  return (
    <Fade cascadia duration={2000} damping={1.2} direction="left" >

    <div className='bg-gray-200 p-2 lg:mt-24'>
      <h1 className="lg:text- 3xl text-xl font-bold text-center  text-black ">Explore our Product options</h1>
      <select className="van-type bg-white drop-shadow-2xl font-abc text-xl transform hover:scale-105 transition-all duration-300 text-black px-4 py-2 rounded mb-2 md:mb-0" onChange={handleSelectChange} value={typeFilter}>
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
      <Fade cascadia duration={2000} damping={1.2} direction="left" >

        {currentProducts.map((product, index) => (
          <div className="group my-2 flex flex-wrap w-full max-w-prose flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <Link to={`/product/${product._id}`} key={index} className="card-link">
                
              <div
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                
                >
                <img
                  className="peer absolute top-0 right-0 h-70vh w-full object-cover"
                  src={product.image}
                  alt="product image"
                  />

                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  39% OFF
                </span>
              </div>
                  </Link>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900 font-bold">
                    {product.productName}
                  </h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      {product.price}
                    </span>
                    <span className="text-sm text-slate-900 line-through">$99</span>
                  </p>
                </div>

                <div
                  
                  className="flex justify-end"
                >
                 
                  <button onClick={()=>addToCart(product)} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-abc focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add to cart</button>
                  
                </div>
              </div>
            </div>
        ))}
        </Fade>
      </div>
      <div className="flex justify-center mt-7">
          {Array.from(
    { length: Math.ceil(filterData(typeFilter).length / productPerPage) },
    (_, index) => (
      <Fade cascadia duration={2000} damping={1.2} direction="left" >

              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none ${
                  currentPage === index + 1 ? "bg-gray-400" : ""
                }`}
              >
                {index + 1}
              </button>
              </Fade>
            )
          )}
        </div>
    </div>
    </Fade>
  );
};

export default ProductList;
