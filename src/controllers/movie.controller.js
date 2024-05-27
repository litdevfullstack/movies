const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const updateDirectors = catchError(async (req, res) => {
    const { id } = req.params;
    const directorIds = req.body;

    const movie = await Movie.findByPk(id);
    if (!movie) return res.sendStatus(404);

    const directors = await Director.findAll({
        where: {
            id: directorIds
        }
    });

    await movie.setDirectors(directors);

    const updatedMovie = await Movie.findByPk(id, {
        include: Director
    });

    return res.json(updatedMovie);
});

const updateActors = catchError(async (req, res) => {
    const { id } = req.params;
    const actorIds = req.body;

    const movie = await Movie.findByPk(id);
    if (!movie) return res.sendStatus(404);

    const actors = await Actor.findAll({
        where: {
            id: actorIds
        }
    });

    await movie.setActors(actors);

    const updatedMovie = await Movie.findByPk(id, {
        include: Actor
    });

    return res.json(updatedMovie);
});

const updateGenres = catchError(async (req, res) => {
    const { id } = req.params;
    const genreIds = req.body;

    const movie = await Movie.findByPk(id);
    if (!movie) return res.sendStatus(404);

    const genres = await Genre.findAll({
        where: {
            id: genreIds
        }
    });

    await movie.setGenres(genres);

    const updatedMovie = await Movie.findByPk(id, {
        include: Genre
    });

    return res.json(updatedMovie);
});

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({
        include: Genre, Actor, Director
         });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    updateGenres,
    updateActors,
    updateDirectors
}