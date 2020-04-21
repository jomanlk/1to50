import React, { useState, useEffect } from "react";
import _ from "lodash";

function GameTimer(props) {
  let [timer, setTimer] = useState(props.timer);

  useEffect(() => {
    if (props.gameStarted === false) {
      setTimer(0);
    }

    if (props.gameStarted === true) {
      setTimeout(() => setTimer(timer + 100), 10);
    }
  });

  let timeInSecs = _.round(timer / 10000, 1);
  timeInSecs = timeInSecs % 1 == 0 ? `${timeInSecs}.0` : timeInSecs;
  return (
    <div className="game-timer">
      <div className="timer p-2">{timeInSecs}</div>
    </div>
  );
}

export default GameTimer;
