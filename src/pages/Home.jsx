import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const moviesPerPage = 16;

  // Funkcija za učitavanje popularnih filmova
  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setTotalPages(Math.ceil(popularMovies.length / moviesPerPage));
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load popular movies...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Funkcija za pretraživanje filmova
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      await loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setTotalPages(Math.ceil(searchResults.length / moviesPerPage));
      setCurrentPage(1);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  // Prikaz filmova za trenutnu stranicu
  const getPaginatedMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return movies.slice(startIndex, startIndex + moviesPerPage);
  };

  // Funkcije za navigaciju kroz stranice
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="home">
      {/* Forma za pretraživanje */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Prikaz poruka o grešci */}
      {error && <div className="error-message">{error}</div>}

      {/* Prikaz loading indikatora ili filmova */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="movies-grid">
            {getPaginatedMovies().map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {/* Navigacija kroz stranice */}
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
