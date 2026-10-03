import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import {
  searchMovies,
  getPopularMovies,
} from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const moviesPerPage = 16;

  const loadPopularMovies = async () => {
    try {
      setLoading(true);

      const popularMovies = await getPopularMovies();

      setMovies(popularMovies);

      if (popularMovies.length > 0) {
        setFeaturedMovie(popularMovies[0]);
      }

      setCurrentPage(1);

      setTotalPages(
        Math.ceil(
          popularMovies.length / moviesPerPage
        )
      );

      setError(null);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load popular movies."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      await loadPopularMovies();
      return;
    }

    try {
      setLoading(true);

      const searchResults = await searchMovies(
        searchQuery
      );

      setMovies(searchResults);

      setCurrentPage(1);

      setTotalPages(
        Math.ceil(
          searchResults.length / moviesPerPage
        )
      );

      setError(null);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to search movies."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedMovies = () => {
    const startIndex =
      (currentPage - 1) * moviesPerPage;

    return movies.slice(
      startIndex,
      startIndex + moviesPerPage
    );
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(
        (previousPage) => previousPage - 1
      );
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (previousPage) => previousPage + 1
      );
    }
  };

  return (
    <div className="home">
      {featuredMovie && (
        <section
          className="hero"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(8, 8, 12, 0.98) 0%,
                rgba(8, 8, 12, 0.78) 35%,
                rgba(8, 8, 12, 0.25) 70%,
                rgba(8, 8, 12, 0.9) 100%
              ),
              linear-gradient(
                0deg,
                #08080c 0%,
                transparent 45%
              ),
              url(
                https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}
              )
            `,
          }}
        >
          <div className="hero-content">
            <span className="hero-label">
              FEATURED MOVIE
            </span>

            <h1 className="hero-title">
              {featuredMovie.title}
            </h1>

            <div className="hero-meta">
              {featuredMovie.release_date && (
                <span>
                  {featuredMovie.release_date.slice(
                    0,
                    4
                  )}
                </span>
              )}

              <span className="hero-rating">
                ★{" "}
                {featuredMovie.vote_average?.toFixed(
                  1
                )}
              </span>
            </div>

            <p className="hero-overview">
              {featuredMovie.overview}
            </p>

            <button
              className="hero-button"
              onClick={() => {
                document
                  .getElementById("movies")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Explore Movies
            </button>
          </div>
        </section>
      )}

      <section
        className="movie-section"
        id="movies"
      >
        <div className="section-header">
          <div>
            <span className="section-eyebrow">
              DISCOVER
            </span>

            <h2>
              {searchQuery.trim()
                ? "Search Results"
                : "Popular Movies"}
            </h2>
          </div>

          <form
            onSubmit={handleSearch}
            className="search-form"
          >
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />

            <button
              type="submit"
              className="search-button"
            >
              Search
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="loading-spinner" />
            <span>Loading movies...</span>
          </div>
        ) : (
          <>
            <div className="movies-grid">
              {getPaginatedMovies().map(
                (movie) => (
                  <MovieCard
                    movie={movie}
                    key={movie.id}
                  />
                )
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <span className="pagination-info">
                  {currentPage}
                  <span>/</span>
                  {totalPages}
                </span>

                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={
                    currentPage === totalPages
                  }
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Home;