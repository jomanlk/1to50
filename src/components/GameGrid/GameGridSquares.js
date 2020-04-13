import React, { useState } from "react";
import GridSquare from "../GridSquare/GridSquare";
import _ from "lodash";

let blocks = [];

function GameGridSquares(props) {
  let gridSize = props.gridSize;
  let maxCount = props.maxCount;

  let [expectedValue, setExpectedValue] = useState(props.expectedValue);
  let [pendingBlocks, setPendingBlocks] = useState(props.pendingBlocks);
  let [visibleBlocks, setVisibleBlocks] = useState(props.visibleBlocks);

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
      });
    };
    return block;
  });

  return (
    <div className="game-grid col-12">
      {visibleBlocks.map((block) => new GridSquare(block))}
    </div>
  );
}

function squareClickHandler(props) {
  if (props.expectedValue != props.blockValue) {
    return;
  }

  let blockIndex = _.findIndex(props.visibleBlocks, (block) => {
    return block.value == props.blockValue;
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

  if (props.maxCount == props.expectedValue) {
    alert("You've won!");
  }
}

export default GameGridSquares;
