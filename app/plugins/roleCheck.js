'use strict';
const Boom = require('@hapi/boom');
const _ = require('lodash');
const Models = require('../db/models');
const { USER_TYPE } = require('../constants');

const addDealerId = function () {
  const addDealerIdFunc = async (request, h) => {
    //Check isDisabled
    const { headers } = request;
    const { origin } = headers;
    const dealershipDomain = headers['dealership-domain'];
    console.log(dealershipDomain);
    if (!dealershipDomain) {
      return Boom.conflict('Please add dealership  domain');
    }
    let dealershipConfig = await Models.DealershipConfig.query().findOne({
      domain: dealershipDomain,
    });
    if (!dealershipConfig) {
      if (origin) {
        const originSplit = origin.split('//');
        if (originSplit[1]) {
          dealershipConfig = await Models.DealershipConfig.query().findOne({
            domain: originSplit[1],
          });
        }
      }
    }
    if (!dealershipConfig) {
      return Boom.conflict(`Cannot found ${dealershipDomain}`);
    }
    request.dealer_id = dealershipConfig.dealer_id;
    return h.continue;
  };
  return addDealerIdFunc;
};

const addSelfDealerId = function () {
  const addSelfDealerIdFunc = async (request, h) => {
    if ( _.get(request, 'auth.user.type') === USER_TYPE.DEALERSHIP ) {
      const dealer_id = parseInt(request.headers['dealer-id']);
      if (dealer_id) {
        const owner = await Models.DealerOwner.query().findOne({
          user_id: _.get(request, 'auth.user.id'),
          is_active: true,
          dealer_id
        });
        if (owner) {
          if (!request.query) {
            request.query = {};
          }
          if (!request.query.filter) {
            request.query.filter = {};
          }
          if (!request.payload) {
            request.payload = {};
          }
          request.payload.dealer_id = dealer_id;
          request.query.filter.dealer_id = dealer_id;
          request.dealer_id = dealer_id;
          return h.continue;
        }
      }
      return Boom.conflict('You are not owner any dealer');
    }
    return h.continue;


  };
  return addSelfDealerIdFunc;
};

module.exports = {
  addDealerId,
  addSelfDealerId,
};
