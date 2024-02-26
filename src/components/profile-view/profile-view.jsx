import { Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { FaHeart } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./profile-view.scss";

export const ProfileView = ({ user, isFavorite, addFav, removeFav }) => {
  const date = new Date(user.Birthday);
  const birthday = date.toUTCString();

  return (
    <>
      <Row>
        <Card.Title className="mt-5 cardLabel w-100">
          <p style={{paddingTop:"15px"}}><IoPersonCircleOutline size={150} /></p>
        </Card.Title>
        <Card className="mb-5 justify-content-md-center">
          <Card.Body>
            <Col md={12}>
            <span className="userInfo">Username</span> {user.Username}
            </Col>
            <br/>
            <Col md={12}>
            <span className="userInfo">Birthday</span> {birthday}
            </Col>
            <br />
            <Col md={12}>
            <span className="userInfo" style={{paddingBottom:"5px"}}><FaHeart /></span> {isFavorite.length}
            </Col>
          </Card.Body>
        </Card>
      </Row>

      <Card.Title className="mb-3 cardLabel w-100">
          <h3>Favorite Movies</h3>
      </Card.Title>
      <Card style={{padding:"10px"}} className="mb-5">
      <Row>
        {isFavorite.map((movie) => (
          <Col lg={3} md={6} className="mb-2">
              <MovieCard 
                movie={movie}
                removeFav={removeFav}
                addFav={addFav}
              />
          </Col>
        ))}
        </Row>
      </Card>
    </>
  )
};