import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import FoodOrder from '../order/order';
const Orderpage = () => {
    return (
        <div>
       <Navbar/>
       <FoodOrder/>
       </div>
    );
};

export default Orderpage;
