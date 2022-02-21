'use strict';
const CheckinCheckoutController = require('./controller');
const validator = require('./validator');
const controller = new CheckinCheckoutController();


exports.getMany = {
  description: 'Get time check in check out',
  notes: 'Return many users',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  // validate: {
  //   query: validator.idParam
  // },
};

// exports.getManyOne = {
//   description: 'Get list name checking checkout',
//   notes: 'Return list user',
//   tags: ['api', 'v1'],
//   handler: controller.getManyOne.bind(controller),
//   validate: {
//     payload : validator.getManyOne
//   },
// };

exports.createOne = {
  description: 'create list checking checkout',
  notes: 'Return list user',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  validate: {
    payload: validator.createOne
  },
};

// exports.updateOne = {
//   description: 'Update one user',
//   notes: 'Return one user',
//   tags: ['api', 'v1'],
//   handler: controller.updateOne.bind(controller),
//   validate: {
//     params : validator.idParam,
//     payload: validator.updateOne
//   },
// };

exports.deleteOne = {
  description: 'delete checkin checkout',
  notes: 'Return one dealership config',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  validate: {
    params: validator.idParam
  },
};
