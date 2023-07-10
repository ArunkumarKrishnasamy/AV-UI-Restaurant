import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

function Log_In() {
  const [HandleError, setHandleError] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please enter valid Email address";
      }
      if (!values.password) {
        errors.password = "Please enter valid Password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        let logInData = await axios.post("http://localhost:3001/login", values);
        window.localStorage.setItem("apptoken", logInData.data.token);
        console.log(logInData.data.token);
        navigate("/products");
      } catch (error) {
        console.error(error);
        if (error) {
          setHandleError(true);
          formik.resetForm();
        }
      }
    },
  });
  return (
    <div className="Sign_up" id="Home">
      <img id="Homelogo" className="logoimg" src={logo} alt="logo"></img>
      <form className="form-area" onSubmit={formik.handleSubmit}>
        <h1 className="create_an_account">Welcome back</h1>
        <br />
        <div>
          <label for="email"></label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <br />
          <span>
            {formik.touched.email && formik.errors.email ? (
              <div className="terms_policies">
                <span className="ms-5 me-2 text-danger fw-bold">**</span>
                {formik.errors.email}
              </div>
            ) : null}
          </span>
        </div>
        <div>
          <label for="password"></label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <br />
        </div>
        <span>
          {formik.touched.password && formik.errors.password ? (
            <div className="terms_policies">
              <span className="ms-5 me-2 text-danger fw-bold">**</span>
              {formik.errors.password}
            </div>
          ) : null}
        </span>
        {HandleError ? (
          <div className="terms_policies">
            {" "}
            <span className="ms-5 me-2 text-danger fw-bold">**</span>User Email/
            Password is incorrect. Please Enter valid Credentials
          </div>
        ) : null}
        <p id="terms_policies" className="m-4 mb-3 terms_policies">
          <span className="ms-5">
            {" "}
            <input
              type="checkbox"
              className="checkbox"
              name="terms"
              id="checkbox2"
              style={{ color: "#494646", marginBottom: "20px" }}
              checked
            />
          </span>
          <span>
            by continuing you agree to our
            <span className="ms-2 checkbox">
              <a href="#" style={{ color: "#FD4908" }}>
                terms & policies
              </a>
            </span>
          </span>
        </p>
        <div className="ms-2 mb-5">
          <button type="submit" className="ms-5  signup_button">
            sign in
          </button>
          <br />
          <p className="checkbox d-flex align-items-start ms-5">
            {" "}
            Don't have an account?{" "}
            <Link to={"/register"}>
              {" "}
              <a href="#" className="ms-2" style={{ color: "#FD4908" }}>
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Log_In;
