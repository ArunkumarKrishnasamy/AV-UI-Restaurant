import React from "react";
import logo from "../assets/logo.svg";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Sign_up() {
  return (
    <div className="container">
      <h1>Hello</h1>
      <div className="Sign_up">
        <div className="logo">
          <img id="logoimg" className="logoimg" src={logo} alt="logo"></img>
        </div>

        <form className="form-area">
          <h1 className="create_an_account">Create an account</h1> <br />
          <br />
          <div>
            <label for="user_name"></label>
            <input
              type="text"
              placeholder="User name"
              name="user_name"
              id="user_name"
              required
            />
            <br />
          </div>
          <div>
            <label for="contact_number"></label>
            <input
              type="tel"
              placeholder="Contact number"
              name="contact_number"
              id="contact_number"
              required
            />
            <br />
          </div>
          <div>
            <label for="email"></label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required
            />
            <br />
          </div>
          <div>
            <label for="password"></label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required
            />
            <br />
          </div>
          <div>
            <label for="confirm_password"></label>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirm_password"
              name="confirm_password"
              required
            />
            <br />
          </div>
          <div>
            <p id="bbox" className="mb-3">
              <input
                type="checkbox"
                name="tnp"
                id="cbox"
                style={{ color: "#494646", marginBottom: "20px" }}
              />
              <span>
                by continuing you agree to our
                <span className="ms-2">
                  <a href="#" style={{ color: "#FD4908" }}>
                    terms & policies
                  </a>
                </span>
              </span>
            </p>
            <div className="">
              <span>
                <button type="submit" className="ms-1 button_signup">
                  Sign up
                </button>
                <span className="ms-4" id="cbox" style={{ textAlign: "left" }}>
                  Already a member?
                  <a href="#" style={{ color: "#FD4908" }}>
                    Sign in
                  </a>
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sign_up;
