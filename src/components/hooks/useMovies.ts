import { useQuery } from "@tanstack/react-query";
import fetchMovies from "../../services/movieService"
import type { FetchMoviesResponse } from "../../types/movie";

export function useMovies(query: string, page: number) {
  return useQuery<FetchMoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    keepPreviousData: true,
    enabled: !!query.trim(), 
  });
}