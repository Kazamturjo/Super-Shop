import axios from 'axios';
import React, { useState } from 'react';

const CreateProduct = () => {
  const [data, setData] = useState({
    productName: '',
    description: '',
    price: '',
    status: true,
    isActive: true,
    isDeleted: false,
    createDate: new Date(),
    deleteDate: '',
    category: '',
    image: '',
    stock:'0'
  });

  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

  };
  const handleSubmit = (e) => {
    e.preventDefault();
   

      
    axios.post(`http://localhost:5000/product/add/${data.stock}`, data)
    .then((response) => {
      console.log('product added sucessful', response);

      setData({
        productName: '',
        description: '',
        price: '',
        status: true,
        isActive: true,
        isDeleted: false,
        createDate: new Date(),
        deleteDate: '',
        category: '',
        image: '',
      });
    })
    .catch((err) => {
      console.error('Error adding product', err);
    });
  };

  return (
    <div className="container mx-auto bg-gray-100">
      <form className="max-w-lg mx-auto p-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            required
            name="productName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={data.productName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="price"
          >
            Price
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Price"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            required
            name="stock"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Stock"
            value={data.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <textarea
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="imageUrl">
            Image URL:
          </label>
          <input
            name="image"
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            id="imageUrl"
            value={data.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="category"
          >
            Category
          </label>
          <select
            required
            name='category' 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="t-shirt">T-shirt</option>
            <option value="hoddie">Hoddie</option>
            <option value="jacket">Jacket</option>
            <option value="shoe">Shoe</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
