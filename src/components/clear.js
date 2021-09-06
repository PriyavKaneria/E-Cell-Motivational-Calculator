import React from "react";

const ClearBtn = props => {
  return (
    <div className="clear-btn button-wrapper" onClick={props.handleClick}>
      {props.children}
    </div>
  );
};

export default ClearBtn;
