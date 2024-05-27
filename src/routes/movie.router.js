const { getAll, create, getOne, remove, update, updateGenres, updateDirectors, updateActors} = require('../controllers/movie.controller');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route('/movies')
    .get(getAll)
    .post(create);

moviesRouter.route('/movie/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

moviesRouter.route('/movie/:id/genres')
    .post(updateGenres)

moviesRouter.route('/movie/:id/actors')
    .post(updateActors)

moviesRouter.route('/movie/:id/directors')
    .post(updateDirectors)

module.exports = moviesRouter;