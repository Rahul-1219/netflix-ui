import React, { memo, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchVideoIds, getGenres } from "../store";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";
import { ImSpinner2 } from "react-icons/im";

const TVShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded, dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  useEffect(() => {
    dispatch(fetchVideoIds({ type: "tv" }));
  }, [dispatch, movies]);

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} type="tv" />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies ? (
          movies.length ? (
            <Slider movies={movies} />
          ) : (
            <NotAvailable page="Movies" />
          )
        ) : (
          <div className="spinner">
            <ImSpinner2 style={{ width: "40", height: "40" }} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default memo(TVShows);

const Container = styled.div`
  .data {
    margin-top: 8rem;
    & > .spinner {
      text-align: center;
    }
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
