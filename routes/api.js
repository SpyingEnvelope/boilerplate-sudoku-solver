'use strict';

const { send } = require('express/lib/response');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log(req.body);

      let resObject = {
        'valid': true
      };

      let rowConflict = solver.checkRowPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);
      let colConflict = solver.checkColPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);
      let boxConflict = solver.checkRegionPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);

      if (!rowConflict || !colConflict || !boxConflict) {
        resObject['valid'] = false
        if (!rowConflict) { resObject['conflict'] = ['row']}
        if (!colConflict) { resObject['conflict'] ? resObject['conflict'].push('column') : resObject['conflict'] = ['column']}
        if (!boxConflict) { resObject['conflict'] ? resObject['conflict'].push('region') : resObject['conflict'] = ['region'] }
        res.json(resObject);
      } else {
        res.json(resObject);
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (solver.validate(req.body.puzzle)) {
        solver.solve(req.body.puzzle);
        res.json({'solution': req.body.puzzle});
      } else if (!solver.validate(req.body.puzzle)) {
        res.json({'error': 'expected puzzle to be 81 characters long'})
      }

    });
};
