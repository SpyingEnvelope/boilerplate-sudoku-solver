'use strict';

const express = require('express');
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

      let samePlacement = solver.checkSameLocation(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);
      let rowConflict = solver.checkRowPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);
      let colConflict = solver.checkColPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);
      let boxConflict = solver.checkRegionPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value);

      if (samePlacement) { 
        res.json(resObject)
      } else if (!rowConflict || !colConflict || !boxConflict) {
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
      if(!req.body.puzzle) {
        res.json({'error': 'Required field missing'})
      } else if (solver.validate(req.body.puzzle) == 'invalid'){
        res.json({'error': 'Invalid characters in puzzle'})
      } else if (!solver.validate(req.body.puzzle)) {
        res.json({'error': 'expected puzzle to be 81 characters long'})
      } else if (solver.validate(req.body.puzzle)) {
        let solution = solver.solve(req.body.puzzle);
        if (solution == 'unsolved') { res.json({'error': 'Puzzle cannot be solved'})}
        else res.json({'solution': solution});
      }

    });
};
