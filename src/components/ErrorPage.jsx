import { Link } from 'react-router';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3fce7] text-center px-4 ">
      <motion.h1
        className="text-7xl font-extrabold text-[#808000] mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl font-semibold text-gray-700 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! Page not found.
      </motion.p>

      <motion.p
        className="text-gray-500 mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-[#4F7942] to-[#808000] text-white rounded-full font-semibold hover:brightness-110 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
