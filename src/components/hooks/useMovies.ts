import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { FetchMoviesResponse } from "../../types/movie";

export function useMovies(query: string, page: number) {
  return useQuery<FetchMoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    keepPreviousData: true,
    enabled: !!query,
  } as UseQueryOptions<FetchMoviesResponse, Error>);
}
