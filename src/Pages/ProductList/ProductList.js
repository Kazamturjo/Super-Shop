import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('category');

  const [options] = useState([
    { value: 't-shirt', label: 'T-shirt' },
    { value: 'hoodie', label: 'Hoodie' },
    { value: 'jacket', label: 'Jacket' },
    { value: 'shoe', label: 'Shoe' },
    { value: '', label: 'Clear' }
  ]);

  const filterData = (selectedOption) => {
    if (!selectedOption) return data; // If no option selected, return all data
    return data.filter(product => product.category && product.category.toLowerCase() === selectedOption.toLowerCase());
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

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSearchParams({ category: selectedOption });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-black font-abc lg:py-20 mb-8">Explore our Product options</h1>
      <select className="van-type bg-white drop-shadow-2xl font-abc text-xl transform hover:scale-105 transition-all duration-300 text-black px-4 py-2 rounded mb-2 md:mb-0" onChange={handleSelectChange} value={typeFilter}>
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ml-4">
        {filterData(typeFilter).map((product, index) => (
          <Link to={`/product/${product._id}`} key={index} className="card-link">
            <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <a
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                href="#"
              >
                <img
                  className="peer absolute top-0 right-0 h-70vh w-full object-cover"
                  src={product.image}
                  alt="product image"
                />

                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  39% OFF
                </span>
              </a>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900">
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
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
