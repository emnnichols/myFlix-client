import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const baseUrl = 'https://myflix-ghibli-7c8d5913b80b.herokuapp.com';
  const handleOnLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(baseUrl + "/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesfromApi = data.map((movie) => {
        return {
          id: movie._id,
          image: movie.ImagePath,
          title: movie.Title,
          summary: movie.Description,
          genre: movie.Genre,
          year: movie.Released,
          featured: movie.Featured,
          director: movie.Director
        };
      });

      setMovies(moviesfromApi);
    });
  }, [token]);

  if (!user) {
    return (
    <>
      <LoginView 
        onLoggedIn={handleOnLoggedIn}
      />
      or
      <SignupView />
    </>
    );
  }

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
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
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