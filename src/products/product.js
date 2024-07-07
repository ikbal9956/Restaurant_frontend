import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(4);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts(currentPage,itemsPerPage);
  }, [currentPage,itemsPerPage]);

  const fetchProducts = async (currentPage,itemsPerPage) => {
    try {
      const response = await fetch(
        `https://restaurant-vcvq.onrender.com/product/list?page=${currentPage}&page_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) =>
      prev < Math.ceil(totalCount / itemsPerPage) ? prev + 1 : prev
    );
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl  px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>
        <div>
          <input
            type="number"
            id="itemsPerPage"
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemPerPage(Number(e.target.value))}
            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={`/viewdetail/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.thumbnail}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.rating}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalCount}
          currentPage={currentPage}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center mt-16 justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pageNumbers.length}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                aria-current={number === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  number === currentPage
                    ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === pageNumbers.length}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};




// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// export default function Product() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(4);
//   const [totalCount, setTotalCount] = useState(0);

//   useEffect(() => {
//     fetchProducts(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const fetchProducts = async (currentPage, itemsPerPage) => {
//     try {
//       const response = await fetch(
//         `https://restaurant-vcvq.onrender.com/product/list?page=${currentPage}&page_limit=${itemsPerPage}`
//       );
//       const data = await response.json();
//       setProducts(data.products);
//       setTotalCount(data.total_count);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const nextPage = () =>
//     setCurrentPage((prev) =>
//       prev < Math.ceil(totalCount / itemsPerPage) ? prev + 1 : prev
//     );
//   const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl  px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//           Customers also purchased
//         </h2>
//         <div>
//           <input
//             type="number"
//             id="itemsPerPage"
//             name="itemsPerPage"
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {products.map((product) => (
//             <div key={product.id} className="group relative">
//               <Link to={`/viewdetail/${product.id}`}>
//                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.thumbnail}
//                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-700">
//                       <span aria-hidden="true" className="absolute inset-0" />
//                       {product.title}
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {product.rating}
//                     </p>
//                   </div>
//                   <p className="text-sm font-medium text-gray-900">
//                     {product.price}
//                   </p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>

//         <Pagination
//           itemsPerPage={itemsPerPage}
//           totalItems={totalCount}
//           currentPage={currentPage}
//           paginate={paginate}
//           nextPage={nextPage}
//           prevPage={prevPage}
//         />
//       </div>
//     </div>
//   );
// }

// const Pagination = ({
//   itemsPerPage,
//   totalItems,
//   currentPage,
//   paginate,
//   nextPage,
//   prevPage,
// }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="flex items-center mt-16 justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={currentPage === pageNumbers.length}
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Next
//         </button>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">
//               {(currentPage - 1) * itemsPerPage + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-medium">
//               {Math.min(currentPage * itemsPerPage, totalItems)}
//             </span>{" "}
//             of <span className="font-medium">{totalItems}</span> results
//           </p>
//         </div>
//         <div>
//           <nav
//             className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//             aria-label="Pagination"
//           >
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Previous</span>
//               <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//             {pageNumbers.map((number) => (
//               <button
//                 key={number}
//                 onClick={() => paginate(number)}
//                 aria-current={number === currentPage ? "page" : undefined}
//                 className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                   number === currentPage
//                     ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                 }`}
//               >
//                 {number}
//               </button>
//             ))}
//             <button
//               onClick={nextPage}
//               disabled={currentPage === pageNumbers.length}
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </nav>
//   );
// };
