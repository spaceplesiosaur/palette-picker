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

app.get('/api/v1/palettes/:id', async (request, response) => {
  try {
    const pallete = await database('palletes').where('id', request.params.id);
    pallete.length ? response.status(200).send(pallete) : response.status(404).send({ error:'Pallete not found'});
  } catch(error) {
    response.status(500).send({ error })
  }
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
