import React from "react";
import GameGrid from "../components/GameGrid/GameGrid";

function GamePage() {
  return (
    <div className="row game-page">
      <GameGrid gridSize="25" maxCount="50" />
    </div>
  );
}

export default GamePage;
