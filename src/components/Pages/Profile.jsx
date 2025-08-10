import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a29bfe', '#fd79a8'];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://a11-server-s1ho.onrender.com/books?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);

          const categoryCount = {};
          data.forEach((book) => {
            const category = book.category || 'Unknown';
            categoryCount[category] = (categoryCount[category] || 0) + 1;
          });

          const chartData = Object.entries(categoryCount).map(
            ([key, value]) => ({
              name: key,
              value,
            })
          );
          setCategoryData(chartData);
        });
    }
  }, [user?.email]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-24">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-10">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#4F7942]"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
            {user?.displayName}
          </h2>
          <p className="text-gray-600 break-words">{user?.email}</p>
          <p className="mt-2 text-sm text-green-700 font-medium">
            Total Books: {books.length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg sm:text-xl font-semibold  text-center">
          Books by Category
        </h3>
        {categoryData.length ? (
          <div className="w-full h-[300px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: '0.875rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500">No data to show</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
