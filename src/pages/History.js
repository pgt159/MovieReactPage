import React, { useEffect } from "react";
import { tmdb } from "../config";
import { usePersonal } from "../context/PersonalContext";
import axios from "axios";
import { useState } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import CheckBox from "../components/checkBox/CheckBox";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const History = () => {
  const { history, moviesHistory } = usePersonal();
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const { currentId } = usePersonal();
  return (
    <div className="w-full mb-10 text-white">
      <h1 className="text-[40px] font-semibold block mb-5 w-full text-center items-center">
        HISTORY
      </h1>
      <div>
        {edit ? (
          <div className={`flex justify-end gap-5 text-subText text-xl mb-5`}>
            <button
              className="flex flex-row gap-2 hover:text-white transition-all"
              onClick={() => {
                if (selected.length === history.length) {
                  setSelected([]);
                  return;
                }
                setSelected([...history]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Select all
            </button>
            <button
              className={`flex flex-row gap-2 hover:text-white transition-all ${
                selected.length <= 0 && "pointer-events-none opacity-50"
              }`}
              disabled={!selected.length > 0}
              onClick={async () => {
                const result = history.filter((item) => {
                  return !selected.includes(item);
                });
                await updateDoc(doc(db, "users", currentId), {
                  history: JSON.stringify([...result]),
                });
                setEdit(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Remove
            </button>
            <button
              className="flex flex-row gap-2 hover:text-white transition-all"
              onClick={() => {
                setEdit(false);
                setSelected([]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cancel
            </button>
          </div>
        ) : (
          <button
            className={`relative ml-auto flex flex-row justify-end gap-2 mb-5
       text-subText text-xl hover:text-white transition-all ${
         history.length > 0 ? "" : "hidden"
       }`}
            onClick={() => setEdit(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        )}
      </div>

      {history?.length > 0 ? (
        <div className="w-full flex flex-row flex-wrap gap-5 justify-center">
          {moviesHistory.length > 0 &&
            moviesHistory.map((item) => (
              <div className="md:w-[250px] w-[45%] flex-shrink-0" key={item.id}>
                <MovieCard
                  name={item.title || item.name}
                  src={item.poster_path}
                  vote={item.vote_average}
                  release={item.release_date || item.first_air_date}
                  id={item.id}
                ></MovieCard>
                {edit && (
                  <CheckBox
                    id={item.id}
                    selected={selected}
                    setSelected={setSelected}
                  ></CheckBox>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div
            className="container max-w-[1200px] mx-auto p-10 md:border border-white
             flex justify-center items-center flex-col text-white relative"
          >
            <div className="md:w-[300px]">
              <img src="/not-found.png" className="w-full" alt="" />
            </div>
            <div className=" w-full flex flex-col items-center md:gap-8 flex-shrink-0">
              <span className="md:text-[50px] text-2xl">SORRY, THERE'S</span>
              <span className="md:text-[50px] text-2xl text-primary">
                NOTHING HERE
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
