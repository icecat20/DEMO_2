const knex = require('../connection');
const config = require('./config');
const Users  = require('./users');
const CheckinCheckout = require('./checkinCheckout');

module.exports ={
    knex,
    config,
    Users,
    CheckinCheckout,
}