import React, {Component} from 'react'

function Cell(props) {

  let classes = "Cell" + (props.isLit ? " Cell-lit" : "");

  const handleClick = (evt) => {
    props.flipCellsAroundMe();
  }

  return (
      <td className={classes} onClick={handleClick} />
  )
}

export default Cell