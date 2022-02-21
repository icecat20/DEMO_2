'use strict';
const handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/users/getUser',
    config : handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/users/getOne/{id}',
    config: handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    config: handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/users/updateOne/{id}',
    config: handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/deleteOne/{id}',
    config: handler.deleteOne
  },
 
];

module.exports = Routes;
