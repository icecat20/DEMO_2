'use strict';

const BaseControllerCRUD = require('../../base/BaseControllerCRUD');
const CheckinCheckoutService = require('./service');

class CheckinCheckoutController extends BaseControllerCRUD {
  constructor() {
    super(new CheckinCheckoutService());
  }
}
module.exports = CheckinCheckoutController;
