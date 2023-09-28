import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../Pages/Login";
import PrivateWrapper from "./PrivateRoute";
import UserPage from "../Pages/Users";
import HomePage from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import TemperatureChart from "../Components/Chart/Temparature";
import HumidityChart from "../Components/Chart/Humidity";
import React from "react";
import AppNavbars from "../Components/Navbar/Navbartwo";


const Routers = () => {
  const [authentication, setAuthentication ] = useState(() => localStorage.getItem("token"));

  console.log(authentication)

  return (
    <>
      {authentication ? (
        <div>
          <div>
            {<AppNavbars auth = {setAuthentication} />}
          </div>
         <Routes>
            <Route element = {<PrivateWrapper />}>
              <Route path="/temperature" element={<TemperatureChart />} />
              <Route path="/humidity" element={<HumidityChart />} />
              <Route path="/user"  element={ <UserPage /> } />
            </Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setAuthentication = {setAuthentication}/>} />
        </Routes>
      )}
    </>
  );
};

export default Routers;
