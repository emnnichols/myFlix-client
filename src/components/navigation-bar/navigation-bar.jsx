import { Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, resetSearch }) => {

  return (
    <Row>
    <Col lg={9} md={7} sm={5} className="col-5 mt-5">
      <Navbar className="navBar" expand="md">
        <Navbar.Brand className="mt-1" as={Link} to="/" onClick={resetSearch}>
          <h1>Ghibli App</h1>
        </Navbar.Brand>
        <Container>
            <Row className="w-100">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="h3 mt-1">
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
      </Col>
    <Col className="mt-3">
        <img src="https://i.ibb.co/PGhHxhV/pngegg-1.png" width="250px" />
      </Col>
    </Row>
  )
};