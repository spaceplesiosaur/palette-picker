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


  describe('GET /api/v1/palettes', () => {
      it('should return a 200 and all of the palletes', async () => {
        const expectedPalettes = await database('palettes').select();
        const cleanedPalettes = JSON.parse(JSON.stringify(expectedPalettes))
        const response = await request(app).get('/api/v1/palettes');
        const palletes = response.body;

        expect(response.status).toBe(200);
        expect(palletes).toEqual(cleanedPalettes);
      })

  });

  describe('GET /api/v1/projects', () => {
      it('should return a 200 and all of the projects', async () => {
        const expectedProjects = await database('projects').select();

        const response = await request(app).get('/api/v1/projects');
        const projects = response.body;

        expect(response.status).toBe(200);
        expect(projects).toEqual(expectedProjects);

      })
  });

  describe('GET api/v1/projects/:id', () => {
    it('should return a 200 status and a single project if the project exists', async () => {

    })
  }); 

  describe('GET api/v1/palettes/:id', () => {
    it('should return a 200 status and a single palette', async () => { 
    const palette = await database('palettes').first()
    const { id } = palette;
    const onePalette = JSON.parse(JSON.stringify(palette))
    const response = await request(app).get(`/api/v1/palettes/${id}`)
    const result = response.body[0]

    expect(response.status).toBe(200)
    expect(result).toEqual(onePalette)
    })
  }); 

  it('should return a 404 and the message "Pallete not found"', async () => {
    const invalidId = -555;
  
    const response = await request(app).get(`/api/v1/palettes/${invalidId}`)
   
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual('Pallete not found');
  });
 
});
