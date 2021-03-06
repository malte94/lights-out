import React, { Component } from "react";
import Board from "./Board";
import Timer from "./Timer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="neon">Lights</div>
        <div className="flux">Out!</div>
        <Board nrows="5" ncols="5" />
        <Timer />
      </div>
    );
  }
}

export default App;
