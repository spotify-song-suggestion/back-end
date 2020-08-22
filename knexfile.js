require('dotenv').config();
const pg = require("pg");
pg.defaults.ssl = true;
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/database.db3'
    },
    useNullAsDefault: true,
    
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
     
    },
   
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

};
