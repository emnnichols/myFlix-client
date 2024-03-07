import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";

export const GenreView = ({ about, movies, isFavorite, resetSearch, addFav, removeFav }) => {
  const { genre } = useParams();
  const desc = JSON.stringify(about['Description']);

  return (
    <>
    <Row>
      <Link to="/">
        <Button className="mt-3 w-100 primaryButton" variant="primary" onClick={resetSearch}>
          Back
        </Button>
      </Link>
    </Row>
    <Row className="paraText mt-4">
      <p><span className="h2" style={{fontVariant: "all-small-caps"}}>{genre}</span>
      <br/>
      <br/>
      {desc ? desc.replace(/["]+/g,''): desc}</p>
    </Row>
    <br/>
      <Row>
        {movies.filter((movie) => {
          return movie.genre.Name === genre
        }).map((movie) => (
          <Col lg={3} md={6} className="mb-2">
              <MovieCard 
                movie={movie}
                isFavorite={isFavorite}
                removeFav={removeFav}
                addFav={addFav}
              />
          </Col>
        ))}
        </Row>
    </>
  );
};