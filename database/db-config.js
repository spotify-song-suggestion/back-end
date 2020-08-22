const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.envDB_ENV || 'development';

module.exports = knex(knexConfig[environment]);