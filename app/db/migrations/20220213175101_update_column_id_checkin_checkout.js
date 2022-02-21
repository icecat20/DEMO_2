
exports.up = function(knex) {
    return knex.schema.table('checkin_checkout',(table) => {
        table.increments('id').primary();
    })
};


exports.down = function(knex) {
  
};
