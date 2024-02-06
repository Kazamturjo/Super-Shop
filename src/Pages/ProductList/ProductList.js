import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data', err);
      });
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((product, index) => (
        <Link to={`/product/${product.id}`} key={index} className="card-link">
          <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full flex flex-col">
            <img
              src={product.image}
              alt={product.description}
              className="w-full h-auto object-cover mb-4"
            />
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p
                className={`text-gray-600 ${
                  expandedIndex === index ? 'block' : 'hidden'
                }`}
              >
                {product.description}
              </p>
              <p className="font-bold">${product.price}</p>
            </div>
            <div className="flex justify-center gap-6">
              <button
                className="mt-2 text-blue-500 cursor-pointer"
                onClick={() => toggleDescription(index)}
              >
                {expandedIndex === index ? 'See Less' : 'See More'}
              </button>
              <button
                className="mt-2 text-blue-500 cursor-pointer"
                onClick={() => toggleDescription(index)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
