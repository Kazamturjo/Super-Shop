import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Fade } from 'react-awesome-reveal';
import { CardContent, Divider, Grid, Paper, Typography } from '@mui/material';


const Cart = ({ toggleCart }) => {
  const [sales, setSales] = useState([]);
  const [salesPush, setSalesPush] = useState([]);
  const [salesIdNeedToPush, setsalesIdNeedToPush] = useState([]);
  const [flagCheck, setFlagCheck] = useState([]);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("cart")) || [];
    setSales(storedSales);
    // const storedSales1 = JSON.parse(localStorage.getItem("salesPush")) || [];
    // setSalesPush(storedSales1);
  }, []);

  const totalQuantity = sales.reduce(
    (total, sale) => total + sale.quantitySold,
    0
  );

  const totalQuantityOriginal = sales.reduce(
    (total, sale) => total + sale.originalQuantity,
    0
  );

  const totalPrice = sales.reduce(
    (total, sale) => total + sale.salePrice * sale.quantitySold,
    0
  );
  const totalCost = sales.reduce(
    (total, sale) => total + sale.costPrice * sale.quantitySold,
    0
  );
  const totalDiscount = sales.reduce(
    (total, sale) => total + sale.discount * sale.quantitySold,
    0
  );
  const revenue = totalPrice - totalDiscount;
  const profit = revenue - totalCost;

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const handleInputChange = (e) => {
    setDeleteInput(e.target.value);
  };

  const handleCloseModal = () => {
    setDeleteInput("");
    setOpen(false);
    setOpen1(false);
  };

  const isDeleteInputValid = deleteInput.trim().toLowerCase() === "delete";

  // const handleDeleteProduct = async () => {
  //   try {
  //     sales.map(async (individualSaleID) => {});
  //     setOpen(false);
  //     alert("Succcessfully emptyed cart.");
  //     localStorage.setItem("cart", JSON.stringify([]));
  //     localStorage.setItem("salesPush", JSON.stringify([]));
  //     setSales([]);
  //     setSalesPush([]);
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     alert("Error deleting product!");
  //   }
  // };

  const handelDeleteIndividualProduct = async (needToDeleteSaleID) => {
    console.log(needToDeleteSaleID);
    const updatedSales = sales.filter(
      (sale) => !needToDeleteSaleID.includes(sale.productId)
    );

    
    localStorage.setItem("cart", JSON.stringify(updatedSales));
    setSales(updatedSales);
  };

  const updateQuantity = (saleId, newQuantity) => {
    const updatedSales = sales.map((sale) => {
      if (sale.productId === saleId) {
        return { ...sale, quantitySold: newQuantity };
      }
      return sale;
    });

    const allProductsValid = updatedSales.every(
      (sale) => sale.originalQuantity >= sale.quantitySold
    );
    console.log(!allProductsValid);

    setSales(updatedSales);
    setFlagCheck(allProductsValid);

    localStorage.setItem("cart", JSON.stringify(updatedSales));
  };

  const handelConfirm = async () => {
    try {
      var salesIdPush = [];
      const postRequests = sales.map(async (getIndividualOrder) => {
        const dataPush = {
          productId: getIndividualOrder.productId,
          quantitySold: getIndividualOrder.quantitySold,
          salePrice: getIndividualOrder.salePrice,
        };
        const apiUrlPush = `http://localhost:5000/sales/registerSales/${getIndividualOrder.discount}`;
        try {
          const response = await axios.post(apiUrlPush, dataPush);
          console.log('respnse',response)
          const saleIdsArrayOfObject = {
            saleId: response.data.data._id,
          };
          salesIdPush = [...salesIdPush, saleIdsArrayOfObject];
          setsalesIdNeedToPush(salesIdPush);
        } catch (err) {
          console.error(err);
          // alert("SOMETHING WRONG2");
        }
      });

      Promise.all(postRequests)
        .then(async () => {
          try {
            const creatingReceipt = await axios.post(
              `http://localhost:5000/receipt/crtrct`,
              salesIdPush
            );
            setOpen1(false);
            console.log(creatingReceipt.data.data);
            localStorage.setItem("cart", JSON.stringify([]));
            // localStorage.setItem("salesPush", JSON.stringify([]));
            setSales([]);
           

            // window.location.href = `/cart/checkoutinfo/${creatingReceipt.data.data.receiptNumber}`;
          } catch (error) {
            alert("SOMETHING WRONG1");
            console.log(error);
          }
        })
        .catch((error) => {
          console.error("Error during requests:", error);
        });
    } catch (error) {
      console.log(error);
      alert("Something wrong happened");
    }
  };

  console.log('sale',sales);
  
  return (
    <Fade cascadia duration={1000} damping={2.2} direction="bottom" >

    <div className="flex justify-center mt-8 fixed    ">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="relative z-10" aria-labelledby="slide-over-title">
        <div className="fixed overflow-hidden">
          <div className="absolute  overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
              <div className="w-[500px] pointer-events-auto  ">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 px-4 py-6 sm:px-6">
                    <div className="lg:flex items-start justify-between">
                      <h2
                        className="text-lg font-medium font-abc text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          onClick={toggleCart}
                          type="button"
                          className=" relative text-gray-800 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y font-abc divide-gray-200 grid grid-rows-1"
                        >
                          {sales.map((sale) => (
                            <li className="flex py-6" key={sale._id}>
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={sale.image} alt="" />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{sale.productName}</h3>
                                   
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {sale.description}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-center justify-between text-sm">
                                  <p className="text-gzzray-500">
                                    {sale.quantitySold} items
                                  </p>
                                  <div className="flex">
                                    
                                    <button
                                      type="button"
                                      className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() => handelDeleteIndividualProduct(sale.productId)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-red-500 hover:scale-110"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className=''
                 

                >
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Sale Price: ${parseFloat(sale.salePrice).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Cost Price: ${parseFloat(sale.costPrice).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Total: ${(sale.quantitySold * sale.salePrice).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Discount: ${parseFloat(sale.discount).toFixed(2)}
                  </Typography>
                  <Typography
                    color="primary"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{ marginBottom: "10px" }}
                  >
                    Net total:{" "}
                    {(
                      sale.quantitySold * sale.salePrice -
                      parseFloat(sale.discount)
                    ).toFixed(2)}
                  </Typography>
                </div>
                            </li>
                            
                        ))}
                         
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex font-abc justify-between text-base font-medium text-gray-900">
                      {/* <p>Sub?total</p> */}
                      <Paper style={{ marginTop: "20px", padding: "30px" }} elevation={4} className='m-auto'>
            <Typography variant="h5" gutterBottom>
              Total Cart Information
            </Typography>
            <Typography
              color="primary"
              level="h2"
              variant="h5"
              noWrap
              style={{ marginBottom: "10px" }}
            >
              Net total: ${(totalPrice - totalDiscount).toFixed(2)}
            </Typography>
            <Divider />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Total Quantity: {totalQuantity}
                </Typography>
                <Typography variant="body1">
                  Total Price: ${totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Total Cost: ${totalCost.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography variant="">
                  Total Discount: ${totalDiscount.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Revenue: ${revenue.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Profit: ${profit.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 font-abc ">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6 ">
                      <button
                        onClick={handelConfirm}
                        className="w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 font-abc"
                        >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          className="font-medium font-abc text-indigo-600 hover:text-indigo-500"
                        >
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
    </Fade>
  );
};

export default Cart;
