import { Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { FaHeart } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./profile-view.scss";

export const ProfileView = ({ user, isFavorite, addFav, removeFav }) => {
  const date = new Date(user.Birthday);
  const birthday = date.toLocaleDateString();

  return (
    <>
      <Row className="mb-3 userProfile">
        <Card.Title className="mt-5 w-100">
          <Row className="cardLabel">
            <Col className="mt-3">
            <Row><Col lg={9}><p className="userLabel">Username</p></Col><Col lg={3} className="userInfo">{user.Username}</Col></Row><br/>
            <Row><Col lg={9}><p className="userLabel">Birthday</p></Col><Col className="userInfo">{birthday}</Col></Row><br/>
            <Row><Col lg={9}><p className="userLabel" style={{paddingBottom:"5px"}}><FaHeart /></p></Col><Col className="userInfo">{isFavorite.length}</Col></Row>
            </Col>
            <Col className="mt-3">
              <p style={{paddingTop:"15px"}}><IoPersonCircleOutline size={150} /></p>
            </Col>
          </Row>
        </Card.Title>

      <Card.Title className="mt-3 mb-3 w-100">
          <h3 style={{fontStyle: "italic", paddingTop:"5px"}}>Favorite Movies</h3>
      </Card.Title>

      <Card style={{padding:"10px"}} className="mb-5">
      <Row>
        {isFavorite.map((movie) => (
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
      </Card>
      </Row>
    </>
  )
};