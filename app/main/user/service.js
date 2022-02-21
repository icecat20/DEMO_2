'use strict';

const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const Models = require('../../db/models');


class UsersService extends BaseServiceCRUD {
  constructor() {
    super(Models.Users, 'users');
  }
}

module.exports = UsersService;
