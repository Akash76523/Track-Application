// Navbar.js
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../Pages/Token";

const AppNavbar = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    getToken()
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div className="container2">
      <Navbar expand="lg">
        <Navbar.Brand as={Link} to="/">
          {console.log("Nav bar called")}
          User Login
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
            <Nav.Link onClick={handleLogin}>
              Login
            </Nav.Link>
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
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

// import {   Routes, Route, useNavigate } from "react-router-dom";
// import Login from "../Pages/Login";
// import PrivateWrapper from "./PrivateRoute";
// import UserPage from "../Pages/Users";
// import HomePage from "../Pages/Home";
// import NotFound from "../Pages/NotFound";
// import TemperatureChart from "../Components/Chart/Temparature";
// import HumidityChart from "../Components/Chart/Humidity";
// import React from "react";
// import AppNavbars from "../Components/Navbar/Navbartwo";
// import { useMemo } from "react";

// const Routers = () => {
//   const authentication = localStorage.getItem("token");
//   const history = useNavigate();

//   // Create a memoized Routes component based on authentication state
//   const protectedRoutes = useMemo(() => (
//     <Routes>
//       <Route path="/temperature" element={<TemperatureChart />} />
//       <Route path="/humidity" element={<HumidityChart />} />
//       <Route path="/user" element={<UserPage />} />
//     </Routes>
//   ), []);

//   return (
//     <>
//       <div>
//         <AppNavbars />
//       </div>
      
//       {authentication ? (
//         <>
//           {protectedRoutes}
//         </>
//       ) : (
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           {/* Redirect to login for protected routes when not authenticated */}
//           <Route path="/user" element={() => { 
//             history("/login");
//             return null;
//           }} />
//           <Route path="/temperature" element={() => { 
//             history("/login");
//             return null;
//           }} />
//           <Route path="/humidity" element={() => { 
//             history("/login");
//             return null;
//           }} />
//         </Routes>
//       )}
//     </>
//   );
// };
//   export default Routers;
