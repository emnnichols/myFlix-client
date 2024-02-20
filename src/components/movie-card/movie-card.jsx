import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 moviecard"
      onClick={() => {
        onMovieClick(movie);
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body className="justify-content-md-center cardBody">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};