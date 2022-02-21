
exports.up = function(knex) {
    return knex.schema.createTable('users',(table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('last_name');
        table.string('avatar');
    })
};
exports.down = function(knex) {
 return knex.schema.raw('DROP TABLE users CASCADE');
};
