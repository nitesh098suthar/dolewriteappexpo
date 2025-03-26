import MovieDetails from "../app/movie/[id]";
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_TOKEN: process.env.EXPO_PUBLIC_MOVIE_API_KEY, // Use the token from .env
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_TOKEN}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch the movie detail page");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// ---------------------------------------------

import axios from "axios";

export const vimeoHttpClient = axios.create({
  baseURL: "https://api.vimeo.com",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_VIMEO_API_KEY}`,
  },
  params: {
    sort: "alphabetical", // Sorting videos alphabetically
  },
});
