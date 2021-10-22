import React, {Component} from "react";
import Cell from "./Cell";

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  state = {
    hasWon: false,
    board: this.createBoard(),
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn) 
        // returns true or false if Math.Random() generated a number less or higher than chanceLightStartsOn
      }
      board.push(row);
    }
    return board
  }

  renderBoard() {
    let tblBoard = [];
    for(let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for(let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
        <Cell 
          key={coord} 
          isLit={this.state.board[y][x]}
          flipCellsAroundMe={() => this.flipCellsAround(coord)}
        />)
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }
    return tblBoard;
  }
  
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // Flipping Logic for the neighbours

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);


    let hasWon = false;

    this.setState({board: board, hasWon: hasWon});

  }

  render() {
    return(
      <div className="Board">
        <table className="Board">
          <tbody>
            {this.renderBoard()}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;
