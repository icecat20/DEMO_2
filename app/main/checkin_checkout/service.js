'use strict';

const BaseServiceCRUD = require('../../base/BaseServiceCRUD');
const Models = require('../../db/models');


class CheckinCheckoutService extends BaseServiceCRUD {
  constructor() {
    super(Models.CheckinCheckout,'checkin_checkout');
  }

  // async getManyOne(user_id)
  // {
  //   return await this.model.query().select(`user_id = ${user_id}`).table(this.modelName);
  // }
}

module.exports = CheckinCheckoutService;
