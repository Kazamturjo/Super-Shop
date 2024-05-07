import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart,toggleCart }) => {

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="flex justify-center mt-8 fixed    ">
      <div className="relative z-10" aria-labelledby="slide-over-title" >
        {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div> */}
        <div className="fixed overflow-hidden">
          <div className="absolute  overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
              <div className="w-96 pointer-events-auto  ">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 px-4 py-6 sm:px-6">
                    <div className="lg:flex items-start justify-between">
                      <h2 className="text-lg font-medium font-abc text-gray-900" id="slide-over-title">Shopping cart</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button onClick={toggleCart} type="button" className=" relative text-gray-800 hover:text-gray-500">
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y font-abc divide-gray-200">
                          {cart.map((dt) => (
                            <li className="flex py-6" key={dt._id}>
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={dt.image} alt=''/>
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{dt.productName}</h3>
                                    <p className="text-purple-500 font-semibold">${(dt.price * dt.quantity).toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{dt.description}</p>
                                </div>
                                <div className="flex flex-1 items-center justify-between text-sm">
                                  <p className="text-gray-500">{dt.quantity} items</p>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => handleDecreaseQuantity(dt._id)}
                                    >
                                     <svg className="h-5 w-5 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => handleIncreaseQuantity(dt._id)}
                                    >
                                      <svg className="h-5 w-5 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => handleRemoveItem(dt._id)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 hover:scale-110">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
</svg>


                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex font-abc justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Total Price: ${calculateTotalPrice()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 font-abc ">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link to='.' className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 font-abc">Checkout</Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button type="button" className="font-medium font-abc text-indigo-600 hover:text-indigo-500">
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
