'use strict';

class BaseControllerCRUD {
  constructor(service) {
    this.service = service;
  }

  async getMany(request) {
    const query = request.query;
    // if (query && typeof query.filter === 'string') {
    //   query.filter = JSON.parse(query.filter);
    // }
    return await this.service.getMany(query);
  }

  async getOne(request) {
    const { id } = request.params;
    return await this.service.getOne(id, request.query);
  }

  async createOne(request) {
    const { payload } = request;
    return await this.service.createOne(payload);
  }

  async updateOne(request) {
    const { params, payload } = request;
    const { id } = params;
    return await this.service.updateOne(id, payload);
  }

  async deleteOne(request) {
    const { id } = request.params;
    return await this.service.deleteOne(id);
  }

  async getManyOne(request)
  {
    const { payload } = request;
    const { user_id} =payload;
    return await this.service.getManyOne(user_id);
    
  }
}

module.exports = BaseControllerCRUD;
