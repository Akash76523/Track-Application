import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../Components/Navbar/Navbar";
const HomePage = () => {
  return (
    <div>
      <AppNavbar />
      <h2 style={{ textAlign: "center" }}>Welcome to the Home Page!</h2>
      <Link to="/login">
        {/* <button className="btn bg-primary" style={{marginLeft : '750px'}}>Login</button> */}
      </Link>
    </div>
  );
};

export default HomePage;
