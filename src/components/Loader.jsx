// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3fce7] dark:bg-gray-800 mt-16">
      <motion.div
        className="w-20 h-20 rounded-full border-[6px] border-t-[#808000] border-l-[#4F7942] dark:border-l-gray-800 dark:border-t-gray-700 border-r-[#808000] border-b-[#4F7942] dark:border-r-gray-800 dark:border-b-gray-700 animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear"
        }}
      ></motion.div>
    </div>
  );
};

export default Loader;
