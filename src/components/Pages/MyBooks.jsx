import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader';

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem('token');
      if (!token) return;

      fetch(`https://a11-server-s1ho.onrender.com/books?email=${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setMyBooks(data))
        .catch(err => console.error('Error loading user books:', err));
    }
  }, [user]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the book permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Unauthorized access!');
          return;
        }

        fetch(`https://a11-server-s1ho.onrender.com/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userEmail: user.email }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              toast.success('Book deleted!');
              setMyBooks(prev => prev.filter(book => book._id !== id));
            }
          })
          .catch(err => {
            toast.error('Failed to delete book');
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 min-h-screen pt-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">
        My Books
      </h1>

      {myBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg sm:text-xl">
          <Loader />
        </p>
      ) : (
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="table w-full min-w-[640px] text-sm sm:text-base">
            <thead className="bg-[#4F7942] text-green-950">
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={book.photo}
                      alt={book.title}
                      className="w-12 h-12 object-cover rounded-xl shadow"
                    />
                  </td>
                  <td className="font-semibold break-words max-w-[100px]">{book.title}</td>
                  <td className="break-words max-w-[100px]">{book.author}</td>
                  <td>{book.status}</td>
                  <td>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/update-book/${book._id}`}
                        className="btn btn-xs sm:btn-sm btn-outline text-[#4F7942] w-full sm:w-auto"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-xs sm:btn-sm bg-red-700 text-white w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
