'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const UsersService = require('./service');

class UsersController extends BaseControllerCRUD {
  constructor() {
    super(new UsersService());
  }
}
module.exports = UsersController;
