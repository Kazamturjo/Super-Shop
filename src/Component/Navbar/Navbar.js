import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashborad from '../../Pages/Dashboard/Dashborad';
import ProductList from '../../Pages/ProductList/ProductList';
import DailyMonthSall from '../../Pages/Daily Sall & Month/DailyMonthSall';

const Navbar = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
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

      <div
        className={`bg-orange-700  h-screen p-5 pt-10  ${
          open ? 'w-72' : 'w-20'
        } duration-300 relative `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-9 h-9   rounded-full top-20 bg-white absolute  text-3xl -right-5 cursor-pointer ${
            open && 'rotate-180'
          }`}
          onClick={handleToggle}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-9 h-9  bg-amber-300 text-4xl rounded p-1 cursor-pointer duration-500 ${
              open && 'rotate-[360deg] '
            } ${!open && 'w-11 h-7'} block float-left mr-2`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <h2
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Super shop
          </h2>
        </div>

        <div className="translate transform mt-11 space-y-10 overflow-hidden">
          <Link to="/dashboard">
            <div className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-9 h-9  text-black bg-red-300 text-4xl rounded  p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                />
              </svg>
              <Link
                to="/dashboard"
                className={`text-white origin-left font-medium text-xl duration-300 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Dashboard
              </Link>
            </div>
          </Link>
         
          <div className="inline-flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  text-black bg-red-300 text-4xl rounded  p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
</svg>

            <Link
              to="/productList"
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0 hidden'
              }`}
            >
              ProductList
            </Link>
          </div>
          <div className="inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  text-black text-4xl bg-red-300  rounded  p-1 cursor-pointer duration-500 ${
                open && 'rotate-[360deg] '
              } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
</svg>


            <Link
              to="/createProduct"
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0 hidden'
              }`}
            >
              Create Prodct
            </Link>
          </div>
          <div className="inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  bg-red-300 text-4xl rounded text-black p-1 cursor-pointer duration-500 ${
                open && 'rotate-[360deg] '
              } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg>

            <Link
              to="/profile"
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0 hidden'
              }`}
            >
              profile
            </Link>
          </div>
          <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  bg-red-300 text-4xl rounded text-black p-1 cursor-pointer duration-500 ${
                open && 'rotate-[360deg] '
              } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
</svg>

            <Link
              to="/cart"
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0 hidden'
              }`}
            >
              cart{' '}
            </Link>
          </div>
          <div className="inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  bg-red-300 text-4xl rounded text-black p-1 cursor-pointer duration-500 ${
                open && 'rotate-[360deg] '
              } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" clipRule="evenodd" />
</svg>


            <Link
              to="/receive"
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0 hidden'
              }`}
            >
              Receive{' '}
            </Link>
          </div>
          <div className="inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  bg-red-300 text-4xl rounded text-black p-1 cursor-pointer duration-500 ${
                open && 'rotate-[360deg] '
              } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
</svg>

            <Link
              to="/dailySales"
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0 hidden'
              }`}
            >
              DailyMonthSall
            </Link>
          </div>{' '}
        </div>
      </div>

      <div>{/* <h1>Home page</h1> */}</div>
    </div>
  );
};

export default Navbar;
