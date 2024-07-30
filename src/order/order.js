import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function Order() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/restaurant/list`
        );
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchRestaurant();
  }, []);

  const initialOrder = {
    customer_name: "",
    mobile_number: "",
    aadhar_number: "",
    food_time: "",
    table_number: "",
    restaurant_id: "",
    foods: [],
    currentFood: { food_name: "", type: "", quantity: "" },
  };

  const [formData, setFormData] = useState(initialOrder);

  const handleCancel = () => {
    setFormData(initialOrder);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      currentFood: { ...formData.currentFood, [name]: value },
    });
  };

  const handleAddFood = () => {
    setFormData({
      ...formData,
      foods: [...formData.foods, formData.currentFood],
      currentFood: { food_name: "", type: "", quantity: "" },
    });
  };

  const handleDeleteFood = (index) => {
    setFormData({
      ...formData,
      foods: formData.foods.filter((_, i) => i !== index),
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_BASE_URL}/order/create`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           customer_name: formData.customer_name,
  //           mobile_number: formData.mobile_number,
  //           aadhar_number: formData.aadhar_number,
  //           food_time: formData.food_time,
  //           table_number: parseInt(formData.table_number),
  //           restaurant_id: parseInt(formData.restaurant_id),
  //           foods: formData.foods.map((food) => ({
  //             food_name: food.food_name,
  //             type: food.type,
  //             quantity: parseInt(food.quantity),
  //           })),
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       alert("Order done!");
  //     } else {
  //       alert("Failed to submit order. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  //   setFormData(initialOrder);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customer_name: formData.customer_name,
      mobile_number: formData.mobile_number,
      aadhar_number: formData.aadhar_number,
      food_time: formData.food_time,
      table_number: parseInt(formData.table_number),
      restaurant_id: parseInt(formData.restaurant_id),
      foods: formData.foods.map((food) => ({
        food_name: food.food_name,
        type: food.type,
        quantity: parseInt(food.quantity),
      })),
    };

    console.log("Payload:", payload); // Log the payload for debugging

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/order/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Order done!");
      } else {
        console.error("Failed to submit order. Response:", response);
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

    setFormData(initialOrder);
  };

  return (
    <>
      <div className="mx-auto mt-20 bg-gray-100 max-w-6xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="py-4 text-center font-bold text-3xl font-serif  leading-7 text-gray-900">
                Order Now
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="customer_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Customer Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="customer_name"
                      id="customer_name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.customer_name}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="mobile_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="mobile_number"
                      id="mobile_number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.mobile_number}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="aadhar_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Aadhar Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="aadhar_number"
                      id="aadhar_number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.aadhar_number}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="food_time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Food Time
                  </label>
                  <div className="mt-2">
                    <input
                      type="datetime-local"
                      name="food_time"
                      id="food_time"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.food_time}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="table_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Table Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="table_number"
                      id="table_number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                      value={formData.table_number}
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
                      value={formData.restaurant_id}
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

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Food Details
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="food_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Food Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="food_name"
                      id="food_name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleFoodChange}
                      value={formData.currentFood.food_name}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleFoodChange}
                      value={formData.currentFood.quantity}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="food_id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      name="type"
                      id="type"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleFoodChange}
                      value={formData.currentFood.type}
                    >
                      <option value="" disabled>
                        select half/full
                      </option>
                      <option value="half">Half</option>
                      <option value="full">Full</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    className="mt-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleAddFood}
                  >
                    Add Food
                  </button>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Food List
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Food Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.foods.map((food, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {food.food_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {food.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {food.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleDeleteFood(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6  flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="rounded-md bg-indigo-600 mb-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 mb-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-600 mb-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if (window.confirm("Do you want to change your order?")) {
                    window.location.href = "/updateOrder"; 
                  }
                }}
              >
                Update Your Order?
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
