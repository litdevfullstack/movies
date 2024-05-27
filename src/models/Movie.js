const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

Movie.belongsToMany(Actor, { through: 'MovieActor' });
Actor.belongsToMany(Movie, { through: 'MovieActor' });
Movie.belongsToMany(Director, { through: 'MovieDirector' });
Director.belongsToMany(Movie, { through: 'MovieDirector' });
Movie.belongsToMany(Genre, { through: 'MovieGenre' });
Genre.belongsToMany(Movie, { through: 'MovieGenre' });
Movie.hasMany(Actor, { foreignKey: 'ActorId' });

module.exports = Movie;