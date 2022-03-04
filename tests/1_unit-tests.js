const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), true);
        assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), true);
        assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), true);
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72.wz+'), 'invalid');
        assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4...../.?.......|..89s6..be.3w.wz+'), 'invalid');
    })

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...'), false);
        assert.equal(solver.validate('5..91372.3...8.5.9.9.25..8.68.4'), false);
        assert.equal(solver.validate(), false);
    })

    test('Logic handles a valid row placement', () => {
        assert.equal(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72....', 'A', '2', '6'), true);
        assert.equal(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72....', 'A', '3', '6'), true);
        assert.equal(solver.checkRowPlacement('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72....', 'I', '6', '4'), true);
    })

    test('Logic handles an invalid row placement', () => {
        assert.equal(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '2', '5'), false);
        assert.equal(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'D', '3', '6'), false);
        assert.equal(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'E', '1', '9'), false);
    })

    test('Logic handles a valid column placement', () => {
        assert.equal(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '2'), true);
        assert.equal(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'G', '3', '1'), true);
        assert.equal(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'E', '5', '29'), true);
    })

    test('Logic handles an invalid column placement', () => {
        assert.equal(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '2', '5'), false);
        assert.equal(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'F', '3', '2'), false);
        assert.equal(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'G', '5', '6'), false);
    })

    test('Logic handles a valid region (3x3 grid) placement', () => {
        assert.equal(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '1'), true);
        assert.equal(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'F', '6', '2'), true);
        assert.equal(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'G', '4', '9'), true);
    })

    test('Logic handles an invalid region (3x3 grid) placement', () => {
        assert.equal(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', '1', '2'), false);
        assert.equal(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'F', '7', '6'), false);
        assert.equal(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'I', '7', '9'), false);
    })
});
