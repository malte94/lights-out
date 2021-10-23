import React, {useState} from "react";
import Cell from "./Cell";

function Board(props) {

  const [rerender, setRerender] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  let chanceLightStartsOn = 0.25;

  const createBoard = () => {
    let board = [];
    for (let y = 0; y < props.nrows; y++) {
      let row = [];
      for (let x = 0; x < props.ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn) 
        // returns true or false if Math.Random() generated a number less or higher than chanceLightStartsOn
      }
      board.push(row);
    }
    console.log(board); 
    return board
  }

  const [board, setBoard] = useState(createBoard());

  const renderBoard = () => {
    let tblBoard = [];
    for(let y = 0; y < props.nrows; y++) {
      let row = [];
      for(let x = 0; x < props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
        <Cell 
          key={coord} 
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />)
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }
    return tblBoard;
  }
  
  const flipCellsAround = (coord) => {
    console.log("Clicked: " + coord)
    let tmpBoard = board;
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

    setHasWon(false);

    console.log(board);

    setBoard(board, tmpBoard); setRerender(!rerender);

  }

  return(
    <div className="Board">
      <table className="Board">
        <tbody>
          {renderBoard()}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
