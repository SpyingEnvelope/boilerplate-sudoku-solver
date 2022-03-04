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
                assert.equal(res.body['error'], 'expected puzzle to be 81 characters long');
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
});

