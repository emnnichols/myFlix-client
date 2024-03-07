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
  const add = () => addFav(movieId);
  const remove = () => removeFav(movieId);
  const navigate = useNavigate();

  const similarMovies = movies.filter((movie) => {
    return movie.id !== movieId && movie.genre.Name === selectedMovie.genre.Name
  });

  return (
    <>
      <Row className="mt-3 movieView">
        <div className="movieTitle mt-3">
          <span className="h1">{selectedMovie.title} ({selectedMovie.year})</span>
        </div>

        <Col md={5} className="col-12">
          {isFavorite.includes(selectedMovie)
           ? (<Button onClick={remove} style={{backgroundColor: "transparent", border:"none"}}>
              <div className="favorited mt-4"><FaHeart /></div>
            </Button>)
          : (<Button type="submit" onClick={add} style={{backgroundColor: "transparent", border:"none"}}>
              <div className="notFavorited mt-4"><FaRegHeart /></div>
            </Button>)}
          <img src={selectedMovie.image} className="w-100" style={{borderRadius: "10px"}}/>
        </Col>
        <Col md={7} className="mt-5">
          <div className="viewText">
            <Row className="justify-content-md-center">
              <Col lg={4} md={6} className="col-4">
              <p className="viewLabel">Genre</p>
              <p className="viewInfo">
                  {` ` + selectedMovie.genre.Name}
                  </p>
              </Col>
              <Col lg={4} md={6} className="col-4">
              <p className="viewLabel">Director</p>
                <p className="viewInfo">
                  {` ` + selectedMovie.director.Name}
                </p>
              </Col>
              <Col lg={4} md={12} className="col-4">
                <p className="viewLabel">Featured</p>
                <p className="viewInfo">
                  {selectedMovie.featured 
                  ? ` Yes` 
                  : ` No`}</p>
              </Col>
            </Row><p className="mt-2">{selectedMovie.summary}</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Button className="w-100 primaryButton mt-4" variant="primary" onClick={() => navigate(-1)}>Back</Button></Row>

      <Row className="mt-4 mb-3 justify-content-md-center">
        <Col>
        {similarMovies.length !== 0
          ? (<Row><span className="h5 similarLabel mb-4">more {selectedMovie.genre.Name} movies</span>
            {similarMovies.map((movie) => (
              <Col lg={3} md={4} className="mb-2 col-6">
                <MovieCard 
                  movie={movie}
                  isFavorite={isFavorite}
                  removeFav={removeFav}
                  addFav={addFav}
                />
              </Col>
            ))}</Row>)
          : <Row><span className="mb-4 h4 similarLabel">No similar movies found</span></Row>
        }
        </Col>
      </Row>
    </>
  );
};