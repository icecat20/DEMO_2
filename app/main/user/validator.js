'use strict';
const Joi = require('@hapi/joi');

exports.idParam = Joi.object({
  id: Joi.number().required()
});

exports.createOne = Joi.object({
  name: Joi.string(),
  last_name: Joi.string().required(),
  avatar :Joi.string().required()
});


exports.updateOne = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    avatar :Joi.string().required()
});

