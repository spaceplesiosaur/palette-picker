const express = require('express');
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.locals.title = 'Pallete Picker';
app.use(cors());
app.use(express.json());

app.get('/api/v1/palettes', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projectList = await database('projects').select()
    if(!projectList.length) {
      response.status(404).json({error: 'Unable to find that list'})
    }
    response.status(200).json(projectList)
  } catch(error) {
    response.status(500).json({ error })
  }
});

app.get('/api/v1/palettes/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/projects/:id', async (request, response) => {
  try {
    const { id } = request.params
    const chosenProject = await database('projects').where('id', id)
    if(!chosenProject.length) {
      response.status(422).json({error: 'Unable to find that project'})
    }
    response.status(200).json(chosenProject)
  } catch(error) {
    response.status(500).json({ error })
  }
});

app.post('/api/v1/palettes', (request, response) => {
  response.send('Pallete Picker is running');
});

app.post('/api/v1/projects', async (request, response) => {
  const newProject = {name: request.body.name}

  if (typeof newProject.name !== "string") {
    return response
      .status(422)
      .send({error: 'The project name must be a string.'});
  }
  if (!newProject.name) {
    return response
      .status(422)
      .send({error: 'The project must have a name'});
  }
  try {
    const id = await database('projects').insert(newProject, 'id')
    response.status(201).json({ id })
  } catch (error) {
    response.status(500).json({ error });
  }

});

app.patch('/api/v1/palettes/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.patch('/api/v1/projects/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.delete('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params
  const project = await database('projects').where('id', id).select()

  if(!project.length) {
    return response.status(404).json({error: "unable to find that project"})
  }

  try {
    await database('projects').where('id', id).del();
    response.status(204)
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get('/', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

export default app;
