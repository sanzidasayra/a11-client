import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader';

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  fetch(`https://a11-server-s1ho.onrender.com/books/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.email !== user.email) {
        toast.error("Unauthorized access");
        navigate('/my-books');
      } else {
        setBook(data);
      }
    })
    .catch(() => toast.error("Error fetching book"));
}, [id, user.email, navigate]);


  const handleUpdate = (e) => {
  e.preventDefault();
  const form = e.target;
  const updatedBook = {
    name: form.name.value,
    email: form.email.value,
    title: form.title.value,
    photo: form.photo.value,
    pages: form.pages.value,
    author: form.author.value,
    category: form.category.value,
    status: form.status.value,
    overview: form.overview.value,
  };

  fetch(`https://a11-server-s1ho.onrender.com/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedBook),
  })
    .then(res => res.json())
    .then(() => {
      toast.success("Book updated!");
      navigate('/my-books');
    })
    .catch(() => toast.error("Failed to update"));
};


  if (!book) return <p className="text-center mt-10"><Loader/></p>;

  return (
    <form onSubmit={handleUpdate} className="p-6 mt-15">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Book</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input name="name" defaultValue={book.name} label="Name " />
        <Input name="email" defaultValue={book.email} label="Email" readOnly />
        <Input name="title" defaultValue={book.title} label="Title" />
        <Input name="photo" defaultValue={book.photo} label="Photo URL" />
        <Input name="pages" defaultValue={book.pages} label="Total Page" />
        <Input name="author" defaultValue={book.author} label="Book Author" />
        <Select name="category" defaultValue={book.category} label="Book Category"
          options={["Fiction", "Non-Fiction", "Fantasy"]} />
        <Select name="status" defaultValue={book.status} label="Reading Status"
          options={["Read", "Currently Reading", "Want to Read"]} />
        <Input name="overview" defaultValue={book.overview} label="Book Overview" full />
      </div>
      <button className="btn btn-success mt-6 block mx-auto">Update Book</button>
    </form>
  );
};

const Input = ({ name, defaultValue, label, readOnly = false, full = false }) => (
  <fieldset className={`fieldset bg-green-50 border-base-300 rounded-box border p-4 ${full ? "md:col-span-2" : ""}`}>
    <label className="label">{label}</label>
    <input
      type="text"
      name={name}
      defaultValue={defaultValue}
      readOnly={readOnly}
      className="input border-[#808000] w-full"
    />
  </fieldset>
);

const Select = ({ name, defaultValue, label, options }) => (
  <fieldset className="fieldset bg-green-50 border-base-300 rounded-box border p-4">
    <label className="label">{label}</label>
    <select name={name} defaultValue={defaultValue} className="select border-[#808000] w-full">
      <option disabled value="">Select</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </fieldset>
);

export default UpdateBook;
