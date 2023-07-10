import React from "react";
import logo from "../assets/logo.svg";
import "../../node_modules/bootstrap/js/src/dropdown.js";
import "../Components/CSS/New_Product.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function New_Product() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      product_name: "",
      sales_price: "",
      cost: "",
      product_category: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3001/products", values, {
          headers: {
            Authorization: window.localStorage.getItem("apptoken"),
          },
        });
        alert("Product Added");
        navigate("/products");
      } catch (error) {
        console.error(error);
        alert("Error while submitting It");
      }
    },
  });
  const HandleLogout = () => {
    let ask = window.confirm("Are You sure do you want to Log Out?");
    if (ask) {
      window.localStorage.removeItem("apptoken");
      alert("Logged Out Successfully");
      navigate("/");
    }
  };
  return (
    <div className="container">
      <section className="header">
        <nav className="navbar">
          <a href="#">
            <img
              //   id="pagelogo"
              //   className="pagelogo"
              src={logo}
              alt="foodtracz"
            />
          </a>
          <div className="nav-links">
            <span className="material-symbols-outlined">close</span>
            <ul>
              <li>
                <a href="">Notification</a>
              </li>
              <li>
                <svg height="20" width="5">
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="200"
                    style={{ stroke: "rgb(255,0,0)", strokeWidth: "4" }}
                  />
                </svg>
              </li>
              <li className="logout" onClick={HandleLogout}>
                <a href="">Logout</a>
              </li>
            </ul>
          </div>
          <span className="material-symbols-outlined">menu</span>
        </nav>
      </section>
      {/* Page Specification - left floating */}
      <div className="lefticonbox">
        <ul>
          <li style={{ listStyleType: "none", display: "inline-block" }}>
            <a href="/" style={{ color: "black" }}>
              Inventory
            </a>
          </li>
          <li style={{ listStyleType: "none", display: "inline-block" }}>
            <span class="material-icons-outlined">
              {">"}Products{">"}
            </span>
          </li>
          <li style={{ listStyleType: "none", display: "inline-block" }}>
            <a href="/" style={{ color: "black" }}>
              New
            </a>
          </li>
        </ul>
      </div>
      {/* menu bar right floating with options */}
      <div className="ri">
        <div className="rdropdown">
          <div className="dropdown">
            <button className="dropbtn">Operations</button>
            <div className="dropdown-content">
              <p>Transfer</p>
              <a href="#">Receipts</a>
              <a href="#">Deliveries</a>
              <p>Adjustments</p>
              <a href="#">Physical inventory</a>
              <a href="#">Scrap</a>
              <p>Procurement</p>
              <a href="#">Replenishment</a>
            </div>
          </div>
        </div>
        <div className="rdropdown">
          <div className="dropdown">
            <button style={{ color: "#e7305b" }} className="dropbtn">
              Products
            </button>
          </div>
        </div>
        <div className="rdropdown">
          <div className="dropdown">
            <button className="dropbtn">Reporting</button>
            <div className="dropdown-content">
              <a href="#">Stock</a>
              <a href="#">Moves history</a>
              <a href="#">Performance</a>
            </div>
          </div>
        </div>
        <div className="rdropdown">
          <div className="dropdown">
            <button className="dropbtn">Configuration</button>
            <div className="dropdown-content" style={{ left: "0" }}>
              <p>Settings</p>
              <p style={{ paddingTop: "1rem" }}>Warehouse management</p>
              <a href="#">Warehouses</a>
              <a href="#">Operations type</a>
              <p>Products</p>
              <a href="#">Product categories</a>
              <a href="#">Reordering rules</a>
            </div>
          </div>
        </div>
      </div>
      {/* heading label division */}
      <div
        style={{
          width: "100%",
          height: "20px",
          position: "relative",
          zIndex: -1,
        }}
      ></div>
      <div
        className="container mt-5 np_label"
        style={{ textAlign: "center", height: "110px", alignContent: "center" }}
      >
        <div className="p_label" style={{ top: "5px", alignContent: "center" }}>
          <label id="lab2" style={{ fontSize: "45px", color: "#dfdcdc" }}>
            New Products
          </label>
        </div>
        <div className="row p_label" style={{ top: "50px" }}>
          <label id="lab" style={{ fontSize: "30px" }}>
            New Products
          </label>
        </div>

        {/* heading underline  */}
        <div className="ul"></div>
      </div>
      {/* print label section */}
      <div style={{ position: "relative", top: "1rem", width: "100%" }}>
        <div
          className="row leftbox"
          style={{ paddingLeft: "10px", top: "-20px" }}
        >
          <ul style={{ padding: "10px" }}>
            <li className="belowlinelst">Update Quantity</li>
            <li className="belowlinelst">Replenish</li>
            <li className="belowlinelst">Print labels</li>
          </ul>
        </div>
        <button className="addproduct me-5" onClick={formik.handleSubmit}>
          +Add
        </button>
      </div>
      {/* Form */}
      <form>
        <div
          className="container"
          style={{
            position: "relative",
            top: "2rem",
            float: "left",
            left: "2rem",
          }}
        >
          <div className="row justify-content-evenly">
            <div className="col">
              <div className="row">
                <label
                  className="col mt-0"
                  style={{
                    // position: "relative",
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "20px",
                  }}
                >
                  Enter product name
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="col mt-0 productname"
                  name="product_name"
                  required
                  id="product_name"
                  onChange={formik.handleChange}
                  value={formik.values.product_name}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <button
                style={{
                  display: "block",
                  width: "120px",
                  height: "80px",
                  borderRadius: "10px",
                  borderWidth: "2px",
                  borderColor: "#707070",
                }}
                // onclick="document.getElementById('getFile').click()"
              >
                <span className="material-symbols-outlined">add_a_photo</span>
              </button>
              <input type="file" id="getFile" style={{ display: "none" }} />
            </div>
          </div>
        </div>
        <div className="dbgOuter mt-2 row">
          <div className="dbgCont col">
            <input type="checkbox" id="dbgTrace" className="dbgCheck" />
            <label for="dbgTrace">Can be sold</label>
          </div>
          <div class="dbgCont col">
            <input type="checkbox" id="dbgDebug" className="dbgCheck" />
            <label for="dbgDebug">Can be purchased</label>
          </div>
        </div>
        <span>
          {" "}
          <div
            style={{
              // width: "fit-content",
              top: "6rem",
              position: "relative",
              height: "fit-content",
            }}
            className="row newbutton"
          >
            <button
              type="submit"
              style={{ background: "none", width: "400px" }}
              className="col text-wrap "
            >
              <a
                href="#"
                style={{
                  color: "black",
                  fontFamily: "plus jakarta sans",
                  fontStyle: "italic",
                  fontSize: "20px",
                }}
              >
                General information
              </a>
            </button>
            <button
              type="submit"
              style={{ background: "none" }}
              className="col ms-0"
            >
              <a
                href="#"
                style={{
                  color: "#707070",
                  fontFamily: "plus jakarta sans",
                  fontSize: "20px",
                  fontStyle: "italic",
                  paddingLeft: "3rem",
                }}
              >
                Inventory
              </a>
            </button>
          </div>
        </span>

        <div
          className="container mb-2"
          style={{
            position: "relative",
            top: "6rem",
            float: "left",
            left: "2rem",
          }}
        >
          <div className="row justify-content-between m-2">
            <div className="col">
              <div
                className="col"
                style={{
                  position: "relative",
                  top: "2rem",
                  width: "100%",
                  float: "left",
                }}
              >
                <div className="row">
                  <label className="col ms-4 prodtype">Product type</label>
                  <select className="col" name="product_type" id="prod">
                    <option value="">SELECT</option>

                    <option value="volvo">Product type A</option>
                    <option value="saab">Product type B</option>
                    <option value="opel">Product type C</option>
                    <option value="audi">Product type D</option>
                  </select>
                  <br />
                </div>
                <div className="row">
                  <label className="col mt-2 prodtype">Sales price</label>
                  <input
                    className="col p-0"
                    type="text"
                    placeholder="&#8377;"
                    name="sales_price"
                    onChange={formik.handleChange}
                    value={formik.values.sales_price}
                    onBlur={formik.handleBlur}
                  />
                  <br />
                </div>
                <div className="row">
                  <label className="col mt-2 prodtype">Cost</label>
                  <input
                    className="col p-0"
                    type="text"
                    placeholder="&#8377;"
                    name="cost"
                    onChange={formik.handleChange}
                    value={formik.values.cost}
                    onBlur={formik.handleBlur}
                  />
                  <br />
                </div>
                <div className="row mb-2">
                  <label className="col mt-2 prodtype">Product category</label>
                  <input
                    className="col p-0"
                    type="text"
                    placeholder=""
                    name="product_category"
                    onChange={formik.handleChange}
                    value={formik.values.product_category}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{ position: "relative", top: "2rem", width: "100%" }}
            >
              <div className="row">
                <label className="col mt-2 prodtype" style={{ top: "2rem" }}>
                  Internal reference
                </label>

                <br />
              </div>
              <label className="prodtype mt-2" style={{ top: "2rem" }}>
                Bar code
              </label>
              <br />
              <label className="prodtype mt-2" style={{ top: "2rem" }}>
                Product tags
              </label>
            </div>
          </div>
        </div>
      </form>
      <br />
      <br />
    </div>
  );
}

export default New_Product;
