import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is E-Study?",
    answer: "E-Study is a group learning platform where students can share assignments, practice quizzes, and prepare together.",
  },
  {
    question: "Can I upload and share assignments?",
    answer: "Yes! You can upload assignments and share them with classmates for collaboration and feedback.",
  },
  {
    question: "How does group study work on E-Study?",
    answer: "Students can join topic-based rooms to study together, share notes, and submit tasks as a team.",
  },
  {
    question: "Can I find study partners?",
    answer: "Yes, E-Study helps match you with peers based on shared interests or subjects.",
  },
  {
    question: "Is E-Study mobile-friendly?",
    answer: "Absolutely! You can use E-Study on phones, tablets, or desktop—anytime, anywhere.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes! E-Study is 100% free for students who want to boost their learning through collaboration.",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <motion.div
      className="bg-[#f9f9f9] dark:bg-[#0b0f1a] py-20 px-6 lg:px-20"
      id="faq"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="w-11/12 mx-auto lg:w-1/2 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`rounded-xl transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#fdc800]/20 shadow-md dark:bg-white/10"
                : "bg-white dark:bg-[#0b0f1a]"
            }`}
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left"
              onClick={() => toggleFaq(index)}
            >
              <span className="text-[#002147] dark:text-white font-medium">
                {String(index + 1).padStart(2, "0")}. {faq.question}
              </span>
              <span className="text-[#fdc800]">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="answer"
                  className="px-4 pb-4 text-[#333] dark:text-gray-200 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FaqSection;
