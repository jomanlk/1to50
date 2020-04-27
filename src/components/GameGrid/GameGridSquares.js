import React, { useState } from "react";
import GridSquare from "./GridSquare";
import _ from "lodash";

let blocks = [];

function GameGridSquares(props) {
  const resetGrid = () => {
    visibleBlocks = props.visibleBlocks;
    pendingBlocks = props.pendingBlocks;
    expectedValue = 1;
  };

  let gridSize = props.gridSize;
  let maxCount = props.maxCount;

  let [expectedValue, setExpectedValue] = useState(props.expectedValue);
  let [pendingBlocks, setPendingBlocks] = useState(props.pendingBlocks);
  let [visibleBlocks, setVisibleBlocks] = useState(props.visibleBlocks);

  if (props.gameStarted === false) {
    resetGrid();
  }

  visibleBlocks = visibleBlocks.map((block) => {
    block.clickHandler = (blockValue) => {
      squareClickHandler({
        maxCount: maxCount,
        blockValue: blockValue,
        pendingBlocks: pendingBlocks,
        visibleBlocks: visibleBlocks,
        expectedValue: expectedValue,
        setVisibleBlocks: setVisibleBlocks,
        setPendingBlocks: setPendingBlocks,
        setExpectedValue: setExpectedValue,
        gameStartedHandler: props.gameStartedHandler,
        gameWonHandler: props.gameWonHandler,
      });
    };
    return block;
  });

  let blockRows = _.chunk(visibleBlocks, 5);

  return (
    <div className="narrow-wrap game-grid-wrap">
      <div className="game-grid col-12">
        {blockRows.map((row) => getchunkedBlockRow(row))}
      </div>
    </div>
  );
}

const getchunkedBlockRow = (row) => {
  return (
    <div key={Math.random()} className="row m-0">
      {row.map((block) => new GridSquare(block))}
    </div>
  );
};

/**
 * Handles the button clicks
 * @param {*} props
 */
const squareClickHandler = (props) => {
  //Game starts when you click 1
  if (props.blockValue === 1) {
    props.gameStartedHandler();
  }

  if (props.expectedValue !== props.blockValue) {
    return;
  }

  let blockIndex = _.findIndex(props.visibleBlocks, (block) => {
    return block.value === props.blockValue;
  });

  //reset the old values
  props.visibleBlocks.map((block) => (block.oldValue = null));

  //assign the new values. Assign the old value to the current block to animate it
  if (props.pendingBlocks.length) {
    props.visibleBlocks[blockIndex] = props.pendingBlocks.shift();
  } else {
    props.visibleBlocks[blockIndex] = { value: "_" };
  }
  props.visibleBlocks[blockIndex].oldValue = props.blockValue;
  props.visibleBlocks[blockIndex].altColor = true;

  //if the win condition is met, set it and ttrigger redraw
  if (props.maxCount === props.expectedValue) {
    props.gameWonHandler();
  }

  //Update the state and trigger the redraw
  props.setVisibleBlocks(props.visibleBlocks);
  props.setPendingBlocks(props.pendingBlocks);
  props.setExpectedValue(props.expectedValue + 1);
};

export default GameGridSquares;
