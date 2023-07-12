import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import "../Components/CSS/Receipts.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Receipts() {
  const [Receipts, setReceipts] = useState([]);
  const [addReceipt, showAddReceipt] = useState(true);
  const navigate = useNavigate();
  const HandleLogout = () => {
    let ask = window.confirm("Are You sure do you want to Log Out?");
    if (ask) {
      window.localStorage.removeItem("apptoken");
      alert("Logged Out Successfully");
      navigate("/");
    }
  };
  const GetReceipts = async () => {
    try {
      let data = await axios.get("http://localhost:3001/receipts", {
        headers: { Authorization: window.localStorage.getItem("apptoken") },
      });
      setReceipts(data.data);
      console.log(Receipts);
      if (Receipts.length > 0) {
        showAddReceipt(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error in Getting receipts");
    }
  };
  useEffect(() => {
    GetReceipts();
  }, []);
  return (
    <div className="container">
      <section className="header">
        <nav className="navbar">
          <a href="#">
            <img src={logo} alt="foodtracz" />
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
            style={{
              listStyleType: "none",
              display: "inline-block",
              float: "left",
            }}
          >
            <a href="/" style={{ color: "black" }}>
              Inventory
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
            <Link to={"/products"}>
              {" "}
              <button className="dropbtn">Products</button>
            </Link>
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
      {/* Tabs specification */}
      <div className="tabs">
        <input type="radio" id="Receipts" name="currentTab" checked />
        <input type="radio" id="Delivery order" name="currentTab" />
        <input type="radio" id="Returns" name="currentTab" />
      </div>
      <div className="buttons">
        <label for="Receipts">Receipts</label>
        <label
          for="Delivery order"
          style={{ color: "#353131", opacity: "30%" }}
        >
          Delivery order
        </label>
        <label for="Returns" style={{ color: "#353131", opacity: "30%" }}>
          Returns
        </label>
        <div className="underline"></div>
      </div>
      {/* icons floating right */}
      <div className="righticonbox">
        <ul className="list">
          <li className="list-items" style={{ display: "inline-block" }}>
            <div className="list-items-content">
              <a href="#" style={{ textDecoration: "none" }}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "black" }}
                >
                  filter_list
                </span>
                <span className="label" style={{ color: "black" }}>
                  Filter
                </span>
              </a>
            </div>
          </li>
          <li className="list-items" style={{ display: "inline-block" }}>
            <div className="list-items-content">
              <a href="#" style={{ textDecoration: "none" }}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "black" }}
                >
                  group_work
                </span>
                <span className="label" style={{ color: "black" }}>
                  Group by
                </span>
              </a>
            </div>
          </li>
          <li className="list-items" style={{ display: "inline-block" }}>
            <div className="list-items-content">
              <a href="#" style={{ textDecoration: "none" }}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "black" }}
                >
                  favorite
                </span>
                <span className="label" style={{ color: "black" }}>
                  Favourites
                </span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* table content */}
      <div className="tablebody">
        <table style={{ width: "100%" }}>
          <thead className="mb-2 fw-bold">
            <tr className="mb-5 ">
              <th scope="col" className="col-2 fw-bolder">
                Reference
              </th>
              <th className="col-4">Contact</th>
              <th className="col-2">Scheduled date</th>
              <th className="col-2">Source document</th>
              <th className="col-2">Status</th>
            </tr>
          </thead>

          <tbody className="mt-2">
            {Receipts.map((row) => {
              return (
                <tr className="m-2">
                  <td>{"R00" + row.id}</td>
                  <td>{row.contact_name}</td>
                  <td>{row.to_char}</td>
                  <td>{row.source_document} </td>
                  <td className="mt-2">
                    <button className="btn btn-sm btn-success">
                      {row.status}
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="lastsec">
        <p
          style={{
            color: "black",
            fontFamily: "Plus Jakarta Sans",
            fontWeight: "bold",
          }}
        >
          Let's add one!
        </p>
        <br />
        <div>
          <Link to={"/addreceipt"}>
            {" "}
            <button
              type="submit"
              className="add_receipt"
              style={{ position: "relative" }}
            >
              Add
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Receipts;
