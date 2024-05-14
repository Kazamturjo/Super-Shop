import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Modal from "react-modal";
import { Link } from 'react-router-dom';

const Table = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsUrl = 'http://localhost:5000/product/all?page=1&pageSize=100';
        const stocksUrl = 'http://localhost:5000/stock/all/?page=1&pageSize=100';

        const [productsResponse, stocksResponse] = await Promise.all([
          fetch(productsUrl),
          fetch(stocksUrl)
        ]);

        if (!productsResponse.ok || !stocksResponse.ok) {
          throw new Error('One or more API requests failed');
        }

        const productsData = await productsResponse.json();
        const stocksData = await stocksResponse.json();

        const mergedData = productsData.data.map((product) => {
          const stock = stocksData.data.find((stock) => stock.product_id === product._id);
          
          console.log(stock, 's')
          if (stock) {
            return {
              ...product,
              stockId: stock._id,
              stockQuantity: stock.stockQuantity,
            };
          } else {
            return { ...product, stockId: null, stockQuantity: 0 }; 
          }
        });

        setData(mergedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <Fade cascadia duration={2000} damping={1.2} direction="bottom">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product name</th>
              <th scope="col" className="px-6 py-3">ProductID</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">stockId</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'even' : 'odd'}:bg-white ${index % 2 === 0 ? 'even' : 'odd'} bg-gray-900 ${index % 2 === 0 ? 'odd' : 'even'}  ${index % 2 === 0 ? 'even' : 'odd'} bg-gray-800 border-b dark:border-gray-700`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.productName}</th>
                <td className="px-6 py-4">{item._id}</td>
                
                <td className="px-6 py-4">{item.category}</td>
                <td className="w-11 h-7 px-6 py-4"><img src={item.image} alt="Product" /></td>
                <td className="px-6 py-4">{item.stockQuantity}</td>

                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openModal(item)} className="w-full text-center px-2 py-2 border-2 rounded-lg text-xl bg-[#EAD196] border-[#EAD196] text-slate-900 duration-700 hover:scale-110 hover:text-slate-900 hover:cursor-pointer hover:border-slate-900 hover:duration-700 flex items-center justify-center gap-2 font-bold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              padding:"20px",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          {selectedProduct && (
            <div className="w-[800px] h-[80vh] text-center">
              <img className="w-[30vh] h-[30vh] object-cover m-auto p-11" src={selectedProduct.image} alt="" />
              <div className="mt-5">
                <h2 className="text-2xl font-semibold text-slate-700">Name: <span className="font-normal">{selectedProduct.productName}</span></h2>
                <p className="text-lg font-bold text-slate-700 h-[100px] overflow-y-auto">Description: <span className="font-normal">{selectedProduct.description}</span></p>
                <p className="text-lg font-bold text-slate-700 h-[100px] overflow-y-auto">StockQuantity: <span className="font-normal">{selectedProduct.stockQuantity}</span></p>
                <p className="mt-5 text-md font-bold text-slate-700">Price: <span className="font-normal">{selectedProduct.price}$</span></p>
                <div className="mt-5 flex flex-col-4 gap-4">
                  <button className="flex items-center justify-center gap-2 w-full h-[50px] px-2 py-2 text-xl text-slate-900 border bg-[#EAD196] border-[#EAD196] rounded-lg font-semibold duration-700 hover:duration-700 hover:scale-90 hover:cursor-pointer hover:bg-pink-200 hover:text-red-400" onClick={closeModal}>
                    Close Modal
                  </button>
                  <Link to={`/update/${selectedProduct._id}`} className='w-full'>
                  <div className="flex items-center justify-center gap-2 w-full h-[50px] px-2 py-2 text-xl text-slate-900 border bg-[#EAD196] border-[#EAD196] rounded-lg font-semibold duration-700 hover:duration-700 hover:scale-90 hover:cursor-pointer hover:bg-pink-200 hover:text-red-400" >
                    Update
                  </div>
                  </Link>
                  <button className="flex items-center justify-center gap-2 w-full h-[50px] px-2 py-2 text-xl text-slate-900 border bg-[#EAD196] border-[#EAD196] rounded-lg font-semibold duration-700 hover:duration-700 hover:scale-90 hover:cursor-pointer hover:bg-pink-200 hover:text-red-400" onClick={closeModal}>
                    delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Fade>
  );
};

export default Table;
