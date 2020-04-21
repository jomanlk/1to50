import React, { useState } from "react";
import GameGrid from "../components/GameGrid/GameGrid";
import GameTimer from "../components/Timer/GameTimer";

const GamePage = () => {
  let [gameStarted, setGameStarted] = useState(false);
  let [gameId, setGameId] = useState(getGameId());

  let restartGame = () => {
    if (gameStarted) {
      setGameStarted(false);
    }
    setGameId(getGameId());
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
          gameId={getGameId}
          gameStarted={gameStarted}
          gameStartedHandler={gameStartedHandler}
          gridSize="25"
          maxCount="50"
        />
      </div>
    </div>
  );
};

const getGameId = () => {
  return new Date().getTime() + "_" + Math.random();
};

export default GamePage;
