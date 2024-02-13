import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-ghibli-7c8d5913b80b.herokuapp.com")
    .then((response) => response.json())
    .then((data) => {
      const moviesfromApi = data.movies.map((movie) => {
        return {
          id: movie._id,
          image: movie.ImagePath,
          title: movie.Title,
          summary: movie.Description,
          genre: movie.Genre[0],
          year: movie.Released,
          featured: movie.Featured,
          director: movie.Director[0]
        };
      });

      setMovies(moviesfromApi);
    });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

if (movies.length === 0) {
  return <div>The list is empty!</div>;
}

return (
  <div>
    {movies.map((movie) => (
      <MovieCard 
      key={movie.id}
      movie={movie}
      onMovieClick={(newSelectedMovie) => {
        setSelectedMovie(newSelectedMovie);
      }}
      />
    ))}
  </div>
);
};