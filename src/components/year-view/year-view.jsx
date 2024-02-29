import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";

export const YearView = ({ movies, isFavorite, resetSearch, addFav, removeFav }) => {
  const { released } = useParams();

  return (
    <>
    <Row>
      <Link to="/">
        <Button className="mt-3 w-100 primaryButton" variant="primary" onClick={resetSearch}>
          Back
        </Button>
      </Link>
    </Row>
    <br/>
      <Row className="justify-content-md-center">
        {movies.filter((movie) => {
          return movie.year == released
        }).map((movie) => (
          <Col lg={5} md={12} className="mb-2">
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