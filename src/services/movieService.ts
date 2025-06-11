import axios from "axios";
import type { FetchMoviesResponse } from "../types/movie"
const API_URL = "https://api.themoviedb.org/3/search/movie";
const MY_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesParams {
    query: string;
    page?: number;
  }
  
  export default async function fetchMovies({
    query,
    page = 1,
  }: FetchMoviesParams): Promise<FetchMoviesResponse> {
    const response = await axios.get<FetchMoviesResponse>(API_URL, {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${MY_TOKEN}`,
      },
    });
  
    return response.data;
  }