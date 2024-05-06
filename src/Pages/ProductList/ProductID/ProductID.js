import React, { useState, useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import './Card.css'

const ProductID = ({cart, setCart}) => {
  const [current, setCurrent] = useState({});

  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch (`http://localhost:5000/product/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setCurrent(json.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };
    
    fetchData();
  }, [id]);
  console.log(cart);

  const [options] = useState([
    { value: 'l', label: 'L' },
    { value: 'm', label: 'M' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' },
    { value: '', label: 'Clear' }
  ]);

  const addToCart = () => {
   let data=cart.find(dt=>dt._id===current._id)
   if(data){
    let newInfo=cart.map(dt=>{
      if(dt._id ===data._id){
        return {...dt,quantity:dt.quantity +1}
      }else{
        return dt
      }
    })
    localStorage.setItem('cart',JSON.stringify(newInfo))
    setCart(newInfo)
   }else{
    let newInfo=[...cart,{...current,quantity:1}];
    localStorage.setItem('cart',JSON.stringify(newInfo))
    setCart(newInfo)
   }
  };

  return (
    <>
      <div className="lg:text-2xl lg:p-4 md:p-3 p-2  bg-gray-500 lg:w-72 md:w-48 w-48   rounded-3xl border border-gray-700 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 ml-6">
        <Link
          to="/productList"
          className="back-button flex items-center text-white "
        >
          &larr;<span className=" m-auto">Back to all products</span>
        </Link>

        
      </div>
      {current ? (
  <div className="ID-container">
    <div className="pt-4 items-center relative">
    <div class="flex flex-col justify-center items-center max-w-sm mx-auto my-8 ">
  <div style={{backgroundImage: `url(${current.image})`}} 
       class="bg-gray-300 h-96 w-[60vh] rounded-lg shadow-md bg-cover bg-center object-container"></div>
  <div class="w-56 md:w-72 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
    <div class="py-2 text-center font-bold uppercase tracking-wide text-gray-800">{current.category}</div>
    <div class="flex items-center justify-between py-2 px-3 bg-gray-400 ">
      <p class="text-5ray-800 font-bold ">${current.price}</p>
      <button onClick={addToCart} class=" bg-gray-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700">Add to cart</button>
    </div>
  </div>
</div>
      
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 pt-2'>
  {options && (
    <select className="van-type bg-white drop-shadow-2xl font-abc text-xl transform hover:scale-105 transition-all duration-300 text-black px-4 lg:py-2 rounded mb-2 md:mb-0">
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  )}
</div>
     
    </div>

    <div>
    
    </div>
  </div>
) : (
  <h1>Loading....</h1>
)}

    </>
  );
};

export default ProductID;
