import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import Modal from "react-modal";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Table = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const[searchParams,setSearchParams]= useSearchParams()
  const typeFilter=searchParams.get('category')


  const navigate = useNavigate();


  const [options] = useState([
    { value: 't-shirt', label: 'T-shirt' },
    { value: 'hoodie', label: 'Hoodie' },
    { value: 'jacket', label: 'Jacket' },
    { value: 'shoe', label: 'Shoe' },

  ]);



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
        setLoading(true)
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
      finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);


//delProduct
  const handleDel = async (id) => {
    setLoading(true);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        let apidel=await axios.delete(`http://localhost:5000/product/delete/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        closeModal();
        navigate("/table-list");
        setLoading(false);
        console.log('apidel',apidel);
        
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };


  //filter product
  const displayChar=typeFilter ?data.filter(product=>product.category.toLowerCase()===typeFilter.toLowerCase()):data;

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSearchParams({ category: selectedOption });
  };


  

  
  return (
    <>
  {loading ?(<div class="text-center">
    <div role="status">
    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only text-black">Loading...</span>
</div>
</div>):(

    <Fade cascadia duration={2000} damping={1.2} direction="bottom" className=''>
      <select className="van-type bg-white drop-shadow-2xl font-abc text-xl transform hover:scale-105 transition-all duration-300 text-black px-4 py-2 rounded mb-2" onChange={handleSelectChange} value={typeFilter}>
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs text-white uppercase  bg-[#2563EB]">
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
            {displayChar.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'even' : 'odd'}:bg-white ${index % 2 === 0 ? 'even' : 'odd'} bg-gray-100 ${index % 2 === 0 ? 'odd' : 'even'}  ${index % 2 === 0 ? 'even' : 'odd'}  border-b dark:border-gray-700`}>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-black">{item.productName}</th>
                <td className="px-6 py-4 text-black">{item._id}</td>
                
                <td className="px-6 py-4 text-black">{item.category}</td>
                <td className="w-11 h-7 px-6 py-4"><img src={item.image} alt="Product" /></td>
                <td className="px-6 py-4 text-black">{item.stockQuantity}</td>

                <td className="px-6 py-4 text-black">${item.price}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openModal(item)} className="w-full text-center px-2 py-2 border-2 rounded-lg text-xl bg-[#2563EB] border-[#2563EB] text-white  duration-700 hover:scale-110 hover:text-slate-300 hover:cursor-pointer hover:border-slate-900 hover:duration-700 flex items-center justify-center gap-2 font-bold">Edit</button>
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
                  <button className="flex items-center justify-center gap-2 w-full h-[50px] px-2 py-2 text-xl text-slate-900 border bg-[#EAD196] border-[#EAD196] rounded-lg font-semibold duration-700 hover:duration-700 hover:scale-90 hover:cursor-pointer hover:bg-pink-200 hover:text-red-400" onClick={()=>handleDel(selectedProduct._id)}>
                    delete
                  </button>
                  
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Fade>
)}
    </>
  );
};

export default Table;
