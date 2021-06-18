const request = require('supertest');
const { app } = require("./app")

function done(err, res) {
    if (err) throw err;
}

request(app)
    .get('/page/0')
    .expect(403)
    .end(done)

request(app)
    .get('/page/2')
    .expect(200)
    .end(done)