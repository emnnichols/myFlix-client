import { Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, resetSearch }) => {

  return (
    <>
      <Row className="navBar">
        <Navbar className="justify-content-md-center navBrand">
        <Row className="w-100">
          <Navbar.Brand as={Link} to="/" onClick={resetSearch}>
          <span className="h1">Ghibli flix</span>
        </Navbar.Brand></Row></Navbar>
        <Col className="w-100 justify-content-md-center">
          <img src="https://i.ibb.co/sP3v45k/pngegg.png" className="navImg"/>
        </Col>

      <Navbar className="navBar navi" expand="md">
        <Container className="justify-content-md-center">
          <Row className="w-100">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navToggle" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="h3 w-100 justify-content-md-center">
                  {!user && (
                    <>
                      <Nav.Link className="navLink" as={Link} to="/login">
                        Login
                      </Nav.Link>
                      <Nav.Link className="navLink" as={Link} to="/signup">
                        Signup
                      </Nav.Link>
                    </>
                  )}
                  {user && (
                    <>
                      <Nav.Link className="navLink" as={Link} to="/" onClick={resetSearch}>
                        Home
                      </Nav.Link>
                      <Nav.Link className="navLink" as={Link} to={`/profile/${user.Username}`}>
                        Profile
                      </Nav.Link>
                      <Nav.Link className="navLink" as={Link} to={`/profile/${user.Username}/account`}>
                        Account
                      </Nav.Link>
                      <Nav.Link className="navLink" onClick={onLoggedOut}>Logout</Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
          </Row>
        </Container>
      </Navbar>
      </Row>
    </>
  )
};