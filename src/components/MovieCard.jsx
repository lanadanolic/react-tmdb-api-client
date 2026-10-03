import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = useMovieContext();

  const favorite = isFavorite(movie.id);

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  function onFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <article className="movie-card">
      <div className="movie-poster">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
          />
        ) : (
          <div className="poster-fallback">
            <span>No Poster</span>
          </div>
        )}

        <div className="movie-card-gradient" />

        <div className="movie-card-top">
          <span className="rating-badge">
            <span className="rating-star">★</span>
            {rating}
          </span>

          <button
            type="button"
            className={`favorite-btn ${
              favorite ? "active" : ""
            }`}
            onClick={onFavoriteClick}
            aria-label={
              favorite
                ? `Remove ${movie.title} from favorites`
                : `Add ${movie.title} to favorites`
            }
          >
            ♥
          </button>
        </div>

        <div className="movie-card-content">
          <h3>{movie.title}</h3>

          <div className="movie-card-meta">
            <span>{releaseYear}</span>
            <span className="meta-separator">•</span>
            <span>Movie</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;