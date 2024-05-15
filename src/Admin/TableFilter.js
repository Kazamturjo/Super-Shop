// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import Table from './Table'

// const TableFilter = () => {
//     const [data,setData]=useState([])

   


//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('http://localhost:5000/product/all?page=1&pageSize=100');
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             const jsonData = await response.json();
//             setData(jsonData.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
//         fetchData();
//       }, []);

    

     



//   return (
//     <div><Table displayChar={displayChar} handleSelectChange={></div>
//   )
// }

// export default TableFilter