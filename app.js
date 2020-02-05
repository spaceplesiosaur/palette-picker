const express = require('express');
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.locals.title = 'Pallete Picker';
app.use(cors());
app.use(express.json());

app.get('/api/v1/palettes', async (request, response) => {
  try {
    const palletes = await database('palletes').select();
    response.status(200).send(palletes)
  } catch(error) {
    response.status(500).send({ error })
  }
});

app.get('/api/v1/projects', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/palettes/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/projects:id', (request, response) => {
  response.send('Pallete Picker is running');
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
  response.status(404).send('Pallete Not Found');
});

export default app;
