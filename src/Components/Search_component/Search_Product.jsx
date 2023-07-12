import React, { useState } from "react";
import Scroll from "./Scroll";
import Search_ProductList from "./Search_ProductList";

function Search_Product({ products }) {
  const [searchfield, setSearchfield] = useState("");
  const [ProductResults, setProductResults] = useState(false);
  let filteredProducts = products.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(searchfield.toLowerCase()) ||
      product.product_tags.toLowerCase().includes(searchfield.toLowerCase())
    );
  });
  const handleChange = (e) => {
    setSearchfield(e.target.value);
    setProductResults(true);
    if (e.target.value == "") {
      setProductResults(false);
    }
  };
  const searchList = () => {
    return (
      <Scroll>
        <Search_ProductList filteredProducts={filteredProducts} />
      </Scroll>
    );
  };
  return (
    <>
      <div className="row">
        <input
          type="search"
          placeholder="  Search..."
          aria-label="Search"
          style={{
            position: "relative",
            top: "10px",
            height: "30px",
            width: "100%",
            paddingLeft: "10px",
            borderRight: "none",
          }}
          className="border border-right-0 me-0"
          onChange={handleChange}
        />
        <div className="">{ProductResults ? searchList() : null}</div>
      </div>
      <button
        type="submit"
        style={{ position: "relative", top: "10px", width: "5em" }}
        className="p-2 ms-0"
      >
        Search
      </button>
    </>
  );
}

export default Search_Product;
