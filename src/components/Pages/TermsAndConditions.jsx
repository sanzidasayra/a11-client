import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 py-12">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800 dark:text-gray-50 text-center">Terms & Conditions</h1>
        <p className="text-gray-700 leading-relaxed dark:text-gray-200">
          Welcome to StoryMint! These Terms and Conditions govern your use of our website.
          Please read them carefully before using our services.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
