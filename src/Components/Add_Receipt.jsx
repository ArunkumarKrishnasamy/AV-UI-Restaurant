import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Scroll from "./Search_component/Scroll";
import Search_ReceiptList from "./Search_component/Search_ReceiptList";

function Add_Receipt() {
  const navigate = useNavigate();
  const [Receipts, setReceipts] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const [ReceiptResults, setReceiptResults] = useState(false);
  const ReceiptsList = async () => {
    try {
      let data = await axios.get("http://localhost:3001/receipts", {
        headers: { Authorization: window.localStorage.getItem("apptoken") },
      });
      setReceipts(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
      alert("Error in Getting receipts");
    }
  };
  useEffect(() => {
    ReceiptsList();
  }, []);
  const HandleChange = (e) => {
    e.preventDefault();
    formik.handleChange(e);
    setSearchfield(e.target.value);
    setReceiptResults(true);
    if (e.target.value == "") {
      setReceiptResults(false);
    }
  };

  // Perform the search logic here based on the query
  // This can involve filtering an existing data set or making an API request
  let filteredReceipts = Receipts.filter((receipt) => {
    return receipt.contact_name
      .toLowerCase()
      .includes(searchfield.toLowerCase());
  });
  const searchList = () => {
    return (
      <Scroll>
        <Search_ReceiptList filteredReceipts={filteredReceipts} />
      </Scroll>
    );
  };
  const HandleLogout = () => {
    let ask = window.confirm("Are You sure do you want to Log Out?");
    if (ask) {
      window.localStorage.removeItem("apptoken");
      alert("Logged Out Successfully");
      navigate("/");
    }
  };
  const formik = useFormik({
    initialValues: {
      contact_name: "",
      scheduled_date: "",
      status: "Active",
      source_document: "File upload",
    },
    validate: (values) => {
      const errors = {};
      if (!values.contact_name) {
        errors.contact_name = "Please Enter Contact Name";
      }
      if (!values.scheduled_date) {
        errors.scheduled_date = "Please Enter scheduled date";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3001/addreceipt", values, {
          headers: { Authorization: window.localStorage.getItem("apptoken") },
        });
        alert("Added succesfully");
        navigate("/receipts");
        console.log(values);
      } catch (error) {
        console.error(error);
        alert("Error occurred");
      }
    },
  });
  return (
    <div className="container">
      <section className="header">
        <nav className="navbar">
          <Link to={"/products"}>
            <a href="#">
              <img
                //   id="pagelogo"
                //   className="pagelogo"
                src={logo}
                alt="foodtracz"
              />
            </a>
          </Link>
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
              <li
                className="logout"
                onClick={() => {
                  HandleLogout();
                }}
              >
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
          <li
            className="me-1"
            style={{ listStyleType: "none", display: "inline-block" }}
          >
            <a href="/" style={{ color: "black" }}>
              Inventory
            </a>
          </li>
          <li style={{ listStyleType: "none", display: "inline-block" }}>
            <span class="material-icons-outlined"> {">"} Overview</span>
          </li>
        </ul>
      </div>
      {/* menu bar right floating with options */}
      <div className="ri">
        <div className="rdropdown">
          <div className="dropdown">
            <button className="dropbtn" style={{ color: "#e7305b" }}>
              Operations
            </button>
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
            <button className="dropbtn">Products</button>
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
        className="container row mt-5 np_label"
        style={{ textAlign: "center", height: "110px", alignContent: "center" }}
      >
        <div
          className=" p_label"
          style={{ top: "5px", alignContent: "center" }}
        >
          <label id="lab2" style={{ fontSize: "45px", color: "#dfdcdc" }}>
            Receipts
          </label>
        </div>
        <div
          className="row p_label d-flex justiy-content-center"
          style={{ top: "25px", alignContent: "center" }}
        >
          <label id="lab" style={{ fontSize: "30px" }}>
            Receipts
          </label>
        </div>

        {/* heading underline  */}
        <div className="ul"></div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      {/* print label section */}
      <div style={{ top: "1500px", height: "30px", width: "100%" }}>
        <div
          className="row leftbox"
          style={{ paddingLeft: "0px", top: "-20px" }}
        >
          <ul>
            <li className="belowlinelst">Print label</li>
            <Link to={"/receipts"}>
              {" "}
              <li
                className="belowlinelst"
                style={{
                  display: "inline",
                  listStyle: "none",
                  fontSize: "19px",
                }}
              >
                Cancel
              </li>
            </Link>
          </ul>
        </div>

        {/* validate button section */}
        <div className="row rightbox" style={{ backgroundColor: "azure" }}>
          <button
            type="submit"
            id="validate"
            className="d-flex justiy-content-center ms-5 validate"
            style={{
              font: "20px",
              border: "2px solid #e7305b",
              borderRadius: "6px",
              backgroundColor: "#e7305b",
              color: "white",
              width: "100px",
              float: "right",
            }}
            onClick={formik.handleSubmit}
          >
            {" "}
            validate
          </button>
        </div>

        {/* center div section for text fields  and combo box */}
      </div>
      <form>
        <div
          className="container-fluid maindiv "
          style={{ width: "100%", height: "150px" }}
        >
          <div className="row" style={{ width: "100%", height: "40px" }}>
            <div
              className="col"
              style={{ position: "relative", float: "left", width: "65%" }}
            >
              <ul>
                <li className="col_lis">
                  <label for="user"> Receive from </label>
                  <input
                    id="user"
                    name="contact_name"
                    className="listext ms-5"
                    style={{ width: "60%" }}
                    type="text"
                    onChange={HandleChange}
                    value={formik.values.contact_name}
                    onBlur={formik.handleBlur}
                  />
                  <div>{ReceiptResults ? searchList() : null}</div>
                </li>
                <br></br>
                <br />
                <br />
                <li className="col_lis mt-5">
                  <label>Operation type</label>
                  <span> {">    "}Receipts</span>
                </li>
              </ul>
            </div>
            <div
              className="col  rightdiv"
              style={{ float: "left", width: "100%", textAlign: "right" }}
            >
              <ul>
                <li className="col_lis mt-2">
                  <label for="sdate" style={{ float: "left" }} className="ms-2">
                    Scheduled Date{" "}
                  </label>
                  <input
                    type="date"
                    className="listext ms-5"
                    style={{ width: "50%", float: "right" }}
                    onChange={formik.handleChange}
                    value={formik.values.scheduled_date}
                    name="scheduled_date"
                    onBlur={formik.handleBlur}
                  />
                </li>
                {/* <li class="col_lis"></li> */}
                <li className="col_lis mt-5">
                  <label for="sdoc" style={{ float: "left" }}>
                    Source document:
                  </label>
                  <input
                    type="text"
                    className="listext"
                    id="sdoc"
                    style={{ width: "60%", float: "right" }}
                    onChange={formik.handleChange}
                    value={formik.values.source_document}
                    onBlur={formik.handleBlur}
                    name="source_document"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
      {/* operations and additional details section */}
      <div
        className="row main_btn mt-5"
        style={{ height: "60px", position: "relative" }}
      >
        <button
          className="col blw_btn"
          style={{ borderBottom: "3px solid #e7305b", color: "#000" }}
        >
          Operation
        </button>
        <button className="col blw_btn">Additional Info</button>
        <button className="col blw_btn">Note</button>
      </div>
    </div>
  );
}

export default Add_Receipt;
