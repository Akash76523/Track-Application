import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken as setLocalStorageToken, getToken } from "./Token";
import { useAuth } from "./AuthContext";

const Login = (props) => {
  console.log(props);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.number().required("Password is required"),
  });


  const onSubmit = async (values) => {
    try {
      const response = await axios.get(
        "https://65017e58736d26322f5bc709.mockapi.io/data"
      );
      const data = response.data;

      const { username, password } = values;
      const trimmedUsername = username.trim();
      const trimmedPassword = Number(password);
      const matchingUser = data.find(
        (user) =>
          user.username === trimmedUsername && user.password === trimmedPassword
      );

      if (matchingUser) {
        const userToken = createToken(matchingUser); // Create a token for the user
        setLocalStorageToken(userToken); // Store the user token in localStorage
        localStorage.setItem("userData", JSON.stringify(matchingUser));
        setIsLoggedIn(true);
        props.setAuthentication(true);
        navigate("/user");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.error("API Error:", error);
      setLoginError("An error occurred while logging in");
    }
  };

  const createToken = (user) => {
    // Create a token with user information
    const token = {
      username: user.username,
      password: user.password,
    };
    return btoa(JSON.stringify(token)); // Encode the token
  };

  return (
    <div className="login" style={{marginTop : '150px'}}>
      <div className="container1">
        <h1 className="text-center mt-5">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="mt-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" className="btn btn-primary" style={{marginLeft : '130px'}}>
              Login
            </button>
            {loginError && <div className="error">{loginError}</div>}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
