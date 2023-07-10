import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import panner from "../assets/Images/panner.png";
import "../../node_modules/bootstrap/js/src/dropdown.js";
import "../Components/CSS/New_Product.css";
import { Link, useNavigate } from "react-router-dom";
import Search_Product from "./Search_component/Search_Product";

function Product_List() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const FetchProducts = async () => {
    try {
      let GetData = await axios.get("http://localhost:3001/products", {
        headers: {
          Authorization: window.localStorage.getItem("apptoken"),
        },
      });
      setProducts(GetData.data);
      console.log(GetData.data);
    } catch (error) {
      console.error(error);
      alert("Please LogIn");
      navigate("/");
    }
  };
  const HandleDelete = async (id) => {
    try {
      let ask = window.confirm("Do You wannt to delete this?");
      if (ask) {
        await axios.delete(`http://localhost:3001/products/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("apptoken"),
          },
        });
        alert("Deleted");
        FetchProducts();
      }
    } catch (error) {
      console.error(error);
      alert("Error while deleting it");
    }
  };
  useEffect(() => {
    FetchProducts();
  }, []);
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
          <li style={{ listStyleType: "none", display: "inline-block" }}>
            <a href="/" style={{ color: "black" }}>
              Inventory
            </a>
          </li>
          <li style={{ listStyleType: "none", display: "inline-block" }}>
            <span class="material-icons-outlined">{">"}Products</span>
          </li>
        </ul>
      </div>
      {/* menu bar right floating with options */}
      <div className="ri">
        <div className="rdropdown">
          <div className="dropdown">
            <Link to={"/receipts"}>
              {" "}
              <button className="dropbtn">Operations</button>
            </Link>
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
            Products
          </label>
        </div>
        <div className="row p_label" style={{ top: "50px" }}>
          <label id="lab" style={{ fontSize: "30px" }}>
            Products
          </label>
        </div>

        {/* heading underline  */}
        <div className="ul"></div>
      </div>
      <div className="view-products">
        <div
          style={{
            position: "relative",
            // top: "140px",
            // left: "950px",
            width: "50%",
          }}
          className="row justify-content-start"
        >
          <form className="d-flex mt-2 ms-2" role="search">
            <Search_Product products={products} />

            <div className="d-flex align-items-end ms-5">
              <Link to={"/addproduct"}>
                {" "}
                <button type="submit" className="mt-2">
                  Add
                </button>
              </Link>
            </div>
          </form>
        </div>
        {/* icons floating right */}
        {/* <div
          style={{
            position: "relative",
            top: "10px",
            left: "1000px", 
            width: "30%",
          }}
        >
          <ul className="list">
            <li className="list-items" style={{ display: "inline-block" }}>
              <div className="list-items-content">
                <a href="#" style={{ textDecoration: "none" }}>
                  <span className="material-symbols-outlined">filter_list</span>
                  <span className="label">Filter</span>
                </a>
              </div>
            </li>
            <li className="list-items" style={{ display: "inline-block" }}>
              <div className="list-items-content">
                <a href="#" style={{ textDecoration: "none" }}>
                  <span className="material-symbols-outlined">group_work</span>
                  <span className="label">Group by</span>
                </a>
              </div>
            </li>
            <li className="list-items" style={{ display: "inline-block" }}>
              <div className="list-items-content">
                <a href="#" style={{ textDecoration: "none" }}>
                  <span className="material-symbols-outlined">favorite</span>
                  <span className="label">Favourites</span>
                </a>
              </div>
            </li>
          </ul>
        </div> */}
        <div className="row g-0 ">
          {products.map((product) => {
            const { sales_price, cost, product_name, id } = product;
            return (
              <div
                className="card m-1"
                style={{ width: "14rem", top: "50px", paddingLeft: "20px" }}
              >
                <img
                  src={panner}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{product_name}</h5>

                  <p className="card-text">&#8377;{cost}</p>
                  <a
                    href="#"
                    class="btn btn-danger"
                    style={{ background: "#E7305B;" }}
                    onClick={() => {
                      HandleDelete(id);
                    }}
                  >
                    Delete
                  </a>
                  <a
                    href="#"
                    className="ms-2 btn btn-primary"
                    style={{ background: "#E7305B;" }}
                  >
                    Favourite
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Product_List;
