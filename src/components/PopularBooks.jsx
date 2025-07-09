import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";

const PopularBooks = ({ books }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const popularBooks = Array.isArray(books)
    ? [...books]
        .filter((book) => typeof book.upvote === "number")
        .sort((a, b) => b.upvote - a.upvote)
        .slice(0, 6)
    : [];

  return (
    <>
      <div className="space-y-4 text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          Popular Books
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
          Discover the most loved books among readers! This section highlights
          top-rated and most upvoted titles. Whether you're into fiction,
          fantasy, or non-fiction, these popular picks are trending for all the
          right reasons. Dive into great reads today!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 pb-10">
        {popularBooks.map((book) => (
          <div
            key={book._id}
            className="card bg-gray-50 w-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] rounded-b-3xl"
          >
            <figure className="px-6 pt-6 sm:px-10 sm:pt-10">
              <img
                src={
                  book.photo ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={book.title}
                className="rounded-xl object-cover w-full h-[250px] sm:h-[300px]"
              />
            </figure>
            <div className="card-body items-center text-center space-y-2 px-4">
              <h2 className="card-title text-lg sm:text-xl font-semibold">{book.title}</h2>
              <p className="text-sm sm:text-base text-gray-700">
                {book.overview?.slice(0, 100)}...
              </p>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaThumbsUp className="text-blue-600" />
                <span>
                  <span className="font-semibold">{book.upvote || 0}</span> upvotes
                </span>
              </div>
            </div>

            <div className="card-actions">
              <button
                onClick={() => handleViewDetails(book._id)}
                className="btn w-full text-white text-md font-medium bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition p-4 sm:p-6 rounded-b-3xl"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularBooks;
