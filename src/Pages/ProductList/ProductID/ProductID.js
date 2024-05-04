import React, { useState, useEffect } from 'react';
import { Link, useParams, NavLink, Outlet } from 'react-router-dom';
// import "./ProductID.css";
import axios from 'axios';

const ProductID = () => {

  const [cart, setCart] = useState([]);
  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#161616',
  };
  const { id } = useParams();
  const [current, setCurrent] = useState(null);

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

  const addToCart = (current) => {
    setCart((prev) => {
      const newCart = [...prev, current];
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <>
      <div className="text-2xl p-4  bg-gray-500 w-72 rounded-3xl border border-gray-700 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
        <Link
          to="/productList"
          className="back-button flex items-center text-white"
        >
          &larr;<span className="ml-2">Back to all products</span>
        </Link>

        {/* Uncomment this section if you want a Go to Cart button */}
        {/* <Link to="/cart" className="Goto-button text-white mt-2 block">
    <span>Go to cart →</span>
  </Link> */}
      </div>
      {current ? (
        <div className="ID-container">
          <div className="pt-4 items-center">
            <img
              src={current.image}
              style={{ width: '300px', margin: '20px' }}
              alt=""
            />
            <div className="host-van-detail-info-text">
              <i>{current.category}</i>
              <p className="pt-4 font-bold">${current.price}</p>
            </div>
            <div className="flex-grow">
              <h3 className="text-3xl font-extrabold mb-4 text-gray-800 leading-tight hover:text-blue-500 transition duration-300 ease-in-out pt-4 transform hover:scale-105">
                {current.title}
              </h3>
              <p className="text-gray-700 text-lg pt-4 leading-relaxed mb-6 whitespace-normal">
                {current.description}
              </p>
            </div>
          </div>
          {/* <nav className="detail-nav">
            <NavLink
              to="."
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Pricing
            </NavLink>
          </nav> */}

          <div>
            <button
              onClick={() => addToCart(current)}
              className="add-btn px-4 py-2 text-base font-bold text-white bg-blue-500 border-none rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none"
            >
              Add to Cart
            </button>
          </div>

          <Outlet context={{ current }} />
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
};

export default ProductID;
