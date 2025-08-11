import React from 'react';

const AboutUs = () => {
  return (
    <div className='mt-10'>
        <div className="min-h-screen px-4 py-16 bg-white dark:bg-gray-800 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 dark:text-gray-50 mb-6 text-center">About StoryMint</h1>

        <p className="text-lg mb-6 leading-relaxed dark:text-gray-200">
          Welcome to <span className="font-semibold text-green-900 dark:text-gray-400">StoryMint</span>, your ultimate online platform for book lovers!  
          Our mission is to create a vibrant community where readers and writers come together to share stories, explore new worlds, and discover hidden gems.
        </p>

        <p className="text-lg mb-6 leading-relaxed dark:text-gray-200">
          At StoryMint, we believe that every story matters. Whether you’re a casual reader looking for your next favorite book, an avid collector, or an aspiring author wanting to showcase your work, StoryMint is designed with you in mind.
        </p>

        <p className="text-lg mb-6 leading-relaxed dark:text-gray-200">
          Our platform offers an easy way to browse, add, and manage books, track your reading journey, and connect with others who share your passion. We prioritize a user-friendly experience with a clean interface and powerful features.
        </p>

        <h2 className="text-2xl font-semibold text-green-900 dark:text-gray-50 mb-4">Our Values</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 dark:text-gray-200">
          <li>Community-driven: We foster a welcoming and supportive environment for all readers and writers.</li>
          <li>Accessibility: StoryMint is designed to be accessible to everyone, on any device.</li>
          <li>Passion for stories: We celebrate the power of storytelling to inspire, educate, and entertain.</li>
          <li>Continuous improvement: We listen to user feedback and constantly enhance the platform.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-900 dark:text-gray-50 mb-4">Get in Touch</h2>
        <p className="text-lg mb-6 leading-relaxed dark:text-gray-200">
          Have questions or feedback? Feel free to reach out to us at <a href="mailto:support@storymint.com" className="text-green-900 underline dark:text-gray-400">support@storymint.com</a>.  
          We’d love to hear from you!
        </p>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
