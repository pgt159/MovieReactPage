
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGenre } from "../../context/GenreContext";
import ButtonWatch from "../button/ButtonWatch";
const BannerSlide = (props) => {
    const [genre] = useGenre()
    const {name, tags, src, id} = props;
    const itemGenre = []
    for (let i = 0; i<tags.length; i++) {
        genre.forEach(item => {
            if (tags[i] === item.id) {
                itemGenre.push(item.name)
            }
        })
    }
    const handleButtonClick = useNavigate()
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
        <div className="tags flex gap-x-2 flex-row ">
        {itemGenre?.length > 0 && itemGenre.map(item => (
          <span className="p-2 rounded-sm border" key={itemGenre.indexOf(item)}>{item}</span>

        ))}
        </div>
        <ButtonWatch onClick={() => handleButtonClick(`/movies/${id}`)}
          bgColor='primary'
          className={' p-3 w-[120px] rounded-lg'}
        >
          Watch Now
        </ButtonWatch>
        {/* <button onClick={() => handleButtonClick(`/movies/${id}`)} className="bg-primary p-3 w-[120px] rounded-lg">Watch</button> */}
      </div>
    </Fragment>
  );
};

export default BannerSlide;
