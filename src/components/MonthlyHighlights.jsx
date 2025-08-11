import React from 'react';
import { FaCalendar } from 'react-icons/fa';

const MonthlyHighlights = () => {
  const month = new Date().toLocaleString('default', { month: 'long' });

  return (
    <section className="mb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto p-6 sm:p-8 
  bg-gradient-to-r from-green-100 to-lime-50 
  rounded-lg shadow-md 
  dark:from-gray-800 dark:to-gray-700"
>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3 flex-wrap justify-center text-center">
            <FaCalendar className="text-3xl sm:text-4xl text-green-700 dark:text-gray-100" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 dark:text-gray-100">
              {month} Literary Highlights
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-5 rounded-md shadow text-center">
            <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-gray-100">
              Book of the Month
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              "Atomic Habits" by James Clear – Build better habits this month!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-5 rounded-md shadow text-center">
            <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-gray-100">
              Literary Event
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              June 23 – International Book Donation Day. Spread the joy of reading!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-5 rounded-md shadow text-center">
            <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-gray-100">
              Featured Author
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Celebrating the works of Jane Austen – timeless tales of wit and romance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyHighlights;
