'use strict';

const QueryBuilder = require('objection').QueryBuilder;
const _ = require('lodash');
const { buildFilter } = require('objection-filter');
const { Model, knex } = require('./config');

class CustomQueryBuilder extends QueryBuilder {
  // Some custom method.
  upsert(data, constraint) {
    const insert = knex(this.tableName()).insert(data);
    const update = knex.queryBuilder().update(data);
    return knex
      .raw(`? ON CONFLICT ${constraint} DO ? returning *`, [insert, update])
      .get('rows')
      .get(0);
  }

  queryBuilder(query) {
    if (query.page && query.pageSize) {
      return this.page(query.page, query.pageSize);
    }

    return this.page(0, 50);
  }
}

class BaseModel extends Model {
  static get QueryBuilder() {
    return CustomQueryBuilder;
  }

  // $beforeInsert() {
  //   this.creation_date = new Date().toISOString();
  //   this.modification_date = new Date().toISOString();
  // }

  // $beforeUpdate() {
  //   this.modification_date = new Date().toISOString();
  // }

  // static get idColumn() {
  //   return 'id';
  // }

  // static queryBuilder(query, baseModel, hasJoin) {
  //   const builder = buildFilter(this).build(query, baseModel);
  //   return builder;
  // }

  // $formatJson(json) {
  //   let superJson = super.$formatJson(json);
  //   if (this.constructor.$hidden && this.constructor.$hidden.length > 0) {
  //     superJson = _.omit(superJson, this.constructor.$hidden);
  //   }
  //   return superJson;
  // }

  // static generateIncludeFromArrayIds({ key, as, relatedModel }) {
  //   return `
  //     (select array_to_json(array_agg(row_to_json(d)))
  //       from (
  //         select *
  //         from ${relatedModel}
  //         where  ${relatedModel}.id = any ("${this.tableName}"."${key}")
  //       ) d
  //       ) as ${as}`;
  // }
}

module.exports = BaseModel;
