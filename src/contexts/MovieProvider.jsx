import {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { MovieContext } from "./MovieContext";

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(
        JSON.parse(storedFavorites)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((previousFavorites) => [
      ...previousFavorites,
      movie,
    ]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (movie) => movie.id !== movieId
      )
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some(
      (movie) => movie.id === movieId
    );
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};