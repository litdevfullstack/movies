const actorsRouter = require('./actor.router');
const moviesRouter = require('./movie.router');
const genredRouter = require('./genre.router');    
const express = require('express');
const router = express.Router();

// colocar las rutas aquí

router.use(actorsRouter);
router.use(moviesRouter);
router.use(genredRouter);


module.exports = router;