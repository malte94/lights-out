import React from "react";
import Cell from "./Cell";
import {useState} from "@hookstate/core";

export default function Board(props) {

  const hasWon = useState(false);
  let chanceLightStartsOn = 0.25;

  const createBoard = () => {
    let crtBoard = [];
    for (let y = 0; y < props.nrows; y++) {
      let row = [];
      for (let x = 0; x < props.ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn) 
        // returns true or false if Math.Random() generated a number less or higher than chanceLightStartsOn
      }
      crtBoard.push(row);
    }
    console.log(crtBoard);
    return crtBoard;
  }

  const board = useState(createBoard());

  const renderBoard = () => {
    let tblBoard = [];
    for(let y = 0; y < props.nrows; y++) {
      let row = [];
      for(let x = 0; x < props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
        <Cell 
          key={coord} 
          isLit={board[y][x].value}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />)
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }

    return tblBoard;
  }
  
  const flipCellsAround = (coord) => {
    console.log("Clicked: " + coord)
    let tmpBoard = board.get();
    let [y, x] = coord.split("-").map(Number);
    console.log("y: " + y + " x: " + x);

    function flipCell(y, x) {
      if (x >= 0 && x < props.ncols && y >= 0 && y < props.nrows) {
        tmpBoard[y][x] = !tmpBoard[y][x];
      }
    }

    // Flipping Logic for the neighbours

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    console.log(board);

    board.set(tmpBoard);

    if (board.every(row => row.every(cell => !cell))) {
      hasWon.set(true);
    }

  }

  return(
    <div className="Board">
      <table className="Board">
        {hasWon.get() === false &&
        <tbody>
          {renderBoard()}
        </tbody>
        }
      </table>
      {hasWon.get() === true &&
        <div>
          <h1>You Win!</h1>
          <p>Press F5 to reload.</p>
        </div>
      }
    </div>
  )

}