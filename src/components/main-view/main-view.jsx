import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

return (
  <BrowserRouter>
    <Row className="justify-content-md-center">
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={6}>
                  <SignupView />
                </Col>
              )}
            </>
          } 
        />
        <Route 
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={6}>
                  <LoginView onLoggedIn={handleOnLoggedIn} />
                </Col>
              )}
            </>
          }
        />
        <Route 
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={7}>
                  <MovieView movie={movies} />
                </Col>
              )}
            </>
          }
        />
        <Route 
          path="/"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={`${movie.id}_movie_list`} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )}
            </>
          }
        />
      </Routes>
    </Row>
  </BrowserRouter>
);
};