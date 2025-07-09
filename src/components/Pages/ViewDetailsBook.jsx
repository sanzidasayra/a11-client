import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Loader from "../Loader";
import { AuthContext } from "../../../src/context/AuthContext";
import { toast } from "react-toastify";  

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvoting, setUpvoting] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/books/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id, navigate]);

  const updateReadingStatus = async (newStatus) => {
    if (!user || !book) return;

    if (user.email !== book.email) {
      toast.error("You can only update the status of your own books.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/books/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newStatus,
          userEmail: user.email,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setBook((prevBook) => ({
          ...prevBook,
          status: newStatus,
        }));
        toast.success("Status updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status.");
    }
  };

  const upvoteBook = async () => {
    if (!user || !book || user.email === book.email) return;

    setUpvoting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/books/${id}/upvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail: user.email }),
      });

      const result = await res.json();

      if (res.ok) {
        const updated = await fetch(`http://localhost:3000/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
        setBook(updated);
        toast.success("Upvoted successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Upvote Error:", err);
      toast.error("Failed to upvote.");
    } finally {
      setUpvoting(false);
    }
  };

  const postReview = async () => {
    if (!user || !reviewText) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/books/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail: user.email, reviewText }),
      });

      const result = await res.json();
      if (res.ok) {
        setReviewText("");
        setBook((prevBook) => ({
          ...prevBook,
          reviews: [...(prevBook.reviews || []), result.review],
        }));
        toast.success("Review posted successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error posting review:", err);
      toast.error("Failed to post review.");
    }
  };

  const editReview = async () => {
    if (!editingReview || !reviewText) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/books/${id}/reviews`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail: user.email, reviewText }),
      });

      const result = await res.json();
      if (res.ok) {
        setReviewText("");
        setEditingReview(null);
        const updatedBook = await fetch(
          `http://localhost:3000/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
        setBook(updatedBook);
        toast.success("Review updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error editing review:", err);
      toast.error("Failed to edit review.");
    }
  };

  const deleteReview = async (reviewId) => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/books/${id}/reviews`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail: user.email, reviewId }),
      });

      const result = await res.json();
      if (res.ok) {
        const updatedBook = await fetch(
          `http://localhost:3000/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
        setBook(updatedBook);
        toast.success("Review deleted successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  };

  if (loading) return <Loader />;

  if (!book) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">
        Book not found.
      </div>
    );
  }

  const isOwner = user?.email === book.email;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-2xl bg-[#f3fce7]">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.photo}
          alt={book.title}
          className="w-full md:w-1/2 h-auto object-cover rounded-xl shadow"
        />

        <div className="flex-1 space-y-2 text-[#2e3810]">
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-semibold">Total Pages:</span> {book.pages}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {book.category}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-md text-gray-700">
              Reading Status: <span className="font-bold">{book.status}</span>
            </p>

            {isOwner && user && (
              <div className="flex gap-2">
                {book.status === "Want to Read" && (
                  <button
                    onClick={() => updateReadingStatus("Currently Reading")}
                    className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                  >
                    Start Reading
                  </button>
                )}

                {book.status === "Currently Reading" && (
                  <button
                    onClick={() => updateReadingStatus("Read")}
                    className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            )}
          </div>
          <p>
            <span className="font-semibold">Overview:</span> {book.overview}
          </p>

          <div className="mt-4 bg-[#e0e8c9] p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Uploaded By</h3>
            <p>
              <span className="font-semibold">Name:</span> {book.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {book.email}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-md text-gray-700">
              Upvotes: <span className="font-bold">{book.upvote || 0}</span>
            </p>

            {!isOwner && user && (
              <button
                onClick={upvoteBook}
                disabled={upvoting}
                className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 disabled:opacity-50"
              >
                {upvoting ? "Upvoting..." : "Upvote"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Reviews</h3>
        {book.reviews && book.reviews.length > 0 ? (
          <ul>
            {book.reviews.map((review, index) => (
              <li key={index} className="mt-4 p-2 bg-gray-200 rounded">
                <p>
                  <strong>{review.userEmail}</strong>
                </p>
                <p>{review.reviewText}</p>
                {user?.email === review.userEmail && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingReview(review._id);
                        setReviewText(review.reviewText);
                      }}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {user && (
        <div className="mt-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a review..."
            className="w-full p-2 border rounded"
          />
          {editingReview ? (
            <button
              onClick={editReview}
              className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
            >
              Edit Review
            </button>
          ) : (
            <button
              onClick={postReview}
              className="mt-2 px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800"
            >
              Submit Review
            </button>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#808000] hover:bg-[#6b6b00] text-white rounded-full transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
