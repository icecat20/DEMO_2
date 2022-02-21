'use strict';
const TABLE_NAME = 'users';
const BaseModel = require('./BaseModel');
class Users extends BaseModel {
    static get tableName()
    {
        return TABLE_NAME;
    }
    
}

module.exports = Users