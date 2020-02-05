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
    const palletes = await database('palettes').select();
    response.status(200).send(palletes)
  } catch(error) {
    response.status(500).send({ error })
  }
});

app.get('/api/v1/projects', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/palettes/:id', async (request, response) => {
  try {
    const pallete = await database('palletes').where('id', request.params.id);
    pallete.length ? response.status(200).send(pallete) : response.status(404).send({ error:'Pallete not found'});
  } catch(error) {
    response.status(500).send({ error })
  }
});

app.get('/api/v1/projects:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.post('/api/v1/palettes', async (request, response) => {
  const pallete = request.body;
  for(let palleteInfo of ['name', 'color1', 'color2', 'color3', 'color4', 'color5']) {
    !pallete.hasOwnProperty(palleteInfo) ? response.status(422).send({ error: `Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>}. You're missing a "${palleteInfo}" property.` }) : '';
  }

  try {
    const id = await database('students').insert(pallete, 'id');
    response.status(201).json({ id });
  } catch(error){
    response.status(500).json({ error })
  }
});

app.post('/api/v1/projects', (request, response) => {
  response.send('Pallete Picker is running');
});

app.patch('/api/v1/palettes/:id', async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    const pallete = await database('palletes').find((pallete) => pallete.id == id);
    pallete.name = name;
    !pallete.name ? response.sendStatus(404) : response.status(200).json(pallete);
  } catch(error) {
    response.status(500).json({ error });
  }
});

app.patch('/api/v1/projects/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.delete('/api/v1/palettes/:id', async (request, response) => {
  try {
    const pallete = await database('palletes').where('id', request.params.id).del();
    pallete.length ? response.status(404).json({error: `Could not find pallete with id ${request.params.id}`}) : response.status(200).json(pallete);
    } catch(error) {
    response.status(500).json({ error });
  }
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
