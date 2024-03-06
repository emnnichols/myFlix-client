import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movies, isFavorite, addFav, removeFav }) => {
  const { movieId } = useParams();
  const selectedMovie = movies.find((movie) => movie.id === movieId);
  const add = () => addFav(movie.id);
  const remove = () => removeFav(movie.id);
  const navigate = useNavigate();

  const similarMovies = movies.filter((movie) => {
    return movie.id !== movieId && movie.genre.Name === selectedMovie.genre.Name
  });

  return (
    <>
      <Row className="mt-3 movieView">
        <Col>
          {isFavorite.includes(selectedMovie)
           ? (<Button onClick={remove} style={{backgroundColor: "transparent", border:"none"}}>
              <div className="favorited mt-4"><FaHeart /></div>
            </Button>)
          : (<Button type="submit" onClick={add} style={{backgroundColor: "transparent", border:"none"}}>
              <div className="notFavorited mt-4"><FaRegHeart /></div>
            </Button>)}
          <img src={selectedMovie.image} className="w-100"/>
        </Col>
        <Col md={7} className="mt-3">
          <div className="movieTitle mb-3 mt-3">
            <span className="h2">{selectedMovie.title} ({selectedMovie.year})</span>
          </div>
          <div>
            <span className="h6">Genre: </span>
            <span>{selectedMovie.genre.Name}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Director: </span>
            <span>{selectedMovie.director.Name}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Summary: </span>
            <span>{selectedMovie.summary}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Featured: </span>
            <span>{selectedMovie.featured}</span>
          </div>
        </Col>
      </Row>
      <Row className="mb-5">
        <Button className="mt-3 w-100 primaryButton" variant="primary" onClick={() => navigate(-1)}>Back</Button>
      </Row>
      <Row className="mt-3 mb-3 justify-content-md-center">
        {similarMovies.length !== 0
          ? (<Row><span className="h3 viewLabel mb-4">more {selectedMovie.genre.Name} movies</span>
            {similarMovies.map((movie) => (
              <Col lg={3} md={6} className="mb-2">
                <MovieCard 
                  movie={movie}
                  isFavorite={isFavorite}
                  removeFav={removeFav}
                  addFav={addFav}
                />
              </Col>
            ))}</Row>)
          : <Row><span className="mb-4 h3 viewLabel">No similar movies found</span></Row>
          }
      </Row>
    </>
  );
};