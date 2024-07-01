import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Foods from "./foods.js";
const formData = JSON.parse(localStorage.getItem("formData"));
export default function FoodOrder() {
  const [orderData, setorderData] = useState({
    customer_name: "",
    mobile_number: "",
    aadhar_number: "",
    food_time: "",
    table_number: "",
    restaurant_id: "",
    foods: formData,
  });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-vcvq.onrender.com/restaurant/list?page_limit=5"
        );
        setRestaurants(response.data.list);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchRestaurant();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setorderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://restaurant-vcvq.onrender.com/order/create",
        orderData
      );
      alert("order created successfully");
    } catch (error) {
      console.error("There was an error creating the restaurant!", error);
    }
  };

  return (
    <div className="mx-auto mt-20 bg-gray-100 max-w-6xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              FOODS
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Would you like to tell me about your Food ?
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="customer_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  customer_name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="customer_name"
                    id="customer_name"
                    value={orderData.customer_name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="food_time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  food_time
                </label>
                <div className="mt-2">
                  <input
                    id="text"
                    name="food_time"
                    type="food_time"
                    value={orderData.food_time}
                    onChange={handleChange}
                    autoComplete="mobile"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div className="sm:col-span-2 ">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  mobile_number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="mobile_number"
                    id="mobile_number"
                    value={orderData.mobile_number}
                    onChange={handleChange}
                    autoComplete="mobile"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="aadhar_number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  aadhar_number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="aadhar_number"
                    id="aadhar_number"
                    value={orderData.aadhar_number}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="table_number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  table_number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="table_number"
                    id="table_number"
                    value={orderData.table_number}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="restaurant_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Restaurant
                </label>
                <div className="mt-2">
                  <select
                    name="restaurant_id"
                    id="restaurant_id"
                    value={orderData.restaurant_id}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      Select your restaurant
                    </option>
                    {restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.restaurant_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            {/* Foods_tables */}

            <div className="col-span-full">
              <label
                htmlFor="foods"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                foods
              </label>
              <Foods />
            </div>
          </div>


          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
