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
//     <>
//       <div className="sm:col-span-2">
//         <label
//           htmlFor="order_id"
//           className="block text-sm font-medium leading-6 text-gray-900"
//         >
//           Customer Name
//         </label>
//         <div className="mt-2">
//           <select
//             name="order_id"
//             id="order_id"
//             onChange={handleSelectChange}
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           >
//             <option value="" disabled>
//               Select Customer
//             </option>
//             {order.map((order) => (
//               <option key={order.id} value={order.id}>
//                 {order.customer_name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           onClick={fetchCustomerOrder}
//           className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md"
//         >
//           Fetch Order
//         </button>
//       </div>

//       {customer_order && (
//         <ul>
//           <li>Customer Name: {customer_order.customer_name}</li>
//           <li>Mobile Number: {customer_order.mobile_number}</li>
//           <li>Aadhar Number: {customer_order.aadhar_number}</li>
//           <li>Food Time: {customer_order.food_time}</li>
//           <li>Table Number: {customer_order.table_number}</li>
//           <li>Restaurant ID: {customer_order.restaurant_id}</li>
//           <li>Foods:</li>
//           <ul>
//             {customer_order.foods &&
//               JSON.parse(customer_order.foods).map((food, index) => (
//                 <li key={index}>
//                   Type: {food.type}, Quantity: {food.quantity}, Food Name: {food.food_name}
//                 </li>
//               ))}
//           </ul>
//           <li>Created At: {customer_order.created_at}</li>
//           <li>Updated At: {customer_order.updated_at}</li>
//           <li>Is Active: {customer_order.is_active}</li>
//         </ul>
//       )}
//     </>
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
          "https://restaurant-vcvq.onrender.com/order/customer_list"
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
        `https://restaurant-vcvq.onrender.com/order/get_id/${customer_id}`
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
            Customer Name
          </label>
          <div className="mt-2">
            <select
              name="order_id"
              id="order_id"
              onChange={handleSelectChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">
                Select Customer
              </option>
              {order.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.customer_name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchCustomerOrder}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            Fetch Order
          </button>
        </div>
        {customer_order && (
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <ul className="list-none mb-4">
              <li>
                <span className="font-bold">Customer Name:</span>{" "}
                {customer_order.customer_name}
              </li>
              <li>
                <span className="font-bold">Mobile Number:</span>{" "}
                {customer_order.mobile_number}
              </li>
              <li>
                <span className="font-bold">Aadhar Number:</span>{" "}
                {customer_order.aadhar_number}
              </li>
              <li>
                <span className="font-bold">Food Time:</span>{" "}
                {customer_order.food_time}
              </li>
              <li>
                <span className="font-bold">Table Number:</span>{" "}
                {customer_order.table_number}
              </li>

              <li>
                <span className="font-bold">Foods:</span>
                <ul className="list-none mb-4">
                  {customer_order.foods &&
                    JSON.parse(customer_order.foods).map((food, index) => (
                      <li key={index}>
                        <span className="font-bold">Food Name:</span>{" "}
                        {food.food_name}{" "}
                        <span className="font-bold">Quantity:</span>{" "}
                        {food.quantity},{" "}
                        <span className="font-bold">Type:</span> {food.type},{" "}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
