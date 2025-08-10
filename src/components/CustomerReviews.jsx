import React from 'react';

const reviews = [
  {
    id: 1,
    name: "Ayesha Rahman",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    comment: "StoryMint is amazing! I found so many inspiring stories here. Highly recommend!",
  },
  {
    id: 2,
    name: "Rafiq Hasan",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 4,
    comment: "Great platform for budding authors. The UI is clean and easy to navigate.",
  },
  {
    id: 3,
    name: "Nabila Khan",
    avatar: "https://i.pravatar.cc/100?img=30",
    rating: 5,
    comment: "I love the diversity of stories and the community is very supportive.",
  },
  {
    id: 4,
    name: "Sabbir Ahmed",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    comment: "Easy to use interface and excellent collection of stories.",
  },
  {
    id: 5,
    name: "Farhana Islam",
    avatar: "https://i.pravatar.cc/100?img=60",
    rating: 4,
    comment: "Helpful community and great storytelling features.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1 text-yellow-400 justify-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-current" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.785.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
      ))}
    </div>
  );
}

const CustomerReviews = () => {
  return (
    <section className="max-w-8xl mx-auto px-6 ">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-900">
        What Our Readers Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {reviews.map(({ id, name, avatar, rating, comment }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <StarRating rating={rating} />
            <p className="mt-4 text-gray-600 italic">"{comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
