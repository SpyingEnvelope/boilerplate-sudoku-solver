'use strict';

const { send } = require('express/lib/response');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log(req.body.puzzle);
      if (solver.validate(req.body.puzzle)) {
        res.json({'solution': req.body.puzzle});
      } else if (!solver.validate(req.body.puzzle)) {
        res.json({'error': 'expected puzzle to be 81 characters long'})
      }

    });
};
