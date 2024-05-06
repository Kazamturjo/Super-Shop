import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layoyut = ({cart,setCart}) => {
  // const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Navbar cart={cart} setCart={setCart}/>
       
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header cart={cart} setCart={setCart}/>

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layoyut