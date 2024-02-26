import { React } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import "./movie-card.scss";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  const add = () => addFav(movie.id);
  const remove = () => removeFav(movie.id);

  return (
    <Card className="h-100 moviecard">
      <Card.Img variant="top" src={movie.image}/>
      <Card.Body className="justify-content-md-center cardBody">
      <Card.Text>
          {isFavorite.includes(movie) ? (<Button onClick={remove} className="primaryButton"><FaHeart /></Button>)
          : (<Button onClick={add} className="primaryButton"><FaRegHeart /></Button>)}
          <span> </span>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary" className="primaryButton">Details</Button>
        </Link></Card.Text>
        <Card.Title style={{letterSpacing:"1px"}}>{movie.title}</Card.Title>
        <Card.Text style={{fontStyle: "italic"}}>{movie.director.Name}</Card.Text>
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