const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        assert.equal(solver.solve('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), '568913724342687519197254386685479231219538467734162895926345178473891652851726943');
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
});
