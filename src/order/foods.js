import React, { useState } from 'react';

function Foods() {
  const [formData, setFormData] = useState([]);
  const [newItem, setNewItem] = useState({
    food_name: '',
    quantity: '',
    type: 'full'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({...prevItem, [name]: value }));
  };

  const handleAddItem = () => {
    setFormData((prevFormData) => [...prevFormData, newItem]);
    setNewItem({
      food_name: '',
      quantity: '',
      type: 'full'
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log(formData);
    // Navigate to the next page
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Food Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.food_name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.type}</td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  name="food_name"
                  value={newItem.food_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </td>
              <td>
                <select name="type" value={newItem.type} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded">
                  <option value="full">Full</option>
                  <option value="half">Half</option>
                </select>
              </td>
              <td>
                <button type="button" onClick={handleAddItem} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Foods;