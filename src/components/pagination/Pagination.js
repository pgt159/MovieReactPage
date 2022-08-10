import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import {v4} from 'uuid'
import PaginationLink from './PaginationLink';

const Pagination = ({searchAPI, page, type}) => {
  const navigate = useNavigate();
  const movieName = useParams().movieName;
  const [currentPage, setCurrentPage] = useState(page);
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchAPI);
    const newArray = Array(searchAPI?.total_pages);
    if (newArray?.length > 0) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = Number(i) + 1;
      }
    }
    setArray(newArray);
    setCurrentPage(page);
  }, [searchAPI, currentPage]);

    return (
        <div className="flex justify-center gap-x-5 relative my-10 text-white">
            <button
              onClick={() => {
                navigate(`/movies/page=${page - 1}${movieName ? `&search=${movieName}` : type ? `&searchGenre=${type.id}&type=${type.name}` : ""}`);
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
            </button>
            <div className="h-[200px] overflow-x-hidden overflow-y-atuo flex items-center flex-row gap-x-5 px-5">
              {currentPage >= 4 && (
                <>
                <PaginationLink type={type} item={1} movieName={movieName}></PaginationLink>
                  <span className="text-lg tracking-[10px]">...</span>
                </>
              )}
              {array.length > 0 && currentPage < 4
                ? array.slice(0, 5).map((item) => (
                    <PaginationLink type={type} type={type} item={item} movieName={movieName}></PaginationLink>
                  ))
                : currentPage < array?.length - 2
                ? array
                    .slice(currentPage - 2, Number(currentPage) + 1)
                    .map((item) => (
                        <PaginationLink type={type} item={item} movieName={movieName}></PaginationLink>
                    ))
                : array
                    .slice(currentPage - 2, array?.length - 1)
                    .map((item) => (
                        <PaginationLink type={type} item={item} movieName={movieName}></PaginationLink>
                    ))}
              {currentPage < array?.length - 2 && (
                <span className="text-lg tracking-[10px]">...</span>
              )}
              <PaginationLink type={type} item={array.length} movieName={movieName}></PaginationLink>
            </div>

            <button
              onClick={() => {
                navigate(`/movies/page=${+page + 1}${movieName ? `&search=${movieName}` : type ? `&searchGenre=${type.id}&type=${type.name}` : ""}`);
                console.log(page);
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
          </div>
    );
};

export default Pagination;