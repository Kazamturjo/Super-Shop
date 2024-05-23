import React, { useState, useEffect } from "react";
import axios from "axios";

const DailyMonthSall = () => {
  const [reportType, setReportType] = useState(true); // Default to daily report
  const [dailySalesData, setDailySalesData] = useState([]);
  const [totalCalculation, setTotalCalculation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
    const [selectedMonth, setSelectedMonth] = useState(()=>{
      const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
    }); // Add selectedMonth state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Add selectedYear state
  const [isLoading, setIsLoading] = useState(false);
  const [isFutureDate, setisFutureDate] = useState(false);
  const [isNoSale, setIsNoSale] = useState(false);
  const [isNoSale2, setIsNoSale2] = useState(false);
  const [emptyMonth, setEmptyMonth] = useState(false);

  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [monthlySalesCal, setMonthlySalesCal] = useState({
    totalCostPrice: 0,
    totalLoss: 0,
    totalProfit: 0,
    totalRevenue: 0,
    totalUnitsSold: 0,
  });
  
  

  const fetchDailySalesReport = (createDate) => {
    setIsLoading(true);
    const apiUrl = `http://localhost:5000/sales/dailySalesReport`;
    const data = {
      createDate: createDate,
    };
    const currectdate = new Date();
    const targetdate = new Date(createDate);
    if (targetdate > currectdate) {
      console.log("greater");
      setisFutureDate(true);
    } else {
      setisFutureDate(false);
      axios
        .post(apiUrl, data)
        .then((response) => {
          if (response.data.data === null) {
            setDailySalesData([]);
            setTotalCalculation([]);
            setIsNoSale2(true);
          } else {
            setDailySalesData(response.data.data.products);
            setTotalCalculation(response.data.data);
            setIsNoSale2(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const fetchMonthlySalesReport = (selectedMonth, selectedYear) => {
    setIsLoading(true);
    const apiUrl = `http://localhost:5000/sales/monthlySalesReport`;
    const data = { selectedMonth, selectedYear };
  
    console.log('API URL:', apiUrl);
    console.log('Request Data:', data);
  
    axios.post(apiUrl, data)
      .then((response) => {
        console.log('Response:', response);
  
        if (response.data && response.data.data) {
          console.log('Data:', response.data.data);
  
          if (response.data.data[1].totalUnitsSold === 0) {
            console.log("Empty Month");
            setEmptyMonth(true);
            setMonthlySalesData([]);
            setMonthlySalesCal({
              totalCostPrice: 0,
              totalLoss: 0,
              totalProfit: 0,
              totalRevenue: 0,
              totalUnitsSold: 0,
            });
          } else {
            setEmptyMonth(false);
            console.log("Month Data Available");
            setMonthlySalesData(response.data.data[0]);
            setMonthlySalesCal(response.data.data[1]);
          }
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  console.log('month',monthlySalesData);
  

  useEffect(() => {
    if (selectedDate && reportType) {
      fetchDailySalesReport(selectedDate);
    } else if (selectedMonth && !reportType) {
      fetchMonthlySalesReport(selectedMonth, selectedYear);
    }
  }, [selectedDate, selectedMonth, selectedYear, reportType]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    let date = new Date(event.target.value)

    console.log(date.getMonth()+1, date.getFullYear() )
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const total = dailySalesData.reduce(
    (acc, item) => {
      acc.totalCostPrice = item.totalCostPrice;
      acc.totalRevenue += item.totalRevenue;
      acc.totalUnitsSold += item.totalUnitsSold;
      acc.totalProfit += item.totalProfit;
      acc.totalLoss += item.totalLoss;
      return acc;
    },
    {
      totalCostPrice: 0,
      totalRevenue: 0,
      totalUnitsSold: 0,
      totalProfit: 0,
      totalLoss: 0,
    }
  );

  const netProfitLoss = total.totalProfit - total.totalLoss;
  const netProfitLossColor = netProfitLoss >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${reportType ? 'bg-blue-500' : 'bg-gray-500'} text-white shadow-md transition-colors duration-300`}
          onClick={() => setReportType(true)}
        >
          Daily Report
        </button>
        <button
          className={`px-4 py-2 rounded ${reportType ? 'bg-gray-500' : 'bg-orange-500'} text-white shadow-md transition-colors duration-300`}
          onClick={() => setReportType(false)}
        >
          Monthly Report
        </button>
      </div>
      {reportType ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Daily Sales Report</h1>
          <div className="mb-4">
            <input
              type="date"
              className="border rounded p-2 w-full"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          {isFutureDate ? (
            <p>Future date selected...</p>
          ) : (
            <>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {isNoSale ? (
                    <p>No sales on that day</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr>
                            <th className="px-6 py-2">Product Name</th>
                            <th className="px-6 py-2">Buying Price</th>
                            <th className="px-6 py-2">Sold Price</th>
                            <th className="px-6 py-2">Quantity</th>
                            <th className="px-6 py-2">Total Profit</th>
                            <th className="px-6 py-2">Total Loss</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dailySalesData.map((item) => (
                            <tr key={item.product_id}>
                              <td className="border px-6 py-2">{item.productName}</td>
                              <td className="border px-6 py-2">${item.totalCostPrice.toFixed(2)}</td>
                              <td className="border px-6 py-2">${item.totalRevenue.toFixed(2)}</td>
                              <td className="border px-6 py-2">{item.totalUnitsSold}</td>
                              <td className="border px-6 py-2">${item.totalProfit.toFixed(2)}</td>
                              <td className="border px-6 py-2">${item.totalLoss.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100 font-bold">
                            <td className="border px-6 py-2"><b>Total</b></td>
                            <td className="border px-6 py-2"><b>${total.totalCostPrice.toFixed(2)}</b></td>
                            <td className="border px-6 py-2"><b>${total.totalRevenue.toFixed(2)}</b></td>
                            <td className="border px-6 py-2"><b>{total.totalUnitsSold}</b></td>
                            <td className="border px-6 py-2"><b>${total.totalProfit.toFixed(2)}</b></td>
                            <td className="border px-6 py-2"><b>${total.totalLoss.toFixed(2)}</b></td>
                          </tr>
                          <tr>
                            {isNoSale2 ? (
                              <td colSpan={1} className="border px-6 py-2" align="left">
                                <b>No sales on this day</b>
                              </td>
                            ) : (
                              <>
                                <td colSpan={5} className="border px-6 py-2" align="right">
                                  Net Profit/Loss:
                                </td>
                                <td className={`border px-6 py-2 ${netProfitLossColor}`}>
                                  <b>${netProfitLoss.toFixed(2)}</b>
                                </td>
                              </>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Monthly Sales Report</h1>
          <div className="flex space-x-4 mb-4">
            <input
            
              type="month"
              className="border rounded p-2 w-full"
              value={selectedMonth}
              placeholder="Month"
              onChange={handleMonthChange}
            />
            <input
              type="number"
              className="border rounded p-2 w-full"
              placeholder="Year"
              value={selectedYear}
              onChange={handleYearChange}
            />
          </div>
          {emptyMonth ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-2">Date</th>
                    <th className="px-6 py-2">Buying Price</th>
                    <th className="px-6 py-2">Sold Price</th>
                    <th className="px-6 py-2">Quantity</th>
                    <th className="px-6 py-2">Total Profit</th>
                    <th className="px-6 py-2">Total Loss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={1} className="border px-6 py-2" align="left">
                      <b>No sales on this day</b>
                    </td>
                  </tr>
                  <tr>
                    {isNoSale2 ? (
                      <td colSpan={1} className="border px-6 py-2" align="left">
                        <b>No sales on this day</b>
                      </td>
                    ) : (
                      <>
                        <td colSpan={5} className="border px-6 py-2" align="right">
                          Net Profit/Loss:
                        </td>
                        <td className={`border px-6 py-2 ${netProfitLossColor}`}>
                          <b>
                            $
                            {(
                              monthlySalesCal.totalProfit.toFixed(2) -
                              monthlySalesCal.totalLoss.toFixed(2)
                            ).toFixed(2)}
                          </b>
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-2">Date</th>
                    <th className="px-6 py-2">Buying Price</th>
                    <th className="px-6 py-2">Sold Price</th>
                    <th className="px-6 py-2">Quantity</th>
                    <th className="px-6 py-2">Total Profit</th>
                    <th className="px-6 py-2">Total Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySalesData && monthlySalesData.map((item) => (
                    <tr key={item.product_id}>
                      <td className="border px-6 py-2">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="border px-6 py-2">${item.totalCostPrice.toFixed(2)}</td>
                      <td className="border px-6 py-2">${item.totalRevenue.toFixed(2)}</td>
                      <td className="border px-6 py-2">{item.totalUnitsSold}</td>
                      <td className="border px-6 py-2">${item.totalProfit.toFixed(2)}</td>
                      <td className="border px-6 py-2">${item.totalLoss.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="border px-6 py-2"><b>Total</b></td>
                    <td className="border px-6 py-2"><b>${monthlySalesCal.totalCostPrice.toFixed(2)}</b></td>
                    <td className="border px-6 py-2"><b>${monthlySalesCal.totalRevenue.toFixed(2)}</b></td>
                    <td className="border px-6 py-2"><b>{monthlySalesCal.totalUnitsSold}</b></td>
                    <td className="border px-6 py-2"><b>${monthlySalesCal.totalProfit.toFixed(2)}</b></td>
                    <td className="border px-6 py-2"><b>${monthlySalesCal.totalLoss.toFixed(2)}</b></td>
                  </tr>
                  <tr>
                    {isNoSale2 ? (
                      <td colSpan={1} className="border px-6 py-2" align="left">
                        <b>No sales on this day</b>
                      </td>
                    ) : (
                      <>
                        <td colSpan={5} className="border px-6 py-2" align="right">
                          Net Profit/Loss:
                        </td>
                        <td className={`border px-6 py-2 ${netProfitLossColor}`}>
                          <b>
                            $
                            {(
                              monthlySalesCal.totalProfit.toFixed(2) -
                              monthlySalesCal.totalLoss.toFixed(2)
                            ).toFixed(2)}
                          </b>
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyMonthSall;
