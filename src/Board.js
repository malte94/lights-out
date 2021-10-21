import React, {Component} from "react";
import Cell from "./Cell";

class Board extends Component {

  static defaultProps = {
    nrows: 3,
    ncols: 3,
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
        row.push(<Cell isLit={this.state.board[y][x]}/>)
      }
      tblBoard.push(<tr>{row}</tr>)
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
