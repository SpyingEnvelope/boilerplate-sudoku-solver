const e = require("cors");

class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length == 81) {
      return true;
    } else {
      return false
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

