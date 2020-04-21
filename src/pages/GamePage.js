import React, { useState } from "react";
import GameGrid from "../components/GameGrid/GameGrid";
import GameTimer from "../components/Timer/GameTimer";

function GamePage() {
  let [gameStarted, setGameStarted] = useState(false);

  let restartGame = () => {
    setGameStarted(false);
  };

  let gameStartedHandler = () => {
    setGameStarted(true);
  };

  return (
    <div className="row game-page">
      <div className="col-12">
        <div className="narrow-wrap">
          <div className="row mb-3">
            <div className="col-md-6 ">
              <button
                onClick={restartGame}
                type="button"
                className="btn btn-danger big-button"
              >
                Reset Game
              </button>
            </div>
            <div className="col-md-6 ">
              <GameTimer timer={0} gameStarted={gameStarted}></GameTimer>
            </div>
          </div>
        </div>

        <GameGrid
          gameStarted={gameStarted}
          gameStartedHandler={gameStartedHandler}
          gridSize="25"
          maxCount="50"
        />
      </div>
    </div>
  );
}

export default GamePage;
