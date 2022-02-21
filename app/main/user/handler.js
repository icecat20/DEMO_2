'use strict';
const UserController = require('./controller');
const validator = require('./validator');
const controller = new UserController();


exports.getMany = {
  description: 'Get many users',
  notes: 'Return many users',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  // validate: {
  //   query: validator.idParam
  // },
};

exports.getOne = {
  description: 'Get one user',
  notes: 'Return one user',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  validate: {
    params: validator.idParam
  },
};

exports.createOne = {
  description: 'create one user',
  notes: 'Return one user',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  validate: {
    payload: validator.createOne
  },
};

exports.updateOne = {
  description: 'Update one user',
  notes: 'Return one user',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  validate: {
    params : validator.idParam,
    payload: validator.updateOne
  },
};

exports.deleteOne = {
  description: 'delete one User',
  notes: 'Return one dealership config',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  validate: {
    params: validator.idParam
  },
};
