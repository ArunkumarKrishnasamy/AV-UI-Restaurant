import React, { useState } from "react";
import logo from "../assets/logo.svg";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Sign_up() {
  const navigate = useNavigate();
  const [ischecked, setischecked] = useState(false);
  const [ischeckedValid, setischeckedValid] = useState(true);
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setischecked(checked);
    setischeckedValid(checked);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      user_name: "",
      contact_number: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please Enter valid Email id";
      }
      if (!values.user_name) {
        errors.user_name = "Please Enter User Name";
      }
      if (!values.contact_number) {
        errors.contact_number = "Please Enter valid Phone Number";
      }
      if (!values.password) {
        errors.password = "Please Enter Password";
      }
      if (values.confirm_password != values.password) {
        errors.confirm_password = "Entered Password is not matching";
      }
      if (!values.confirm_password) {
        errors.confirm_password = "Please Re-Enter your Password";
      }
      if (ischecked) {
        setischeckedValid(!ischeckedValid);
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3001/register", values);
        console.log(values);
        alert("Successully Regitered");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Error happened during Registration");
      }
    },
  });
  return (
    <div className="Sign_up" id="Home">
      <img id="Homelogo" className="logoimg" src={logo} alt="logo"></img>

      <form className="form-area" onSubmit={formik.handleSubmit}>
        <h1 className="create_an_account">Create an account</h1> <br />
        <div>
          <label for="user_name"></label>
          <input
            type="text"
            placeholder="User name"
            name="user_name"
            id="user_name"
            required
            onChange={formik.handleChange}
            value={formik.values.user_name}
            onBlur={formik.handleBlur}
          />
          <br />
          <span>
            {formik.touched.user_name && formik.errors.user_name ? (
              <div className="terms_policies">
                <span className="ms-5 me-2 text-danger fw-bold">**</span>
                {formik.errors.user_name}
              </div>
            ) : null}
          </span>
        </div>
        <div>
          <label for="contact_number"></label>
          <input
            type="tel"
            placeholder="Contact number"
            name="contact_number"
            id="contact_number"
            required
            onChange={formik.handleChange}
            value={formik.values.contact_number}
            onBlur={formik.handleBlur}
            minLength={10}
            title="Please Enter valid Phone Number"
          />
          <br />
          <span>
            {formik.touched.contact_number && formik.errors.contact_number ? (
              <div className="terms_policies">
                <span className="ms-5 me-2 text-danger fw-bold">**</span>
                {formik.errors.contact_number}
              </div>
            ) : null}
          </span>
        </div>
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
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <br />
          <span>
            {formik.touched.password && formik.errors.password ? (
              <div className="terms_policies">
                <span className="ms-5 me-2 text-danger fw-bold">**</span>
                {formik.errors.password}
              </div>
            ) : null}
          </span>
        </div>
        <div>
          <label for="confirm_password"></label>
          <input
            type="password"
            placeholder="Confirm password"
            id="confirm_password"
            name="confirm_password"
            required
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            onBlur={formik.handleBlur}
          />
          <br />
          <span>
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div className="terms_policies">
                <span className="ms-5 me-2 text-danger fw-bold">**</span>
                {formik.errors.confirm_password}
              </div>
            ) : null}
          </span>
        </div>
        <div>
          <div id="terms_policies" className="mx-4 mt-3 terms_policies">
            <div>
              <span className="ms-5 ">
                {" "}
                <input
                  type="checkbox"
                  className="checkbox"
                  name="checkbox"
                  id="checkbox"
                  checked={ischecked}
                  onChange={handleCheckboxChange}
                  style={{ color: "#494646", marginBottom: "20px" }}
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
            </div>
            <br />
          </div>
          <div className="ms-2 mb-2 terms_policies">
            {" "}
            {!ischeckedValid && (
              <span className="text-danger ms-5 d-flex justifycontent-start  ">
                Please check the box.
              </span>
            )}
          </div>
          <div className="mb-4 row">
            <div className="col-4">
              <button type="submit" className="ms-5 signup_button text-center">
                Sign
              </button>
            </div>
            <div className="col-8">
              <span className="checkbox" id="">
                Already a member?
                <Link to={"/"}>
                  {" "}
                  <a href="#" className="ms-2" style={{ color: "#FD4908" }}>
                    Sign in
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sign_up;
