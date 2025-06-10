import { useState } from 'react';
import './App.module.css';
import toast, { Toaster } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from '../Loader/Loader';
import ErrorMessage from "../ErrorMessage/ErrorMessage"; 
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from "../../services/movieService";
import type { Movie } from '../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies({ query });

      if (data.results.length === 0) {
        setIsError(true);   
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch (error) {
      setIsError(true);
      toast.error("Something went wrong. Try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelect = (movie: Movie) => {
    console.log("Selected movie:", movie);
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isLoading && <Loader />}
      {!isLoading && isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    )}
    </>
  );
}
