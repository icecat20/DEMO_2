'use strict';
const Joi = require('@hapi/joi');

exports.idParam = Joi.object({
    id: Joi.number().required(),
});

exports.createOne = Joi.object({
    user_id : Joi.number().required(),
    checkin : Joi.date(),
    checkout : Joi.date()
});
exports.getManyOne = Joi.object({
    user_id : Joi.number().required(),
});
  
