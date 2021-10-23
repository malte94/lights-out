import React, {useState} from "react";
import Cell from "./Cell";

function Board(props) {

  const [rerender, reRender] = useState(false);
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
  
  const flipCellsAround = async (coord) => {
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

    console.log(board);

    await setBoard(tmpBoard); reRender(!rerender);

    if (board.every(row => row.every(cell => !cell))) {
      setHasWon(true);
    }

  }

  return(
    <div className="Board">
      <table className="Board">
        {hasWon == false &&
        <tbody>
          {renderBoard()}
        </tbody>
        }
      </table>
      {hasWon == true &&
        <div>
          <h1>You Win!</h1>
          <p>Press F5 to reload.</p>
        </div>
      }
    </div>
  )

}

export default Board;
