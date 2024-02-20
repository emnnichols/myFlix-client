import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  <Row className="justify-content-md-center">
    {!user ? (
      <Col md={6}>
        <LoginView
          onLoggedIn={handleOnLoggedIn}
        />
        <div style={{textAlign: "center", fontVariant: "all-small-caps"}}>or</div>
        <SignupView />
      </Col>
    ) : selectedMovie ? (
      <Col md={10}>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)}
        />
      </Col>
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        <Button className="mb-3 mt-3 primaryButton" variant="primary" onClick={() => { 
          setUser(null); 
          setToken(null); 
          localStorage.clear(); }}>
            Logout
        </Button>

        {movies.map((movie) => (
          <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard 
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </>
    )}
  </Row>
);
};