import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://a11-server-s1ho.onrender.com/books/categories')
      .then(res => res.json())
      .then(data => {
        console.log("Categories response:", data);
        setCategories(data);
      });
  }, []);

  return (
    <>
    <div className="my-5 px-4 sm:px-6 md:px-10 max-w-8xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-900 dark:text-gray-100 mb-8">
        Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/bookshelf?category=${cat._id}`)}
              className="p-5 sm:p-6 bg-green-100 hover:bg-green-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-200 ease-in-out rounded-xl cursor-pointer shadow-md hover:shadow-lg"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 dark:text-gray-100 mb-1">{cat._id}</h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{cat.count} books</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 text-base sm:text-lg">
            No categories found.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default FeaturedCategories;
