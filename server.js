const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pallete Picker';

app.get('/api/v1/chosen_ones', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/all_colors', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/chosen_ones/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/api/v1/all_colors:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.post('/api/v1/all_colors', (request, response) => {
  response.send('Pallete Picker is running');
});

app.post('/api/v1/chosen_ones', (request, response) => {
  response.send('Pallete Picker is running');
});

app.patch('/api/v1/all_colors/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.patch('/api/v1/chosen_ones/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.delete('/api/v1/all_colors/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.delete('/api/v1/chosen_ones/:id', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('/', (request, response) => {
  response.send('Pallete Picker is running');
});

app.get('*', (request, response) => {
  response.status(404).send('Pallete Not Found');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
