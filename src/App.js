import React, { useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import Datapage from "./pages/restaurant";
import Orderpage from "./pages/orderpage";
import Viewpage from "./pages/viewDetails";
import AddProductpage from "./pages/addProduct";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
  },
  {
    path: "/datapage",
    element: <Datapage></Datapage>,
  },
  {
    path: "/order",
    element: <Orderpage></Orderpage>,
  },
  {
    path: "/viewdetail/:productId",
    element: <Viewpage></Viewpage>,
  },
  {
    path: "/addProduct",
    element: <AddProductpage></AddProductpage>,
  },
  
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
