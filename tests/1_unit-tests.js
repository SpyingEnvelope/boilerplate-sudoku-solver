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

    test('Valid puzzle strings pass the solver', () => {
        assert.equal(solver.solve('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), '568913724342687519197254386685479231219538467734162895926345178473891652851726943');
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        assert.equal(solver.solve('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'), '218396745753284196496157832531672984649831257827549613962415378185763429374928561');
        assert.equal(solver.solve('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'), '473891265851726394926345817568913472342687951197254638734162589685479123219538746');
    })

    test('Invalid puzzle strings fail the solver', () => {
        assert.equal(solver.solve('55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), 'unsolved');
        assert.equal(solver.solve('51.91372.33...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), 'unsolved');
        assert.equal(solver.solve('51.91372.33...8.5.9.9.25..8.68.47.23333999..46.7.4.....5.2.......4..8916..85.72...3'), 'unsolved');
        assert.equal(solver.solve('51.91372.33...8.5.9.9.25..8.68.47.23333999..46.7.4.....5.22222222444891666855722223'), 'unsolved');
    })
});
