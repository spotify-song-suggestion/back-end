const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').select('id', 'username', 'password').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user,'id');

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function remove(username) {
    return db('users')
        .where({username})
        .del();
}

function update(changes, username) {
  return db('users').where({ username }).update(changes);
}