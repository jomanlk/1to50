import React, { useState } from "react";
import GameGrid from "../components/GameGrid/GameGrid";
import GameTimer from "../components/Timer/GameTimer";
import GameWon from "../components/GameAlerts/GameWon";

let gameWonTime = 0;

const GamePage = () => {
  let [gameStarted, setGameStarted] = useState(false);
  let [gameId, setGameId] = useState(getGameId());
  let [gameRestarted, setGameRestarted] = useState(getGameId());
  let [gameWon, setGameWon] = useState(false);
  let [showGameWon, setShowGameWon] = useState(false);

  let restartGame = () => {
    if (gameStarted) {
      setGameRestarted(true);
      setGameStarted(false);
      setGameWon(false);
    }
    gameWonTime = 0;
    setGameId(getGameId());
  };

  const gameStartedHandler = () => {
    setGameRestarted(false);
    setGameStarted(true);
  };

  const gameWonHandler = () => {
    setGameWon(true);
    setShowGameWon(true);
  };

  const timerUpdateHandler = (updatedTimer) => {
    gameWonTime = updatedTimer;
  };

  let timerPaused = gameWon ? true : false;

  return (
    <div className="row game-page">
      <div className="col-12">
        <div className="narrow-wrap">
          <div className="alert alert-light col-12" role="alert">
            <strong>How to play?</strong> Click the numbers in order from 1 to
            50 in the shortest possible time.
          </div>
          <div className="row mb-3">
            <div className="col-6 ">
              <button
                onClick={restartGame}
                type="button"
                className="btn btn-lg btn-game-start"
              >
                Reset
              </button>
            </div>
            <div className="col-6 ">
              <GameTimer
                timerPaused={timerPaused}
                timer={0}
                gameStarted={gameStarted}
                onTimerUpdate={timerUpdateHandler}
              ></GameTimer>
            </div>
          </div>
        </div>

        <GameGrid
          gameId={gameId}
          gameStarted={gameStarted}
          gameRestarted={gameRestarted}
          gameStartedHandler={gameStartedHandler}
          gameWonHandler={gameWonHandler}
          gridSize={25}
          maxCount={50}
        />

        {showGameWon && (
          <GameWon
            gameWonTime={gameWonTime}
            show={true}
            onClose={() => setShowGameWon(false)}
          />
        )}
      </div>
    </div>
  );
};

const getGameId = () => {
  return new Date().getTime() + "_" + Math.random();
};

export default GamePage;
