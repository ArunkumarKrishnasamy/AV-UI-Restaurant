import React from "react";
import { Link, useParams } from "react-router-dom";

function ReceiptCard({ receipt }) {
  return (
    <div className="d-flex justify-content-start">
      <button className="btn btn-outline-secondary">
        <span> {receipt.contact_name}</span>
      </button>
    </div>
  );
}

export default ReceiptCard;
