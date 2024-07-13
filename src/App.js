import React from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import Datapage from "./pages/restaurant";
import Orderpage from "./pages/orderpage";
import Viewpage from "./pages/viewDetails";
import AddProductpage from "./pages/addProduct";
import Getorderpage from "./pages/getorder";
import LoginPage from "./pages/loginpage";
import ProtectedPath from "./protectedPath"; 

import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, 
  },
  {
    path: "/homepage",
    element: <ProtectedPath element={<Homepage />} />, 
  },
  {
    path: "/datapage",
    element: <ProtectedPath element={<Datapage />} />, 
  },
  {
    path: "/order",
    element: <ProtectedPath element={<Orderpage />} />, 
  },
  {
    path: "/viewdetail/:productId",
    element: <ProtectedPath element={<Viewpage />} />, 
  },
  {
    path: "/addProduct",
    element: <ProtectedPath element={<AddProductpage />} />, 
  },
  {
    path: "/getorder",
    element: <ProtectedPath element={<Getorderpage />} />, 
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
