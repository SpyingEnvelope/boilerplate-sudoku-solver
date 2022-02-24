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

    let colObject = {
      1: puzzleString.substr(0, 1) + puzzleString.substr(9, 1) + puzzleString.substr(18, 1) + puzzleString.substr(27, 1) + puzzleString.substr(36, 1) + puzzleString.substr(45, 1) + puzzleString.substr(54, 1) + puzzleString.substr(63, 1) + puzzleString.substr(72, 1),
      2: puzzleString.substr(1, 1) + puzzleString.substr(10, 1) + puzzleString.substr(19, 1) + puzzleString.substr(28, 1) + puzzleString.substr(37, 1) + puzzleString.substr(46, 1) + puzzleString.substr(55, 1) + puzzleString.substr(64, 1) + puzzleString.substr(73, 1),
      3: puzzleString.substr(2, 1) + puzzleString.substr(11, 1) + puzzleString.substr(20, 1) + puzzleString.substr(29, 1) + puzzleString.substr(38, 1) + puzzleString.substr(47, 1) + puzzleString.substr(56, 1) + puzzleString.substr(65, 1) + puzzleString.substr(74, 1),
      4: puzzleString.substr(3, 1) + puzzleString.substr(12, 1) + puzzleString.substr(21, 1) + puzzleString.substr(30, 1) + puzzleString.substr(39, 1) + puzzleString.substr(48, 1) + puzzleString.substr(57, 1) + puzzleString.substr(66, 1) + puzzleString.substr(75, 1),
      5: puzzleString.substr(4, 1) + puzzleString.substr(13, 1) + puzzleString.substr(22, 1) + puzzleString.substr(31, 1) + puzzleString.substr(40, 1) + puzzleString.substr(49, 1) + puzzleString.substr(58, 1) + puzzleString.substr(67, 1) + puzzleString.substr(76, 1),
      6: puzzleString.substr(5, 1) + puzzleString.substr(14, 1) + puzzleString.substr(23, 1) + puzzleString.substr(32, 1) + puzzleString.substr(41, 1) + puzzleString.substr(50, 1) + puzzleString.substr(59, 1) + puzzleString.substr(68, 1) + puzzleString.substr(77, 1),
      7: puzzleString.substr(6, 1) + puzzleString.substr(15, 1) + puzzleString.substr(24, 1) + puzzleString.substr(33, 1) + puzzleString.substr(42, 1) + puzzleString.substr(51, 1) + puzzleString.substr(60, 1) + puzzleString.substr(69, 1) + puzzleString.substr(78, 1),
      8: puzzleString.substr(7, 1) + puzzleString.substr(16, 1) + puzzleString.substr(25, 1) + puzzleString.substr(34, 1) + puzzleString.substr(43, 1) + puzzleString.substr(52, 1) + puzzleString.substr(61, 1) + puzzleString.substr(70, 1) + puzzleString.substr(79, 1),
      9: puzzleString.substr(8, 1) + puzzleString.substr(17, 1) + puzzleString.substr(26, 1) + puzzleString.substr(35, 1) + puzzleString.substr(44, 1) + puzzleString.substr(53, 1) + puzzleString.substr(62, 1) + puzzleString.substr(71, 1) + puzzleString.substr(80, 1)
    }

    if (colObject[column].indexOf(value) == -1) {
      return true;
    } else {
      return false;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    let boxObject = {
      1: puzzleString.substr(0, 3) + puzzleString.substr(9, 3) + puzzleString.substr(18, 3),
      2: puzzleString.substr(3, 3) + puzzleString.substr(12, 3) + puzzleString.substr(21, 3),
      3: puzzleString.substr(6, 3) + puzzleString.substr(15, 3) + puzzleString.substr(24, 3),
      4: puzzleString.substr(27, 3) + puzzleString.substr(36, 3) + puzzleString.substr(45, 3),
      5: puzzleString.substr(30, 3) + puzzleString.substr(39, 3) + puzzleString.substr(48, 3),
      6: puzzleString.substr(33, 3) + puzzleString.substr(42, 3) + puzzleString.substr(51, 3),
      7: puzzleString.substr(54, 3) + puzzleString.substr(63, 3) + puzzleString.substr(72, 3),
      8: puzzleString.substr(57, 3) + puzzleString.substr(66, 3) + puzzleString.substr(75, 3),
      9: puzzleString.substr(60, 3) + puzzleString.substr(69, 3) + puzzleString.substr(78, 3)
    }

    // Check first row of boxes/regions
    if (row == 'A' || row == 'B' || row == 'C'){
      if (column <= 3) { 
        if (boxObject[1].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
      if (column <= 6) {
        if (boxObject[2].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
      if (column <= 9) {
        if (boxObject[3].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
    }

    // Check second row of boxes/regions
    if (row == 'D' || row == 'E' || row == 'F'){
      if (column <= 3) { 
        if (boxObject[4].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
      if (column <= 6) {
        if (boxObject[5].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
      if (column <= 9) {
        if (boxObject[6].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
    }

    // Check third row of boxes/regions
    if (row == 'G' || row == 'H' || row == 'I'){
      if (column <= 3) { 
        if (boxObject[7].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
      if (column <= 6) {
        if (boxObject[8].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
      if (column <= 9) {
        if (boxObject[9].indexOf(value) == -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  solve(puzzleString) {
    let rowsObject = {
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

    let potentialSolutions = {}

      for (let row in rowsObject) {
        for (let i = 1; i < 10; i++) {
          if (rowsObject[row][i - 1] == '.') {
            for (let j = 1; j < 10; j++) {
              let rowChecker = this.checkRowPlacement(puzzleString, row, i, j);
              let columnChecker = this.checkColPlacement(puzzleString, row, i, j);
              let regionChecker = this.checkRegionPlacement(puzzleString, row, i, j);
              if (rowChecker && columnChecker && regionChecker) {
                potentialSolutions[row + i] ? potentialSolutions[row + i].push(j) : potentialSolutions[row + i] = [j];
              }
            }
          }
          // console.log('In ' + row + i + ' the value is ' + rowsObject[row][i - 1])
        }
      }
      console.log(potentialSolutions);
  }
}

module.exports = SudokuSolver;

