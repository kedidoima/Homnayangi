const express = require('express');
const route = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const recipecontroller = require('../controller/RecipeController');

route.get('', authMiddleware.requireAuth, recipecontroller.getRecipes);
route.get('/ingredient', recipecontroller.getIngredients);
route.get('/suggestion', recipecontroller.getRecipeSuggestion);
route.get('/:id', recipecontroller.getRecipeById);


module.exports = route;