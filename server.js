const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pallete Picker';

app.get('/', (request, response) => {
  response.send('Pallete Picker is running');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
