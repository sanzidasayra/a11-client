import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">Support</h1>
        <p className="text-gray-700 leading-relaxed">
          Need help? You can contact our support team at{' '}
          <a href="mailto:support@storymint.com" className="text-green-700 underline ml-1">
            support@storymint.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Support;
