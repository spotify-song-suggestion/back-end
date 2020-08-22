exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', user => {
        user.increments();
        user.text('username', 255).unique().notNullable();
        user.text('password', 255).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
