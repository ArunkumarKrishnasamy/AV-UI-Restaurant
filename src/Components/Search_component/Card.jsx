import React from "react";
import { Link, useParams } from "react-router-dom";

function Card({ product }) {
  let params = useParams();
  return (
    <div className="d-flex justify-content-start">
      <button className="btn btn-outline-secondary">
        <span> {product.product_name}</span>
      </button>
      <span className="mt-2">{product.product_tags}</span>
    </div>
  );
}

export default Card;
