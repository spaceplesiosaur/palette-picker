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
    if(!projectList.length) {
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

app.post('/api/v1/projects', (request, response) => {
  response.send('Pallete Picker is running');
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

app.delete('/api/v1/projects/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

export default app;
