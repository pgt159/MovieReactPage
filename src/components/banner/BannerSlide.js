import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonWatch from "../button/ButtonWatch";
import { useSelector } from "react-redux";

const BannerSlide = (props) => {
  const genre = useSelector((state) => state.genre.genreList);
  const { currentType } = useSelector((state) => state.type);
  const { name, tags, src, id, type } = props;
  const itemGenre = [];
  for (let i = 0; i < tags.length; i++) {
    genre.forEach((item) => {
      if (tags[i] === item.id) {
        itemGenre.push({
          name: item.name,
          id: item.id,
        });
      }
    });
  }
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)] rounded-xl z-[100] pointer-events-none"></div>
      <img
        src={src}
        alt=""
        className=" rounded-xl w-full max-h-full object-cover"
      />
      <div className="content absolute bottom-5 left-5 mb-5 text-white drop-shadow-md flex flex-col gap-y-5 z-[150]">
        <span className="text-[30px]">{name}</span>
        <div className="tags flex gap-2 flex-row flex-wrap">
          {itemGenre?.length > 0 &&
            itemGenre.map((item) => (
              <Link
                to={`${
                  type === "series"
                    ? `/series/page=1&searchGenre=${item.id}&type=${item.name}`
                    : `/movies/page=1&searchGenre=${item.id}&type=${item.name}`
                }`}
                key={item.id}
                className="p-2 rounded-sm border hover:text-black hover:bg-primary transition-all"
              >
                {item.name}
              </Link>
            ))}
        </div>
        <ButtonWatch
          onClick={() => navigate(`${currentType === "Movies" ? `/movies/${id}` : `/series/${id}`}`)}
          bgColor="primary"
          className={" p-3 w-[120px] rounded-lg"}
        >
          Watch Now
        </ButtonWatch>
      </div>
    </Fragment>
  );
};

export default BannerSlide;
