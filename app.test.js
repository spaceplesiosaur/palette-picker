// import "@babel/polyfill";
// import request from 'supertest'
// import app from './app.js'
//
// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);
//
// describe('Server', () => {
//
//   beforeEach(async () => {
//     await database.seed.run();
//   });
//
//   describe('init', () => {
//     it('should return a 200 status', async () => {
//       const res = await request(app).get('/');
//       expect(res.status).toBe(200);
//     });
//   });

import "@babel/polyfill"
import request from 'supertest'
import app from './app.js'

const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server endpoints', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe('init', () => {
    it('should return a 200 status', async () => {
      const result = await request(app).get('/');
      expect(result.status).toBe(200)
    })
  });
});
