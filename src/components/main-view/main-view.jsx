import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import { baseUrl, storedUser, storedToken } from "../constants";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { AccountView } from "../account-view/account-view";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [favMovies, setFav] = useState([]);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [dirName, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [about, setAbout] = useState("");

  const resetSearch = () => {
    setAbout(""), 
    setDirector(""), 
    setYear(""), 
    setGenre(""),
    setSearch(""), 
    navigate('/')}

  const handleOnLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const handleOnLoggedOut = () => {
    setUser(null);
    setToken(null); 
    localStorage.clear();
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

  useEffect(() => {
    if (dirName === "") {return}

    navigate(`/movies/directors/${dirName}`);

    fetch(baseUrl + `/movies/directors/${dirName}/about`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (response) => await response.json())
    .then((data) => {
      console.log(data)

      if (data) {
        setAbout(data);
      }
    })
    .catch((e) => {
      alert("Something went wrong!");
      console.log(e)}
  )},[dirName, token]);

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
      resetSearch={resetSearch}
      onLoggedOut={handleOnLoggedOut}
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
                  <LoginView 
                    onLoggedIn={handleOnLoggedIn}
                   />
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
                    addFav={addFav}
                    removeFav={removeFav}
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
                    isFavorite={favMovies}
                    addFav={addFav}
                    removeFav={removeFav}
                  />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/movies/directors/:director"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={10}>
                <DirectorView 
                  movies={movies}
                  about={about}
                  resetSearch={resetSearch}
                  isFavorite={favMovies}
                  addFav={addFav}
                  removeFav={removeFav}
                />
              </Col>
              )
              }
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
                <Form className="justify-content-md-center mb-3">
                      <Form.Control 
                        type="search"
                        onChange={(e) => setSearch(e.target.value)}
                        className="formInput"
                        placeholder="search"
                      />
                      <Row>
                        <Col md={4}>
                          {/* Search by genre */}
                          <Form.Select className="formSelect"
                            onChange={(e) => {
                              setDirector(""), setYear(""),
                              setGenre(e.target.value)}}>
                              <option value="" >Search by Genre</option>
                              <option value="Action">Action</option>
                              <option value="Adventure">Adventure</option>
                              <option value="Biography">Biography</option>
                              <option value="Comedy">Comedy</option>
                              <option value="Drama">Drama</option>
                              <option value="Family">Family</option>
                              <option value="Fantasy">Fantasy</option>
                              <option value="Romance">Romance</option>
                              <option value="Sci-Fi">Sci-Fi</option>
                              <option value="War">War</option>
                          </Form.Select>
                          </Col>
                          <Col md={4}>
                            {/* Search by Director */}
                            <Form.Select className="formSelect" 
                            onChange={(e) => {
                              setGenre(""), setYear(""),
                              setDirector(e.target.value)}}>
                              <option value="">Search by Director</option>
                              <option value="Yoshifumi Kondô">Yoshifumi Kondô</option>
                              <option value="Gorô Miyazaki">Gorô Miyazaki</option>
                              <option value="Hayao Miyazaki">Hayao Miyazaki</option>
                              <option value="Tomomi Mochizuki">Tomomi Mochizuki</option>
                              <option value="Hiroyuki Morita">Hiroyuki Morita</option>
                              <option value="Isao Takahata">Isao Takahata</option>
                              <option value="Hiromasa Yonebayashi">Hiromasa Yonebayashi</option>
                            </Form.Select>
                          </Col>     
                          <Col md={4}>
                            {/* Search by year */}
                            <Form.Select className="formSelect" 
                            onChange={(e) => {
                              setGenre(""), setDirector(""),
                              setYear(e.target.value)}}>
                              <option value="">Search by Year</option>
                              <option value="2023">2023</option>
                              <option value="2020">2020</option>
                              <option value="2013">2013</option>
                              <option value="2014">2014</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2008">2008</option>
                              <option value="2006">2006</option>
                              <option value="2004">2004</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="1997">1997</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1986">1986</option>
                              <option value="1984">1984</option>
                            </Form.Select>
                          </Col>
                          </Row>
                </Form>

                {movies.filter((movie) => {{/* filter by genre */}
                  return genre === "" 
                  ? movie
                  : movie.genre.Name === genre
                })
                .filter((movie) => {{/* filter by year */}
                  return year === ""
                  ? movie
                  : movie.year == year
                })
                .filter((movie) => {{/* filter by director */}
                  return dirName === ""
                  ? movie
                  : movie.director.Name
                })
                .filter((movie) => {{/* search bar */}
                  const movieSearch = JSON.stringify(movie);

                  return search !== ""
                  ? movieSearch.toLowerCase().includes(search.toLowerCase())
                  : movie
                })
                .map((movie) => (
                  <>
                    <Col className="mb-4" key={`${movie.id}_movie_list`} lg={3} md={4} sm={12}>
                      <MovieCard 
                        movie={movie}
                        isFavorite={favMovies}
                        addFav={addFav}
                        removeFav={removeFav}
                      />
                    </Col>
                  </>
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