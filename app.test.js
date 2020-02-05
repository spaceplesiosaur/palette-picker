import "@babel/polyfill";
import request from 'supertest'
import app from './app'

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run()
  })
 
  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    });
  });
});

describe('GET /api/v1/palettes', () => {
    it('should return a 200 and all of the palletes', async () => {
      const expectedPalettes = await database('palettes').select();

      const response = await request(app).get('/api/v1/palettes');
      const palletes = response.body;
  
      expect(response.status).toBe(200);
      expect(palletes).toEqual(expectedPalettes);
      
    })

});
