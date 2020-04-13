import React, { useState } from "react";
import GameGridSquare from "./GameGridSquares";
import _ from "lodash";

let blocks = [];

function GameGrid(props) {
  let gridSize = props.gridSize;
  let maxCount = props.maxCount;

  let pendingBlocks = [];
  let hiddenBlocks = [];

  for (let i = 0; i < maxCount; i++) {
    blocks.push({
      value: i + 1,
    });
  }

  console.log("Rendering game grid");
  return (
    <GameGridSquare
      pendingBlocks={blocks.slice(gridSize)}
      expectedValue={1}
      visibleBlocks={_.shuffle(blocks.slice(0, gridSize))}
      {...props}
    ></GameGridSquare>
  );
}

export default GameGrid;
