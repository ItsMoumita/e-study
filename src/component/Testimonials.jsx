import React from "react";
import Marquee from "react-fast-marquee";
import {  Star } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const reviews = [
    {
      name: "Naruto Uzumaki",
      rating: 5,
      comment: "E-Study helped me stay focused and ace all my ninja theory tests!",
      photo: "https://images.immediate.co.uk/production/volatile/sites/3/2023/04/naruto-762b09d.jpg?quality=90&resize=980,654",
    },
    {
      name: "Sakura Haruno",
      rating: 4,
      comment: "I can now revise chapters on-the-go. E-Study keeps everything organized!",
      photo: "https://cdn.costumewall.com/wp-content/uploads/2018/09/sakura-haruno.jpg",
    },
    {
      name: "Gon Freecss",
      rating: 5,
      comment: "From quizzes to notes, everything feels like an adventure. Loved it!",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiNOGSd1g5Cl6eyQEQoekiBP26GkmpfL6HQ&s",
    },
    {
      name: "Killua Zoldyck",
      rating: 4,
      comment: "The dashboard is smooth. I never miss a deadline thanks to reminders.",
      photo: "https://i0.wp.com/hunterxhunter2016.wordpress.com/wp-content/uploads/2016/05/kilua.png?fit=1200%2C1038&ssl=1&w=640",
    },
    {
      name: "Luffy D. Monkey",
      rating: 5,
      comment: "I love how easy it is to submit assignments and get feedback quickly!",
      photo: "https://i.pinimg.com/564x/be/53/52/be535275d7d0998c67de1fa0e01189f5.jpg",
    },
    {
      name: "Levi Ackerman",
      rating: 5,
      comment: "A clean, no-nonsense UI. Great for both teachers and students.",
      photo: "https://i.pinimg.com/736x/1e/6c/da/1e6cda3141c1bd9ac02beb59599f85cc.jpg",
    },
    {
      name: "Hinata Hyuga",
      rating: 5,
      comment: "E-Study helped me gain confidence with quick feedback and progress tracking.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTcn7Jq_hIKZHdWiQCWaugjGPxbS-l2DDiA&s",
    },
    {
      name: "Zero Two",
      rating: 5,
      comment: "Visually stunning and super user-friendly. Perfect for self-study.",
      photo: "https://i.scdn.co/image/ab676161000051743fa0496e4b6c820053ba0e21",
    },
    {
      name: "Tanjiro Kamado",
      rating: 4,
      comment: "Very helpful in managing study time. The interface feels calming.",
      photo: "https://preview.redd.it/who-would-make-a-better-protagonist-than-tanjiro-and-why-v0-vrgvxvkeie8d1.png?auto=webp&s=5e43e666f623f9737c034c17784e99d022219309",
    },
    {
      name: "Nezuko Kamado",
      rating: 5,
      comment: "I don’t say much, but this app made studying really simple and fun.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9dwpbXA2PXllGlrUWhp3CWjbH6EEB_Ca9g&s",
    },
  ];

  return (
    <div className="bg-[#f0f4ff] dark:bg-[#1F2937] border-t border-b border-blue-300 dark:border-blue-600  pb-6 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-6 px-6 md:px-12"
      >
        <h2 className="text-4xl flex justify-center items-center gap-2 font-bold text-[#002147] dark:text-white mb-6 md:mb-12 text-center">
           What Our Users Say
        </h2>
        <Marquee direction="right" pauseOnHover gradient={false} speed={40}>
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="mx-4 flex-shrink-0 bg-white dark:bg-[#374151] rounded-xl p-4 border border-blue-300 dark:border-blue-600 shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-blue-400"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">
                    {review.name}
                  </p>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "#FACC15" : "none"}
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm italic text-gray-600 dark:text-gray-300">
                “{review.comment}”
              </p>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default Testimonials;
