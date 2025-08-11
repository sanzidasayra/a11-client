import React, { useState, useEffect } from "react";

const promotions = [
  {
    id: 1,
    title: "30% OFF on Premium!",
    desc: "Unlock unlimited stories.",
    img: "https://i.ibb.co.com/dszVbCD7/1.jpg",
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    desc: "On selected ebooks.",
    img: "https://i.ibb.co.com/LXbNmpDV/2.jpg",
  },
  {
    id: 3,
    title: "Early Bird Discount",
    desc: "Subscribe before Sept 1.",
    img: "https://i.ibb.co.com/bjHrH7YK/3.jpg",
  },
  {
    id: 4,
    title: "Free Trial Week",
    desc: "Experience premium features.",
    img: "https://i.ibb.co.com/gbc7TRqg/4.jpg",
  },
  {
    id: 5,
    title: "Exclusive Author Webinars",
    desc: "Join live sessions.",
    img: "https://i.ibb.co.com/zt51yMf/5.jpg",
  },
];

const SalesPromotion = () => {
  const [speed, setSpeed] = useState("20s");

  useEffect(() => {
    const updateSpeed = () => {
      if (window.innerWidth < 640) {
        setSpeed("10s"); 
      } else if (window.innerWidth < 1024) {
        setSpeed("15s"); 
      } else {
        setSpeed("20s"); 
      }
    };
    updateSpeed();
    window.addEventListener("resize", updateSpeed);
    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  return (
    <section className="overflow-hidden py-6 sm:py-8">
      <div className="relative">
        <div
          className="flex space-x-4 sm:space-x-8 animate-marquee whitespace-nowrap"
          style={{ animationDuration: speed }}
        >
          {[...promotions, ...promotions].map(({ id, title, desc, img }, index) => (
            <div
              key={id + "-" + index}
              className="bg-gradient-to-r from-[#4F7942] to-[#808000] dark:from-gray-800 dark:to-gray-700 text-white rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[220px] sm:min-w-[280px] shadow-lg flex-shrink-0 flex items-center space-x-3 sm:space-x-4"
            >
              <img
                src={img}
                alt={title}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-sm sm:text-lg">{title}</h3>
                <p className="text-xs sm:text-sm dark:text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default SalesPromotion;
