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
        .slice(0, 8)
    : [];

  return (
    <>
      <div className="space-y-4 text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900">
          Popular Books
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-green-900 max-w-4xl mx-auto">
          Discover the most loved books among readers! This section highlights top-rated and most upvoted titles. Whether you're into fiction, fantasy, or non-fiction, these popular picks are trending for all the right reasons. Dive into great reads today!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 pb-10">
        {popularBooks.map((book) => (
          <div
            key={book._id}
            className="flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform "
          >
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full aspect-[3/4] rounded-t-3xl overflow-hidden">
              <img
                src={
                  book.photo ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col flex-grow px-6 py-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 truncate">
                {book.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-700 flex-grow">
                {book.overview ? book.overview.slice(0, 100) + "..." : "No description available."}
              </p>

              <div className="flex items-center gap-2 text-blue-600 mt-4">
                <FaThumbsUp />
                <span className="font-semibold">{book.upvote || 0} upvotes</span>
              </div>
            </div>

            <button
              onClick={() => handleViewDetails(book._id)}
              className="mt-auto btn bg-gradient-to-r from-[#4F7942] to-[#808000] text-white font-semibold py-3 rounded-b-3xl text-center hover:opacity-90 transition"
            >
              See More
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularBooks;
