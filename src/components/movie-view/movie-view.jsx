import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <>
      <Row className="mt-3 movieView">
        <Col>
          <img src={movie.image} className="w-100"/>
        </Col>
        <Col md={7}>
          <div className="movieTitle mb-3 mt-3">
            <span className="h2">{movie.title} ({movie.year})</span>
          </div>
          <div>
            <span className="h6">Genre: </span>
            <span>{movie.genre.Name}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Director: </span>
            <span>{movie.director.Name}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Summary: </span>
            <span>{movie.summary}</span>
          </div>
          <div className="mt-1">
            <span className="h6">Featured: </span>
            <span>{movie.featured.toString()}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Link to={`/`}>
          <Button className="mt-3 w-100 primaryButton" variant="primary">Back</Button>
        </Link>
      </Row>
    </>
  );
};