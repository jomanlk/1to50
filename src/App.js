import React from "react";
import GamePage from "./pages/GamePage";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <img src="/logo-header.png" />
      </nav>
      <GamePage />
    </React.Fragment>
  );
}

export default App;
