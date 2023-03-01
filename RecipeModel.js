const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://katmcd5:recipe@recipes.cocevbc.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'Recipes',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name : {type: String, required: true},
  ingredients: {type: Array, required: true},
  link: {type: String, required: true}
});

const Recipe = mongoose.model('SoloProj', recipeSchema, 'SoloProj')
module.exports = Recipe;