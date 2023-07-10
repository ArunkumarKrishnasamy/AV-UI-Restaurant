import React from "react";
import ReceiptCard from "./ReceiptCard";

function Search_ReceiptList({ filteredReceipts }) {
  return (
    <div>
      {filteredReceipts.map((receipt) => {
        return <ReceiptCard receipt={receipt} />;
      })}
    </div>
  );
}

export default Search_ReceiptList;
