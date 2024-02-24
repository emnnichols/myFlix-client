import { useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";

export const ProfileView = ({ user, token, movies, removeFav }) => {
  const [favMovies, setFav] = useState([]);

  const date = new Date(user.Birthday);
  const birthday = date.toUTCString();
  const baseUrl = 'https://myflix-ghibli-7c8d5913b80b.herokuapp.com';


  useEffect(() => {
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
  
  return (
    <>
      <Row>
        <Card.Title className="mt-5 cardLabel w-100">
          <h2>{user.Username}</h2>
        </Card.Title>
        <Card className="mb-5 justify-content-md-center">
          <Card.Body>
            <Col md={12}>
              <span className="userInfo">Birthday</span> {birthday}
            </Col>
            <br />
            <Col md={12}>
            <span className="userInfo">Favorite Movies</span> {favMovies.length}
            </Col>
          </Card.Body>
        </Card>
      </Row>

      <Card.Title className="mb-3 cardLabel w-100">
          <h3>Favorite Movies</h3>
      </Card.Title>
      <Card>
      <Row>
        {favMovies.map((movie) => (
          <Col lg={3} md={6}>
              <MovieCard 
                movie={movie}
              />
          </Col>
        ))}
        </Row>
      </Card>
    </>
  )
};