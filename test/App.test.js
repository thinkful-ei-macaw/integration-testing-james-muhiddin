const supertest = require('supertest');

const app = require('../App');

const { expect } = require('chai');

describe('GET /apps endpoint', () => {
  it('should return 200 and JSON array of Apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });

  it('should return 400 if sort does not include `rating` or `app`', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'not valid'})
      .expect(400);
  });

  it.only('should return 400 if sort does not include `Action`, `Puzzle`, `Strategy`, `Casual`, or `Card`', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'not valid'})
      .expect(400);
  });

  it('should sort by rating', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        let sorted = true;

        let i = 0;

        while (i < res.body.length - 1) {
          const gamesAtI = res.body[i];
          const gamesAtIPlusI = res.body[i + 1];

          if (gamesAtIPlusI.rating < gamesAtI.rating) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should sort by app', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        let sorted = true;

        let i = 0;

        while (i < res.body.length - 1) {
          const gamesAtI = res.body[i];
          const gamesAtIPlusI = res.body[i + 1];

          if (gamesAtIPlusI.app < gamesAtI.app) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

});