import React,{useState} from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeToken } from "../../Pages/Token";
import Login from "../../Pages/Login";

const AppNavbars = (props) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false); 

  const handleLogout = () => {
    removeToken(); // Remove the token from local storage
    props.auth(true)
    setIsLoggedOut(true);
    window.location.href = "/login"
  };
   // Conditionally render the Login component if isLoggedOut is true
   if (isLoggedOut) {
    return <Login />;
  }


    console.log("UserNavbar Call");

  return (
    <div className="container2">
      <Navbar expand="lg">
        <Navbar.Brand as={Link} to="/">
          Welcome User......!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact us
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <Nav.Link as={Link} to="/about">
              About us
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbars;
