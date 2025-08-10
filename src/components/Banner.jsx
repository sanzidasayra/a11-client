import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="w-full h-[400px] sm:h-[600px] md:h-[700px] relative overflow-hidden">
      <Swiper
        speed={1000}
        parallax={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Parallax, Autoplay, Pagination]}
        className="mySwiper h-full"
      >
        {/* Parallax Background */}
        <div
          slot="container-start"
          className="absolute top-0 left-0 w-[130%] h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/1280px-Books_HD_%288314929977%29.jpg')",
          }}
          data-swiper-parallax="-23%"
        ></div>

        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col justify-center h-full text-white px-4 sm:px-10 md:px-20 bg-black/50">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2"
              data-swiper-parallax="-300"
            >
              Discover New Worlds through Books
            </h2>
            <p
              className="text-sm sm:text-base md:text-xl"
              data-swiper-parallax="-200"
            >
              Immerse yourself in captivating stories from various genres including fantasy, fiction, adventure, and more. <br /> Discover authors and books that transport you to different worlds.
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col justify-center h-full text-white px-4 sm:px-10 md:px-20 bg-black/50">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2"
              data-swiper-parallax="-300"
            >
              Track Your Reading Journey
            </h2>
            <p
              className="text-sm sm:text-base md:text-xl"
              data-swiper-parallax="-200"
            >
              Keep track of all the books you've read, your current reads, and your reading goals. Update your reading status <br /> and stay motivated to achieve your personal milestones.
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col justify-center h-full text-white px-4 sm:px-10 md:px-20 bg-black/50">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2"
              data-swiper-parallax="-300"
            >
              Rate, Review & Share Your Favorite Books
            </h2>
            <p
              className="text-sm sm:text-base md:text-xl"
              data-swiper-parallax="-200"
            >
              Help others by sharing your thoughts and reviews. Rate books you've read and discover community favorites. Engage with fellow <br /> readers and contribute to book discussions.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
