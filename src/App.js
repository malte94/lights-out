import React, { Component } from "react";
import Board from "./Board";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div class="neon">Lights</div>
        <div class="flux">Out!</div>
        <Board nrows="5" ncols="5" />
      </div>
    );
  }
}

export default App;
