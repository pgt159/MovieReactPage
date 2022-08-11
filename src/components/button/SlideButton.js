import { React } from "react";
import { useSwiper } from "swiper/react";

export function SlideNextButton({ className }) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className={
        "text-xl justify-center items-center right-5 absolute top-2/4 z-40 -translate-y-2/4 hidden md:flex"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-[30px] hover:text-primary transition-all"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slidePrev()} className={
      "text-xl justify-center items-center left-5 absolute top-2/4 z-40 -translate-y-2/4 hidden md:flex"
    }>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-[30px] hover:text-primary transition-all"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
