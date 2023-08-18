import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL, DB_API } from "../utils/constants";
const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  moviePoster: [],
  videoIds: [],
};

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const searchMovies = createAsyncThunk(
  "netflix/search",
  async ({ searchStr, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    if (searchStr !== "") {
      return getRawData(
        `${TMDB_BASE_URL}/search/${type}?api_key=${API_KEY}&query=${searchStr}`,
        genres,
        true
      );
    } else {
      if (type === "multi") type = "all";
      return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
    }
  }
);
export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenre",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
      true
    );
  }
);

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

export const getUserLikedMovies = createAsyncThunk(
  "netflix/liked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`${DB_API}/api/user/liked/${email}`);
    return movies;
  }
);
export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios.put(`${DB_API}/api/user/delete`, {
      email,
      movieId,
    });
    return movies;
  }
);

export const fetchPoster = createAsyncThunk("netflix/poster", async () => {
  const request = await axios.get(
    `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`
  );

  const poster = await request.data.results[
    Math.floor(Math.random() * request.data.results.length - 1)
  ];
  return poster;
});

export const fetchVideoIds = createAsyncThunk(
  "netflix/videoIds",
  async ({ type }, thunkApi) => {
    const {
      netflix: { movies },
    } = thunkApi.getState();
    const fetchVideoPromises = movies.map(async (movie) => {
      try {
        const { data } = await axios.get(
          `${TMDB_BASE_URL}/${type}/${movie.id}/videos?api_key=${API_KEY}`
        );
        return { movieId: movie.id, key: data.results[0]?.key || "" };
      } catch (error) {
        console.clear();
        return { movieId: movie.id, key: "" };
      }
    });

    const videosKeys = await Promise.all(fetchVideoPromises);
    return videosKeys;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(getUserLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(removeFromLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchPoster.fulfilled, (state, action) => {
        state.moviePoster = action.payload;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(fetchVideoIds.fulfilled, (state, action) => {
        state.videoIds = action.payload;
      });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
