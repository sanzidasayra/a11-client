import React from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newBook = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a book.");
      return;
    }

    fetch("https://a11-server-s1ho.onrender.com/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Book added successfully!");
          form.reset();
        } else {
          toast.error("Failed to add book. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("Failed to add book.");
        console.error("Error adding book:", error);
      });
  };

  return (
    <div className="px-4 sm:px-8 pb-10 mt-20 border border-[#808000] rounded-3xl shadow-2xl bg-[#a3b84d] max-w-5xl mx-auto">
      <div className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Add Books
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
          Share your favorite reads by adding book titles with key details.
          Include the author, cover photo, category, and reading status to
          build a complete and personalized digital bookshelf.
        </p>
      </div>

      <form onSubmit={handleAddBook}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || ""}
              readOnly
              className="input border-[#808000] w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              readOnly
              className="input border-[#808000] w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input border-[#808000] w-full"
              placeholder="Enter book title"
              required
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Photo</label>
            <input
              type="text"
              name="photo"
              className="input border-[#808000] w-full"
              placeholder="Enter cover photo URL"
              required
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Total Page</label>
            <input
              type="number"
              name="pages"
              className="input border-[#808000] w-full"
              placeholder="Enter total pages"
              required
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Book Author</label>
            <input
              type="text"
              name="author"
              className="input border-[#808000] w-full"
              placeholder="Enter author name"
              required
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Book Category</label>
            <select
              name="category"
              className="select border-[#808000] w-full"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50">
            <label className="label">Reading Status</label>
            <select
              name="status"
              className="select border-[#808000] w-full"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Read">Read</option>
              <option value="Currently Reading">Reading</option>
              <option value="Want to Read">Want to Read</option>
            </select>
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50 md:col-span-2">
            <label className="label">Book Overview</label>
            <textarea
              name="overview"
              className="textarea border-[#808000] w-full"
              placeholder="Enter book overview"
              rows="3"
              required
            />
          </fieldset>

          <fieldset className="border border-base-300 rounded-box p-4 bg-green-50 md:col-span-2">
            <label className="label">Upvote</label>
            <input
              type="number"
              name="upvote"
              value="0"
              readOnly
              className="input border-[#808000] w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </fieldset>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="btn btn-wide bg-gradient-to-r from-[#4F7942] to-[#808000] hover:bg-[#6b6b00] text-white text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
