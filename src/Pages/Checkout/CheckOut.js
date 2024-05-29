import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/joy/Button";

function CheckOut() {
  const { id } = useParams();

  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/receipt/getReceiptByReceiptNumber/${id}`)
      .then((response) => {
        setReceiptData([response.data.data]);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
        setReceiptData([]);
      });
  }, [id]);

  const handlePrint = () => {
    const printContent = document.getElementById("checkout-info-container");
    const newWindow = window.open("", "_blank");


    newWindow.document.write("<html><head><title>Receipt</title></head><body>");
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="container mx-auto p-4" id="checkout-info-container">
      <h1 className="text-2xl font-bold text-center mb-4">Receipt Information</h1>
      {receiptData.map((receipt, index) => (
        <div
          key={index}
          className="border border-black p-4 mb-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Receipt Number: {receipt.receiptNumber}
          </h3>
          <div className="mt-4">
            <h3 className="font-medium text-gray-700">Sale IDs:</h3>
            {receipt.selesId.map((sale) => (
              <div key={sale._id} className="text-gray-600 mt-2">
                <span className="font-bold">{sale.sele_id}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <div className="w-1/4 text-center">
              <p className="font-medium">Total Amount:</p>
              <p className="text-gray-700">${receipt.totalAmount.toFixed(2)}</p>
            </div>
            <div className="w-1/4 text-center">
              <p className="font-medium">Discount:</p>
              <p className="text-gray-700">${receipt.discount.toFixed(2)}</p>
            </div>
            <div className="w-1/4 text-center">
              <p className="font-medium">Tax Amount:</p>
              <p className="text-gray-700">${receipt.taxAmmount.toFixed(2)}</p>
            </div>
            <div className="w-1/4 text-center">
              <p className="font-medium">Grand Total:</p>
              <p className="text-gray-700">${receipt.grandTotal.toFixed(2)}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Date: {new Date(receipt.date).toLocaleDateString()}
          </p>
         <div className="mt-4 text-end">

          <Button
            variant="solid"
            color="success"
            onClick={handlePrint}
            className=""
          >
            Print
          </Button>
         </div>
        </div>
      ))}
    </div>
  );
}

export default CheckOut;
