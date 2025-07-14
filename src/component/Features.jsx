import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  "Upload and share assignments",
  "Allow group discussions",
  "Real-time chat for study groups",
  "Topic-based rooms",
  "Create and share flashcards for subjects",
  "Quiz each other",
  "Study Partner Matching",
  "Review each other's assignments",
  "Give feedback using rating scale",
  "Track exam dates, assignment deadlines",
  "Filter by topic or grade level",
];

// Motion variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const Features = () => {
  return (
    <motion.div
      className="bg-[#f0f4ff] dark:bg-gray-900 py-16 px-4 md:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-[#002147] dark:text-white text-3xl md:text-4xl font-bold mb-4 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          STUDY FEATURES
        </motion.h2>

        <motion.p
          className="text-[#002147] dark:text-gray-300 text-sm md:text-base mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          There are so many reasons to choose E-Study, here are a few highlights:
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-2"
              variants={itemVariants}
            >
              <FaArrowRight className="text-[#fdc800] mt-1" />
              <p className="text-[#002147] dark:text-white">{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;
