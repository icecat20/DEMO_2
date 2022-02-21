'use strict';
const Boom = require('@hapi/boom');
const _  = require('lodash');
const {UniqueViolationError, ForeignKeyViolationError} = require('objection');
const {knex} = require('../db/models/config');
class BaseServiceCRUD {
  constructor(model, modelName) {
    this.model = model;
    this.modelName = modelName;
  }
  handleDBError(error) {
    if (
      error instanceof UniqueViolationError ||
      error instanceof ForeignKeyViolationError
    ) {
      const err = Boom.badRequest(error.name);
      err.output.payload = {
        message: error.message,
        columns: error.columns,
        table: error.table,
        detail: error.nativeError.detail,
      };
      err.reformat();
      throw err;
    }
    throw error;
  }
  async getMany(query) {
    
    return await this.model.query().select().table(this.modelName);
  }

  async getOne(id, query) {
    if (query && query.includes) {
      const result = this.getMany(query);
      result.where('id', id).first();
      if (!result) {
        throw Boom.notFound(`${this.modelName} not found`);
      }
      return result;
    }
    const result = await this.model.query().findById(id);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async createOne(payload) {
    try {
      return await this.model.query().insert(payload).returning('*');
    } catch (error) {
      this.handleDBError(error);
    }
  }
  
  async updateOne(id, payload) {
    try {
      const result = await this.model.query().patchAndFetchById(id, payload);
      if (!result) {
        throw Boom.notFound(`${this.modelName} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    await this.model.query().deleteById(id);
    return { success: true };
  }
}

module.exports = BaseServiceCRUD;
