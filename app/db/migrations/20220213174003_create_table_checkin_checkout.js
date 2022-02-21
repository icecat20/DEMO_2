
exports.up = function(knex) {
    return knex.schema.createTable('checkin_checkout',(table) => {
        table.timestamp('checkin');
        table.timestamp('checkout');
        table.integer('user_id').references('users.id');
      
    })
};


exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE checkin_checkout CASCADE');
};
