import React from "react";
import logo from "../assets/logo.svg";
import "../../node_modules/bootstrap/js/src/dropdown.js";

function Add_Product() {
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
      <div
        className="navbar fixed top top bg-body-tertiary"
        style={{ marginTop: "-50px", position: "fixed" }}
      >
        <div className="container-fluid">
          <div className="navbar">
            <img
              id="pagelogo"
              className="pagelogo"
              style={{ display: "flex", alignItems: "start" }}
              src={logo}
              alt="foodtracz"
            />
            <div className="rightbox">
              <ul>
                <li id="notification">
                  <a
                    href="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Notification
                  </a>
                </li>
                <li>
                  <svg height={"20"} width={"5"}>
                    <line
                      x1={"0"}
                      y1={"0"}
                      x2={"0"}
                      y2={"200"}
                      style={{ stroke: "rgb(0,0,0)", strokeWidth: "4" }}
                    ></line>
                  </svg>
                </li>
                <li id="logout">
                  <a
                    href="/"
                    style={{ textDecoration: "none", color: "rgb(255,0,0)" }}
                    onClick={HandleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Page Specification - left floating */}
      <div className="leftbox">
        <ul style={{ listStyleType: "none", display: "inline-block" }}>
          <li>
            <a href="/" style={{ color: "black" }}>
              Inventory
            </a>
          </li>
          <li>
            <span className="material-symbols-outlined">next</span>
          </li>
          <li style={{ display: "inline-block" }}>
            <a href="/" style={{ color: "black" }}></a>
          </li>
        </ul>
      </div>
      {/* Menu bar right floating with options */}
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
            <div className="dropdown-content">
              <p>Settings</p>
              <p>Warehouse management</p>
              <a href="#">Warehouses</a>
              <a href="#">Operations type</a>
              <p>Products</p>
              <a href="#">Product categories</a>
              <a href="#">Reordering rules</a>
            </div>
          </div>
        </div>
      </div>
      <div className="p_label">
        <label
          style={{
            fontSize: "50px",
            color: "#E3E3E3",
            paddingLeft: "200px",
            top: "70px",
          }}
          className="mt-0"
        >
          New products
        </label>
      </div>
      <div className="p_label">
        <label
          style={{
            fontSize: "30px",
            paddingLeft: "280px",
            textAlign: "center",
          }}
        >
          New products
        </label>
        <div className="ul d-flex justify-content-center"></div>
        <div className="col belowline">
          <ul>
            <li className="updtqtylst"> Update quantity &nbsp;</li>
            <li className="updtqtylst">Replenish &nbsp;</li>
            <li className="updtqtylst">Print Label &nbsp;</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Add_Product;
