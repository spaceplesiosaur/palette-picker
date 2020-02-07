import "@babel/polyfill";
import request from 'supertest'
import app from './app.js'

const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


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
      });

  });

  describe('GET /api/v1/projects', () => {
      it('should return a 200 and all of the projects', async () => {
        const expectedProjects = await database('projects').select();

        const response = await request(app).get('/api/v1/projects');
        const projects = response.body;

        expect(response.status).toBe(200);
        expect(projects).toEqual(expectedProjects);

      });
  });

  describe('GET api/v1/projects/:id', () => {
    it('should return a 200 status and a single project if the project exists', async () => {
      const expectedProject = await database('projects').first()
      const { id } = expectedProject

      const response = await request(app).get(`/api/v1/projects/${id}`)
      const result =  response.body[0]

      expect(response.status).toBe(200)
      expect(result).toEqual(expectedProject)
    });

    it('should return a 404 when a requested projects ID does not exist', async () => {
      const wrongId = -3;

      const response = await request(app).get(`/api/v1/projects/${wrongId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Unable to find that project');
    })
  });

  describe('POST /api/v1/projects', () => {
    it('should post a new project and return a status code of 201', async () => {
      const fakeProject = {name: 'Garage'};

      const res = await request(app).post('/api/v1/projects').send(fakeProject);

      const projectList = await database('projects').where('id', res.body.id[0]);

      const oneProject = projectList[0];

      expect(res.status).toBe(201);
      expect(oneProject.name).toEqual(fakeProject.name);

    });

    it('should return a 422 if the body is something other than a string', async () => {
      const wrongProject = {name: 1};

      const response = await request(app).post('/api/v1/projects').send(wrongProject);

      expect(response.status).toBe(422);

    });
  });

  describe('PATCH /api/v1/projects/:id', () => {
    it('should change the status of current and return a status code of 200', async () => {

      let expectedProject = await database('projects').first()
      console.log('expected Pro', expectedProject)
      const { id } = expectedProject
      expect(expectedProject.current).toEqual(true)

      const newStatus = {current: false}
      const response = await request(app).patch(`/api/v1/projects/${id}`).send(newStatus)
      expectedProject = await database('projects').first()

      expect(response.status).toBe(200);
      expect(expectedProject.current).toBe(false)
    })
  })



});
