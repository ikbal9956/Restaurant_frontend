// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Getorder() {
//   const [order, setOrder] = useState([]);
//   const [customer_id, setCustomer_id] = useState("");
//   const [customer_order, setCustomer_order] = useState({});

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axios.get(
//           "https://restaurant-vcvq.onrender.com/order/customer_list"
//         );
//         setOrder(response.data.orders); // assuming the API returns an object with an "orders" key
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchOrder(); // call the function
//   }, []);

//   const handleSelectChange = (e) => {
//     setCustomer_id(e.target.value);
//   };

//   const fetchCustomerOrder = async () => {
//     try {
//       const response = await axios.get(
//         `https://restaurant-vcvq.onrender.com/order/get_id/${customer_id}`
//       );
//       setCustomer_order(response.data.list[0]); // assuming the API returns the customer order data
//     } catch (error) {
//       console.error("Error fetching customer order:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
//       <div className="flex flex-wrap -mx-4">
//         <div className="w-full md:w-1/2 xl:w-1/3 p-4">
//           <label
//             htmlFor="order_id"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Customer Name
//           </label>
//           <div className="mt-2">
//             <select
//               name="order_id"
//               id="order_id"
//               onChange={handleSelectChange}
//               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             >
//               <option value="">
//                 Select Customer
//               </option>
//               {order.map((order) => (
//                 <option key={order.id} value={order.id}>
//                   {order.customer_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={fetchCustomerOrder}
//             className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md"
//           >
//             Fetch Order
//           </button>
//         </div>
//         {customer_order && (
//           <div className="w-full md:w-1/2 xl:w-2/3 p-4">
//             <ul className="list-none mb-4">
//               <li>
//                 <span className="font-bold">Customer Name:</span>{" "}
//                 {customer_order.customer_name}
//               </li>
//               <li>
//                 <span className="font-bold">Mobile Number:</span>{" "}
//                 {customer_order.mobile_number}
//               </li>
//               <li>
//                 <span className="font-bold">Aadhar Number:</span>{" "}
//                 {customer_order.aadhar_number}
//               </li>
//               <li>
//                 <span className="font-bold">Food Time:</span>{" "}
//                 {customer_order.food_time}
//               </li>
//               <li>
//                 <span className="font-bold">Table Number:</span>{" "}
//                 {customer_order.table_number}
//               </li>

//               <li>
//                 <span className="font-bold">Foods:</span>
//                 <ul className="list-none mb-4">
//                   {customer_order.foods &&
//                     JSON.parse(customer_order.foods).map((food, index) => (
//                       <li key={index}>
//                         <span className="font-bold">Food Name:</span>{" "}
//                         {food.food_name}{" "}
//                         <span className="font-bold">Quantity:</span>{" "}
//                         {food.quantity},{" "}
//                         <span className="font-bold">Type:</span> {food.type},{" "}
//                       </li>
//                     ))}
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Getorder() {
  const [order, setOrder] = useState([]);
  const [customer_id, setCustomer_id] = useState("");
  const [customer_order, setCustomer_order] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/order/customer_list`
        );
        setOrder(response.data.orders); // assuming the API returns an object with an "orders" key
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrder(); // call the function
  }, []);

  const handleSelectChange = (e) => {
    setCustomer_id(e.target.value);
  };

  const fetchCustomerOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/order/get_id/${customer_id}`
      );
      setCustomer_order(response.data.list[0]); // assuming the API returns the customer order data
    } catch (error) {
      console.error("Error fetching customer order:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <label
            htmlFor="order_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
             Select the name of the Customer 
          </label>
          <div className="mt-2">
            <select
              name="order_id"
              id="order_id"
              onChange={handleSelectChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Customer</option>
              {order.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.customer_name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchCustomerOrder}
            className="mt-10 bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Fetch Order
          </button>
        </div>
        {customer_order && (
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <div className="bg-gray-200 shadow rounded-lg p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Customer Name:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.customer_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Mobile Number:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.mobile_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Aadhar Number:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.aadhar_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Food Time:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.food_time}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Table Number:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer_order.table_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      Foods:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Food Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {customer_order.foods &&
                            JSON.parse(customer_order.foods).map(
                              (food, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {food.food_name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {food.quantity}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {food.type}
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
