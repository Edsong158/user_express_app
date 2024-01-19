const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const PORT = 3334;

const app = express();

async function getUserData() {
  const users = await fs.promises.readFile('./data.json', 'utf8');

  return JSON.parse(users);
}

async function saveUserData(usersArr) {
  await fs.promises.writeFile('./data.json', JSON.stringify(usersArr, null, 2));

  console.log('User Data Updated');
}

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Share or created a GET route for every file in the public folder
app.use(express.static('./public'));

// open CORS to all domains
app.use(cors());

// // root route

// app.get('/', (requestObj,responseObj) => {
// responseObj.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/css/style.css', (requestObj,responseObj) => {
//   responseObj.sendFile(path.join(__dirname, './public/css/style.css'))
// });

// Route to retreive/GET all users from the json database
app.get('/api/users', async (requestObj, responseObj) => {
  // Read the json file data
  const users = await getUserData();

  responseObj.send(users);
});

// Route to add a user to the json database
app.post('/api/users', async (requestObj, responseObj) => {
  // Get the old users array
  const users = await getUserData();

  // Push the body object from the client to our old array
  users.push(requestObj.body);

  // Overwrite the old array with the newly updated array
  await saveUserData(users);

  // Respond back to the client
  responseObj.send({
    message: 'User added successfully!'
  })
});

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