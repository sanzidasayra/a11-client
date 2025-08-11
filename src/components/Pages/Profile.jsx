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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-24
                    bg-white dark:bg-gray-900
                    ">
      <div className="shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-10
                      bg-white dark:bg-gray-800
                      ">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover
                     border-4 border-[#4F7942] dark:border-gray-500
                     "
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold
                         text-gray-800 dark:text-gray-100 break-words
                         ">
            {user?.displayName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 break-words">{user?.email}</p>
          <p className="mt-2 text-sm font-medium
                        text-green-700 dark:text-gray-400
                        ">
            Total Books: {books.length}
          </p>
        </div>
      </div>

      <div className="shadow-lg rounded-2xl p-6
                      bg-white dark:bg-gray-800
                      ">
        <h3 className="text-lg sm:text-xl font-semibold text-center
                       text-gray-900 dark:text-gray-100
                       ">
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
                <Tooltip
                  contentStyle={{ backgroundColor: '#2d3748', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: '0.875rem', color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No data to show</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
