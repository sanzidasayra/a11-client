import React from "react";

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
  return (
    <section className="overflow-hidden py-8">
      <div className="relative">
        <div
          className="flex space-x-8 animate-marquee whitespace-nowrap"
          style={{ animationDuration: "20s" }}
        >
          {[...promotions, ...promotions].map(({ id, title, desc, img }, index) => (
            <div
              key={id + "-" + index}
              className="bg-gradient-to-r from-[#4F7942] to-[#808000] text-white rounded-xl px-6 py-4 min-w-[280px] shadow-lg flex-shrink-0 flex items-center space-x-4"
            >
              <img
                src={img}
                alt={title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm">{desc}</p>
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
