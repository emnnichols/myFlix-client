import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const DirectorView = ({ about, movies, isFavorite, resetSearch, addFav, removeFav }) => {
  const { director } = useParams();
  const bio = JSON.stringify(about['Bio']);
  const birth = JSON.stringify(about['Birth']);
  const death = JSON.stringify(about['Death']);

  return (
    <>
    <Row>
      <Link to="/">
        <Button className="mt-3 w-100 primaryButton" variant="primary" onClick={resetSearch}>
          Back
        </Button>
      </Link>
    </Row>
    <Row>
    <br/>
      {director} | {birth ? birth.replace(/["]+/g,'') : birth} - {death ? death : `Present`}
      <br/>
      <br/>
      Bio: {bio ? bio.replace(/["]+/g,'') : bio}
      <br/>
      <br/>
    </Row>
    <br/>
      <Row>
        {movies.filter((movie) => {
          return movie.director.Name === director
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