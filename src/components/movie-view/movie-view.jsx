import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <>
      <Row className="mt-3 movieView">
        <Col>
          <img src={movie.image} className="w-100"/>
        </Col>
        <Col md={7}>
          <div className="movieTitle mb-3">
            <span className="h2">{movie.title} ({movie.year})</span>
          </div>
          <div className="mt-1">
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
          <Button className="mt-3 primaryButton" variant="primary">Back</Button>
        </Link>
      </Row>
    </>
  );
};

MovieView.propType = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    summary: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};