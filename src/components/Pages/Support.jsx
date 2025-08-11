import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 py-12">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800 dark:text-gray-50 text-center">Support</h1>
        <p className="text-gray-700 leading-relaxed dark:text-gray-200">
          Need help? You can contact our support team at{' '}
          <a href="mailto:support@storymint.com" className="text-green-700 dark:text-gray-400 underline ml-1">
            support@storymint.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Support;
