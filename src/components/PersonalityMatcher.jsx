/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdCelebration } from "react-icons/md";

const booksByPersonality = {
  adventure: "The Hobbit",
  mystery: "Gone Girl",
  romantic: "Pride and Prejudice",
  fantasy: "Harry Potter",
};

const PersonalityMatcher = () => {
  const [choice, setChoice] = useState('');
  const [matchedBook, setMatchedBook] = useState(null);

  const handleSubmit = () => {
    setMatchedBook(booksByPersonality[choice]);
  };

  return (
    <section className="my-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto bg-green-50 p-5 sm:p-8 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-green-900">
          What Book Matches Your Personality?
        </h2>

        <p className="text-center mb-6 text-sm sm:text-base max-w-2xl mx-auto text-green-800">
          Select the type of vibe you love most and discover your match!
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
          {Object.keys(booksByPersonality).map(type => (
            <button
              key={type}
              onClick={() => setChoice(type)}
              className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium transition duration-200 capitalize ${
                choice === type
                  ? 'bg-green-700 text-white'
                  : 'bg-green-200 text-green-900 hover:bg-green-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-800 text-white px-6 py-2 text-sm sm:text-base rounded-md hover:brightness-110 transition"
          >
            Show My Match
          </button>

          {matchedBook && (
            <motion.div
              className="mt-6 text-base sm:text-lg font-semibold text-green-900 flex flex-col sm:flex-row items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <MdCelebration className="text-2xl text-green-700" />
              <span>
                Your Match is: <span className="text-green-700">{matchedBook}</span>
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PersonalityMatcher;
