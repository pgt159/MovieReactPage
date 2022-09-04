import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "../../loading/LoadingSkeleton";

const PersonalListItem = ({ name, src, vote, release, id, type }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer w-full h-[320px] 
      md:h-[400px] rounded-xl overflow-hidden p-3 relative select-none"
      onClick={() => navigate(`${type === undefined ? `/movies/${id}` : `/series/${id}`}`)}
    >
      <div className="z-50 relative w-full h-full flex flex-col gap-y-2 ">
        <div className="max-w-full h-[250px] md:h-[85%] rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/w500/${src}`}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <span className="truncate max-w-[80%] h-[30px] mt-2">{name}</span>
        <div className="flex flex-row justify-between text-sm absolute z-30 gap-1 top-0 left-0 w-full md:p-2">
          <div className="flex flex-row items-center gap-x-3 ">
            <span
              className="drop-shadow-lg bg-tags 
            rounded-lg md:px-3 md:py-2 p-2  font-semibold text-white bg-opacity-50 flex gap-1 justify-center items-center"
            >
              {Math.round(vote * 10) / 10}
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 15"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="inline"
              >
                <path
                  d="M7.66713 1.02447C7.7719 0.702008 8.2281 0.702009 8.33287 1.02447L9.71753 5.28602C9.76439 
                      5.43023 9.89877 5.52786 10.0504 5.52786H14.5313C14.8703 5.52786 15.0113 5.96173 14.737 
                      6.16102L11.1119 8.7948C10.9892 8.88393 10.9379 9.04191 10.9847 9.18612L12.3694 
                      13.4477C12.4742 13.7701 12.1051 14.0383 11.8308 13.839L8.20572 11.2052C8.08305
                       11.1161 7.91695 11.1161 7.79428 11.2052L4.16918 13.839C3.89488 14.0383 3.52581 13.7701 
                       3.63059 13.4477L5.01525 9.18612C5.06211 9.04191 5.01078 8.88393 4.88811 8.7948L1.26301 
                       6.16102C0.988711 5.96173 1.12968 5.52786 1.46874 5.52786H5.9496C6.10123 5.52786 6.23561 
                       5.43023 6.28247 5.28602L7.66713 1.02447Z"
                />
              </svg>
            </span>
          </div>
        </div>

        {/*  */}
      </div>
      <div className="absolute inset-0 p-3">
        <img
          src={`https://image.tmdb.org/t/p/w500/${src}`}
          alt=""
          className="w-full h-full object-cover rounded-xl hidden md:block"
        />
        <div className="layer absolute inset-0 md:backdrop-blur-md rounded-xl bg-[#000000] bg-opacity-40"></div>
      </div>
    </div>
  );
};

export default PersonalListItem;

export const MovieCardLoading = () => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden p-3 relative select-none">
      <div className="z-20 relative w-full h-full flex flex-col gap-y-2">
        <LoadingSkeleton className="w-full h-[70%] object-cover rounded-xl"></LoadingSkeleton>
        <LoadingSkeleton className="w-full h-[20px] "></LoadingSkeleton>
        <div className="flex flex-row justify-between text-sm mt-auto">
          <LoadingSkeleton className="w-[50px] h-[20px] "></LoadingSkeleton>
          <div className="flex flex-row items-center gap-x-3 ">
            <LoadingSkeleton className="w-[30px] h-[20px] "></LoadingSkeleton>
            <LoadingSkeleton className="w-[30px] h-[20px] "></LoadingSkeleton>

            <svg
              width="20"
              height="20"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline"
            >
              <path
                d="M7.66713 1.02447C7.7719 0.702008 8.2281 0.702009 8.33287 1.02447L9.71753 5.28602C9.76439 
                      5.43023 9.89877 5.52786 10.0504 5.52786H14.5313C14.8703 5.52786 15.0113 5.96173 14.737 
                      6.16102L11.1119 8.7948C10.9892 8.88393 10.9379 9.04191 10.9847 9.18612L12.3694 
                      13.4477C12.4742 13.7701 12.1051 14.0383 11.8308 13.839L8.20572 11.2052C8.08305
                       11.1161 7.91695 11.1161 7.79428 11.2052L4.16918 13.839C3.89488 14.0383 3.52581 13.7701 
                       3.63059 13.4477L5.01525 9.18612C5.06211 9.04191 5.01078 8.88393 4.88811 8.7948L1.26301 
                       6.16102C0.988711 5.96173 1.12968 5.52786 1.46874 5.52786H5.9496C6.10123 5.52786 6.23561 
                       5.43023 6.28247 5.28602L7.66713 1.02447Z"
                stroke="#FFB86C"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        <LoadingSkeleton className="w-full h-[50px] mt-auto relative bottom-0 rounded-xl"></LoadingSkeleton>
      </div>
    </div>
  );
};
