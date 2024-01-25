const express = require('express');


const PORT = 3334;

const app = express();


// db.query('INSERT INTO users (username, email, password) VALUES ("jd", "jd@test.com", "password123")', (err, results) => {
//   if (err) return console.log(err);

//   console.log(results);
// });

// db.query('SELECT * FROM users', (err, results) => {
//   if (err) return console.log(err);

//   console.log(results);
// });

const api_routes = require('./routes/api_routes');

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Share or create a GET route for every file in the public folder
app.use(express.static('./public'));

// Load Routes
app.use('/api', api_routes);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});










// // GET route - Listing for the client to visit localhost:3333/test
// app.get('/test', (requestObj, responseObj) => {
//   responseObj.send('Hi from server!');
// });

// app.get('/', (requestObj, responseObj) => {
//     responseObj.send('root visited');
// });

// app.get('/api/recipe', (requestObj, responseObj) => {
//   responseObj.send({
//     name: 'Mac & Chesse',
//     ingredients: ['chesse', 'pasta', 'heavy cream']
//   });
// });

// app.get('/page', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './index.html'));
// });

// app.listen(PORT, () => {
//     console.log('serve started on port', PORT);
// });