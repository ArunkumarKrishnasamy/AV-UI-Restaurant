import React from "react";
import Card from "./Card";

function Search_ProductList({ filteredProducts }) {
  return (
    <div>
      {filteredProducts.map((product) => {
        return <Card product={product} />;
      })}
    </div>
  );
}

export default Search_ProductList;
