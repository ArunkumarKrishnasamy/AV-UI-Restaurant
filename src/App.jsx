import { useState } from "react";
import "./App.css";
// import "./Components/CSS/AddProduct.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sign_up from "./Components/Sign_up";
import Log_In from "./Components/Log_In";
// import Products from "./Components/Products";
// import Add_Product from "./Components/Add_Product";
import New_Product from "./Components/New_Product";
import Product_List from "./Components/Product_List";
import Receipts from "./Components/Receipts";
import Add_Receipt from "./Components/Add_Receipt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log_In />}></Route>
        <Route path="/register" element={<Sign_up />}></Route>
        {/* <Route path="/products" element={<Products />}></Route> */}
        {/* <Route path="/addproduct" element={<Add_Product />}></Route> */}
        <Route path="/products" element={<Product_List />}></Route>
        <Route path="/addproduct" element={<New_Product />}></Route>
        <Route path="/receipts" element={<Receipts />}></Route>
        <Route path="/addreceipt" element={<Add_Receipt />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
