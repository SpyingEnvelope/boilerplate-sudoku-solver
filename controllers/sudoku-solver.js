const e = require("cors");
const res = require("express/lib/response");

class SudokuSolver {

  validate(puzzleString) {

    if (!puzzleString) {
      return false;
    }

    const validateRegex = /[1-9|\.]/;

    for (let i = 0; i < puzzleString.length; i++) {
      if (validateRegex.test(puzzleString[i])) { continue; }
      if (!validateRegex.test(puzzleString[i])) { return 'invalid'; }
    };

    if (puzzleString.length == 81) {
      return true;
    } else {
      return false
    }
  }

  checkSameLocation(puzzleString, row, column, value) {

    let parsedColumn = parseInt(column) - 1;
    console.log(parsedColumn)
    
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

      let matchCounter = 0;

      if (rowObject[row][parsedColumn] != value && rowObject[row][parsedColumn] != '.') {
        return 'num exists already';
      }
  
      if (rowObject[row][parsedColumn] == value) {
        for (let i = 0; i < 9; i++) {
          if (rowObject[row][i] == value) {
            matchCounter = matchCounter + 1;
          }
        }

      for (let key in rowObject) {
        if (rowObject[key][parsedColumn] == value) {
          matchCounter = matchCounter + 1;
        }
      }

      const rowGroups = {
        1: ['A', 'B', 'C'],
        2: ['D', 'E', 'F'],
        3: ['G', 'H', 'I']
      }

      if (parsedColumn < 3) {
        for (let key in rowGroups) {
          if (rowGroups[key].indexOf(row) != -1) {
            if (rowObject[rowGroups[key][0]][0] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][0]][1] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][0]][2] == value) {
              matchCounter = matchCounter + 1;
            }
            if (rowObject[rowGroups[key][1]][0] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][1] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][2] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][0] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][1] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][2] == value) {
              matchCounter++;
            }
          }
        }
      }

      else if (parsedColumn < 6) {
        for (let key in rowGroups) {
          if (rowGroups[key].indexOf(row) != -1) {
            if (rowObject[rowGroups[key][0]][3] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][0]][4] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][0]][5] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][3] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][4] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][5] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][3] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][4] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][5] == value) {
              matchCounter++;
            }
          }
        }
      }

      else if (parsedColumn < 9) {
        for (let key in rowGroups) {
          if (rowGroups[key].indexOf(row) != -1) {
            if (rowObject[rowGroups[key][0]][6] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][0]][7] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][0]][8] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][6] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][7] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][1]][8] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][6] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][7] == value) {
              matchCounter++;
            }
            if (rowObject[rowGroups[key][2]][8] == value) {
              matchCounter++;
            }
          }
        }
      }

      console.log(matchCounter);
      
        if (matchCounter == 3) {
          return true;
        } else {
          return false;
        }
      };
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

      let solutionObject = {
        'A': puzzleString.substr(0, 9).split(""), 
        'B': puzzleString.substr(9, 9).split(""), 
        'C': puzzleString.substr(18, 9).split(""), 
        'D': puzzleString.substr(27, 9).split(""),
        'E': puzzleString.substr(36, 9).split(""),
        'F': puzzleString.substr(45, 9).split(""),
        'G': puzzleString.substr(54, 9).split(""),
        'H': puzzleString.substr(63, 9).split(""),
        'I': puzzleString.substr(72, 9).split("")
        };

      
      console.log(solutionObject);

      let emptySpaces = [];

      for (let key in solutionObject) {
        for (let i = 0; i < 9; i++) {
          if (solutionObject[key][i] == '.') {
            emptySpaces.push(key + i);
          }
        }
      }

      console.log(emptySpaces);

      const generateSolution = (emptyCell, i) => {

        let row = emptyCell[0];
        let column = parseInt(emptyCell[1]) + 1;

        // if the last value was nine, move back another empty space
        if (i == 10) {
          console.log('I am at i == 10')
          let index = emptySpaces.indexOf(emptyCell);
          let currentValue = solutionObject[emptySpaces[index - 1][0]][emptySpaces[index - 1][1]];
          console.log(currentValue);
          solutionObject[emptySpaces[index - 1][0]][emptySpaces[index - 1][1]] = '.';
          return generateSolution(emptySpaces[index - 1], currentValue + 1);
        }

        for (i; i < 10; i++) {
          // Generate new puzzle string
          let newPuzzle = [];
          for (let key in solutionObject) {
            let joinedArr = solutionObject[key].join("");
            newPuzzle.push(joinedArr);
          }
          newPuzzle = newPuzzle.join("");
          console.log('I am under new puzzle ' + newPuzzle);
          console.log('this is the row ' + row);
          console.log('this is the column ' + column)
          console.log('this is the empty cell ' + emptyCell);
          console.log('this is the index of empty cell ' + emptySpaces.indexOf(emptyCell))
          console.log('this is the i value ' + i);

          // validate which i passes all constraints
          let rowChecker = this.checkRowPlacement(newPuzzle, row, column, i);
          let columnChecker = this.checkColPlacement(newPuzzle, row, column, i);
          let regionChecker = this.checkRegionPlacement(newPuzzle, row, column, i);

          // if it passes all constraints and it is the last empty cell, generate the solution after filling it in
          if (rowChecker && columnChecker && regionChecker && emptySpaces.indexOf(emptyCell) == emptySpaces.length - 1) {
            console.log('I am at the last if constraint pass')
            solutionObject[row][column - 1] = i;
            let solution = [];
            for (let key in solutionObject) {
              let joinedArr = solutionObject[key].join("");
              solution.push(joinedArr);
            }
            solution = solution.join("");
            console.log('I finished the puzzle ' + solution);
            return solution;
          }

          //if it passes all constraints and it is not the last empty cell, move onto the next iteration after filling in
          if (rowChecker && columnChecker && regionChecker) {
            console.log('I am at the if if all constraints pass');
            // Place the potential solution
            solutionObject[row][column - 1] = i;
            let emptyIndex = emptySpaces.indexOf(emptyCell);
            return generateSolution(emptySpaces[emptyIndex + 1], 1);
          }


          //If all constraints fail for all numbers and the algorithm is at the first index return unsolved for puzzle cannot be solved
          if (emptySpaces.indexOf(emptyCell) == 0 && i == 9) {
            return 'unsolved';
          }

          //if none of the numbers 1-9 pass constraints, move back an empty space, increase its i value by one, and run the function again
          if (i == 9) {
            console.log('I am at the if if all constraints fail and i == 9')
            let index = emptySpaces.indexOf(emptyCell);
            let currentValue = solutionObject[emptySpaces[index - 1][0]][emptySpaces[index - 1][1]];
            console.log(currentValue);
            solutionObject[emptySpaces[index - 1][0]][emptySpaces[index - 1][1]] = '.';
            return generateSolution(emptySpaces[index - 1], currentValue + 1);
          }
        }

      }

      let solution = generateSolution(emptySpaces[0], 1);
      return solution;
  }
}

module.exports = SudokuSolver;

