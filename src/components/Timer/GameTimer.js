import React, { useState, useEffect } from "react";
import _ from "lodash";

function GameTimer(props) {
  let [timer, setTimer] = useState(props.timer);

  useEffect(() => {
    if (props.gameStarted === false) {
      setTimer(0);
    }

    if (props.gameStarted === true && !props.timerPaused) {
      setTimeout(() => {
        let time = timer + 100;
        setTimer(time);
        props.onTimerUpdate(time);
      }, 10);
    }
  });

  let timeInSecs = _.round(timer / 10000, 1);
  timeInSecs = timeInSecs % 1 == 0 ? `${timeInSecs}.0` : timeInSecs;
  return (
    <div className="game-timer">
      <div className="timer">{timeInSecs}</div>
    </div>
  );
}

export default GameTimer;
