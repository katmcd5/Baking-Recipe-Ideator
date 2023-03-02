const { eventNames } = require('./RecipeModel');
const Recipe = require('./RecipeModel');

const RecipeController = {};

RecipeController.getRecipe = (req, res, next) => {
  const ingredients = req.body.ingredients;

  Recipe.find({ingredients: JSON.parse(ingredients)})
    .then(recipeFound => {
      res.locals.recipeFound = recipeFound,
      next();
    })
    .catch(err => {
      next({log:'error in getRecipe middleware', status: 400, message: {err: 'Error, check log for details.'}});
    });
};

module.exports = RecipeController;