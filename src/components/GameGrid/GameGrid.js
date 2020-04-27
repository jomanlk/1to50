import React, { useState, useEffect } from "react";
import GameGridSquare from "./GameGridSquares";
import _ from "lodash";

let blocks = [];

function GameGrid(props) {
  let gridSize = props.gridSize;
  let maxCount = props.maxCount;

  if (props.gameStarted === false || props.gameRestarted === true) {
    blocks = [];
  }

  for (let i = 0; i < maxCount; i++) {
    blocks.push({
      value: i + 1,
    });
  }

  return (
    <GameGridSquare
      gameId={props.gameId}
      gameStartedHandler={props.gameStartedHandler}
      gameRestarted={props.gameRestarted}
      gameStarted={props.gameStarted}
      pendingBlocks={blocks.slice(gridSize)}
      expectedValue={1}
      visibleBlocks={_.shuffle(blocks.slice(0, gridSize))}
      {...props}
    ></GameGridSquare>
  );
}

export default GameGrid;
