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
  const [favMovies, setFav] = useState([]);
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

  useEffect(() => {
    if (!user) {return}

    fetch(baseUrl + `/profile/${user.Username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (response) => {
      const userData = await response.json();
      const userMovies = userData['FavoriteMovies'];

      if (!userMovies) {
        setFav("No favorites yet!")
      } else {
        const findMovies = movies.filter((m) => userMovies.includes(m.id))
        const movieList = [];

        findMovies.forEach((movie) => movieList.push(movie));

        setFav(movieList)
      }
    })
    });

  const addFav = (movieId) => {

    fetch(baseUrl + `/profile/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);

        alert("Added to favorites!");
      } else {
        alert("Error");
      }
    })
    .catch((e) => {console.log(e)})
  };

  const removeFav = (movieId) => {
    fetch(baseUrl + `/profile/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);

        alert("Removed from favorites!");
      } else {
        alert("Error");
      }
    })
    .catch((e) => {console.log(e)})
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
                    isFavorite={favMovies}
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
                    isFavorite={favMovies}
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
                    <Col className="mb-4" key={`${movie.id}_movie_list`} md={3} sm={6}>
                      <MovieCard 
                        movie={movie}
                        addFav={addFav}
                        removeFav={removeFav} 
                        isFavorite={favMovies}
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