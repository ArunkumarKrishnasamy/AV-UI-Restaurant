import React, { useState } from "react";
import Scroll from "./Scroll";

function Search_Receipt() {
  const [searchfield, setSearchfield] = useState("");
  const [ReceiptResults, setReceiptResults] = useState(false);
  let filteredReceipts = receipts.filter((receipt) => {
    return receipt.contact_name
      .toLowerCase()
      .includes(searchfield.toLowerCase());
  });
  const handleChange = (e) => {
    setSearchfield(e.target.value);
    setReceiptResults(true);
    if (e.target.value == "") {
      setReceiptResults(false);
    }
  };
  const searchList = () => {
    return <Scroll></Scroll>;
  };
  return <div>Search_Receipt</div>;
}

export default Search_Receipt;
