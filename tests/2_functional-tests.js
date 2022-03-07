const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    //test #1
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                'puzzle': '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['solution'], '568913724342687519197254386685479231219538467734162895926345178473891652851726943');
                done();
            })
    })

    //test #2
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
        chai
            .request(server)
            .post('/api/solve')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Required field missing');
                done();
            })
    })

    //test #3
    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                'puzzle': '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.w.+/*.4..8916..85.72...3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Invalid characters in puzzle');
                done();
            })
    })

    //test #4
    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                'puzzle': '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.....4..8916..85.72...3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Expected puzzle to be 81 characters long');
                done();
            })
    })

    //test #5
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                'puzzle': '55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Puzzle cannot be solved');
                done();
            })
    })

    //test #6
    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'A2',
                'value': '6'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['valid'], true);
                done();
            })
    })

    //test #7
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'A2',
                'value': '1'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['valid'], false);
                assert.equal(res.body['conflict'][0], 'row');
                done();
            })
    })

    //test #8
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'B2',
                'value': '4'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['valid'], false);
                assert.equal(res.body['conflict'][0], 'row');
                assert.equal(res.body['conflict'][1], 'column');
                done();
            })
    })

    //test #9
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'A2',
                'value': '5'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['valid'], false);
                assert.equal(res.body['conflict'][0], 'row');
                assert.equal(res.body['conflict'][1], 'column');
                assert.equal(res.body['conflict'][2], 'region');
                done();
            })
    })

    //test #10
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'value': '5'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Required field(s) missing');
                done();
            })
    })

    //test #11
    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432w.+...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'I2',
                'value': '5'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Invalid characters in puzzle');
                done();
            })
    })

    //test #12 'Check a puzzle placement with incorrect length: POST request to /api/check'
    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6',
                'coordinate': 'I2',
                'value': '5'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Expected puzzle to be 81 characters long');
                done();
            })
    })


    //test #13
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'K2',
                'value': '5'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Invalid coordinate');
                done();
            })
    })

    //test #14
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
        chai
            .request(server)
            .post('/api/check')
            .send({
                'puzzle': '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                'coordinate': 'A2',
                'value': '11'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body['error'], 'Invalid value');
                done();
            })
    })
});

