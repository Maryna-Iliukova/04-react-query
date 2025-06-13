import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import useMovies from "../hooks/useMovies";
import ReactPaginate from "react-paginate";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const { data, isLoading, isError } = useMovies(query, page);
  
useEffect(() => {
    if (query.trim().length === 0) return;
    if (!isLoading && data && data.results.length === 0) {
      toast.error("No movies found.");
    }
  }, [data, isLoading, query]);
  
  const handleSearch = (newQuery: string) => {
    const trimmedQuery = newQuery.trim();

    if (!trimmedQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    if (trimmedQuery === query) return;

    setQuery(trimmedQuery);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={handleSelect} />
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
