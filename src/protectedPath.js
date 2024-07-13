
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';

// const ProtectedPath = ({ element }) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   try {
//     const { exp } = jwtDecode(token);
//     if (exp * 1000 < Date.now()) {
//       localStorage.removeItem('token');
//       return <Navigate to="/" />;
//     }
//   } catch (error) {
//     localStorage.removeItem('token');
//     return <Navigate to="/" />;
//   }

//   return element;
// };

// export default ProtectedPath;




import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedPath = ({ element }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const { exp, is_admin } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to="/" />;
    }

    const adminRoutes = ["/homepage","/order","/datapage", "/viewdetail/:productId", "/addProduct", "/getorder"];
    const userRoutes = ["/homepage", "/order","/viewdetail/:productId"];

    if (is_admin === false || adminRoutes.includes(location.pathname)) {
      return element;
    } else {
      return <Navigate to="/homepage" />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/" />;
  }
};

export default ProtectedPath;
