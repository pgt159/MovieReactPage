import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useClickToggle from "../../hooks/useClickToggle";
import EpisodeItem from "../movieCard/EpisodeItem";

const EpisodeList = ({ chosenSeason, id }) => {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${chosenSeason}?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US`
      )
      .then((res) => setEpisodes(res.data.episodes));
  }, [chosenSeason]);
  console.log(episodes);
  return (
    <div className="w-full ep-list relative flex-shrink-0">
        <Swiper grabCursor={"false"} spaceBetween={10} slidesPerView={`${window.innerWidth > 760 ? 5 : 4}`}>

        {episodes?.length > 0 &&
          episodes.map((item) => (
            <SwiperSlide key={item.id}>
              <EpisodeItem
                name={item.name}
                id={id}
                ep={item.episode_number}
                src={item.still_path}
                season={chosenSeason}
              ></EpisodeItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default EpisodeList;
