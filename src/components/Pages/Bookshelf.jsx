import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router';  

const Bookshelf = () => {
  const books = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category'); 

  const filteredBooks = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = selectedStatus ? book.status === selectedStatus : true;
    const categoryMatch = selectedCategory ? book.category === selectedCategory : true;
    return (titleMatch || authorMatch) && statusMatch && categoryMatch;
  });

  const handleBookClick = (id) => {
    navigate(`/books/${id}`); 
  };

  return (
    <div className="mt-15 rounded-3xl p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-10">Bookshelf</h1>
      {selectedCategory && (
        <h3 className="text-center text-lg font-semibold text-green-700 mb-4">
          Showing books in <span className="underline">{selectedCategory}</span> category
        </h3>
      )}

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="input input-bordered w-full pl-10 py-2 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <select
          className="select select-bordered w-full max-w-xs sm:max-w-sm text-sm sm:text-base"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Filter by Reading Status</option>
          <option value="Read">Read</option>
          <option value="Currently Reading">Reading</option>
          <option value="Want to Read">Want-to-Read</option>
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No books available based on your filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => handleBookClick(book._id)} 
            >
              <img
                src={book.photo}
                alt={book.title}
                className="w-full max-h-[400px] object-contain sm:object-cover"
              />
              <div className="p-4 space-y-1">
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-700">By <span className="font-medium">{book.author}</span></p>
                <p className="text-sm text-gray-600">Category: {book.category}</p>
                <p className="text-sm text-gray-500">Upvotes: {book.upvote || 0}</p>
                <p className="text-sm text-gray-500">Status: {book.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
