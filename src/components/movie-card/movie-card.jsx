import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 moviecard">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body className="justify-content-md-center cardBody">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary" className="w-100 primaryButton">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};