const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require("multer");
const upload = multer();


const recipeController = require('./recipeController');

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'client/index.html'))
); //serve index.html


app.post('/ingredients', upload.none(), recipeController.getRecipe, (req, res) => {
  res.status(200).json(res.locals.recipeFound);
});

app.get('/random', upload.none(), recipeController.randomRecipe, (req, res) => {
  res.status(200).json(res.locals.random);
})


app.use((req, res) => res.sendStatus(404));

// Global error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;