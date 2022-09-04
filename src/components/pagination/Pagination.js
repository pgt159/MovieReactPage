import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import PaginationLink from "./PaginationLink";

const Pagination = ({ searchAPI, page, type }) => {
  const navigate = useNavigate();
  const movieName = useParams().movieName;
  const [currentPage, setCurrentPage] = useState(page);
  const [array, setArray] = useState([]);
  const {currentType} = useSelector((state) => state.type)
  useEffect(() => {
    const newArray = Array(
      searchAPI?.total_pages > 500 ? 500 : searchAPI?.total_pages
    );
    if (newArray?.length > 0) {
      for (let i = 0; i < newArray?.length; i++) {
        newArray[i] = Number(i) + 1;
      }
    }
    setArray(newArray);
    setCurrentPage(page);
  }, [searchAPI, currentPage, page]);

  return (
    <div className="flex items-center justify-center gap-5 relative md:my-10 flex-row text-white">
      {array.length > 1 && <button
        onClick={() => {
          if (page <= 1) return;
          navigate(
            `/${currentType === 'Movies' ? 'movies' : 'series'}/page=${page - 1}${
              type
                ? `&searchGenre=${type.id}&type=${type.name}`
                : ""
            }`
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>}
      <div className="md:h-[250px] h-[100px] md:max-x-[500px] max-x-full overflow-x-hidden overflow-y-auto flex items-center flex-row gap-5 md:px-5">
        {currentPage >= 4 && (
          <>
            <PaginationLink
              key={v4()}
              type={type}
              item={1}
              movieName={movieName}
            ></PaginationLink>
            <span className="text-lg tracking-[10px] hidden md:inline-block">
              ...
            </span>
          </>
        )}
        {array.length > 0 && currentPage < 4
          ? array
              .slice(0, 5)
              .map((item) => (
                <PaginationLink
                  key={v4()}
                  type={type}
                  item={item}
                  movieName={movieName}
                ></PaginationLink>
              ))
          : currentPage < array?.length - 2
          ? array
              .slice(currentPage - 2, Number(currentPage) + 1)
              .map((item) => (
                <PaginationLink
                  key={v4()}
                  type={type}
                  item={item}
                  movieName={movieName}
                ></PaginationLink>
              ))
          : array
              .slice(currentPage - 2, array?.length - 1)
              .map((item) => (
                <PaginationLink
                  key={v4()}
                  type={type}
                  item={item}
                  movieName={movieName}
                ></PaginationLink>
              ))}
        {currentPage < array?.length - 2 && (
          <span className="text-lg tracking-[10px] hidden md:inline-block">
            ...
          </span>
        )}

        {array.length > 2 && (
          <PaginationLink
            key={v4()}
            type={type}
            item={array.length}
            movieName={movieName}
          ></PaginationLink>
        )}
      </div>

      {array.length > 1 && (
        <button
          onClick={() => {
            if (page >= 500) return;
            navigate(
              `/${currentType === 'Movies' ? 'movies' : 'series'}/page=${+page + 1}${
                type
                  ? `&searchGenre=${type.id}&type=${type.name}`
                  : ""
              }`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pagination;
