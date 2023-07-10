import React from "react";

function Scroll(props) {
  return (
    <div style={{ overflowY: "scroll", height: "auto" }} className="bg-light">
      {props.children}
    </div>
  );
}

export default Scroll;
