'use strict';

const Boom = require('@hapi/boom');

const register = (server) => {
  server.ext('onPreResponse', (request, h) => {
    if (!request.i18n || !request.response) {
      return h.continue;
    }

    const response = request.response;
    if (Boom.isBoom(response)) {
      const i18Message = request.i18n.__(
        response.output.payload.message
      );
      response.output.payload.messageCode = response.output.payload.message;
      response.output.payload.message = i18Message;
      response.output.payload.success = false;
      return response;
    }

    const source = request.response.source;
    if (source.message) {
      const i18Message = request.i18n.__(
        source.message
      );
      source.messageCode = source.message;
      source.message = i18Message;
      source.success = true;
      return response;
    }

    return response;
  });
};

exports.plugin = {
  name: 'errorCode',
  register
};
