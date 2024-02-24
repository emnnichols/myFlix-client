import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { AccountView } from "../account-view/account-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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

  const addFav = (id) => {
    fetch(baseUrl + `/profile/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Movie not added");
      }
    })
    .then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    })
  };

  const removeFav = (id) => {
    fetch(baseUrl + `/profile/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Movie not removed");
      }
    })
    .then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    })
  };

return (
  <BrowserRouter>
    <NavigationBar
      user={user}
      onLoggedOut={() => {
        setUser(null); 
        setToken(null); 
        localStorage.clear();
      }}
    />
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
          path="/profile/:Username/account"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={10}>
                  <AccountView 
                    user={user} 
                    token={token} 
                    setUser={setUser}
                  />
                </Col>
              ) }
            </>
          }
        />
        <Route 
          path="/profile/:Username"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={10}>
                  <ProfileView 
                    user={user} 
                    token={token} 
                    setUser={setUser}
                    movies={movies}
                    addFav={addFav}
                    removeFav={removeFav}
                  />
                </Col>
              ) }
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
                <Col md={10}>
                  <MovieView 
                    movies={movies} 
                    addFav={addFav}
                    removeFav={removeFav}
                  />
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
                      <MovieCard 
                        movie={movie}
                        addFav={addFav}
                        removeFav={removeFav} 
                        isFavorite={user.FavoriteMovies.includes(movie.id)}
                      />
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