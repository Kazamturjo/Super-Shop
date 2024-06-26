import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };
  
  return (
    <div className="flex">
      <div
        className={` bg-gray-900 h-screen p-5  z-10   ${
          open ? 'w-72' : 'w-20'
        } duration-500 relative `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-9 h-9  rounded-full top-20 z-10 bg-white absolute  text-3xl -right-5 cursor-pointer ${
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
        <Link to="/">
          <div className="inline-flex mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-9 h-9  bg-purple-400  text-4xl font-bold p-1 rounded  cursor-pointer duration-500 hover:scale-105 ${
                open && 'rotate-[360deg] '
              } ${!open && 'w-9 h-9'} block float-left  mr-2 `}
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>

            <Link
              to="/"
              className={`text-white origin-left font-medium text-2xl duration-300 hover:scale-105 ${
                !open && 'scale-0 hidden'
              }`}
            >
              Super Shop
            </Link>
          </div>
        </Link>

        <h3 className="mt-20 text-gray-500 text-lg font-semibold ">MENU</h3>
        <div className="translate transform mt-3 overflow-hidden  ">
          <Link to="/" className="">
            <div className="inline-flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-9 h-9  text-black bg-gray-300 text-4xl rounded p-1 cursor-pointer duration-500 hover:scale-105 ${
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
                to="/"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Dashboard
              </Link>
            </div>
          </Link>

          <Link to="/productList">
            <div className="inline-flex mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-9 h-9 hover:scale-105  text-black bg-gray-300 text-4xl rounded  p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/productList"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                ProductList
              </Link>
            </div>
          </Link>
          <div className="mt-4">
            <hr />
          </div>

          <h3 className=" mt-4 text-gray-500 text-lg font-semibold text-bodydark2">
            ADMIN
          </h3>
          <Link to="/table-list">
            <div className="inline-flex mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-9 h-9 hover:scale-105  text-black bg-gray-300 text-4xl rounded  p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
                  clipRule="evenodd"
                />
              </svg>

              <Link
                to="/table-list"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                List/Table
              </Link>
            </div>
          </Link>
          <Link to="/createProduct">
            <div className="inline-flex mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-9 h-9  text-black text-4xl bg-gray-300 hover:scale-105  rounded  p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/createProduct"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Create Prodct
              </Link>
            </div>
          </Link>

          <Link to="/profile">
            <div className="inline-flex mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-9 h-9  bg-gray-300 text-4xl rounded text-black p-1 cursor-pointer duration-500 hover:scale-105  ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/profile"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-110 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Profile
              </Link>
            </div>
          </Link>
            
          {/* <Link to="/selles">
            <div className="flex mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-9 h-9  bg-gray-300 text-4xl hover:scale-105 rounded text-black p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}>
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
</svg>

              <Link
                to="/selles"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Sells
              </Link>
            </div>
          </Link> */}

          <Link to="/receipt">
            <div className="flex mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-9 h-9  bg-gray-300 text-4xl hover:scale-105 rounded text-black p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  fillRule="evenodd"
                  d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/receipt"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Receipt
              </Link>
            </div>
          </Link>
          <Link to="/dailySales">
            <div className="inline-flex mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-9 h-9  bg-gray-300 text-4xl hover:scale-105 rounded text-black p-1 cursor-pointer duration-500 ${
                  open && 'rotate-[360deg] '
                } ${!open && 'w-7 h-7'} block float-left mr-2`}
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/dailySales"
                className={`text-white origin-left font-medium text-xl duration-300 hover:scale-105 ${
                  !open && 'scale-0 hidden'
                }`}
              >
                Daily&MonthSall
              </Link>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
