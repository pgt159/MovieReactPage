import React from "react";
import { Link } from "react-router-dom";

const EpisodeItem = ({ ep, name, src, id, season }) => {
  return (
    <Link
      className="w-full flex flex-col select-none gap-5 bg-primary bg-opacity-20 mb-5 rounded-lg"
      to={`/series/${id}/watch&season=${season}&ep=${ep}`}
    >
      <div className="w-full md:h-[140px] block flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${src}`}
          alt=""
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col gap-5 md:px-5 px-2">
        <span>Ep {ep}</span>
        <span className="w-full truncate h-8 pr-5">{name}</span>
      </div>
    </Link>
  );
};

export default EpisodeItem;
