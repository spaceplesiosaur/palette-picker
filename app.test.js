import "@babel/polyfill";

import request from 'supertest'
import app from './app.js'

const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);



describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run();
  })

  describe('init', () => {
    it('should return a 200 status', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });
  });


  describe('GET /api/v1/palettes', () => {
      it('should return a 200 and all of the palletes', async () => {
        const expectedPalettes = await database('palettes').select();
        const cleanedPalettes = JSON.parse(JSON.stringify(expectedPalettes));
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
      const { id } = expectedProject
      expect(expectedProject.current).toEqual(true)

      const newStatus = {current: false}
      const response = await request(app).patch(`/api/v1/projects/${id}`).send(newStatus)
      expectedProject = await database('projects').first()

      expect(response.status).toBe(200);
      expect(expectedProject.current).toBe(false)
    })

    it('should return a 404 when a requested projects ID does not exist', async () => {
      const newStatus = {current: false}
      const wrongId = -4;
      const response = await request(app).patch(`/api/v1/projects/${wrongId}`).send(newStatus);
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Unable to find that project');
    })
  });


  describe('DELETE /api/v1/projects/:id', () => {
    it('should delete project with id', async () => {

        const projects1 = await database('projects').select();
        const projectsLength1 = projects1.length
        const project = await database('projects').first();
        console.log(project);
        const id = project.id;
        const response = await request(app).delete(`/api/v1/projects/${id}`);

        expect(response.status).toBe(204);

        const projects2 = await database('projects').select();
        const projectsLength2 = projects2.length


        expect(projectsLength2).toEqual(projectsLength1 - 1)
    });

    it('should return a 404 when a requested projects ID does not exist', async () => {
      const wrongId = -5;

      const response = await request(app).get(`/api/v1/projects/${wrongId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Unable to find that project');
    });
 });

  describe('GET api/v1/palettes/:id', () => {
    it('should return a 200 status and a single palette', async () => {
        const palette = await database('palettes').first();
        const { id } = palette;
        const onePalette = JSON.parse(JSON.stringify(palette));
        const response = await request(app).get(`/api/v1/palettes/${id}`);
        const result = response.body[0];

        expect(response.status).toBe(200);
        expect(result).toEqual(onePalette);
    })

    it('should return a 404 and the message "Pallete not found"', async () => {
      const invalidId = -555;
      const response = await request(app).get(`/api/v1/palettes/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Pallete not found');
    });
  });

  describe('POST /api/v1/palettes', () => {
      it('should post a new palette to the db', async () => {
        const projectForID = await database('projects').first()
        const projectID = projectForID.id

        const newPalette = { project_id: projectID, name: 'Luna Llena', color1 : '#F7EDB7', color2: '#00A8CF', color3: '#B3C0F7', color4: '#DFE9FD', color5: '#DFE9FD'};
        const response = await request(app).post('/api/v1/palettes').send(newPalette);

        const palettes = await database('palettes').where('id', response.body.id[0]);
        const palette = palettes[0];

        expect(response.status).toBe(201);
        expect(palette.name).toEqual(newPalette.name);
      });
  });

  describe('PATCH /api/v1/palettes/:id', () => {
    it('should patch a palette to update info', async () => {
          const mockName = { name: 'Mar de Flores'};
          const palette = await database('palettes').first();
          const id = palette.id;
          const thePalette1 = await database('palettes').where('id', id);
          expect(palette.name).toEqual(thePalette1[0].name);


          const response = await request(app).patch(`/api/v1/palettes/${id}`).send(mockName);
          const thePalette2 = await database('palettes').where('id', id);

          expect(response.status).toBe(200);
          expect(thePalette2[0].name).toEqual(mockName.name);
    })
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should delete palette with id', async () => {
        const palette = await database('palettes').first();
        const id = palette.id;
        const response = await request(app).delete(`/api/v1/palettes/${id}`);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(1);
    })
  });
});
