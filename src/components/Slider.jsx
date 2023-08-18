import React, { memo } from "react";
import CardSlider from "./CardSlider";

const Slider = ({ movies }) => {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div>
      {getMoviesFromRange(0, 10).length > 0 && (
        <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      )}
      {getMoviesFromRange(10, 20).length > 0 && (
        <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      )}
      {getMoviesFromRange(20, 30).length > 0 && (
        <CardSlider
          title="Blockbuster Movies"
          data={getMoviesFromRange(20, 30)}
        />
      )}
      {getMoviesFromRange(30, 40).length > 0 && (
        <CardSlider
          title="Popular On Netflix"
          data={getMoviesFromRange(30, 40)}
        />
      )}
      {getMoviesFromRange(40, 50).length > 0 && (
        <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
      )}
      {getMoviesFromRange(50, 60).length > 0 && (
        <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
      )}
    </div>
  );
};

export default memo(Slider);
