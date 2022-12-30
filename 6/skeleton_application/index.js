const express = require('express')
const bodyParser = require("body-parser"); // mount express module
const port = 8000;

const userRoutes = require('./routes/users.js'); // link user.js file to make visible here

const app = express(); // create express object

app.use(bodyParser.json()); // set application to use json

app.use('/users', userRoutes)

app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//     res.render('index', {
//         Title: 'Galeria',
//         Body: 'Zdjęcia'
//     })
// })
//
// app.get('/users', (req,res) => {
//     res.send('Hello users');
// })
//
// app.get('/comments', (req, res) => {
//     res.send('Comments')
// })

app.listen(port);