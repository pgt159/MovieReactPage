import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import EpisodeItem from "../../components/movieCard/EpisodeItem";
import EpisodeList from "../../components/movieList/EpisodeList";
import useGetMovies from "../../hooks/useGetMovies";

const SEChosing = ({ id, seasonNumber, season }) => {
  const [chosenSeason, setChosenSeason] = useState(+season);
  

  const array = Array(seasonNumber).fill(null);

  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }
  const selectRef = useRef();
  return (
    <div className="w-full flex flex-col gap-5">
      <select
        name="season"
        id="season"
        className="border bg-slate-900 px-4 py-2 rounded-lg"
        onChange={() => setChosenSeason(+selectRef.current.value)}
        ref={selectRef}
      >
        {array?.map((item) => (
          <option
            value={item}
            key={item}
            selected={item === +season ? "selected" : ""}
          >
            Season {item}
          </option>
        ))}
      </select>
      <EpisodeList chosenSeason={chosenSeason} id={id}></EpisodeList>

    </div>
  );
};

export default SEChosing;
