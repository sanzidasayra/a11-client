import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3fce7] mt-20">
      <motion.div
        className="w-20 h-20 rounded-full border-[6px] border-t-[#808000] border-l-[#4F7942] border-r-transparent border-b-transparent"
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
