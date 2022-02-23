const e = require("cors");
const res = require("express/lib/response");

class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length == 81) {
      return true;
    } else {
      return false
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    console.log(value);
    console.log(row);
    let rowObject = {
    'A': puzzleString.substr(0, 9), 
    'B': puzzleString.substr(9, 9), 
    'C': puzzleString.substr(18, 9), 
    'D': puzzleString.substr(27, 9),
    'E': puzzleString.substr(36, 9),
    'F': puzzleString.substr(45, 9),
    'G': puzzleString.substr(54, 9),
    'H': puzzleString.substr(63, 9),
    'I': puzzleString.substr(72, 9)
    };

    if (rowObject[row].indexOf(value) == -1) {
      return true;
    } else {
      return false;
    }

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

