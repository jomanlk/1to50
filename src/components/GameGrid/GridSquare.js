import React from "react";

function GridSquare(props) {
  let className = "grid-square ";
  if (props.oldValue) {
    className += " flash-animate ";
  }
  if (props.altColor) {
    className += " alt-color ";
  }
  return (
    <div className={className} key={props.value + Math.random()}>
      <a onClick={() => props.clickHandler(props.value)} href="#">
        {props.value}
      </a>
    </div>
  );
}

export default GridSquare;
