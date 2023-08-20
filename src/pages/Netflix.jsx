import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchPoster, fetchVideoIds, getGenres } from "../store";
import Slider from "../components/Slider";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const moviePoster = useSelector((state) => state.netflix.moviePoster);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded, dispatch]);

  useEffect(() => {
    dispatch(fetchPoster());
  }, [dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    dispatch(fetchVideoIds({ type: "movie" }));
  }, [dispatch, movies]);

  const handlePlayer = async (movie) => {
    try {
      const { data } = await axios.get(
        `${TMDB_BASE_URL}/tv/${movie.id}/videos?api_key=${API_KEY}`
      );

      navigate(`/player/${data.results[0].key}`);
    } catch (error) {
      navigate(`/player/ZLW2jkd6E7g`);
    }
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} type="multi" />
      <div className="hero">
        <img
          src={
            moviePoster?.backdrop_path && moviePoster
              ? `https://image.tmdb.org/t/p/original/${moviePoster?.backdrop_path}`
              : `https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg`
          }
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <h1>
              {moviePoster?.title ||
                moviePoster?.original_name ||
                moviePoster?.name}
            </h1>
            <p>
              {moviePoster?.overview
                ? moviePoster.overview.substring(0, 100) + "..."
                : ""}
            </p>
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => {
                handlePlayer(moviePoster);
              }}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      {movies ? (
        <Slider movies={movies} />
      ) : (
        <div className="spinner">
          <ImSpinner2 style={{ width: "40", height: "40" }} />
        </div>
      )}
    </Container>
  );
};

export default Netflix;

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    & > .spinner {
      text-align: center;
    }
    .background-image {
      filter: brightness(60%);
      object-fit: cover;
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 3rem;
      .logo {
        h1 {
          height: 100%;
          width: 100%;
          font-size: 4rem;
          margin-left: 5rem;
        }
        p {
          height: 50%;
          width: 50%;
          font-size: 1rem;
          margin-left: 5rem;
          margin-top: 0.5rem;
        }
      }
      .buttons {
        margin: 5rem;
        margin-top: 3rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }

  @media ((min-width: 768px) and (max-width: 1180px)) {
    .hero {
      img {
        height: 50vh;
      }
      .container {
        bottom: 1rem;
        margin-left: 2rem;
        .logo {
          h1 {
            font-size: 2rem;
            margin-left: 2rem;
          }
          p {
            font-size: 0.8rem;
            margin-left: 2rem;
            margin-top: 0.3rem;
          }
        }
        .buttons {
          margin: 2rem;
          margin-top: 2rem;
          gap: 1rem;
          button {
            font-size: 1rem;
            padding: 0.3rem;
            padding-left: 1rem;
            padding-right: 1.2rem;
            &:nth-of-type(2) {
              svg {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }
  @media ((min-width: 320px) and (max-width: 767px)) {
    .hero {
      img {
        height: 40vh;
      }
      .container {
        bottom: 1rem;
        .logo {
          h1 {
            font-size: 1.5rem;
            margin-left: 1.5rem;
          }
          p {
            font-size: 0.7rem;
            margin-left: 1.5rem;
            margin-top: 0.2rem;
            text-overflow: ellipsis;
            max-width: 100%;
          }
        }
        .buttons {
          margin: 1rem;
          margin-top: 0.5rem;
          gap: 0.5rem;
          button {
            font-size: 0.9rem;
            padding: 0.2rem;
            padding-left: 0.8rem;
            padding-right: 1rem;
            margin-left: 0.5rem;
            &:nth-of-type(2) {
              svg {
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
  }
`;
