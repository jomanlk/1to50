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
      });
    };
    return block;
  });

  return (
    <div className="row narrow-wrap">
      <div className="game-grid col-12">
        {visibleBlocks.map((block) => new GridSquare(block))}
      </div>
    </div>
  );
}

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

  props.setVisibleBlocks(props.visibleBlocks);
  props.setPendingBlocks(props.pendingBlocks);
  props.setExpectedValue(props.expectedValue + 1);

  if (props.maxCount === props.expectedValue) {
    alert("You've won!");
  }
};

export default GameGridSquares;
