import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashborad from '../../Pages/Dashboard/Dashborad';

const Navbar = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className='flex'>
      {/* Hamburger Toggle BTN */}
      <button
        aria-controls="sidebar"
        onClick={handleToggle}
        className="z-99999 block lg:hidden rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
      >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>

</button>
{/* Hamburger Toggle BTN */}

      <div className={`bg-orange-700  h-screen p-5 pt-10  ${open ? "w-72" : "w-20"} duration-300 relative `}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-9 h-9   rounded-full top-20 bg-white absolute  text-3xl -right-5 cursor-pointer ${open && "rotate-180"}`} onClick={handleToggle}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <div className='inline-flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-9 h-9  bg-amber-300 text-4xl rounded p-1 cursor-pointer duration-500 ${open && "rotate-[360deg] "} ${!open && " w-12 h-5  "} block float-left mr-2`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <h2 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Super shop</h2>
        </div>

        <div className={`translate transform mt-11 space-y-10 overflow-hidden ${
                          !open && 'hidden'
                        }`}>
        <Link to="/dashboard" className="text-white block mb-2">Dashboard</Link>
          <Link to="/productList" className="text-white block mb-2">Product List</Link>
          <Link to="/createProduct" className="text-white block mb-2">Create Product</Link>
          <Link to="/profile" className="text-white block mb-2">Profile</Link>
          <Link to="/receive" className="text-white block mb-2">Receive</Link>
          <Link to="/dailySales" className="text-white block mb-2">Daily Sales</Link>
          <Link to="/monthlySales" className="text-white block mb-2">Monthly Sales</Link>
        </div>
      </div>

      <div>
        {/* <h1>Home page</h1> */}
      </div>
    </div>
  );
}

export default Navbar;
